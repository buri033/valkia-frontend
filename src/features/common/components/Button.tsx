import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-200 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-crema text-cafe-oscuro hover:bg-arena',
    dark: 'bg-cafe-oscuro text-blanco hover:bg-cafe-medio',
    outline: 'bg-transparent text-cafe-oscuro border border-cafe-oscuro/30 hover:border-cafe-oscuro',
    danger: 'bg-red-700 text-white hover:bg-red-800',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
