import React from 'react';
import { Section, PageHeader } from '../components/Section';
import { Button } from '../components/Button';

export const ContactPage: React.FC = () => {
  return (
    <>
      <PageHeader title="Get In Touch" subtitle="We'd love to hear from you." />
      <Section>
        <div className="max-w-2xl mx-auto bg-white p-8 border border-slate-200 rounded-xl shadow-sm">
            <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">First Name</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border border-slate-200 rounded focus:border-primary outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Last Name</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border border-slate-200 rounded focus:border-primary outline-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input type="email" className="w-full p-3 bg-gray-50 border border-slate-200 rounded focus:border-primary outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Message</label>
                    <textarea rows={5} className="w-full p-3 bg-gray-50 border border-slate-200 rounded focus:border-primary outline-none"></textarea>
                </div>
                <Button fullWidth>Send Message</Button>
            </form>
        </div>
      </Section>
    </>
  );
};