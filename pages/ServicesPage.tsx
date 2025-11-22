import React from 'react';
import { Section, PageHeader } from '../components/Section';
import { Button } from '../components/Button';
import { Page } from '../types';

export const ServicesPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const services = [
    { title: "Silk Press Package", price: "£85", desc: "Includes wash, deep condition, trim, and press.", time: "120 mins" },
    { title: "Knotless Braids (Mid-Back)", price: "£120", desc: "Hair included. Shampoo service add-on available.", time: "240 mins" },
    { title: "Natural Twist Out", price: "£65", desc: "Defined twists using our house-made butter.", time: "90 mins" },
    { title: "Consultation & Analysis", price: "£40", desc: "Microscopic analysis of hair health + regimen plan.", time: "45 mins" },
  ];

  return (
    <>
      <PageHeader title="Our Services" subtitle="Transparent pricing for premium care. All services include a consultation." />
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
                <div key={idx} className="border border-slate-200 p-6 rounded-xl hover:shadow-lg transition-shadow flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                            <span className="text-lg font-serif font-bold text-accent">{service.price}</span>
                        </div>
                        <p className="text-slate-500 text-sm mb-4 flex items-center gap-2"><span className="bg-gray-100 px-2 rounded">⏱ {service.time}</span></p>
                        <p className="text-slate-600 mb-6">{service.desc}</p>
                    </div>
                    <Button variant="outline" fullWidth onClick={() => onNavigate(Page.BOOKING)}>Book This Service</Button>
                </div>
            ))}
        </div>
      </Section>
    </>
  );
};