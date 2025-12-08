
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Preloader } from './components/Preloader';
import { LandingPage } from './pages/LandingPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceAreaPage } from './pages/ServiceAreaPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { Page } from './types';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);

  useEffect(() => {
    // Simulate initial resource loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.LANDING:
        return <LandingPage onNavigate={setCurrentPage} />;
      case Page.SERVICES:
        return <ServicesPage onNavigate={setCurrentPage} />;
      case Page.SERVICE_AREA:
        return <ServiceAreaPage />;
      case Page.ABOUT:
        return <AboutPage />;
      case Page.LOGIN:
        return <AuthPage onAuthSuccess={() => setCurrentPage(Page.LANDING)} />;
      case Page.BOOKING:
        return <BookingPage />;
      case Page.CONTACT:
        return <ContactPage />;
      case Page.BLOG:
        return <BlogPage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <AnimatePresence>
          {isLoading && <Preloader />}
        </AnimatePresence>

        {!isLoading && (
          <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
            {renderPage()}
          </Layout>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
