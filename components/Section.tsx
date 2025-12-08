import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'dark' | 'primary' | 'luxury';
  pattern?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  background = 'white',
  pattern = false
}) => {
  const bgColors = {
    white: 'bg-white dark:bg-slate-950',
    light: 'bg-subtle/40 dark:bg-slate-900', // Updated from slate-50 to subtle blue tint
    dark: 'bg-slate-900 text-white dark:bg-black',
    primary: 'bg-primary text-white dark:bg-blue-950',
    luxury: 'bg-slate-900 text-white relative overflow-hidden'
  };

  return (
    <section 
      id={id}
      className={`py-24 md:py-32 px-6 w-full transition-colors duration-500 relative ${bgColors[background]} ${className}`}
    >
      {/* Optional decorative background elements */}
      {background === 'luxury' && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-800/20 via-slate-900 to-slate-900 z-0"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
        </>
      )}

      {pattern && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
             style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {children}
      </div>
    </section>
  );
};

export const PageHeader: React.FC<{ title: string, subtitle?: string }> = ({ title, subtitle }) => (
    <div className="bg-slate-900 text-white py-24 md:py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">{title}</h1>
            {subtitle && <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">{subtitle}</p>}
        </div>
    </div>
);