
import React, { useState } from 'react';
import { Section, PageHeader } from '../components/Section';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { AuthPage } from './AuthPage';
import { CheckCircle, CreditCard, Lock, ArrowRight, Building2, TrendingUp, Users } from 'lucide-react';

type BookingType = 'strategy_call' | 'paid_audit';

export const BookingPage: React.FC = () => {
  const { user } = useAuth();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [bookingType, setBookingType] = useState<BookingType>('strategy_call');
  
  // B2B Qualification Data
  const [businessData, setBusinessData] = useState({
      salonName: '',
      website: '',
      monthlyRevenue: '',
      challenge: ''
  });

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBusinessDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  const submitBooking = async () => {
    setIsProcessing(true);
    // Simulate API call to CRM (HubSpot/Supabase)
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setStep(4);
  };

  // Step 1: Business Qualification (The "Gatekeeper")
  const renderQualification = () => (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">Tell us about your salon</h3>
          <div className="space-y-6">
              <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Salon Name</label>
                  <div className="relative">
                      <Building2 className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                      <input 
                        name="salonName"
                        value={businessData.salonName}
                        onChange={handleBusinessDataChange}
                        className="w-full pl-10 p-3 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:border-primary transition-colors dark:text-white"
                        placeholder="e.g. Crown & Glory Studio"
                      />
                  </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Current Monthly Revenue</label>
                    <div className="relative">
                        <TrendingUp className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <select 
                            name="monthlyRevenue"
                            value={businessData.monthlyRevenue}
                            onChange={handleBusinessDataChange}
                            className="w-full pl-10 p-3 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:border-primary appearance-none transition-colors dark:text-white"
                        >
                            <option value="">Select Range...</option>
                            <option value="0-2k">£0 - £2k</option>
                            <option value="2k-5k">£2k - £5k</option>
                            <option value="5k-10k">£5k - £10k</option>
                            <option value="10k+">£10k+</option>
                        </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Team Size</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <select 
                            className="w-full pl-10 p-3 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:border-primary appearance-none transition-colors dark:text-white"
                        >
                             <option>Solo Stylist</option>
                             <option>2-5 Staff</option>
                             <option>5+ Staff</option>
                        </select>
                    </div>
                 </div>
              </div>

              <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Biggest Challenge?</label>
                  <input 
                    name="challenge"
                    value={businessData.challenge}
                    onChange={handleBusinessDataChange}
                    className="w-full p-3 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:border-primary transition-colors dark:text-white"
                    placeholder="e.g. Getting more bookings, Hiring staff..."
                  />
              </div>

              <Button fullWidth onClick={() => setStep(2)} disabled={!businessData.salonName}>
                  Next Step <ArrowRight className="w-4 h-4" />
              </Button>
          </div>
      </div>
  );

  // Step 2: Path Selection (Free vs Paid)
  const renderSelection = () => (
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Path */}
          <div 
            onClick={() => { setBookingType('strategy_call'); setStep(3); }}
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-primary cursor-pointer transition-all hover:shadow-xl group relative"
          >
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">Discovery Call</h3>
              <p className="text-green-600 font-bold mb-4">Free (15 Mins)</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                  A quick chat to see if we're a good fit. We'll review your current online presence and identify 3 quick wins.
              </p>
              <ul className="space-y-2 mb-6">
                  <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-400"><CheckCircle className="w-4 h-4 text-primary" /> Social Media Audit</li>
                  <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-400"><CheckCircle className="w-4 h-4 text-primary" /> Pricing Strategy Review</li>
              </ul>
              <Button variant="outline" fullWidth className="group-hover:bg-primary group-hover:text-white">Select Free Call</Button>
          </div>

          {/* Paid Path */}
          <div 
            onClick={() => { setBookingType('paid_audit'); setStep(3); }}
            className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-secondary cursor-pointer transition-all hover:shadow-xl group"
          >
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">Deep Dive Audit</h3>
              <p className="text-slate-900 dark:text-white font-bold mb-4">£99 (60 Mins)</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                  A comprehensive analysis of your entire funnel. We'll build a custom 6-month growth roadmap for you to keep.
              </p>
              <ul className="space-y-2 mb-6">
                  <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-400"><CheckCircle className="w-4 h-4 text-secondary" /> Full Website Analysis</li>
                  <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-400"><CheckCircle className="w-4 h-4 text-secondary" /> Competitor Benchmarking</li>
                  <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-400"><CheckCircle className="w-4 h-4 text-secondary" /> PDF Growth Roadmap</li>
              </ul>
              <Button variant="secondary" fullWidth>Select Paid Audit</Button>
          </div>
      </div>
  );

  // Step 3: Calendar & Finalize
  const renderCalendar = () => (
      <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-serif mb-6 dark:text-white">Pick a Slot</h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                  {Array.from({length: 14}, (_, i) => (
                      <button 
                          key={i} 
                          onClick={() => { setSelectedDate(i + 1); setSelectedTime(null); }}
                          className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-colors ${
                              selectedDate === i + 1 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                          }`}
                      >
                          {i + 1}
                      </button>
                  ))}
              </div>
              
              {selectedDate && (
                  <div className="grid grid-cols-3 gap-3 mt-6">
                      {['10:00', '11:30', '14:00', '16:30'].map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded text-sm font-medium border ${selectedTime === time ? 'border-primary bg-blue-50 text-primary' : 'border-slate-200 dark:border-slate-600 dark:text-slate-300'}`}
                          >
                              {time}
                          </button>
                      ))}
                  </div>
              )}
          </div>

          <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-fit">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Summary</h3>
              <div className="text-sm space-y-3 mb-6">
                  <div className="flex justify-between">
                      <span className="text-slate-500">Type</span>
                      <span className="font-medium dark:text-slate-300">{bookingType === 'strategy_call' ? 'Free Discovery' : 'Deep Dive Audit'}</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="text-slate-500">Salon</span>
                      <span className="font-medium dark:text-slate-300">{businessData.salonName}</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between font-bold text-lg">
                      <span className="dark:text-white">Total</span>
                      <span className="text-primary dark:text-secondary">{bookingType === 'strategy_call' ? '£0.00' : '£99.00'}</span>
                  </div>
              </div>

              {!user ? (
                 <div className="text-center">
                    <p className="text-xs text-slate-500 mb-3">Please sign in to confirm booking</p>
                    <AuthPage allowGuest={true} onAuthSuccess={() => {}} />
                 </div>
              ) : (
                  <>
                    {bookingType === 'paid_audit' && (
                        <div className="mb-4 bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-sm text-slate-500">
                            <Lock className="w-4 h-4" /> Secure Stripe Payment
                        </div>
                    )}
                    <Button fullWidth onClick={submitBooking} disabled={!selectedTime || isProcessing}>
                        {isProcessing ? 'Confirming...' : (bookingType === 'strategy_call' ? 'Confirm Booking' : 'Pay & Confirm')}
                    </Button>
                  </>
              )}
          </div>
      </div>
  );

  const renderSuccess = () => (
      <div className="text-center py-16">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-serif text-slate-900 dark:text-white mb-4">You're Booked!</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
              Thanks for trusting AfroLuxe. We've sent a calendar invite to <span className="font-bold">{user?.email}</span>.
              <br/><br/>
              Your strategist is preparing a preliminary report on <strong>{businessData.salonName}</strong> right now.
          </p>
          <Button onClick={() => window.location.href = '/'}>Return Home</Button>
      </div>
  );

  return (
    <>
      <PageHeader 
        title={step === 4 ? "Success" : "Schedule Your Session"} 
        subtitle="Let's build your growth roadmap." 
      />
      
      <Section>
         {step < 4 && (
            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
                    <div className="w-12 h-0.5 bg-slate-200"></div>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
                    <div className="w-12 h-0.5 bg-slate-200"></div>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>3</span>
                </div>
            </div>
         )}

         {step === 1 && renderQualification()}
         {step === 2 && renderSelection()}
         {step === 3 && renderCalendar()}
         {step === 4 && renderSuccess()}
      </Section>
    </>
  );
};
