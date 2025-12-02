
import React from 'react';
import { Section, PageHeader } from '../components/Section';
import { MapPin, Globe, Wifi, Users, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceAreaPage: React.FC = () => {
  const hubs = [
    { city: "London", salons: 45, growth: "+12%" },
    { city: "Birmingham", salons: 28, growth: "+8%" },
    { city: "Manchester", salons: 19, growth: "+15%" },
    { city: "Leeds", salons: 12, growth: "+5%" }
  ];

  return (
    <>
      <PageHeader title="National Reach, Local Impact" subtitle="We empower Afro hair businesses across the entire UK digital landscape." />
      
      <Section>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Data Visualization / Map Placeholder */}
              <div className="relative">
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center relative border border-slate-200 dark:border-slate-700 overflow-hidden">
                      {/* Abstract Radar/Network Graphic */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                      <div className="w-[80%] h-[80%] border border-slate-300 dark:border-slate-600 rounded-full absolute animate-pulse"></div>
                      <div className="w-[60%] h-[60%] border border-slate-300 dark:border-slate-600 rounded-full absolute"></div>
                      
                      <div className="z-10 text-center">
                          <Globe className="w-16 h-16 text-primary dark:text-secondary mx-auto mb-4" />
                          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">128+</h3>
                          <p className="text-slate-500 dark:text-slate-400">Partner Salons</p>
                      </div>

                      {/* Floating Hubs */}
                      {hubs.map((hub, idx) => {
                          const angle = (idx / hubs.length) * 2 * Math.PI;
                          const radius = 40; // percent
                          const x = 50 + radius * Math.cos(angle);
                          const y = 50 + radius * Math.sin(angle);
                          
                          return (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.2 }}
                                className="absolute bg-white dark:bg-slate-900 p-3 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 text-xs"
                                style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)' }}
                              >
                                  <div className="font-bold dark:text-white">{hub.city}</div>
                                  <div className="text-green-500 flex items-center gap-1">
                                      <ArrowUpRight className="w-3 h-3" /> {hub.growth}
                                  </div>
                              </motion.div>
                          );
                      })}
                  </div>
              </div>

              {/* Text Content */}
              <div>
                  <div className="flex items-center gap-2 mb-6">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">Remote-First Agency</span>
                  </div>
                  <h3 className="text-3xl font-serif text-slate-900 dark:text-white mb-6">Growing Salons Beyond Brixton</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
                      While our HQ is in London, our digital infrastructure knows no borders. We successfully manage marketing campaigns for salons from Glasgow to Bristol without ever needing to step foot in the shop.
                  </p>
                  
                  <div className="space-y-6">
                      <div className="flex gap-4">
                          <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                              <Wifi className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 dark:text-white">Virtual Onboarding</h4>
                              <p className="text-slate-500 dark:text-slate-400 text-sm">We set up your AI systems and booking flows entirely remotely via Zoom.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                              <Users className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 dark:text-white">Community Access</h4>
                              <p className="text-slate-500 dark:text-slate-400 text-sm">Join our private Slack group of 100+ Afro salon owners sharing tips.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </Section>
    </>
  );
};
