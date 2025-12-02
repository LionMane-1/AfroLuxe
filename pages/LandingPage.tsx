
import React from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Star, CheckCircle, Calendar, TrendingUp, MessageSquare, Bot, Sparkles, Zap, MessageCircle, PhoneOff, Target, LineChart, Rocket, ArrowRight } from 'lucide-react';
import { Page } from '../types';
import { VoiceAgentDemo } from '../components/VoiceAgentDemo';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <>
      {/* SECTION 1: Bespoke Hero Section */}
      <div className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden pt-20">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/10 skew-x-12 translate-x-32 z-0"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              The #1 Growth Partner for UK Afro Salons
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1]">
              Afro Hair Salons Turn Clicks Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-200 italic">Clients</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed max-w-lg font-light">
                We help UK Afro hair salons get more bookings, better clients, and reliable monthly income with done-for-you digital marketing.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => onNavigate(Page.BOOKING)} className="shadow-secondary/20 shadow-lg">
                Book My Strategy Session
              </Button>
              <Button variant="outline" onClick={() => onNavigate(Page.SERVICES)} className="border-slate-700 text-slate-300 hover:bg-white/5 hover:border-white">
                View Services
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="flex -space-x-3">
                 {[10, 11, 12, 13].map(i => (
                     <img key={i} src={`https://picsum.photos/100/100?random=${i}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="Client" />
                 ))}
              </div>
              <div className="text-sm">
                <div className="flex text-secondary">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
                </div>
                <span className="text-slate-400">Trusted by 128+ Salon Owners</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image / Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://picsum.photos/800/1000?random=1" 
                alt="Salon Owner Success" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-xs"
              >
                  <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><TrendingUp size={20} /></div>
                      <div>
                          <p className="text-xs text-slate-300 uppercase tracking-wider">Monthly Revenue</p>
                          <p className="text-xl font-bold text-white">+£4,200</p>
                      </div>
                  </div>
              </motion.div>
            </div>
            
            {/* Decorative Frame */}
            <div className="absolute -inset-4 border border-secondary/30 rounded-3xl -z-10 transform rotate-3"></div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: Problem Section (Clean Contrast) */}
      <Section background="light" pattern>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-accent font-bold tracking-widest uppercase text-sm">The Struggle is Real</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 text-slate-900 dark:text-white">Does this sound familiar?</h2>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { text: "Your phones ring out, missed calls turn into missed bookings", icon: "📞" },
            { text: "Your Afro hair content looks good, but hardly brings new clients", icon: "📉" },
            { text: "You’re juggling DMs, WhatsApp and calls just to book or move appointments", icon: "🤹‍♀️" },
            { text: "You know your work is premium, but your branding and website don’t show it", icon: "💎" }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* SECTION 3: Solution (Asymmetrical Layout) */}
      <Section className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="order-2 md:order-1 relative"
          >
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl z-0"></div>
             <img 
              src="https://picsum.photos/600/800?random=2" 
              alt="Salon owner checking analytics on tablet" 
              className="rounded-2xl shadow-2xl relative z-10 aspect-[4/5] object-cover"
            />
            {/* Floating stats card */}
            <div className="absolute bottom-12 -right-12 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl z-20 border border-slate-100 dark:border-slate-700 max-w-xs animate-[float_6s_ease-in-out_infinite]">
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">94%</div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">Occupancy Rate</p>
                        <p className="text-xs text-slate-500">Last 30 Days</p>
                    </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[94%]"></div>
                </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 space-y-8"
          >
            <div>
                <span className="text-accent font-bold tracking-widest uppercase text-sm">The Solution</span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mt-3 leading-tight">
                The Digital Partner Your Salon Has Been Waiting For
                </h2>
            </div>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
              <p className="font-medium text-primary dark:text-secondary text-xl">
                We don't just build websites. We build engines for growth.
              </p>
              
              <p>
                We specialize in one thing: helping Afro hair businesses get the exposure they deserve. Our digital ecosystem is designed to increase your 5-star reviews, fill your calendar with high-value clients, and turn one-time visitors into lifetime loyalists.
              </p>

              <div className="border-l-4 border-secondary pl-6 py-2 italic text-slate-700 dark:text-slate-400">
                "We are a new breed of agency, born from the salon floor, not just a boardroom. We understand the nuance of texture."
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {['More Exposure', 'Higher LTV', 'Automated Reviews', 'Client Retention'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                             <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{item}</span>
                    </div>
                ))}
            </div>
            
            <Button onClick={() => onNavigate(Page.SERVICES)} className="mt-4">Explore Our Approach <ArrowRight className="w-4 h-4" /></Button>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 4: AI Team (Glassmorphism) */}
      <Section background="luxury">
        <div className="text-center mb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-secondary text-sm font-medium"
          >
            <Bot className="w-4 h-4" />
            <span>Your Digital Workforce</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white"
          >
            Meet Your New AI Staff
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 mt-6 max-w-2xl mx-auto text-lg font-light"
          >
             A complete team of specialists working 24/7 to grow your salon, for a fraction of the cost of a single hire.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {[
            {
              name: "Melanie",
              role: "Voice Receptionist",
              desc: "Answers calls & books appointments.",
              img: "https://picsum.photos/200/200?random=10",
              color: "from-blue-500 to-indigo-500",
              badge: <PhoneOff className="w-4 h-4" />
            },
            {
              name: "Ruby",
              role: "Reputation Manager",
              desc: "Intercepts bad reviews, boosts good ones.",
              img: "https://picsum.photos/200/200?random=11",
              color: "from-pink-500 to-rose-500",
              badge: <MessageSquare className="w-4 h-4" />
            },
            {
              name: "Marcus",
              role: "Client Retention",
              desc: "Reactivates lost clients automatically.",
              img: "https://picsum.photos/200/200?random=12",
              color: "from-purple-500 to-violet-500",
              badge: <TrendingUp className="w-4 h-4" />
            },
            {
              name: "Zoe",
              role: "Social Assistant",
              desc: "Engages comments while you sleep.",
              img: "https://picsum.photos/200/200?random=13",
              color: "from-orange-500 to-amber-500",
              badge: <MessageCircle className="w-4 h-4" />
            }
          ].map((member, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="relative group rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div 
                className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity ${member.color}`} 
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
              ></div>
              
              <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.color} blur-md opacity-40 group-hover:opacity-70 transition-opacity`}></div>
                      <img src={member.img} alt={member.name} className="relative w-24 h-24 rounded-full border-2 border-white/20 object-cover" />
                      <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-white/20 p-2 rounded-full text-white">
                          {member.badge}
                      </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">{member.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* SECTION 5: Why Work With Us */}
      <Section background="light" pattern>
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
                <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="text-center space-y-4 group p-6 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors duration-300"
                >
                    <div className="w-16 h-16 mx-auto bg-primary/5 dark:bg-slate-700 rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center mb-6">
                        {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary dark:text-secondary">{benefit.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed px-2 font-light">{benefit.desc}</p>
                </motion.div>
            ))}
        </div>
      </Section>

      {/* SECTION 6: How It Works (Timeline) */}
      <Section>
        <div className="text-center mb-20">
          <span className="text-accent font-bold tracking-widest uppercase text-sm">Process</span>
          <h2 className="text-4xl font-serif text-slate-900 dark:text-white mt-2">Simple Steps to Success</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative max-w-6xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent -z-10"></div>

          {[
            {
              step: "01",
              title: "Book Strategy Session",
              desc: "A free 15-minute discovery call to map your growth goals.",
              icon: <Calendar className="w-6 h-6" />
            },
            {
              step: "02",
              title: "We Deploy Systems",
              desc: "We build your AI workforce and marketing funnels in 7 days.",
              icon: <Rocket className="w-6 h-6" />
            },
            {
              step: "03",
              title: "Watch Business Grow",
              desc: "Get consistent bookings and reviews on autopilot.",
              icon: <TrendingUp className="w-6 h-6" />
            }
          ].map((item, idx) => (
            <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.3 }}
                className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-[6px] border-slate-50 dark:border-slate-800 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300 relative">
                <div className="absolute inset-0 rounded-full border border-secondary/20"></div>
                <div className="w-12 h-12 bg-primary rounded-xl rotate-45 flex items-center justify-center shadow-lg">
                    <div className="-rotate-45 text-white">{item.icon}</div>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center shadow-md text-sm border-2 border-white dark:border-slate-800">
                  {item.step}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light max-w-xs">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* SECTION 7: Testimonials (Masonry style) */}
      <Section background="light" pattern>
         <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Success Stories</span>
            <h2 className="text-4xl font-serif text-slate-900 dark:text-white mt-2">What Salon Owners Are Saying</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
             {[
                { 
                  headline: "Bookings Doubled Fast!", 
                  before: "I was struggling with inconsistent foot traffic and empty chairs.", 
                  after: "I've achieved a fully booked calendar for two months straight.",
                  name: "Sarah Jenkins", 
                  role: "Owner, Curl Haven",
                  platform: "Google" 
                },
                { 
                  headline: "No More No-Shows!", 
                  before: "I was struggling with last-minute cancellations.", 
                  after: "I've achieved a 95% attendance rate thanks to the deposit system.",
                  name: "Michelle O.", 
                  role: "Director, Luxe Braids",
                  platform: "Trustpilot" 
                },
                { 
                  headline: "My Time Reclaimed!", 
                  before: "I was struggling to answer DMs while braiding hair.", 
                  after: "I've achieved complete automation of my booking process.",
                  name: "Tola A.", 
                  role: "CEO, Natural Roots",
                  platform: "Yelp" 
                }
             ].map((review, idx) => (
                 <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="bg-white dark:bg-slate-800 p-8 rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg shadow-lg relative border border-slate-100 dark:border-slate-700 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300"
                 >
                     <div className="text-8xl text-secondary/10 font-serif absolute -top-4 -right-2 font-black leading-none pointer-events-none">”</div>
                     
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative z-10 pr-6 font-serif tracking-tight">"{review.headline}"</h3>
                     
                     <div className="space-y-4 mb-8 relative z-10 flex-grow">
                        <div className="flex gap-3">
                           <div className="w-1 bg-red-400 rounded-full h-auto"></div>
                           <p className="text-slate-500 dark:text-slate-400 text-sm italic">"{review.before}"</p>
                        </div>
                        <div className="flex gap-3">
                           <div className="w-1 bg-green-500 rounded-full h-auto"></div>
                           <p className="text-slate-800 dark:text-slate-200 text-sm font-medium italic">"{review.after}"</p>
                        </div>
                     </div>

                     <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-6 mt-auto">
                         <div>
                             <div className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wide">{review.role}</div>
                         </div>
                         <div className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                             {review.platform} ★★★★★
                         </div>
                     </div>
                 </motion.div>
             ))}
        </div>
      </Section>

      {/* SECTION 8: FAQ (Clean Accordion) */}
      <Section className="max-w-4xl mx-auto">
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
                    a: "Not at all. We do the heavy lifting. We set up the AI, the ads, and the booking flow. You just need to check your calendar."
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
                <div key={idx} className="group border-b border-slate-200 dark:border-slate-700 last:border-0">
                    <details className="p-6 cursor-pointer open:bg-slate-50 dark:open:bg-slate-800/50 transition-colors rounded-lg">
                        <summary className="flex justify-between items-center font-bold text-slate-800 dark:text-slate-200 list-none text-lg select-none">
                            {item.q}
                            <span className="transform transition-transform duration-300 group-open:rotate-180 text-primary">▼</span>
                        </summary>
                        <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-light"
                        >
                            {item.a}
                        </motion.p>
                    </details>
                </div>
            ))}
        </div>
      </Section>

      {/* SECTION 9: CTA (Luxury Gradient) */}
      <Section className="!p-0">
          <div className="bg-gradient-to-r from-primary to-blue-900 py-24 px-6 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
             
             <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                  Ready to get Started?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                  Take the first step towards a fully booked calendar. Let's build your automated growth engine today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate(Page.BOOKING)} 
                    className="bg-white text-primary hover:bg-secondary hover:text-white border-none shadow-xl transform hover:-translate-y-1"
                  >
                    Book My Strategy Session
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate(Page.SERVICES)}
                    className="text-white border-white/30 hover:bg-white/10 hover:border-white"
                  >
                    View Services
                  </Button>
                </div>
             </div>
          </div>
      </Section>

      {/* Floating AI Widget */}
      <VoiceAgentDemo />
    </>
  );
};
