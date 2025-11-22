
import React, { useState } from 'react';
import { Section, PageHeader } from '../components/Section';
import { Button } from '../components/Button';
import { ServiceItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { AuthPage } from './AuthPage';
import { CheckCircle, CreditCard, Lock, Calendar } from 'lucide-react';

const MOCK_SERVICES: ServiceItem[] = [
  { id: '1', title: "Silk Press Package", price: 85, description: "Includes wash, deep condition, trim, and press.", duration: 120 },
  { id: '2', title: "Knotless Braids (Mid-Back)", price: 120, description: "Hair included. Shampoo service add-on available.", duration: 240 },
  { id: '3', title: "Natural Twist Out", price: 65, description: "Defined twists using our house-made butter.", duration: 90 },
  { id: '4', title: "Consultation & Analysis", price: 40, description: "Microscopic analysis of hair health + regimen plan.", duration: 45 },
];

export const BookingPage: React.FC = () => {
  const { user } = useAuth();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simulated Stripe Payment
  const handlePayment = async () => {
    setIsProcessingPayment(true);
    // Simulate network request to Stripe
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessingPayment(false);
    setIsSuccess(true);
    setStep(4);
  };

  const renderServiceSelection = () => (
    <div className="grid md:grid-cols-2 gap-6">
        {MOCK_SERVICES.map((service) => (
            <div 
                key={service.id} 
                onClick={() => { setSelectedService(service); setStep(2); }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between dark:bg-slate-800 ${selectedService?.id === service.id ? 'border-primary bg-purple-50 dark:bg-slate-700' : 'border-slate-200 dark:border-slate-700 bg-white'}`}
            >
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{service.title}</h3>
                        <span className="font-serif font-bold text-accent">£{service.price}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{service.description}</p>
                </div>
                <div className="flex items-center text-xs font-bold text-slate-400">
                    ⏱ {service.duration} mins
                </div>
            </div>
        ))}
    </div>
  );

  const renderDateSelection = () => (
    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-serif mb-6 dark:text-white">Select Date</h3>
            <div className="grid grid-cols-7 gap-2 mb-4 text-center font-bold text-slate-400 text-sm">
                {['M','T','W','T','F','S','S'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {Array.from({length: 31}, (_, i) => (
                    <button 
                        key={i} 
                        onClick={() => { setSelectedDate(i + 1); setSelectedTime(null); }}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-colors ${
                            selectedDate === i + 1 
                            ? 'bg-primary text-white shadow-md' 
                            : 'bg-gray-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-serif mb-6 dark:text-white">Available Slots</h3>
            {selectedDate ? (
                <div className="space-y-3">
                    {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
                        <button 
                            key={time} 
                            onClick={() => setSelectedTime(time)}
                            className={`w-full py-3 px-4 border rounded-lg text-left transition-all flex justify-between items-center ${selectedTime === time ? 'border-primary bg-white dark:bg-slate-700 text-primary shadow' : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-slate-300 hover:border-primary'}`}
                        >
                            <span>{time}</span>
                            {selectedTime === time && <CheckCircle className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-slate-500 italic">Please select a date to view availability.</p>
            )}
            
            <Button 
                className="mt-6" 
                fullWidth 
                disabled={!selectedTime}
                onClick={() => setStep(3)}
            >
                Continue
            </Button>
        </div>
    </div>
  );

  const renderPayment = () => (
      <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-serif mb-4 dark:text-white">Booking Summary</h3>
              <div className="flex justify-between mb-2 text-slate-600 dark:text-slate-300">
                  <span>Service</span>
                  <span className="font-bold dark:text-white">{selectedService?.title}</span>
              </div>
              <div className="flex justify-between mb-2 text-slate-600 dark:text-slate-300">
                  <span>Date & Time</span>
                  <span className="font-bold dark:text-white">{selectedDate}th at {selectedTime}</span>
              </div>
              <div className="flex justify-between pt-4 border-t dark:border-slate-700 mt-4 text-lg font-bold text-primary dark:text-secondary">
                  <span>Total to Pay</span>
                  <span>£{selectedService?.price}</span>
              </div>
          </div>

          <div className="bg-gray-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="text-primary" />
                  <h3 className="text-xl font-serif dark:text-white">Payment Method</h3>
              </div>
              
              {/* Fake Stripe Elements Form */}
              <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Number</label>
                      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded p-3 flex items-center">
                        <CreditCard className="w-4 h-4 text-slate-400 mr-2" />
                        <input type="text" placeholder="4242 4242 4242 4242" className="w-full outline-none text-slate-700 dark:text-white placeholder:text-slate-300 bg-transparent" />
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Expiry</label>
                          <input type="text" placeholder="MM / YY" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded p-3 outline-none text-slate-700 dark:text-white" />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CVC</label>
                          <input type="text" placeholder="123" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded p-3 outline-none text-slate-700 dark:text-white" />
                      </div>
                  </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 mb-6">
                  <Lock className="w-3 h-3" />
                  Payments are secure and encrypted via Stripe.
              </div>

              <Button fullWidth onClick={handlePayment} disabled={isProcessingPayment}>
                  {isProcessingPayment ? 'Processing Payment...' : `Pay £${selectedService?.price}`}
              </Button>
          </div>
      </div>
  );

  const renderSuccess = () => (
      <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif text-primary dark:text-white mb-4">Booking Confirmed!</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">
              We've sent a confirmation email to <span className="font-bold text-slate-900 dark:text-white">{user?.email}</span>. 
              We look forward to seeing you on the {selectedDate}th!
          </p>
          <Button onClick={() => window.location.reload()}>Book Another Service</Button>
      </div>
  );

  if (step === 4 && isSuccess) {
      return (
          <>
            <PageHeader title="Confirmation" />
            <Section>{renderSuccess()}</Section>
          </>
      );
  }

  return (
    <>
      <PageHeader title="Book Your Appointment" subtitle={
          step === 1 ? "Choose a service to get started." :
          step === 2 ? "Select a convenient time." : 
          "Review and pay securely."
      } />
      
      <Section>
        {/* Progress Bar */}
        <div className="flex justify-center mb-12">
            <div className="flex items-center">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-700 text-slate-400'}`}>
                            {num}
                        </div>
                        {num < 3 && <div className={`w-16 h-1 transition-colors ${step > num ? 'bg-primary' : 'bg-gray-200 dark:bg-slate-700'}`} />}
                    </div>
                ))}
            </div>
        </div>

        {step === 1 && renderServiceSelection()}
        
        {step === 2 && (
            <div>
                <button onClick={() => setStep(1)} className="mb-4 text-sm text-slate-500 hover:text-primary underline">← Back to Services</button>
                {renderDateSelection()}
            </div>
        )}

        {step === 3 && (
            <div>
                <button onClick={() => setStep(2)} className="mb-4 text-sm text-slate-500 hover:text-primary underline">← Back to Time Selection</button>
                {!user ? (
                    <div className="max-w-lg mx-auto">
                        <AuthPage allowGuest={true} onAuthSuccess={() => { /* Auth component handles state update, component re-renders with user present */ }} />
                    </div>
                ) : (
                    renderPayment()
                )}
            </div>
        )}
      </Section>
    </>
  );
};