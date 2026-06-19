import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    city: '',
    age: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!validate()) return;

    setLoading(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          city: formData.city,
          ageOfChildren: formData.age
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: '🎉 Subscribed successfully! Thank you for joining our community.'
        });
        setFormData({ email: '', name: '', city: '', age: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'An error occurred during subscription.'
        });
      }
    } catch (error) {
      console.error('API submission error:', error);
      setStatus({
        type: 'error',
        message: 'Could not connect to the subscription server. Storing fallback or please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Form & Heading */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-[#e0f2fe] text-sky-800 mb-4 shadow-sm">
              Stay Updated
            </span>
            
            <h2 className="text-3xl md:text-4.5xl font-black text-slate-800 tracking-tight mb-4">
              The Kidrove Feed
            </h2>
            
            <p className="text-sm md:text-base font-semibold text-slate-500 mb-8 leading-relaxed">
              Join our family and get the latest updates and exclusive deals sent to your inbox!
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter your email..."
                    className={`w-full bg-white border rounded-xl px-5 py-3.5 text-sm font-semibold outline-none focus:border-cyan-500 text-slate-800 shadow-sm transition-all ${
                      errors.email ? 'border-rose-400 focus:ring-1 focus:ring-rose-400' : 'border-slate-200/80 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 mt-1 pl-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Your name"
                    className={`w-full bg-white border rounded-xl px-5 py-3.5 text-sm font-semibold outline-none focus:border-cyan-500 text-slate-800 shadow-sm transition-all ${
                      errors.name ? 'border-rose-400 focus:ring-1 focus:ring-rose-400' : 'border-slate-200/80 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500 mt-1 pl-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* City Field */}
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="City (optional)"
                    className="w-full bg-white border border-slate-200/80 rounded-xl px-5 py-3.5 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-800 shadow-sm transition-all"
                  />
                </div>

                {/* Age Field */}
                <div>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Age of children (optional, e.g., '3')"
                    className="w-full bg-white border border-slate-200/80 rounded-xl px-5 py-3.5 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-800 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Status Message Display */}
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
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">{status.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FBC4CE] hover:bg-[#F2AEB9] text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition-all active:scale-98 disabled:bg-slate-200 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe Now</span>
                    <svg className="w-4 h-4 fill-white transform rotate-45" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-4">
              By subscribing, you agree to our <a href="#" className="underline hover:text-cyan-500">Privacy Policy</a> and consent to receive updates from Kidrove.
            </p>
          </div>

          {/* Right Column: Image and Decorative shapes */}
          <div className="lg:col-span-5 flex justify-center items-center relative w-full px-4">
            <div className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3/4]">
              {/* Decorative Purple Circle */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#8b5cf6] opacity-90 z-0" />
              
              {/* Decorative Pink Circle */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-[#ec4899] opacity-90 z-0" />
              
              {/* Main Image */}
              <img 
                src="/assets/kidrove_feed.png" 
                alt="Kids events and updates" 
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-lg border-4 border-white"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
