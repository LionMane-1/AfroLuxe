
import React, { useState } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';

interface AuthPageProps {
    onAuthSuccess?: () => void;
    allowGuest?: boolean;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, allowGuest = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const { signIn, signUp, continueAsGuest } = useAuth();
  
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      fullName: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.type === 'text' && e.target.name !== 'fullName' ? 'email' : e.target.name]: e.target.value });
  };

  return (
    <Section className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 dark:border-slate-700 transition-all duration-300">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-primary dark:text-white mb-2">
                {isGuestMode ? 'Guest Checkout' : (isLogin ? 'Welcome Back' : 'Join AfroLuxe')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
                {isGuestMode 
                    ? 'Enter your details to proceed with booking.' 
                    : 'Manage your appointments and history.'}
            </p>
        </div>

        {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center">
                {error}
            </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
            {(!isLogin || isGuestMode) && (
                <input 
                    type="text" 
                    name="fullName"
                    placeholder="Full Name" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:text-white" 
                    required
                />
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
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:text-white" 
                    required
                />
            )}
            
            <Button fullWidth className="mt-4" disabled={loading}>
                {loading ? 'Processing...' : (isGuestMode ? 'Continue as Guest' : (isLogin ? 'Log In' : 'Create Account'))}
            </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
            {!isGuestMode && (
                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="block w-full text-sm text-slate-500 hover:text-primary hover:underline dark:text-slate-400 dark:hover:text-secondary"
                >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </button>
            )}
            
            {allowGuest && !isGuestMode && (
                <button 
                    onClick={() => setIsGuestMode(true)}
                    className="block w-full text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mt-4"
                >
                    Continue as Guest
                </button>
            )}

            {isGuestMode && (
                <button 
                    onClick={() => { setIsGuestMode(false); setIsLogin(true); }}
                    className="block w-full text-sm text-slate-500 hover:text-primary hover:underline dark:text-slate-400"
                >
                    Back to Login
                </button>
            )}
        </div>
      </div>
    </Section>
  );
};