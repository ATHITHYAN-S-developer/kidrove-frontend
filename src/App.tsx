import { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, User, X, Mail } from 'lucide-react';

import { SummerCampaign } from './components/SummerCampaign';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Check login state on mount and location changes
  useEffect(() => {
    const storedUser = localStorage.getItem('kidrove_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  // Dynamic header height measurement for sticky offset
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };
    
    const timer = setTimeout(updateHeaderHeight, 50);
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [showBanner, location.pathname]);

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterCity, setNewsletterCity] = useState('');
  const [newsletterAge, setNewsletterAge] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterName.trim()) {
      alert('Email and Name are required.');
      return;
    }
    setNewsletterLoading(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: newsletterEmail,
          name: newsletterName,
          city: newsletterCity,
          ageOfChildren: newsletterAge
        })
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterSubscribed(true);
        setNewsletterEmail('');
        setNewsletterName('');
        setNewsletterCity('');
        setNewsletterAge('');
      } else {
        alert(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      alert('Could not connect to the subscription server. Please try again later.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Smooth scroll handler with cross-page routing support
  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kidrove_user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-200 font-sans flex flex-col justify-between">
      
      {/* Sticky Top Bar (Banner + Header) */}
      <div ref={headerRef} className="sticky top-0 z-[100] w-full">
        {/* 1. Kidrove-style Top Notification Banner */}
        {showBanner && (
          <div className="bg-[#f97316] text-white py-3.5 px-4 relative flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-xs sm:text-sm font-medium z-[110] transition-all duration-300 shadow-sm">
            <span className="flex items-center gap-1.5">
              <span className="text-lg">🌞</span>
              <strong>KIDROVE SUMMER 2026 — Now Open!</strong>
            </span>
            <span className="opacity-95 font-semibold">List your summer camp, kids activity. Limited slots — early partners get priority placement.</span>
            <Link 
              to="/summer-2026"
              className="bg-[#111827] text-[#facc15] font-black px-4 py-1.5 rounded-full text-xs hover:bg-[#1f2937] hover:scale-105 active:scale-95 transition-all ml-2 cursor-pointer shadow-md inline-block"
            >
              View Summer Packages &gt;
            </Link>
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1 cursor-pointer"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2. Kidrove-style Header / Navbar */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
            
            {/* Logo with playful multi-colored text */}
            <Link 
              to="/" 
              className="flex items-center gap-1.5 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-2xl font-black tracking-tight">
                <span className="text-rose-500">K</span>
                <span className="text-amber-500">i</span>
                <span className="text-emerald-500">d</span>
                <span className="text-cyan-500">r</span>
                <span className="text-indigo-500">o</span>
                <span className="text-pink-500">v</span>
                <span className="text-violet-500">e</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <Link 
                to="/activities"
                className="hover:text-cyan-500 transition-colors cursor-pointer"
              >
                Find Activities
              </Link>
              <button 
                onClick={() => scrollToSection('blogs-container')}
                className="hover:text-cyan-500 transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('layer-container')}
                className="hover:text-cyan-500 transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Kidrove Go
              </button>
              <button 
                onClick={() => scrollToSection('faq-container')}
                className="hover:text-cyan-500 transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                FAQ
              </button>
              <Link 
                to="/contact"
                className="hover:text-cyan-500 transition-colors cursor-pointer"
              >
                Get In Touch
              </Link>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Icon */}
              <Link 
                to="/activities"
                className="w-9 h-9 rounded-full bg-[#f43f5e] hover:bg-[#e11d48] text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
              >
                <Search className="w-4 h-4 text-white" />
              </Link>

              {/* Heart Icon */}
              <Link 
                to="/contact"
                className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-pink-500 transition-all active:scale-95 cursor-pointer"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Authentication Controls */}
              {user ? (
                <div className="flex items-center gap-2.5">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs font-black text-slate-800 leading-none">Hi, {user.name}</span>
                    <span className="text-[9px] text-emerald-500 font-extrabold mt-1 tracking-wider uppercase">Logged In</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 px-4 py-2 rounded-full text-xs font-extrabold shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="bg-white hover:bg-teal-50/50 border border-teal-500 text-teal-600 px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-all hover:scale-103 active:scale-97 cursor-pointer"
                >
                  <User className="w-4 h-4 text-teal-500 fill-teal-500" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Pages Container with React Router routing */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/summer-2026" element={<SummerCampaign />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/:id" element={<ActivityDetailPage />} />
        </Routes>
      </div>

      {/* Kidrove Premium White Footer */}
      <footer className="bg-white text-slate-600 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-left">
            
            {/* Column 1: Branding & Socials */}
            <div className="md:col-span-3 flex flex-col items-start gap-4">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-rose-500">K</span>
                <span className="text-amber-500">i</span>
                <span className="text-emerald-500">d</span>
                <span className="text-cyan-500">r</span>
                <span className="text-indigo-500">o</span>
                <span className="text-pink-500">v</span>
                <span className="text-violet-500">e</span>
              </span>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Discover and book the best activities for your kids in the UAE.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-2.5 mt-2">
                {[
                  { 
                    id: 'facebook', 
                    icon: (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/>
                      </svg>
                    ) 
                  },
                  { 
                    id: 'twitter', 
                    icon: (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ) 
                  },
                  { 
                    id: 'instagram', 
                    icon: (
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                      </svg>
                    ) 
                  },
                  { 
                    id: 'youtube', 
                    icon: (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ) 
                  },
                  { 
                    id: 'linkedin', 
                    icon: (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    ) 
                  }
                ].map((social) => (
                  <a 
                    key={social.id}
                    href="#"
                    className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label={social.id}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links, Programs, Teach */}
            <div className="md:col-span-3 flex flex-col gap-6">
              
              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm font-semibold text-slate-500">
                  <li><Link to="/about" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors bg-transparent border-none p-0 cursor-pointer">About Us</Link></li>
                  <li><button onClick={() => scrollToSection('blogs-container')} className="hover:text-cyan-500 transition-colors bg-transparent border-none p-0 cursor-pointer">Blog</button></li>
                  <li><Link to="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors bg-transparent border-none p-0 cursor-pointer">Contact Us</Link></li>
                  <li><button onClick={() => scrollToSection('faq-container')} className="hover:text-cyan-500 transition-colors bg-transparent border-none p-0 cursor-pointer">FAQs</button></li>
                  <li><Link to="/summer-2026" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors bg-transparent border-none p-0 cursor-pointer">Partner with Us</Link></li>
                </ul>
              </div>

              {/* Programs */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3">Programs</h4>
                <ul className="space-y-2 text-sm font-semibold text-slate-500">
                  <li><Link to="/activities" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">Student Program</Link></li>
                  <li><Link to="/summer-2026" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">Partnerships</Link></li>
                </ul>
              </div>

              {/* Teach */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3">Teach</h4>
                <ul className="space-y-2 text-sm font-semibold text-slate-500">
                  <li><Link to="/contact?subject=Teach%20as%20Organization" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">Teach as Organization</Link></li>
                  <li><Link to="/contact?subject=Teach%20as%20Individual" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">Teach as Individual</Link></li>
                </ul>
              </div>

            </div>

            {/* Column 3: Categories */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3">Categories</h4>
              <ul className="space-y-2 text-sm font-semibold text-slate-500">
                <li><Link to="/activities?category=venues" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">Afterschool Activities</Link></li>
                <li><Link to="/activities?category=culture" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">Arts and Crafts</Link></li>
                <li><Link to="/activities?category=venues" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">Baby & Toddler</Link></li>
                <li><Link to="/activities" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">Birthday Deals</Link></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-1">Newsletter</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Subscribe to our newsletter for updates on new activities and promotions.
              </p>
              
              {newsletterSubscribed ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                  <p className="text-xs font-extrabold text-emerald-800">🎉 Subscribed successfully!</p>
                  <p className="text-[10px] text-emerald-600 font-medium mt-1">Thank you for joining our community.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubscribe} className="flex flex-col gap-2 mt-2 w-full">
                  
                  {/* Email field */}
                  <div className="relative w-full">
                    <input 
                      type="email" 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 text-slate-800 pr-10"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Name field */}
                  <input 
                    type="text" 
                    required
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    placeholder="Your name"
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 text-slate-800"
                  />

                  {/* City field */}
                  <input 
                    type="text" 
                    value={newsletterCity}
                    onChange={(e) => setNewsletterCity(e.target.value)}
                    placeholder="City (optional)"
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 text-slate-800"
                  />

                  {/* Age field */}
                  <input 
                    type="text" 
                    value={newsletterAge}
                    onChange={(e) => setNewsletterAge(e.target.value)}
                    placeholder="Age of children (optional)"
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 text-slate-800"
                  />

                  {/* Subscribe Button */}
                  <button 
                    type="submit"
                    disabled={newsletterLoading}
                    className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 text-white font-extrabold text-xs py-3 rounded-xl transition-all active:scale-98 shadow-sm cursor-pointer mt-1 border-none"
                  >
                    {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}

              <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-2">
                By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
              </p>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
            <p>© 2026 Kidrove. All rights reserved. Playful Activities & Summer Campaigns.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cyan-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
