
import React from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Page } from '../types';
import { ArrowLeft, Clock, User, Calendar, Share2, CheckCircle } from 'lucide-react';

export const BlogPost_TimeAudit: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero / Header Section */}
      <div className="bg-slate-900 pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
            <button 
                onClick={() => onNavigate(Page.BLOG)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-bold group"
            >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> Back to Insights
            </button>
            
            <div className="flex items-center gap-4 text-secondary text-sm font-bold mb-6">
                <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">Trends & Techniques</span>
                <span className="flex items-center gap-2 text-slate-300"><Clock className="w-4 h-4" /> 5 Min Read</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight">
                30-Minute Wash Day Routine for Afro Hair (3C–4C Time-Audit Guide)
            </h1>

            <div className="flex items-center gap-6 text-slate-400 text-sm border-t border-white/10 pt-6">
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

      {/* Main Content */}
      <Section background="white">
          <div className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert">
              
              {/* Introduction */}
              <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8 font-medium leading-relaxed font-serif">
                  Let’s be honest: for those of us with Type 3C to 4C hair, "wash day" often feels less like a routine and more like a calendar event. It is the dreaded Sunday ritual that can eat up an entire afternoon. But if you are a busy professional juggling work, social life, and self-care, spending four hours detangling and twisting just isn't sustainable.
              </p>

              <div className="my-10 relative rounded-2xl overflow-hidden shadow-xl">
                 <img 
                    src="https://picsum.photos/800/500?random=26" 
                    alt="Woman with healthy natural hair" 
                    className="w-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-white text-xs">
                    Image: AfroLuxe Studio
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 mb-6">
                Here is the truth: You don't need to sacrifice moisture or definition to get your time back. By adopting a "Time-Audit" mindset—focusing on efficiency, tools, and the right order of operations—you can dramatically reduce the friction in your natural hair routine.
              </p>

              <p className="text-slate-700 dark:text-slate-300 mb-12 border-l-4 border-secondary pl-6 italic">
                Ready to reclaim your Sunday? Here is how to detangle, moisturise, and style before your coffee cools.
              </p>

              <h2 className="text-3xl font-serif text-slate-900 dark:text-white mt-12 mb-6">
                The "Time-Audit" Wash Day Routine (Cut Your Afro Hair Wash Day in Half)
              </h2>

              <p className="text-slate-700 dark:text-slate-300 mb-8">
                The secret to a 30-minute wash day isn't rushing; it's strategy. Most time is wasted fighting tangles under the shower stream or reapplying products that didn't absorb. Here is the optimised workflow.
              </p>

              {/* Step 1 */}
              <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                      <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
                      The Pre-Poo Shortcut (Dry Detangling)
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Never take tangled 4C hair straight into water. Water causes hair to shrink and mat, turning small knots into impossible obstructions. Instead, apply a high-slip oil or aloe vera gel to dry hair before you even step in the shower.
                  </p>
                  <ul className="space-y-3 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                      <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0" /> 
                        <strong>Section first:</strong> Divide hair into 4 large twists.
                      </li>
                      <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0" /> 
                        <strong>Finger detangle:</strong> Gently separate sheds from the roots.
                      </li>
                  </ul>
              </div>

              {/* Step 2 */}
              <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                      <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
                      Wash While Twisted
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Do not undo your twists to shampoo! Apply shampoo directly to your scalp between the parts. Massage vigorously. The soapy water running down the length of the twists is enough to cleanse them without causing tangles.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                      <strong>Time Saved:</strong> 20 minutes of re-detangling avoided.
                  </p>
              </div>

              {/* Step 3 */}
              <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                      <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
                      Steam, Don't Soak
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Apply your deep conditioner to the twists. Put on a plastic cap. Shower the rest of your body with hot water. The steam trapped in the cap will open your cuticles in 5-10 minutes, doing the work of a 30-minute hooded dryer session.
                  </p>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-12 flex justify-between items-center">
                  <div className="text-sm font-bold text-slate-500">Share this guide</div>
                  <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"><Share2 className="w-4 h-4" /></button>
                  </div>
              </div>
          </div>
      </Section>
      
      {/* CTA Section */}
      <Section background="light">
          <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-3xl font-serif text-slate-900 dark:text-white mb-6">Need more time back in your salon?</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Just like this routine saves you time on wash day, AfroLuxe saves you time on admin. Let our AI handle your bookings while you handle the hair.
              </p>
              <Button onClick={() => onNavigate(Page.BOOKING)} className="shadow-xl">Book a Strategy Session</Button>
          </div>
      </Section>
    </div>
  );
};
