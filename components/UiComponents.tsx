import React from 'react';
import { PainterStyle } from '../types';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface StyleProps {
  styleData: PainterStyle;
  className?: string;
  children: React.ReactNode;
}

export const StyledCard: React.FC<StyleProps & { onClick?: () => void }> = ({ styleData, className, children, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={clsx(
        "transition-all duration-500 overflow-hidden relative",
        styleData.colors.surface,
        styleData.colors.text,
        styleData.borderRadius,
        styleData.borderWidth,
        styleData.colors.border,
        styleData.shadow,
        styleData.font,
        className
      )}
    >
        {/* Abstract decoration based on style name logic could go here */}
      {children}
    </div>
  );
};

export const StyledButton: React.FC<StyleProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'icon' }> = ({ 
  styleData, className, children, variant = 'primary', ...props 
}) => {
  const baseClasses = "px-4 py-2 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = `${styleData.colors.accent} text-white hover:brightness-110`;
    // Special case for light accents needing dark text
    if (styleData.colors.accent.includes('yellow') || styleData.colors.accent.includes('white')) {
        variantClasses = `${styleData.colors.accent} text-black hover:brightness-95`;
    }
    // Override for specific styles for better contrast
    if (styleData.id === 'mondrian') variantClasses = 'bg-red-600 text-white border-2 border-black';
    if (styleData.id === 'vangogh') variantClasses = 'bg-yellow-400 text-blue-900 border-2 border-yellow-600';
  } else if (variant === 'secondary') {
    variantClasses = `${styleData.colors.secondary} ${styleData.colors.text} hover:brightness-95`;
  } else if (variant === 'icon') {
    variantClasses = "p-2 bg-transparent hover:bg-black/5";
  }

  return (
    <button 
      className={clsx(baseClasses, styleData.font, styleData.borderRadius, variantClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const LoadingOverlay: React.FC<{ visible: boolean, text?: string }> = ({ visible, text }) => {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-inherit">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
      {text && <p className="text-sm font-medium text-blue-900 animate-pulse">{text}</p>}
    </div>
  );
}
