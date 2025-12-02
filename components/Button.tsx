
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
  const baseStyles = "px-8 py-3.5 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide uppercase active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-800 text-white hover:to-primary hover:shadow-lg border-2 border-transparent",
    secondary: "bg-secondary text-white hover:bg-amber-600 hover:shadow-lg border-2 border-transparent",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-primary",
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
