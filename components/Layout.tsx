
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Menu, X, Scissors, Instagram, Facebook, Twitter, Phone, Sun, Moon, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', page: Page.LANDING },
    { label: 'Services', page: Page.SERVICES },
    { label: 'Our Areas', page: Page.SERVICE_AREA },
    { label: 'About', page: Page.ABOUT },
    { label: 'Contact', page: Page.CONTACT },
  ];

  const handleLinkClick = (e: React.MouseEvent, page: Page) => {
    // Only prevent default if it's a left click without modifiers to allow standard browser behavior (open in new tab)
    if (e.button === 0 && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        onNavigate(page);
        setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-light text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-white/20 dark:border-slate-800 ${
          isScrolled ? 'bg-white/70 dark:bg-slate-950/95 backdrop-blur-md shadow-md py-3' : 'bg-white/50 dark:bg-slate-950/80 backdrop-blur-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate(Page.LANDING)}
          >
            <div className="bg-primary p-2 rounded-full shadow-lg">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-primary tracking-tight dark:text-white">
              AfroLuxe
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium uppercase tracking-wider hover:text-secondary transition-colors ${
                  currentPage === item.page ? 'text-secondary border-b-2 border-secondary' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Animated Phone Number */}
             <motion.a 
                href="tel:+442071234567"
                className="hidden xl:flex items-center gap-3 group mr-2 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
             >
                <div className="relative">
                    <div className="absolute -inset-1 bg-secondary/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div 
                        className="bg-white border border-secondary/20 p-2 rounded-full relative shadow-sm group-hover:border-secondary transition-colors dark:bg-slate-800 dark:border-slate-600"
                        whileHover={{ scale: 1.1 }}
                        animate={{ 
                            boxShadow: ["0 0 0 0px rgba(214, 164, 99, 0.2)", "0 0 0 4px rgba(214, 164, 99, 0)"],
                        }}
                        transition={{ 
                            boxShadow: { duration: 2, repeat: Infinity },
                            scale: { duration: 0.2 }
                        }}
                    >
                         <Phone className="w-4 h-4 text-primary group-hover:text-secondary transition-colors dark:text-secondary" />
                    </motion.div>
                </div>
                <div className="flex flex-col leading-tight">
                    <motion.span 
                        className="text-lg font-serif font-bold text-primary group-hover:text-secondary transition-colors dark:text-secondary"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        020 7123 4567
                    </motion.span>
                </div>
            </motion.a>

            <div className="flex items-center gap-3 ml-2">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-600 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-secondary" />}
                </button>

                <button 
                    onClick={() => onNavigate(Page.LOGIN)}
                    className="text-sm font-semibold text-primary hover:text-secondary transition-colors px-3 py-2 dark:text-slate-200 dark:hover:text-secondary"
                >
                    Log In
                </button>
                <Button 
                    onClick={() => onNavigate(Page.BOOKING)} 
                    variant="primary" 
                    className="!py-2.5 !px-6 !text-xs shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Book Now
                </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-secondary" />}
            </button>
            <button 
                className="text-slate-800 p-2 hover:bg-slate-100 rounded-full transition-colors dark:text-white dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 shadow-lg py-6 px-6 flex flex-col gap-4">
             <a href="tel:+442071234567" className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg mb-2 dark:bg-slate-800">
                <Phone className="w-5 h-5 text-primary dark:text-secondary" />
                <span className="font-serif font-bold text-primary dark:text-white">020 7123 4567</span>
             </a>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm font-medium uppercase tracking-wider py-3 border-b border-slate-5 dark:border-slate-800 dark:text-slate-200"
              >
                {item.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <button onClick={() => { onNavigate(Page.LOGIN); setMobileMenuOpen(false); }} className="text-center py-3 font-semibold text-primary border border-slate-200 rounded dark:text-white dark:border-slate-700">Log In</button>
                <Button onClick={() => { onNavigate(Page.BOOKING); setMobileMenuOpen(false); }} className="w-full">Book Now</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area - Spacing Logic */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer Section 10 */}
      <footer className="bg-primary text-white py-16 mt-auto dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white p-2 rounded-full">
                <Scissors className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-serif font-bold">Afro Hair Lux Marketing</span>
            </div>
            <p className="text-slate-300 max-w-sm leading-relaxed">
              London's premier destination for natural Afro hair care. We specialize in protective styling, treatments, and empowering you to love your crown.
            </p>
            <div className="flex gap-4 mt-6">
                <Instagram className="w-5 h-5 text-secondary hover:text-white cursor-pointer transition-colors"/>
                <Facebook className="w-5 h-5 text-secondary hover:text-white cursor-pointer transition-colors"/>
                <Twitter className="w-5 h-5 text-secondary hover:text-white cursor-pointer transition-colors"/>
                <Linkedin className="w-5 h-5 text-secondary hover:text-white cursor-pointer transition-colors"/>
                <MessageCircle className="w-5 h-5 text-secondary hover:text-white cursor-pointer transition-colors"/>
            </div>
          </div>

          <div>
            <h3 className="text-secondary font-serif text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li><a href="/services" onClick={(e) => handleLinkClick(e, Page.SERVICES)} className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/service-areas" onClick={(e) => handleLinkClick(e, Page.SERVICE_AREA)} className="hover:text-white transition-colors">Service Areas</a></li>
              <li><a href="/about" onClick={(e) => handleLinkClick(e, Page.ABOUT)} className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/booking" onClick={(e) => handleLinkClick(e, Page.BOOKING)} className="hover:text-white transition-colors">Book Appointment</a></li>
              <li><a href="https://afrohairlux.com/blog" onClick={(e) => handleLinkClick(e, Page.BLOG)} className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-secondary font-serif text-lg mb-6">Contact</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>7a Electric Lane</li>
              <li>Brixton</li>
              <li>SW9 8LA</li>
              <li>London</li>
              <li>England</li>
              <li className="pt-2">hello@afroluxe.co.uk</li>
              <li>+44 20 7123 4567</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Afro Hair Lux Marketing. All rights reserved. Built on Aura.build.
        </div>
      </footer>
    </div>
  );
};
