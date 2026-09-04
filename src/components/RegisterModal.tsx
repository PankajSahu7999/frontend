'use client';

import { useState, useEffect, useRef } from 'react';
import { X, User, Mail, Phone, Globe, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/store/slices/userSlice';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const dispatch = useDispatch();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCountry, setIsFetchingCountry] = useState(false);
  const [error, setError] = useState('');
  const [registeredName, setRegisteredName] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
  });

  // Auto-detect country on open
  useEffect(() => {
    if (isOpen && !formData.country) {
      setIsFetchingCountry(true);
      fetch('https://ipapi.co/json/')
        .then((r) => r.json())
        .then((data) => {
          const countryName = data.country_name || '';
          if (countryName) {
            setFormData((prev) => ({ ...prev, country: countryName }));
          }
        })
        .catch(() => {})
        .finally(() => setIsFetchingCountry(false));
    }
  }, [isOpen]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setError('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        return;
      }

      dispatch(setCurrentUser(data));
      setRegisteredName(data.name || formData.name);
      setStep('success');

      // Auto close after 2.5s
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        background: 'rgba(10, 15, 40, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.5) } to { opacity: 1; transform: scale(1) } }
        @keyframes float { 0%, 100% { transform: translateY(0px) } 50% { transform: translateY(-6px) } }
        @keyframes shimmer { 0% { background-position: -200% center } 100% { background-position: 200% center } }
        .modal-card { animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .success-icon { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .float-avatar { animation: float 3s ease-in-out infinite; }
        .shimmer-btn {
          background-size: 200% auto;
          background-image: linear-gradient(90deg, #CDDCFB 0%, #588CF3 40%, #3B6FE8 60%, #CDDCFB 100%);
          animation: shimmer 2.5s linear infinite;
        }
        .shimmer-btn:hover { opacity: 0.92; }
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(88,140,243,0.3);
          border-radius: 12px;
          padding: 11px 14px 11px 40px;
          font-size: 14px;
          color: #e2e8f0;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .input-field::placeholder { color: rgba(148,163,184,0.6); }
        .input-field:focus { border-color: #588CF3; background: rgba(88,140,243,0.1); }
        .input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(148,163,184,0.7); pointer-events: none; }
      `}</style>

      <div
        className="modal-card relative w-full max-w-md"
        style={{
          background: 'linear-gradient(145deg, #0f1729 0%, #141e35 50%, #0f1729 100%)',
          border: '1px solid rgba(88,140,243,0.25)',
          borderRadius: '24px',
          boxShadow: '0 0 60px rgba(46,104,251,0.2), 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Glow accent top */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(88,140,243,0.8), transparent)',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <X size={16} />
        </button>

        {step === 'form' ? (
          <div className="p-7">
            {/* Header */}
            <div className="text-center mb-6">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                style={{ background: 'linear-gradient(135deg, #2E68FB22, #588CF344)', border: '1px solid rgba(88,140,243,0.3)' }}
              >
                <Sparkles className="text-[#588CF3]" size={26} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
              <p className="text-sm text-slate-400">Join thousands of casino enthusiasts</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                <div className="relative">
                  <User size={15} className="input-icon" />
                  <input
                    className="input-field"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail size={15} className="input-icon" />
                  <input
                    className="input-field"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Phone (optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Phone <span className="normal-case font-normal text-slate-500">(optional)</span>
                </label>
                <div className="relative">
                  <Phone size={15} className="input-icon" />
                  <input
                    className="input-field"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Country{' '}
                  {isFetchingCountry && <span className="normal-case font-normal text-[#588CF3]">(detecting...)</span>}
                </label>
                <div className="relative">
                  <Globe size={15} className="input-icon" />
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Auto-detected from your IP"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(88,140,243,0.12)', margin: '4px 0' }} />

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="shimmer-btn w-full h-12 rounded-[14px] font-bold text-[#16203A] text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Create My Account
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500 pt-1">
                By registering you agree to our{' '}
                <span className="text-[#588CF3] cursor-pointer hover:underline">Terms of Service</span>
              </p>
            </form>
          </div>
        ) : (
          /* Success State */
          <div className="p-10 text-center">
            <div className="success-icon inline-flex mb-5">
              <CheckCircle size={64} className="text-emerald-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome, {registeredName.split(' ')[0]}! 🎰</h2>
            <p className="text-slate-400 text-sm">Your account has been created successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
}
