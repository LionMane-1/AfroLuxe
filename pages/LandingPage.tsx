
import React from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Star, CheckCircle, Clock, MapPin, Calendar, Heart, Scissors, TrendingUp, Users, MessageSquare, Bot, Sparkles, Zap, MessageCircle, PhoneOff, Target, LineChart, Rocket } from 'lucide-react';
import { Page } from '../types';
import { VoiceAgentDemo } from '../components/VoiceAgentDemo';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <>
      {/* SECTION 1: Hero Section */}
      <Section className="relative overflow-hidden !py-12 md:!py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white leading-tight">
              Afro Hair Salons Turn Clicks Into <span className="text-primary dark:text-secondary italic">Clients</span>
            </h1>
            
            <div className="space-y-4">
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg font-medium">
                    We help UK Afro hair salons get more bookings, better clients and reliable monthly income with done-for-you digital marketing.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button onClick={() => onNavigate(Page.BOOKING)}>
                Book My Strategy Session
              </Button>
              <Button variant="outline" onClick={() => onNavigate(Page.SERVICES)}>
                View Services
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex text-secondary">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-medium">5.0 rating (128+ Reviews)</span>
            </div>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/800/1000?random=1" 
              alt="Happy client with beautiful natural hair" 
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-6 rounded-lg shadow-lg">
              <p className="text-primary font-serif italic text-lg dark:text-secondary">"My hair has never been this healthy. The silk press lasted 3 weeks!"</p>
              <p className="text-sm font-bold mt-2 text-slate-900 dark:text-white">— Sarah J., South London</p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 2: Problem Section */}
      <Section background="light">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-accent font-bold tracking-widest uppercase text-sm">The Struggle is Real</span>
          <h2 className="text-3xl md:text-4xl font-serif mt-4 text-slate-900 dark:text-white">Does this sound familiar?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Your phones ring out, missed calls turn into missed bookings",
            "Your Afro hair content looks good, but hardly brings new clients",
            "You’re juggling DMs, WhatsApp and calls just to book or move appointments",
            "You know your work is premium, but your branding and website don’t show it"
          ].map((symptom, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary transition-colors">
              <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-red-500 font-bold text-xl">!</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{symptom}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 3: Solution Section (B2B Focus) */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/10 rounded-full z-0"></div>
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full z-0"></div>
             <img 
              src="https://picsum.photos/600/800?random=2" 
              alt="Salon owner checking analytics on tablet" 
              className="rounded-lg shadow-xl relative z-10"
            />
            <div className="absolute bottom-10 -right-6 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg z-20 border border-slate-100 dark:border-slate-700 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-full text-green-600"><TrendingUp size={16} /></div>
                    <span className="font-bold text-slate-800 dark:text-white">+140% New Bookings</span>
                </div>
                <p className="text-xs text-slate-500">Since implementing AfroLuxe Marketing</p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">The Solution</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white leading-tight">
              The Digital Partner Your Salon Has Been Waiting For
            </h2>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="text-lg font-medium text-primary dark:text-secondary">
                We don't just build websites. We build engines for growth.
              </p>
              
              <p>
                We specialize in one thing: helping Afro hair businesses get the exposure they deserve. Our digital ecosystem is designed to increase your 5-star reviews, fill your calendar with high-value clients, and turn one-time visitors into lifetime loyalists.
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border-l-4 border-secondary">
                 <p className="italic text-slate-700 dark:text-slate-300">
                   "We know the frustration of having 'magic hands' but empty chairs. We've felt the pain of the late-night no-shows and the struggle to be seen in a crowded market. We are a new breed of agency, born from the salon floor, not just a boardroom."
                 </p>
              </div>

              <p>
                Our solution is simple yet powerful: A turn-key marketing platform that handles the noise so you can handle the hair. We automate your bookings, manage your reputation, and keep your brand top-of-mind, ensuring your business grows as beautifully as your clients' hair.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">More Exposure</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Higher LTV</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Automated Reviews</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Client Retention</span>
                </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 4: AI Team Section */}
      <Section background="light">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="w-6 h-6 text-accent" />
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Your Digital Workforce</span>
          </div>
          <h2 className="text-4xl font-serif text-slate-900 dark:text-white">Meet Your New AI Staff</h2>
          <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto text-lg">
             A complete team of specialists working 24/7 to grow your salon, for a fraction of the cost of a single hire. Always on brand, never late.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Lola",
              role: "Voice Receptionist",
              icon: <PhoneOff />,
              desc: "Answers every call, books appointments directly into your calendar, and answers client questions instantly.",
              img: "https://picsum.photos/200/200?random=10",
              color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
              badge: <Bot className="w-3 h-3" />
            },
            {
              name: "Ruby",
              role: "Reputation Manager",
              icon: <MessageSquare />,
              desc: "Automatically texts clients for reviews after appointments and intercepts negative feedback before it goes public.",
              img: "https://picsum.photos/200/200?random=11",
              color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
              badge: <Star className="w-3 h-3" />
            },
            {
              name: "Marcus",
              role: "Client Retention",
              icon: <Zap />,
              desc: "Identifies clients who haven't visited in 60 days and sends personalized offers to get them back in the chair.",
              img: "https://picsum.photos/200/200?random=12",
              color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
              badge: <TrendingUp className="w-3 h-3" />
            },
            {
              name: "Zoe",
              role: "Social Assistant",
              icon: <Sparkles />,
              desc: "Helps draft captions, schedule posts, and engages with comments to keep your feed lively while you sleep.",
              img: "https://picsum.photos/200/200?random=13",
              color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
              badge: <MessageCircle className="w-3 h-3" />
            }
          ].map((member, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center group relative overflow-hidden">
              
              {/* Tech Ring Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative w-28 h-28 mb-6">
                <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-primary/20 group-hover:border-primary/60 animate-[spin_12s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full bg-slate-100 dark:bg-slate-700"></div>
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover border-2 border-white dark:border-slate-800 z-10" 
                />
                <div className="absolute bottom-1 right-1 bg-green-500 border-2 border-white dark:border-slate-800 w-6 h-6 rounded-full z-20 flex items-center justify-center shadow-sm" title="Active Now">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{member.name}</h3>
              
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-5 ${member.color}`}>
                {member.badge}
                {member.role}
              </span>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {member.desc}
              </p>

              <div className="mt-auto pt-6 w-full">
                 <button className="w-full py-2 rounded border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    View Profile
                 </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 5: Why Work With Us (B2B Focus) */}
      <Section background="light">
        <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl font-serif text-slate-900 dark:text-white mt-2">The AfroLuxe Advantage</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
            {[
                { 
                    icon: <Target className="w-8 h-8 text-accent" />, 
                    title: "Niche Industry Expertise", 
                    desc: "We aren't a generalist agency. We understand the Afro hair market, the language, and what drives your specific clientele to book." 
                },
                { 
                    icon: <Zap className="w-8 h-8 text-accent" />, 
                    title: "Automated Growth Systems", 
                    desc: "Reclaim your time with our 'always-on' AI systems. From answering calls to chasing reviews, we automate the busy work so you can focus on styling." 
                },
                { 
                    icon: <LineChart className="w-8 h-8 text-accent" />, 
                    title: "Data-Driven ROI", 
                    desc: "Stop guessing with your marketing budget. We provide clear, transparent reporting that shows exactly how many heads we're putting in beds... or chairs." 
                }
            ].map((benefit, idx) => (
                <div key={idx} className="text-center space-y-4 group">
                    <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-transparent group-hover:border-secondary">
                        {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary dark:text-secondary">{benefit.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed px-4">{benefit.desc}</p>
                </div>
            ))}
        </div>
      </Section>

      {/* SECTION 6: How It Works */}
      <Section>
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest uppercase text-sm">Process</span>
          <h2 className="text-4xl font-serif text-slate-900 dark:text-white mt-2">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>

          {[
            {
              step: "01",
              title: "Book Your Strategy Session",
              desc: "Schedule a free 15-minute discovery call. We'll discuss your salon's current challenges and see if our system is the right fit for your growth goals.",
              icon: <Calendar className="w-6 h-6 text-white" />
            },
            {
              step: "02",
              title: "We Deploy Your System",
              desc: "Once onboarded, we custom-build your AI agents and marketing funnels. Within 7 days, your new digital workforce is live and ready to take bookings.",
              icon: <Rocket className="w-6 h-6 text-white" />
            },
            {
              step: "03",
              title: "Watch Your Business Grow",
              desc: "Sit back as your calendar fills up automatically. You get more 5-star reviews, fewer no-shows, and consistent revenue without lifting a finger.",
              icon: <TrendingUp className="w-6 h-6 text-white" />
            }
          ].map((item, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 shadow-lg z-10 group-hover:border-secondary transition-colors duration-300">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center shadow-sm text-sm">
                  {item.step}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 7: Success Stories (B2B Reviews) */}
      <Section background="light">
         <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Success Stories</span>
            <h2 className="text-4xl font-serif text-slate-900 dark:text-white mt-2">What Salon Owners Are Saying</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
             {[
                { 
                  headline: "Bookings Doubled Fast!", 
                  before: "I was struggling with inconsistent foot traffic and empty chairs.", 
                  after: "I've achieved a fully booked calendar for two months straight, and feel confident in my future.",
                  name: "Sarah Jenkins", 
                  role: "Owner, Curl Haven",
                  platform: "Google" 
                },
                { 
                  headline: "No More No-Shows!", 
                  before: "I was struggling with last-minute cancellations eating into my profits.", 
                  after: "I've achieved a 95% attendance rate thanks to the deposit system, and feel financially secure.",
                  name: "Michelle O.", 
                  role: "Director, Luxe Braids",
                  platform: "Trustpilot" 
                },
                { 
                  headline: "My Time Reclaimed!", 
                  before: "I was struggling to answer DMs while braiding hair.", 
                  after: "I've achieved complete automation of my booking process, and feel like I finally have my evenings back.",
                  name: "Tola A.", 
                  role: "CEO, Natural Roots",
                  platform: "Yelp" 
                }
             ].map((review, idx) => (
                 <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg relative border border-slate-100 dark:border-slate-700 flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
                     {/* Quote Icon */}
                     <div className="text-6xl text-secondary/20 font-serif absolute top-4 right-6 font-black leading-none">”</div>
                     
                     {/* Headline */}
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative z-10 pr-10 font-serif">"{review.headline}"</h3>
                     
                     {/* Body */}
                     <div className="space-y-4 mb-8 relative z-10 flex-grow">
                        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border-l-4 border-red-400">
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                               <span className="font-bold text-red-500 text-xs uppercase block mb-1 tracking-wider">Before</span>
                               <span className="italic">"Before working with you, {review.before}"</span>
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border-l-4 border-green-400">
                            <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-relaxed">
                               <span className="font-bold text-green-600 text-xs uppercase block mb-1 tracking-wider">Now</span>
                               <span className="italic">"Now, {review.after}"</span>
                            </p>
                        </div>
                     </div>

                     {/* Footer */}
                     <div className="flex justify-between items-end border-t border-slate-100 dark:border-slate-700 pt-6 mt-auto">
                         <div>
                             <div className="font-bold text-slate-900 dark:text-white">{review.name}</div>
                             <div className="text-xs text-slate-500 uppercase tracking-wide">{review.role}</div>
                         </div>
                         
                         {/* Platform Badges */}
                         <div className="flex items-center">
                            {review.platform === 'Google' && (
                                <div className="flex flex-col items-end">
                                   <span className="flex items-center gap-0.5 font-bold text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1 rounded shadow-sm">
                                      <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
                                   </span>
                                   <div className="flex text-[#FBBC05] text-xs mt-1">★★★★★</div>
                                </div>
                            )}
                            {review.platform === 'Trustpilot' && (
                                <div className="flex flex-col items-end">
                                    <span className="flex items-center gap-1 font-bold text-slate-800 dark:text-white text-xs">
                                        <Star className="w-4 h-4 fill-[#00b67a] text-[#00b67a]" /> Trustpilot
                                    </span>
                                    <span className="text-[10px] text-slate-400">Verified Business</span>
                                </div>
                            )}
                            {review.platform === 'Yelp' && (
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-[#ff1a1a] text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1 rounded shadow-sm">
                                       yelp<span className="text-slate-800 dark:text-white">*</span>
                                    </span>
                                    <div className="flex text-[#ff1a1a] text-xs mt-1">★★★★★</div>
                                </div>
                            )}
                         </div>
                     </div>
                 </div>
             ))}
        </div>
      </Section>

      {/* SECTION 8: FAQ (B2B Focused) */}
      <Section>
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <span className="text-accent font-bold tracking-widest uppercase text-sm">Common Questions</span>
                <h2 className="text-3xl font-serif mt-2 dark:text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
                {[
                    {
                        q: "How fast will I start seeing new bookings?",
                        a: "Our systems are typically live within 7 days. Once active, most partners see their first automated booking within 24-48 hours."
                    },
                    {
                        q: "Do I need to be tech-savvy to use this?",
                        a: "Not at all. We do the heavy lifting. We set up the AI, the ads, and the booking flow. You just need to check your calendar and show up for your clients."
                    },
                    {
                        q: "Does this work for solo stylists or just big salons?",
                        a: "It works perfectly for both. For solo stylists, it acts as your reception team, saving you hours of admin time every week."
                    },
                    {
                        q: "Is there a long-term contract?",
                        a: "No. We believe in earning your business every month. We operate on a rolling monthly basis with no lock-in contracts."
                    },
                    {
                        q: "What happens if I don't get any clients?",
                        a: "We stand by our results. If we don't generate qualified leads in your first 30 days, we'll refund your management fee."
                    }
                ].map((item, idx) => (
                    <details key={idx} className="group bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer open:ring-1 open:ring-primary/20 transition-all">
                        <summary className="flex justify-between items-center font-bold text-slate-800 dark:text-slate-200 list-none text-lg">
                            {item.q}
                            <span className="transition-transform duration-300 group-open:rotate-180 text-primary">▼</span>
                        </summary>
                        <p className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                            {item.a}
                        </p>
                    </details>
                ))}
            </div>
        </div>
      </Section>

      {/* SECTION 9: Ready to Get Started */}
      <Section background="primary" className="text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Ready to get Started?
            </h2>
            <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Take the first step towards a fully booked calendar. Let's build your automated growth engine today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate(Page.BOOKING)} 
                className="bg-white text-primary hover:bg-secondary hover:text-white border-2 border-transparent"
              >
                Book My Strategy Session
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate(Page.SERVICES)}
                className="!text-white !border-white hover:!bg-white hover:!text-primary"
              >
                View Services
              </Button>
            </div>
          </div>
      </Section>

      {/* Floating AI Widget */}
      <VoiceAgentDemo />
    </>
  );
};
