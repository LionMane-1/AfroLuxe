
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

  // Safely check for demo mode without crashing if 'process' is undefined
  const getIsDemoMode = () => {
    try {
      const url = (typeof process !== 'undefined' && process.env) ? process.env.REACT_APP_SUPABASE_URL : null;
      return !url || url.includes('xyzcompany');
    } catch {
      return true;
    }
  };

  const isDemoMode = getIsDemoMode();

  useEffect(() => {
    if (isDemoMode) {
      const storedUser = localStorage.getItem('demo_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
      return;
    }

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
        console.debug("Supabase connection skipped in offline/demo mode");
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
      authListener?.subscription?.unsubscribe();
    };
  }, [isDemoMode]);

  const signIn = async (email: string, pass: string) => {
    if (isDemoMode) {
      if (email.includes('@') && pass.length >= 6) {
        const demoUser = { id: 'demo-admin-123', email, full_name: 'Salon Owner (Demo)', is_guest: false };
        setUser(demoUser);
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        return;
      }
      throw new Error("Invalid credentials. Try email: admin@afrohairlux.com and pass: password123");
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
      options: { data: { full_name: name } },
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
    const guestUser = { id: `guest-${Date.now()}`, email, full_name: name, is_guest: true };
    setUser(guestUser);
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
