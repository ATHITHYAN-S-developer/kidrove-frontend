import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });
    setLoading(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store user in localStorage
        localStorage.setItem('kidrove_user', JSON.stringify(data.data));
        setStatus({ type: 'success', message: data.message });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Login failed. Please check your credentials.'
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not connect to the server. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-cyan-50/30 to-indigo-50/30 px-4 py-16">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
        className="relative w-full max-w-md z-10"
      >
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl p-8 sm:p-10">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black tracking-tight">
                <span className="text-rose-500">K</span>
                <span className="text-amber-500">i</span>
                <span className="text-emerald-500">d</span>
                <span className="text-cyan-500">r</span>
                <span className="text-indigo-500">o</span>
                <span className="text-pink-500">v</span>
                <span className="text-violet-500">e</span>
              </span>
            </Link>
            <h1 className="text-2xl font-black text-slate-800 mt-4 tracking-tight">Welcome Back!</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-800 shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-12 py-3.5 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-800 shadow-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Status Message */}
            <AnimatePresence mode="wait">
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl flex items-start gap-3 border ${
                    status.type === 'success'
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                      : 'bg-rose-50 border-rose-100 text-rose-800'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed">{status.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-cyan-600 hover:text-cyan-700 font-extrabold transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs font-bold text-slate-400 hover:text-cyan-500 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
