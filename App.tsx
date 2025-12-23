
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
import { BlogPost_TimeAudit } from './pages/BlogPost_TimeAudit';
import { AdminDashboard } from './pages/AdminDashboard';
import { Page } from './types';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Mapping between internal Page enum and URL paths
const PAGE_TO_PATH: Record<Page, string> = {
  [Page.LANDING]: '/',
  [Page.SERVICES]: '/services',
  [Page.SERVICE_AREA]: '/service-areas',
  [Page.ABOUT]: '/about',
  [Page.LOGIN]: '/login',
  [Page.BOOKING]: '/booking',
  [Page.CONTACT]: '/contact',
  [Page.BLOG]: '/blog',
  [Page.BLOG_POST_TIME_AUDIT]: '/blog/30-minute-wash-day-routine-for-afro-hair',
  [Page.ADMIN]: '/admin'
};

const PATH_TO_PAGE: Record<string, Page> = Object.entries(PAGE_TO_PATH).reduce(
  (acc, [page, path]) => ({ ...acc, [path]: page as Page }),
  {} as Record<string, Page>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);

  // Helper to normalize paths for lookup (removes trailing slash except for root)
  const normalizePath = (path: string) => {
    if (path === '/') return '/';
    return path.endsWith('/') ? path.slice(0, -1) : path;
  };

  // Initialize page based on current URL path
  useEffect(() => {
    const path = normalizePath(window.location.pathname);
    const initialPage = PATH_TO_PAGE[path] || Page.LANDING;
    setCurrentPage(initialPage);

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const newPath = normalizePath(window.location.pathname);
      setCurrentPage(PATH_TO_PAGE[newPath] || Page.LANDING);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Simulate initial resource loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Custom navigation function that updates both state and URL
  const navigate = (page: Page) => {
    const path = PAGE_TO_PATH[page] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.LANDING:
        return <LandingPage onNavigate={navigate} />;
      case Page.SERVICES:
        return <ServicesPage onNavigate={navigate} />;
      case Page.SERVICE_AREA:
        return <ServiceAreaPage />;
      case Page.ABOUT:
        return <AboutPage />;
      case Page.LOGIN:
        return <AuthPage onAuthSuccess={() => navigate(Page.ADMIN)} />;
      case Page.BOOKING:
        return <BookingPage />;
      case Page.CONTACT:
        return <ContactPage />;
      case Page.BLOG:
        return <BlogPage onNavigate={navigate} />;
      case Page.BLOG_POST_TIME_AUDIT:
        return <BlogPost_TimeAudit onNavigate={navigate} />;
      case Page.ADMIN:
        return <AdminDashboard onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="preloader" />}
        </AnimatePresence>

        {!isLoading && (
          <Layout currentPage={currentPage} onNavigate={navigate}>
            {renderPage()}
          </Layout>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
