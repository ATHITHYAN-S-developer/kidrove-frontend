import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Search, ArrowLeft, ArrowRight, SlidersHorizontal, AlertCircle } from 'lucide-react';

interface ActivitySummary {
  id: string;
  title: string;
  location: string;
  emoji: string;
  image: string;
  category: string;
  rating: number;
  ageGroup: string;
  price: string;
  duration: string;
  schedule: string;
  description: string;
}

export const ActivitiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activities, setActivities] = useState<ActivitySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const s = searchParams.get('search');
    if (s !== null) {
      setSearchTerm(s);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', name: 'All Activities', emoji: '🌟' },
    { id: 'venues', name: 'Venues', emoji: '🛍️' },
    { id: 'nature', name: 'Nature & Parks', emoji: '🦩' },
    { id: 'culture', name: 'Heritage & Culture', emoji: '🕌' },
    { id: 'stem', name: 'STEM Workshops', emoji: '🤖' }
  ];

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      setError('');
      
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      try {
        const catParam = activeCategory !== 'all' ? `?category=${activeCategory}` : '';
        const response = await fetch(`${API_BASE_URL}/api/activities${catParam}`);
        const data = await response.json();
        
        if (response.ok) {
          setActivities(data.data);
        } else {
          setError(data.message || 'Failed to fetch activities.');
        }
      } catch {
        setError('Could not connect to the server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    
    // Sync category param in URL
    if (activeCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', activeCategory);
    }
    setSearchParams(searchParams);
  }, [activeCategory]);

  // Frontend filtering by search term
  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 relative pb-24">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-tr from-cyan-100/20 to-indigo-100/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <section className="pt-24 pb-10 px-6 sm:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-cyan-500 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">
              Explore Kidrove <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500 bg-clip-text text-transparent">Activities</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-xl">
              Discover amazing weekend family excursions, educational heritage tours, and summer STEM workshops for kids.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search activities or cities..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-800 shadow-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories Horizontal Tabs */}
      <section className="px-6 sm:px-16 lg:px-24 mb-10">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto no-scrollbar pb-3 py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold shadow-sm transition-all border shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Grid listing */}
      <section className="px-6 sm:px-16 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            /* Skeleton Loading States */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-3xl overflow-hidden aspect-[4/5] animate-pulse flex flex-col justify-between p-6">
                  <div className="w-full h-1/2 bg-slate-200 rounded-2xl mb-4" />
                  <div className="space-y-3">
                    <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                    <div className="h-4 bg-slate-200 rounded-md w-1/2" />
                    <div className="h-4 bg-slate-200 rounded-md w-5/6" />
                  </div>
                  <div className="h-10 bg-slate-200 rounded-xl mt-4" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-rose-50 border border-rose-100 text-rose-800 p-8 rounded-3xl text-center max-w-xl mx-auto">
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="font-extrabold text-lg">Failed to Load Content</h3>
              <p className="text-sm font-medium mt-1">{error}</p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center max-w-xl mx-auto shadow-sm">
              <SlidersHorizontal className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="font-extrabold text-lg text-slate-800">No activities found</h3>
              <p className="text-sm text-slate-500 font-medium mt-1">
                We couldn't find any activities matching "{searchTerm}". Try clearing search or selecting another category.
              </p>
            </div>
          ) : (
            /* List of activities */
            <motion.div 
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredActivities.map((act) => (
                  <motion.div
                    layout
                    key={act.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left group"
                  >
                    {/* Visual Hero */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={act.image}
                        alt={act.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5">
                        <span className="text-sm leading-none">{act.emoji}</span>
                        <span className="capitalize text-slate-700">{act.category}</span>
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                      <div className="space-y-2">
                        {/* Location and rating */}
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                            {act.location}
                          </span>
                          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg border border-amber-100">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {act.rating}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-black text-slate-800 group-hover:text-cyan-600 transition-colors leading-tight">
                          {act.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                          {act.description}
                        </p>
                      </div>

                      {/* Specs and action */}
                      <div className="border-t border-slate-100 pt-4 mt-auto">
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase block leading-none">Age Group</span>
                            <span className="text-xs text-slate-700 font-bold mt-1 block">{act.ageGroup}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase block leading-none">Price</span>
                            <span className="text-sm text-cyan-600 font-black mt-1 block">{act.price}</span>
                          </div>
                        </div>

                        <Link
                          to={`/activities/${act.id}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all duration-300"
                        >
                          <span>View Full Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
