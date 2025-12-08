
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from "@google/genai";
import { Mic, Phone, PhoneOff, Activity, Volume2, X, MessageSquare, ChevronDown, Minimize2, User, Bot } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isPartial?: boolean;
}

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
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    // Note: We don't clear messages here so the user can read the transcript after call ends
  };

  const startCall = async () => {
    setError(null);
    setMessages([]); // Clear previous chat
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
            setMessages([{ id: 'init', role: 'model', text: "Hello! I'm Melanie from AfroLuxe. How can I help grow your salon today?" }]);

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
            // 1. Handle Audio
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

            // 2. Handle Transcription (Text)
            const serverContent = message.serverContent;
            
            // Handle User Input Transcription
            if (serverContent?.inputTranscription) {
                const text = serverContent.inputTranscription.text;
                if (text) {
                    setMessages(prev => {
                        const lastMsg = prev[prev.length - 1];
                        if (lastMsg && lastMsg.role === 'user' && lastMsg.isPartial) {
                            // Update existing partial message
                            const newMsgs = [...prev];
                            newMsgs[newMsgs.length - 1] = { ...lastMsg, text: lastMsg.text + text };
                            return newMsgs;
                        } else {
                            // Start new message
                            return [...prev, { id: Date.now().toString(), role: 'user', text, isPartial: true }];
                        }
                    });
                }
            }

            // Handle Model Output Transcription
            if (serverContent?.outputTranscription) {
                 const text = serverContent.outputTranscription.text;
                 if (text) {
                     setMessages(prev => {
                         const lastMsg = prev[prev.length - 1];
                         if (lastMsg && lastMsg.role === 'model' && lastMsg.isPartial) {
                             const newMsgs = [...prev];
                             newMsgs[newMsgs.length - 1] = { ...lastMsg, text: lastMsg.text + text };
                             return newMsgs;
                         } else {
                             return [...prev, { id: Date.now().toString(), role: 'model', text, isPartial: true }];
                         }
                     });
                 }
            }

            // Mark turns as complete (remove partial flag)
            if (serverContent?.turnComplete) {
                 setMessages(prev => prev.map(m => ({ ...m, isPartial: false })));
            }

            // 3. Handle Interruptions
            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              sourcesRef.current.forEach(src => src.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
              // Mark last model message as interrupted/complete
              setMessages(prev => prev.map(m => ({ ...m, isPartial: false })));
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
          // Enable transcription for both sides
          inputAudioTranscription: {}, 
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `You are Melanie, a Senior Growth Strategist at AfroLuxe Marketing Agency.
          
          GOAL: Qualify the lead and get them to book a Strategy Call.
          
          PERSONA: 
          - Professional, sharp, but warm. British-Jamaican accent (London/Multicultural London English). 
          - You are NOT a generic support bot. You are a business consultant.
          
          CONVERSATION STAGES:
          1. DISCOVERY: Ask 1-2 probing questions about their salon.
             - "Are you a solo stylist or do you run a shop?"
             - "What's the biggest headache right now? Empty chairs or just too much admin?"
          
          2. AGITATE: Briefly highlight the pain of not solving it.
             - "That admin time is costing you money. You can't braid if you're replying to DMs."
          
          3. SOLUTION: Pitch AfroLuxe as the partner.
             - "That's exactly what we fix. We automate the bookings so you just show up and style."
          
          4. CLOSE: Push for the booking.
             - "We should do a proper audit. I have a slot for a free strategy call tomorrow. Shall we get that booked?"
          
          RULES:
          - Keep responses SHORT (max 2 sentences). This is a voice conversation.
          - Always end with a question.
          - If they ask price: "Essentials start at £495, but for a full shop, you'd want the Growth Engine at £1,250. Which sounds more like where you are?"`,
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
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-h-[600px] h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3 text-white">
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                        <Bot className="w-5 h-5" />
                    </div>
                    {isConnected && (
                         <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-primary rounded-full animate-pulse"></div>
                    )}
                </div>
                <div>
                    <h3 className="font-serif font-bold leading-none">Melanie</h3>
                    <p className="text-[10px] text-blue-200 uppercase tracking-wider font-medium">Growth Strategist</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors hover:bg-white/10 p-1.5 rounded-full"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Chat History Area */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                {messages.length === 0 && !isConnected && (
                    <div className="text-center mt-12 opacity-50">
                        <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                        <p className="text-sm">Start a conversation to see the transcript here.</p>
                    </div>
                )}
                
                {messages.map((msg, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-primary/10 dark:bg-primary/20'}`}>
                            {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600 dark:text-slate-300" /> : <Bot className="w-4 h-4 text-primary" />}
                        </div>
                        <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tr-none' 
                            : 'bg-primary text-white rounded-tl-none shadow-md'
                        }`}>
                            {msg.text}
                            {msg.isPartial && <span className="inline-block w-1.5 h-3 ml-1 bg-current opacity-70 animate-pulse"/>}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Audio Visualizer & Controls */}
            <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0 relative">
              
              {/* Voice Status Indicator */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-2">
                 {isConnected ? (
                     <>
                        <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-primary' : 'bg-green-500 animate-pulse'}`}></div>
                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wide">
                            {isSpeaking ? 'Melanie Speaking' : 'Listening...'}
                        </span>
                     </>
                 ) : (
                     <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wide">Mic Off</span>
                 )}
              </div>

              <div className="flex flex-col items-center">
                  
                  {/* Waveform Visualization */}
                  <div className="flex items-center justify-center h-16 gap-1 mb-4 w-full">
                      {isConnected ? (
                          Array.from({ length: 12 }).map((_, i) => (
                             <div 
                                key={i}
                                className="w-1.5 bg-gradient-to-t from-primary to-secondary rounded-full transition-all duration-75"
                                style={{ 
                                    height: `${Math.max(4, Math.min(40, volume * (Math.random() + 0.5)))}px`,
                                    opacity: volume > 2 ? 1 : 0.3
                                }}
                             />
                          ))
                      ) : (
                          <div className="text-slate-400 text-xs italic">
                              "Hi, I'm Melanie. Ask me how to get more bookings."
                          </div>
                      )}
                  </div>

                  {/* Buttons */}
                  <div className="w-full">
                      {!isConnected ? (
                          <Button 
                              onClick={startCall} 
                              fullWidth
                              className="bg-primary hover:bg-blue-800 shadow-lg py-3 text-sm flex items-center justify-center gap-2"
                          >
                              <Mic className="w-4 h-4" /> Start Conversation
                          </Button>
                      ) : (
                          <div className="grid grid-cols-4 gap-2">
                              <Button 
                                  variant="outline"
                                  className="col-span-1 flex items-center justify-center !px-0 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 dark:border-red-900/30 dark:hover:bg-red-900/20"
                                  onClick={cleanup}
                              >
                                  <PhoneOff className="w-4 h-4" />
                              </Button>
                              <div className="col-span-3">
                                <Button 
                                    fullWidth
                                    className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 border-none shadow-md text-sm"
                                    onClick={() => {/* Placeholder for manual mute or input mode switch */}}
                                >
                                    Listening...
                                </Button>
                              </div>
                          </div>
                      )}
                  </div>
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
            className="fixed bottom-6 right-6 z-50 group"
          >
             <div className="absolute -top-2 right-0 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                AI LIVE
             </div>
            <div className="w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center border-4 border-white dark:border-slate-800 group-hover:bg-blue-800 transition-colors">
                 <Mic className="w-8 h-8" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
