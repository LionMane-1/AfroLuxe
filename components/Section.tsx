import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'dark' | 'primary';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  background = 'white' 
}) => {
  const bgColors = {
    white: 'bg-white dark:bg-slate-950',
    light: 'bg-gray-50 dark:bg-slate-900',
    dark: 'bg-slate-900 text-white dark:bg-black',
    primary: 'bg-primary text-white dark:bg-blue-950'
  };

  return (
    <section 
      id={id}
      className={`py-20 md:py-24 px-6 w-full transition-colors duration-300 ${bgColors[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
};

export const PageHeader: React.FC<{ title: string, subtitle?: string }> = ({ title, subtitle }) => (
    <div className="bg-primary text-white py-20 md:py-28 px-6 text-center dark:bg-blue-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">{title}</h1>
            {subtitle && <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
        </div>
    </div>
);