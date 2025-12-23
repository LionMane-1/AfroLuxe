
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: (email: string, name: string) => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if we are using the placeholder Supabase URL
  const isDemoMode = !process.env.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL.includes('xyzcompany');

  useEffect(() => {
    // If in demo mode, check local storage for a fake session
    if (isDemoMode) {
      const storedUser = localStorage.getItem('demo_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
      return;
    }

    // Real Supabase Session Check
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
           setUser({ 
             id: session.user.id, 
             email: session.user.email!,
             full_name: session.user.user_metadata?.full_name 
           });
        }
      } catch (e) {
        console.debug("Auth check skipped or failed");
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({ 
            id: session.user.id, 
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name 
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isDemoMode]);

  const signIn = async (email: string, pass: string) => {
    if (isDemoMode) {
      // Simulate success for demo purposes
      if (email.includes('@') && pass.length >= 6) {
        const demoUser = { id: 'demo-admin-123', email, full_name: 'Salon Owner (Demo)', is_guest: false };
        setUser(demoUser);
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        return;
      }
      throw new Error("Demo Login: Enter a valid email and at least 6 characters for the password.");
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
  };

  const signUp = async (email: string, pass: string, name: string) => {
    if (isDemoMode) {
      const demoUser = { id: `demo-${Date.now()}`, email, full_name: name, is_guest: false };
      setUser(demoUser);
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { full_name: name },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (isDemoMode) {
      setUser(null);
      localStorage.removeItem('demo_user');
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  const continueAsGuest = (email: string, name: string) => {
    const guestUser = {
        id: `guest-${Date.now()}`,
        email,
        full_name: name,
        is_guest: true
    };
    setUser(guestUser);
    // Guest sessions aren't typically persisted in localStorage for simplicity here
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, continueAsGuest, isDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
