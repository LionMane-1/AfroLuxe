
import React from 'react';
import { Section, PageHeader } from '../components/Section';
import { Button } from '../components/Button';
import { Page } from '../types';
import { Check, Zap, Crown, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServicesPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const tiers = [
    {
      name: "The Essentials",
      price: "£495",
      period: "/month",
      desc: "Perfect for solo stylists needing a professional digital presence.",
      color: "border-slate-200 dark:border-slate-700",
      icon: <Shield className="w-6 h-6" />,
      features: [
        "High-Converting Website (One-Pager)",
        "Google Business Profile Optimization",
        "Automated Booking System Setup",
        "Monthly Performance Report",
        "Email Support"
      ],
      cta: "Start Growing",
      popular: false
    },
    {
      name: "The Growth Engine",
      price: "£1,250",
      period: "/month",
      desc: "For established salons ready to dominate their local area.",
      color: "border-secondary ring-2 ring-secondary shadow-2xl scale-105 z-10",
      icon: <Zap className="w-6 h-6 text-white" />,
      features: [
        "Everything in Essentials",
        "Full AI Receptionist (Melanie)",
        "Social Media Management (3 posts/wk)",
        "Reputation Management (Reviews)",
        "Paid Ads Management (£500 spend limit)",
        "Bi-Weekly Strategy Calls"
      ],
      cta: "Dominant Choice",
      popular: true
    },
    {
      name: "Market Leader",
      price: "£2,500",
      period: "/month",
      desc: "Complete digital takeover for multi-chair or multi-location brands.",
      color: "border-slate-200 dark:border-slate-700",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Everything in Growth Engine",
        "Video Content Production (On-site)",
        "Unlimited Paid Ads Management",
        "Advanced CRM Automations",
        "Competitor Analysis & Takedown",
        "24/7 VIP Support Line"
      ],
      cta: "Scale Up",
      popular: false
    }
  ];

  return (
    <>
      <PageHeader 
        title="Invest in Growth, Not Just Ads" 
        subtitle="Transparent pricing packages designed to turn your salon into a booking machine." 
      />
      
      <Section background="light" pattern>
        <div className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto px-4">
            {tiers.map((tier, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-white dark:bg-slate-800 rounded-2xl p-8 border relative flex flex-col h-full ${tier.color}`}
                >
                    {tier.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
                            Most Popular
                        </div>
                    )}

                    <div className="mb-6">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tier.popular ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            {tier.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 min-h-[40px]">{tier.desc}</p>
                    </div>

                    <div className="mb-8">
                        <span className="text-4xl font-serif font-bold text-slate-900 dark:text-white">{tier.price}</span>
                        <span className="text-slate-400">{tier.period}</span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-grow">
                        {tier.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                <span>{feat}</span>
                            </li>
                        ))}
                    </ul>

                    <Button 
                        variant={tier.popular ? 'primary' : 'outline'} 
                        fullWidth 
                        onClick={() => onNavigate(Page.BOOKING)}
                        className={tier.popular ? 'shadow-lg hover:shadow-xl' : ''}
                    >
                        {tier.cta}
                    </Button>
                </motion.div>
            ))}
        </div>

        <div className="mt-16 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Not sure which package is right for you?</p>
            <button 
                onClick={() => onNavigate(Page.BOOKING)}
                className="text-primary dark:text-secondary font-bold hover:underline"
            >
                Book a Free 15-Min Audit Call →
            </button>
        </div>
      </Section>
    </>
  );
};
