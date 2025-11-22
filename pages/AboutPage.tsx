
import React from 'react';
import { Section, PageHeader } from '../components/Section';
import { Palette, Video, MousePointerClick, PhoneCall, Bot, Eye, BarChart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="About AfroLuxe" 
        subtitle="The digital growth partner for Afro hairdressing salons in the UK." 
      />
      
      <Section>
        <div className="prose prose-lg mx-auto text-slate-600 dark:text-slate-300">
            <p className="lead text-xl text-primary dark:text-secondary font-medium mb-6">
                AfroLuxe is the digital growth partner for Afro hairdressing salons in the UK.
            </p>
            <p className="mb-6">
                Founded in Brixton in 2023, we saw the same pattern everywhere: talented Afro stylists doing incredible work, but relying on weak branding, outdated websites, silent phones and social media that doesn’t translate into bookings. AfroLuxe was created to close that gap.
            </p>
            <p>
                We specialise in building premium, modern salon brands powered by cutting-edge digital marketing – from visual identity and image marketing to high-converting websites, social media, video advertising and AI-driven automation. No generic beauty templates. No copy-and-paste campaigns. Everything is tailored to your salon, your clients and your growth goals.
            </p>
        </div>
      </Section>

      <Section background="light">
          <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                  <span className="text-accent font-bold tracking-widest uppercase text-sm">What We Do</span>
                  <h3 className="text-3xl font-serif mt-2 dark:text-white">We help you to:</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                      {
                          icon: <Palette className="w-6 h-6" />,
                          title: "Look premium online",
                          desc: "Brand identity, visuals and image styling that match the standard of your work."
                      },
                      {
                          icon: <Video className="w-6 h-6" />,
                          title: "Show your best work daily",
                          desc: "Photo and video concepts created for Instagram, TikTok and YouTube that actually attract your ideal clients."
                      },
                      {
                          icon: <MousePointerClick className="w-6 h-6" />,
                          title: "Turn clicks into appointments",
                          desc: "Fast, mobile-first websites and booking journeys designed to convert visitors into paying clients."
                      },
                      {
                          icon: <PhoneCall className="w-6 h-6" />,
                          title: "Never miss a call or message",
                          desc: "A 24/7 “Never Miss A Call” service that answers enquiries, explains services and fees, and books, rearranges or cancels appointments automatically."
                      },
                      {
                          icon: <Bot className="w-6 h-6" />,
                          title: "Deliver smart customer service",
                          desc: "Automated responses to product questions, treatment queries, aftercare, policies and FAQs across phone, web chat and messaging."
                      },
                      {
                          icon: <Eye className="w-6 h-6" />,
                          title: "Stay visible and fully booked",
                          desc: "Local SEO, paid ads and always-on social content that keep you top of mind in your area."
                      },
                      {
                          icon: <BarChart className="w-6 h-6" />,
                          title: "See what’s working",
                          desc: "Simple dashboards and CRM integration so you know which channels and campaigns are bringing in your best clients."
                      }
                  ].map((item, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary transition-all duration-300 group">
                          <div className="w-12 h-12 bg-primary/10 dark:bg-slate-700 rounded-lg flex items-center justify-center text-primary dark:text-secondary mb-6 group-hover:scale-110 transition-transform">
                              {item.icon}
                          </div>
                          <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3">{item.title}</h4>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-serif text-primary dark:text-white mb-6">Driven by Culture & Results</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Our team of strategists, designers, developers and content creators understand both the culture of Afro hair and the realities of running a busy salon. From your logo to your Instagram grid, from your website to your “Never Miss A Call” system, every detail is designed with one outcome in mind: more of the right clients, paying what you’re worth, with your chairs consistently filled all year round.
            </p>
        </div>
      </Section>
    </>
  );
};
