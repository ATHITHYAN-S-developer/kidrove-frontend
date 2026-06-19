import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Target, Heart, Award, ArrowRight, ArrowLeft } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const stats = [
    { value: '5,000+', label: 'Happy Kids' },
    { value: '150+', label: 'STEM Workshops' },
    { value: '25+', label: 'School Partners' },
    { value: '4.9/5', label: 'Average Rating' }
  ];

  const values = [
    {
      icon: <Rocket className="w-6 h-6 text-rose-500" />,
      title: 'Innovation-First',
      description: 'We prepare children for the future by teaching the latest in AI, Robotics, and IoT with hands-on tools.'
    },
    {
      icon: <Target className="w-6 h-6 text-cyan-500" />,
      title: 'Practical Learning',
      description: 'No boring lectures! Every concept is taught through building real working systems and interactive coding.'
    },
    {
      icon: <Heart className="w-6 h-6 text-amber-500" />,
      title: 'Kids Centric',
      description: 'Our curriculum is designed to make learning incredibly fun, safe, and engaging for kids of all ages.'
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-500" />,
      title: 'Excellence',
      description: 'Led by certified engineers and education experts to deliver the highest quality learning experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden relative pb-20">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero / Header Section */}
      <section className="relative pt-24 pb-16 px-6 sm:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-cyan-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight"
          >
            Empowering the Next Generation of <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500 bg-clip-text text-transparent">Creators & Innovators</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-slate-500 font-medium max-w-3xl mx-auto mt-6 leading-relaxed"
          >
            At Kidrove, we bridge the gap between traditional learning and future technology. Through high-quality, practical STEM workshops and curated family activities, we spark curiosity that lasts a lifetime.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-6 sm:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl p-8 sm:p-10 shadow-lg relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-16 px-6 sm:px-16 lg:px-24 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image/Visual card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-3xl transform rotate-3 scale-[1.02] opacity-20 blur-sm" />
            <div className="relative bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl aspect-video md:aspect-[4/3] flex items-center justify-center">
              <img 
                src="/assets/projectworking image2.webp" 
                alt="Kids learning Robotics" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 text-xs font-bold uppercase tracking-wider">
              <span>Our Story</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              Started with a simple goal: make engineering accessible for children.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              Kidrove began as a small group of tech enthusiasts and educators who saw that school curriculums often lacked hands-on computer science and electronics. We wanted to change that.
            </p>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              We designed an experiential model where kids don't just consume technology — they build it. Today, we deliver top-tier workshops in AI, Arduino Robotics, Coding, and IoT across the UAE, empowering thousands of kids to think like engineers.
            </p>
            <div className="pt-2">
              <Link 
                to="/activities"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <span>Browse Our Workshops</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 sm:px-16 lg:px-24 bg-white/40 border-y border-slate-200/40 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Core Values</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              What Guides Our Learning Philosophy
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">
              Every workshop and educational venue we curate is designed around these primary pillars.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200/50 mb-5 shadow-inner">
                    {val.icon}
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-800 mb-2">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-20 px-6 sm:px-16 lg:px-24 text-center relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to give your child a head start in STEM?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Sign up today to book tickets for local attractions or register for upcoming robotics & programming workshops.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                to="/register" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-extrabold text-sm px-8 py-4 rounded-xl transition-all cursor-pointer"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
