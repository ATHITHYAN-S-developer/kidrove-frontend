import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (formData.message.length < 10) {
      setStatus({ type: 'error', message: 'Message must be at least 10 characters long.' });
      return;
    }

    setLoading(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please check your inputs.'
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
    <div className="min-h-screen bg-slate-50 overflow-hidden relative pb-20">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <section className="pt-24 pb-12 px-6 sm:px-16 lg:px-24 text-center">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-cyan-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight">
            Get in Touch with Us
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl mx-auto mt-4 leading-relaxed">
            Have questions about our upcoming summer workshops or booking e-tickets? Drop us a message, and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 sm:px-16 lg:px-24 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Contact details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-lg flex-1 space-y-8">
              <h2 className="text-2xl font-black text-slate-800">Contact Information</h2>
              
              {/* Phone info */}
              <div className="flex gap-4 items-start text-left">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 text-cyan-600 shadow-sm">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">Call Us</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">+971 4 123 4567</p>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Mon-Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* Email info */}
              <div className="flex gap-4 items-start text-left">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 text-rose-600 shadow-sm">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">Email Us</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">support@kidrove.com</p>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">We reply within 24 hours</p>
                </div>
              </div>

              {/* Location info */}
              <div className="flex gap-4 items-start text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600 shadow-sm">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">Our Office</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                    Silicon Oasis, Tech Hub 1<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="bg-slate-200 border border-slate-300/60 rounded-3xl overflow-hidden aspect-video relative shadow-md">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14450.407238241477!2d55.3789069151528!3d25.115372336338872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f65cd68f237ef%3A0xc3b8364de068dc44!2sDubai%20Silicon%20Oasis%20-%20Dubai!5e0!3m2!1sen!2sae!4v1718818818818!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-lg text-left h-full flex flex-col justify-center">
              <h2 className="text-2xl font-black text-slate-800 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Grid name & email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="John Doe"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-800 shadow-sm transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="you@example.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-800 shadow-sm transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="How can we help you?"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-800 shadow-sm transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Tell us details about your inquiry (minimum 10 characters)..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-800 shadow-sm transition-all resize-none"
                  />
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
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
