
import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';
import { Info, Lock, User as UserIcon, ShieldCheck } from 'lucide-react';

interface AuthPageProps {
    onAuthSuccess?: () => void;
    allowGuest?: boolean;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, allowGuest = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const { signIn, signUp, continueAsGuest, user, isDemoMode } = useAuth();
  
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      fullName: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If user is already logged in (and not a guest), redirect immediately
  useEffect(() => {
    if (user && !user.is_guest && onAuthSuccess) {
      onAuthSuccess();
    }
  }, [user, onAuthSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        if (isGuestMode) {
            continueAsGuest(formData.email, formData.fullName);
        } else if (isLogin) {
            await signIn(formData.email, formData.password);
        } else {
            await signUp(formData.email, formData.password, formData.fullName);
        }
        
        if (onAuthSuccess) {
            onAuthSuccess();
        }
      } catch (err: any) {
        setError(err.message || "An error occurred during authentication.");
      } finally {
        setLoading(false);
      }
  };

  const handleDemoLogin = async () => {
    setFormData({ email: 'admin@afrohairlux.com', password: 'demo-password-123', fullName: 'Salon Owner' });
    setIsLogin(true);
    // Give it a tiny delay for visual feedback
    setTimeout(() => {
        const form = document.getElementById('auth-form') as HTMLFormElement;
        if (form) form.requestSubmit();
    }, 100);
  };

  return (
    <Section className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 dark:border-slate-700 transition-all duration-300 relative overflow-hidden">
        {isDemoMode && (
            <div className="absolute top-0 left-0 w-full bg-secondary/10 px-4 py-2 flex items-center gap-2 border-b border-secondary/20">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Demo Environment Active</span>
            </div>
        )}

        <div className="text-center mb-8 mt-4">
            <h2 className="text-3xl font-serif text-primary dark:text-white mb-2">
                {isGuestMode ? 'Guest Checkout' : (isLogin ? 'Salon Owner Login' : 'Create Owner Account')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
                {isGuestMode 
                    ? 'Enter your details to proceed with booking.' 
                    : 'Access your growth engine and salon metrics.'}
            </p>
        </div>

        {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-3">
                <Info className="w-4 h-4 shrink-0" />
                {error}
            </div>
        )}

        <form id="auth-form" className="space-y-4" onSubmit={handleSubmit}>
            {(!isLogin || isGuestMode) && (
                <div className="relative">
                    <UserIcon className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        name="fullName"
                        placeholder="Full Name" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full pl-12 p-4 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:text-white" 
                        required
                    />
                </div>
            )}
            <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:text-white" 
                required
            />
            {!isGuestMode && (
                <div className="relative">
                    <Lock className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full pl-12 p-4 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:text-white" 
                        required
                    />
                </div>
            )}
            
            <Button fullWidth className="mt-4" disabled={loading}>
                {loading ? 'Processing...' : (isGuestMode ? 'Continue' : (isLogin ? 'Log In to Portal' : 'Register Salon'))}
            </Button>
        </form>

        {isDemoMode && !isGuestMode && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest mb-4">Development Access</p>
                <button 
                    onClick={handleDemoLogin}
                    className="w-full py-3 bg-secondary/5 hover:bg-secondary/10 text-secondary rounded-lg border border-secondary/20 text-xs font-bold uppercase tracking-widest transition-all"
                >
                    Try Demo Login
                </button>
            </div>
        )}

        <div className="mt-6 text-center space-y-4">
            {!isGuestMode && (
                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-slate-500 hover:text-primary hover:underline dark:text-slate-400 dark:hover:text-secondary"
                >
                    {isLogin ? "New salon owner? Register here" : "Already registered? Log in"}
                </button>
            )}
            
            {allowGuest && !isGuestMode && (
                <button 
                    onClick={() => setIsGuestMode(true)}
                    className="block w-full text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                    Continue without an account
                </button>
            )}

            {isGuestMode && (
                <button 
                    onClick={() => { setIsGuestMode(false); setIsLogin(true); }}
                    className="block w-full text-sm text-slate-500 hover:text-primary hover:underline dark:text-slate-400"
                >
                    Return to Login
                </button>
            )}
        </div>
      </div>
    </Section>
  );
};
