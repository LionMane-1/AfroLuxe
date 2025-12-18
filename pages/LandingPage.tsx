
import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
// Added Users to the imports from lucide-react
import { Star, CheckCircle, Calendar, TrendingUp, MessageSquare, Bot, Sparkles, Zap, MessageCircle, PhoneOff, Target, LineChart, Rocket, ArrowRight, MapPin, Users } from 'lucide-react';
import { Page } from '../types';
import { VoiceAgentDemo } from '../components/VoiceAgentDemo';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.pageX, y: event.pageY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spotlightColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(30, 58, 138, 0.03)';

  return (
    <>
      {/* SECTION 1: Bespoke Hero Section */}
      <div className="relative bg-white dark:bg-slate-900 overflow-hidden py-16 md:py-24 transition-colors duration-500">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/5 dark:bg-primary/10 skew-x-12 translate-x-32 z-0"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] z-0"></div>
        
        <div 
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
                background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 40%)`
            }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 dark:bg-white/5 dark:border-white/10 text-secondary text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              AHLM Operational Update: v2.1 Live
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white leading-[1.1]">
              Afro Hair Salons Turn Clicks Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-500 dark:to-amber-200 italic">Clients</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg font-light">
                We build the digital systems that ensure your Afro hair salon stays fully booked, fully staffed, and locally dominant.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => onNavigate(Page.BOOKING)} className="shadow-secondary/20 shadow-lg">
                Book My Strategy Audit
              </Button>
              <Button variant="outline" onClick={() => onNavigate(Page.SERVICES)} className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300">
                View Strategy Pillars
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex -space-x-3">
                 {[10, 11, 12, 13].map(i => (
                     <img key={i} src={`https://picsum.photos/100/100?random=${i}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" alt="Client" />
                 ))}
              </div>
              <div className="text-sm">
                <div className="flex text-secondary">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
                </div>
                <span className="text-slate-500 dark:text-slate-400">Trusted by 128+ Salon Owners</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
              <img 
                src="https://picsum.photos/800/1000?random=1" 
                alt="Salon Owner Success" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-xs"
              >
                  <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><TrendingUp size={20} /></div>
                      <div>
                          <p className="text-xs text-slate-300 uppercase tracking-wider">Local Occupancy</p>
                          <p className="text-xl font-bold text-white">94.2%</p>
                      </div>
                  </div>
              </motion.div>
            </div>
            <div className="absolute -inset-4 border border-secondary/30 rounded-3xl -z-10 transform rotate-3"></div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: Problem Section */}
      <Section background="light" pattern>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-accent font-bold tracking-widest uppercase text-sm">The Salon Struggle</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 text-slate-900 dark:text-white">Is your marketing working or just wasting time?</h2>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { text: "Your Google Business Profile is silent while competitors get all the calls", icon: "📍" },
            { text: "You can't find quality stylists who stick around and grow with you", icon: "💇‍♀️" },
            { text: "DMs are piling up, but your chair occupancy is still inconsistent", icon: "📉" },
            { text: "You have no system to bring past clients back through the door automatically", icon: "🔁" }
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

      {/* SECTION 3: Solution */}
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
              alt="Salon owner checking strategy" 
              className="rounded-2xl shadow-2xl relative z-10 aspect-[4/5] object-cover"
            />
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
                Operational Excellence for UK Afro Salons
                </h2>
            </div>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
              <p className="font-medium text-primary dark:text-secondary text-xl">
                We aren't a creative agency. We are a growth engine.
              </p>
              <p>
                AHLM provides the Local Dominance, Recruitment Marketing, and Yield Management systems that high-performing salons use to stabilize their income and reclaim their time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {['Local Dominance', 'Yield Management', 'Recruitment Funnels', 'AI Reception'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                             <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{item}</span>
                    </div>
                ))}
            </div>
            
            <Button onClick={() => onNavigate(Page.SERVICES)} className="mt-4">Explore Our Pillars <ArrowRight className="w-4 h-4" /></Button>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 4: AI Team (Aligned with OKP v2.1) */}
      <Section background="luxury">
        <div className="text-center mb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-secondary text-sm font-medium"
          >
            <Bot className="w-4 h-4" />
            <span>Digital Workforce</span>
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-serif text-white">Your Senior Strategy Team</motion.h2>
          <motion.p className="text-slate-300 mt-6 max-w-2xl mx-auto text-lg font-light">
             Our AI-driven agents work 24/7 inside your business to ensure you never miss a lead or an application.
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
              role: "Senior Strategist",
              desc: "Qualifies salon owners and books strategy consultations.",
              img: "https://picsum.photos/200/200?random=10",
              color: "from-blue-500 to-indigo-500",
              badge: <PhoneOff className="w-4 h-4" />
            },
            {
              name: "Ruby",
              role: "Local Dominance",
              desc: "Optimizes GBP visibility and maps performance daily.",
              img: "https://picsum.photos/200/200?random=11",
              color: "from-pink-500 to-rose-500",
              badge: <MapPin className="w-4 h-4" />
            },
            {
              name: "Marcus",
              role: "Yield Specialist",
              desc: "Fills slow days and reactivates lost clients via SMS.",
              img: "https://picsum.photos/200/200?random=12",
              color: "from-purple-500 to-violet-500",
              badge: <TrendingUp className="w-4 h-4" />
            },
            {
              name: "Zoe",
              role: "Recruitment Lead",
              desc: "Screens stylist applications and manages job ad spend.",
              img: "https://picsum.photos/200/200?random=13",
              color: "from-orange-500 to-amber-500",
              badge: <Users className="w-4 h-4" />
            }
          ].map((member, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="relative group rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r opacity-50 ${member.color}`}></div>
              <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.color} blur-md opacity-40`}></div>
                      <img src={member.img} alt={member.name} className="relative w-24 h-24 rounded-full border-2 border-white/20 object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">{member.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Other sections remain largely the same, but terminology is kept professional B2B */}
      <Section background="light" pattern>
        <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Our Difference</span>
            <h2 className="text-4xl font-serif text-slate-900 dark:text-white mt-2">The AHLM Advantage</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
            {[
                { icon: <Target className="w-8 h-8 text-accent" />, title: "No False Promises", desc: "We don't guarantee #1 on Google. We guarantee a clear plan, consistent execution, and transparent reporting." },
                { icon: <Zap className="w-8 h-8 text-accent" />, title: "Salon-Specific Systems", desc: "Our recruitment and yield funnels are built specifically for the unit economics of an Afro hair salon." },
                { icon: <LineChart className="w-8 h-8 text-accent" />, title: "Data-Driven ROI", desc: "We audit your GBP and website metrics to show you exactly how many new heads we're putting in chairs." }
            ].map((benefit, idx) => (
                <div key={idx} className="text-center space-y-4 group p-6 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors duration-300">
                    <div className="w-16 h-16 mx-auto bg-primary/5 dark:bg-slate-700 rounded-2xl rotate-3 flex items-center justify-center mb-6">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-primary dark:text-secondary">{benefit.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">{benefit.desc}</p>
                </div>
            ))}
        </div>
      </Section>

      {/* Rest of the page follows... */}
      <Section className="!p-0">
          <div className="bg-gradient-to-r from-primary to-blue-900 py-24 px-6 text-center relative overflow-hidden">
             <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Ready to Grow Your Salon?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light">Book a Strategy Audit today. We'll find the missing pieces in your local presence and recruitment funnel.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => onNavigate(Page.BOOKING)} className="bg-white text-primary hover:bg-secondary hover:text-white border-none shadow-xl transform hover:-translate-y-1">Book Strategy Audit</Button>
                  <Button variant="outline" onClick={() => onNavigate(Page.SERVICES)} className="text-white border-white/30 hover:bg-white/10">View Our Pillars</Button>
                </div>
             </div>
          </div>
      </Section>

      <VoiceAgentDemo />
    </>
  );
};
