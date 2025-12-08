
import React from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Page } from '../types';
import { ArrowLeft, Clock, Calendar, User, CheckCircle, Share2, Droplet, Wind, Timer } from 'lucide-react';

export const BlogPost_TimeAudit: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <>
      <div className="bg-slate-900 pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
            <button 
                onClick={() => onNavigate(Page.BLOG)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest font-bold group"
            >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> Back to Insights
            </button>
            
            <div className="flex flex-wrap items-center gap-4 text-secondary text-sm font-bold mb-8 animate-fade-in-up">
                <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/10">Trends & Techniques</span>
                <span className="flex items-center gap-2 text-slate-300"><Clock className="w-4 h-4" /> 5 Min Read</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-[1.1] animate-fade-in-up delay-100">
                30-Minute Wash Days? Yes, It's Possible. Here's The Routine.
            </h1>

            <div className="flex items-center gap-8 text-slate-400 text-sm border-t border-white/10 pt-8 animate-fade-in-up delay-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <User className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                        <p className="text-white font-bold">Melanie S.</p>
                        <p className="text-xs">Growth Strategist</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Dec 08, 2025
                </div>
            </div>
        </div>
      </div>

      <Section background="white">
          <div className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert">
              <p className="lead text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 font-medium leading-relaxed font-serif">
                  We've all been there. It’s Sunday morning. You look at your hair. You look at the clock. You calculate the mental math: Detangle (45 mins) + Wash (20 mins) + Deep Condition (1 hour) + Blow Dry... suddenly your entire day is gone.
              </p>

              <div className="my-12 relative rounded-2xl overflow-hidden shadow-2xl group">
                 <img 
                    src="https://picsum.photos/800/500?random=26" 
                    alt="Woman with afro hair checking time" 
                    className="w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-white text-xs">
                    Image: AfroLuxe Studio
                </div>
              </div>

              <h2 className="text-3xl font-serif text-slate-900 dark:text-white mt-16 mb-6">The "Time-Audit" Philosophy</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  The reason wash days take 4 hours isn't usually because the hair needs it. It's because we lack a system. In 2025, busy professionals are reclaiming their Sundays with the "Time-Audit" routine. This isn't about skipping care; it's about condensing steps without sacrificing moisture.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  We analyzed the routines of 50 top natural hair stylists in London. Here is the framework they use to get clients in and out of the chair in record time.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-12">
                  <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-xl border border-blue-100 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-600 dark:text-red-400"><Timer className="w-5 h-5"/></div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Old Routine</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>• Pre-poo (30 mins)</li>
                          <li>• Detangle wet (45 mins)</li>
                          <li>• Deep Condition (60 mins)</li>
                          <li>• <strong>Total: ~2.5 Hours + Styling</strong></li>
                      </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-slate-800 p-6 rounded-xl border border-green-100 dark:border-slate-700 shadow-lg transform md:-translate-y-2">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400"><Timer className="w-5 h-5"/></div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Time-Audit Routine</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>• Dry Detangle (10 mins)</li>
                          <li>• Wash in Twists (10 mins)</li>
                          <li>• Steam Condition (10 mins)</li>
                          <li>• <strong>Total: 30 Minutes + Styling</strong></li>
                      </ul>
                  </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4 flex items-center gap-3">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  The Pre-Shower Detangle (Dry)
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                 Don't wet tangled hair. It makes the knots tighter and the process longer. Use a high-slip oil or aloe vera gel on dry hair.
              </p>
              <ul className="space-y-3 mb-8 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                  <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" /> <strong>Section into 4 parts.</strong> Never tackle the whole head at once.</li>
                  <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" /> <strong>Finger detangle first.</strong> Put the comb down. Feel for knots.</li>
                  <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" /> <strong>Twist immediately.</strong> Once a section is clear, twist it up to prevent re-tangling.</li>
              </ul>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4 flex items-center gap-3">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Wash IN Twists
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Yes, keep the twists in. Focus the shampoo on the scalp. The soapy water running down is enough to cleanse the lengths without re-tangling them. This saves you 20 minutes of re-detangling later.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4 flex items-center gap-3">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                  The 5-Minute Steam
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                  You don't need to sit under a dryer for 45 minutes every single week. Apply your deep conditioner, put on a plastic cap, and shower the rest of your body with hot water. The ambient steam opens the cuticles efficiently in just 5-10 minutes.
              </p>

              <div className="bg-gradient-to-r from-primary to-blue-900 text-white p-8 rounded-2xl my-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Droplet className="w-32 h-32" /></div>
                  <h4 className="font-bold text-secondary text-lg mb-2 relative z-10 flex items-center gap-2"><Wind className="w-5 h-5"/> Pro Tip: The Product Audit</h4>
                  <p className="text-blue-100 relative z-10 leading-relaxed">
                      If your conditioner requires 30 minutes to work, it's the wrong product for a maintenance wash. Look for "Instant Penetration" or "Express" masks aimed at high-porosity hair.
                  </p>
              </div>

              <h2 className="text-3xl font-serif text-slate-900 dark:text-white mt-12 mb-6">The Result?</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  By keeping hair sectioned and using steam intelligently, you go from dry to styled in under an hour. This routine frees up your Sunday for what actually matters—resting.
              </p>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-12 flex justify-between items-center">
                  <div className="text-sm font-bold text-slate-500">Share this article</div>
                  <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"><Share2 className="w-4 h-4" /></button>
                  </div>
              </div>
          </div>
      </Section>
      
      <Section background="light">
          <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-3xl font-serif text-slate-900 dark:text-white mb-6">Need more time back in your salon?</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Just like this routine saves you time on wash day, AfroLuxe saves you time on admin. Let our AI handle your bookings while you handle the hair.
              </p>
              <Button onClick={() => onNavigate(Page.BOOKING)} className="shadow-xl">Book a Strategy Session</Button>
          </div>
      </Section>
    </>
  );
};
