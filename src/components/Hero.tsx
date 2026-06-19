import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles } from 'lucide-react';

interface HeroProps {
  onEnrollClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnrollClick }) => {
  return (
    <section className="relative w-full overflow-hidden py-4 sm:py-6">
      
      {/* Widescreen Banner Container (Kidrove Style) */}
      <motion.div 
        className="w-full rounded-3xl bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-500 text-white relative shadow-glass overflow-hidden p-6 sm:p-12 md:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[420px] lg:min-h-[480px] border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        
        {/* Soft Background Sun Overlay */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-300/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-cyan-300/40 blur-3xl pointer-events-none" />

        {/* Left: Text & CTA */}
        <div className="flex-1 flex flex-col items-start text-left relative z-10 max-w-xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/25 border border-white/25 text-white text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
            <span>Limited Slots — Early bird active</span>
          </div>

          {/* Big Playful Headline (Kidrove style "ABLAZE WITH SUMMER") */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-5 uppercase text-shadow">
            Ablaze <br className="hidden sm:inline" />
            With <span className="text-yellow-300">Robots!</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/95 leading-relaxed font-semibold mb-8 max-w-md">
            Design virtual circuits, logic flowcharts, and control smart machines. 
            An intensive 4-week online summer workshop packed with live labs 
            and hands-on STEM skills for ages 8 to 14.
          </p>

          {/* Action Button */}
          <button
            onClick={onEnrollClick}
            className="inline-flex items-center justify-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-slate-800 font-extrabold px-8 py-4 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-sm tracking-wide"
          >
            <span>Enroll in RoboCamp &gt;</span>
          </button>
        </div>

        {/* Right: Overlapping collage of images */}
        <div className="flex-1 w-full lg:w-auto flex justify-center relative z-10">
          
          {/* Main Poster in center */}
          <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[4/5] rounded-2xl glass-panel-heavy p-2.5 shadow-glass rotate-[-2deg] hover:rotate-[0deg] transition-all duration-300 border-white/60">
            <div className="overflow-hidden rounded-xl border border-slate-200/50 bg-slate-100 h-full relative">
              <img
                src="/assets/main poster.jpg"
                alt="AI & Robotics Summer Workshop Poster"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 right-2.5 bg-cyan-500/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white tracking-wide flex items-center gap-1 border border-white/20">
                <Cpu className="w-3 h-3" />
                AGES 8-14
              </div>
            </div>
          </div>

          {/* Secondary poster overlapping on the left */}
          <div className="absolute -left-4 top-10 w-[120px] sm:w-[150px] aspect-[4/5] rounded-xl bg-white p-1.5 shadow-apple rotate-[-12deg] hover:rotate-[-6deg] transition-all duration-300 border border-slate-200/40 hidden sm:block">
            <div className="overflow-hidden rounded-lg h-full bg-slate-100">
              <img
                src="/assets/project working image.jpg"
                alt="Robotics build activity"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Third student activity image overlapping on the right */}
          <div className="absolute -right-4 bottom-10 w-[110px] sm:w-[140px] aspect-square rounded-xl bg-white p-1.5 shadow-apple rotate-[12deg] hover:rotate-[6deg] transition-all duration-300 border border-slate-200/40 hidden sm:block">
            <div className="overflow-hidden rounded-lg h-full bg-slate-100">
              <img
                src="/assets/work of students 1.webp"
                alt="Student work circuit design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
