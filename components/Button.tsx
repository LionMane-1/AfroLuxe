import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-4 font-semibold rounded transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2 text-sm tracking-wide uppercase";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-pink-700 hover:shadow-lg border-2 border-transparent",
    secondary: "bg-primary text-white hover:bg-purple-900 border-2 border-transparent",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white dark:text-secondary dark:border-secondary dark:hover:bg-secondary dark:hover:text-white",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};