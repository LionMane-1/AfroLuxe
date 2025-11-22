import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from "@google/genai";
import { Mic, Phone, PhoneOff, Activity, Volume2, X, MessageSquare, ChevronDown, Minimize2 } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

// --- Audio Utilities ---

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Component ---

export const VoiceAgentDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Refs for audio handling
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  // Initialize GenAI
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  useEffect(() => {
    // Auto-open the widget after a short delay for visibility
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    
    setIsConnected(false);
    setIsSpeaking(false);
    setVolume(0);
  };

  const startCall = async () => {
    setError(null);
    try {
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const config = {
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Session opened');
            setIsConnected(true);

            if (!inputAudioContextRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              
              let sum = 0;
              for(let i = 0; i < inputData.length; i++) sum += Math.abs(inputData[i]);
              const avg = sum / inputData.length;
              setVolume(Math.min(avg * 500, 100)); 

              const pcmBlob = createBlob(inputData);
              
              if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then((session) => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              }
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            
            if (base64EncodedAudioString && outputAudioContextRef.current) {
              setIsSpeaking(true);
              
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputAudioContextRef.current.currentTime
              );

              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                outputAudioContextRef.current,
                24000,
                1
              );

              const source = outputAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              
              const gainNode = outputAudioContextRef.current.createGain();
              gainNode.gain.value = 1.0; 
              
              source.connect(gainNode);
              gainNode.connect(outputAudioContextRef.current.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              sourcesRef.current.forEach(src => src.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Session error', e);
            setError("Connection lost.");
            cleanup();
          },
          onclose: (e: CloseEvent) => {
            console.log('Session closed');
            cleanup();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `You are Lola, the AI Receptionist for AfroLuxe. Be warm, professional, and concise. 
          Services: Silk Press (£85), Knotless Braids (£120), Twist Out (£65), Consultation (£40).
          Location: 123 High Street, Brixton.
          Keep answers short and conversational.`,
        },
      };

      sessionPromiseRef.current = ai.live.connect(config);
      
    } catch (err) {
      console.error(err);
      setError("Mic access failed.");
      cleanup();
    }
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-serif font-bold">Talk to Lola</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col items-center bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 min-h-[280px]">
              
              {/* Visualizer */}
              <div className="relative mb-6 mt-4">
                  {isConnected && (
                      <>
                          <div className={`absolute inset-0 rounded-full bg-secondary/20 animate-ping ${isSpeaking ? 'opacity-100' : 'opacity-0'}`}></div>
                          <div className={`absolute -inset-2 rounded-full border border-secondary/30 transition-all duration-300 ${isSpeaking ? 'scale-110' : 'scale-100'}`}></div>
                      </>
                  )}
                  
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                      isConnected 
                      ? 'bg-gradient-to-br from-secondary to-amber-600' 
                      : 'bg-slate-100 dark:bg-slate-700'
                  }`}>
                      {isConnected ? (
                          <Activity className={`w-10 h-10 text-white ${isSpeaking ? 'animate-pulse' : ''}`} />
                      ) : (
                          <Phone className="w-10 h-10 text-slate-400 dark:text-slate-300" />
                      )}
                  </div>
                  
                  {isConnected && volume > 5 && (
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1 items-end h-6">
                          <div className="w-1 bg-primary rounded-full animate-bounce" style={{ height: `${Math.min(volume, 15)}px` }}></div>
                          <div className="w-1 bg-primary rounded-full animate-bounce" style={{ height: `${Math.min(volume * 1.5, 25)}px`, animationDelay: '0.1s' }}></div>
                          <div className="w-1 bg-primary rounded-full animate-bounce" style={{ height: `${Math.min(volume, 15)}px`, animationDelay: '0.2s' }}></div>
                      </div>
                  )}
              </div>

              {/* Status */}
              <div className="text-center mb-6 flex-grow flex flex-col justify-center">
                  {error ? (
                      <p className="text-red-500 font-medium text-xs">{error}</p>
                  ) : isConnected ? (
                      <p className="text-primary dark:text-secondary font-medium text-sm animate-pulse">
                          {isSpeaking ? "Lola is speaking..." : "Listening..."}
                      </p>
                  ) : (
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                          Ask about appointments, prices, or styling advice.
                      </p>
                  )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 w-full justify-center">
                  {!isConnected ? (
                      <Button 
                          onClick={startCall} 
                          fullWidth
                          className="bg-green-600 hover:bg-green-700 border-none shadow-md py-3 text-sm"
                      >
                          Start Call
                      </Button>
                  ) : (
                      <>
                           <Button 
                              variant="outline"
                              className="rounded-full w-10 h-10 flex items-center justify-center !p-0 border-slate-200 dark:border-slate-600"
                              onClick={() => {/* Mute toggling logic */}}
                           >
                              <Mic className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                           </Button>
                          <Button 
                              onClick={cleanup} 
                              className="rounded-full px-6 bg-red-500 hover:bg-red-600 border-none shadow-md text-sm"
                          >
                              End Call
                          </Button>
                      </>
                  )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors border-4 border-white dark:border-slate-800"
          >
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
            <MessageSquare className="w-8 h-8 fill-current" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};