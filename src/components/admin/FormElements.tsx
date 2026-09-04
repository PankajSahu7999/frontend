import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; helperText?: string }>(
  ({ label, error, helperText, className = '', value = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">{label}</label>}
        <input
          ref={ref}
          value={value ?? ''}
          className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 transition-all shadow-sm focus:outline-none focus:ring-2 focus:bg-white ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
              : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 hover:border-slate-300'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">{label}</label>}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 transition-all shadow-sm focus:outline-none focus:ring-2 focus:bg-white ${
            error 
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
              : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 hover:border-slate-300'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string; placeholder?: string; options: { value: string, label: string }[] }>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">{label}</label>}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm transition-all shadow-sm focus:outline-none focus:ring-2 appearance-none focus:bg-white ${
              props.value === '' ? 'text-slate-400' : 'text-slate-900'
            } ${
              error 
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 hover:border-slate-300'
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>{placeholder}</option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export const Toggle = React.forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string; error?: string }>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-4 flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            ref={ref}
            className="sr-only peer"
            {...props}
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
        {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Toggle.displayName = 'Toggle';

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger', isLoading?: boolean }>(
  ({ variant = 'primary', isLoading, children, className = '', disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500/30 shadow-md shadow-indigo-100',
      secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500/30 shadow-md shadow-rose-100',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`px-5 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:ring-4 transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-b border-slate-100 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold text-slate-900 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);
