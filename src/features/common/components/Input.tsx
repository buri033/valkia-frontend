import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs uppercase tracking-wider font-semibold text-cafe-oscuro/80"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-2.5 bg-white border text-cafe-oscuro font-sans text-sm rounded-sm transition-all duration-200 outline-none ${
            error
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-cafe-oscuro/20 focus:border-oliva focus:ring-1 focus:ring-oliva'
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-600 font-medium transition-opacity duration-150">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="text-xs text-cafe-oscuro/60">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
