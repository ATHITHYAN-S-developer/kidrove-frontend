import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Clock, DollarSign, Users, CheckCircle2, ShieldCheck, HeartHandshake, Compass, ArrowLeft, Send } from 'lucide-react';

interface ActivityDetail {
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
  highlights: string[];
  whatKidsWillDo: string;
  facilities: string[];
  nearbyAttractions: string[];
}

export const ActivityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setActivity(data.data);
        } else {
          setError(data.message || 'Activity not found.');
        }
      } catch {
        setError('Could not connect to the server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading activity details...</span>
        </div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 max-w-md shadow-sm">
          <span className="text-5xl mb-4 block">🔍</span>
          <h2 className="text-2xl font-black text-slate-800">Activity Not Found</h2>
          <p className="text-sm text-slate-500 font-medium mt-2 mb-6">
            The activity you are looking for might have been moved or does not exist.
          </p>
          <Link
            to="/activities"
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Activities</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative pb-24">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-cyan-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-100/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 px-6 sm:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link
            to="/activities"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-cyan-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
            <span>Back to Activities</span>
          </Link>

          {/* Visual card */}
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 bg-slate-200">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-10 text-white text-left">
              <div>
                <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 w-max mb-4 shadow-sm select-none">
                  <span className="text-sm leading-none">{activity.emoji}</span>
                  <span className="capitalize">{activity.category}</span>
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-shadow-md">
                  {activity.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs sm:text-sm font-semibold text-white/95">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    {activity.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {activity.rating} Rating
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-rose-400" />
                    {activity.ageGroup}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="px-6 sm:px-16 lg:px-24 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Information & Detailing (8 cols) */}
          <div className="lg:col-span-8 space-y-10 text-left">
            
            {/* Description */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-800 mb-4">About the Experience</h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-cyan-500" />
                <span>Key Highlights</span>
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {activity.highlights.map((highlight, index) => (
                  <li key={index} className="flex gap-3 items-start text-sm text-slate-600 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Kids Will Do */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <HeartHandshake className="w-6 h-6 text-rose-500" />
                <span>What Kids Will Do</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                {activity.whatKidsWillDo}
              </p>
            </div>

            {/* Facilities & Nearby Attractions */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Facilities */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-800 mb-4">Available Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {activity.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Attractions */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-500" />
                  <span>Nearby Attractions</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.nearbyAttractions.map((att, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600"
                    >
                      {att}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Quick Booking / Enquiry Sidebar (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-md text-left">
              <h3 className="text-lg font-black text-slate-800 mb-6">Quick Details</h3>

              {/* Specs Stack */}
              <div className="space-y-5 mb-8">
                {/* Schedule */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 bg-cyan-50 border border-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 shrink-0">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block leading-none">Schedule</span>
                    <span className="text-xs sm:text-sm text-slate-700 font-bold mt-1.5 block">{activity.schedule}</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center text-rose-600 shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block leading-none">Duration</span>
                    <span className="text-xs sm:text-sm text-slate-700 font-bold mt-1.5 block">{activity.duration}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                    <DollarSign className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block leading-none">Pricing</span>
                    <span className="text-base sm:text-lg text-cyan-600 font-black mt-1 block">{activity.price}</span>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <Link
                to={`/contact?subject=Inquiry regarding ${encodeURIComponent(activity.title)}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
              >
                <span>Enquire Now</span>
                <Send className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-slate-400 font-bold text-center mt-3 leading-relaxed">
                Clicking enquire will direct you to our contact page with the pre-filled subject line.
              </p>
            </div>

            {/* Safety policy / Guarantee card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 text-white text-left">
              <h4 className="font-extrabold text-sm mb-2 text-cyan-400">Kidrove Guarantee</h4>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                All curated experiences are family-safe, vetted for educational value, and run by qualified mentors or certified operators.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
