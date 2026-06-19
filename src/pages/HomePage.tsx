import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Details } from '../components/Details';
import { Outcomes } from '../components/Outcomes';
import { LayerVisualizer } from '../components/LayerVisualizer';
import { FAQ } from '../components/FAQ';
import { WhyFamilies, Reviews, Blogs } from '../components/FamilySections';
import { RegistrationForm } from '../components/RegistrationForm';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");
  const carouselRef = useRef<HTMLDivElement>(null);

  // Categories for the horizontal category filter
  const categories = [
    { id: "all", label: "Classes, Camps & Workshops" },
    { id: "ai", label: "AI & Coding Collections" },
    { id: "robotics", label: "Robotics & Hardware Labs" },
    { id: "iot", label: "Smart Home & IoT" },
    { id: "presentation", label: "Capstone & Pitching" },
    { id: "careers", label: "STEM Career Pathways" }
  ];

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to section if redirected from another page with scroll state
  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      setTimeout(() => {
        scrollToSection(id);
      }, 150);
      
      // Clear history state to prevent re-scrolling on refresh
      navigate('/', { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      {/* Hero Section */}
      <div id="hero-container" className="max-w-7xl mx-auto px-6 pt-6 pb-4">
        <Hero onEnrollClick={() => scrollToSection('register-container')} />
      </div>

      {/* Find the Best Family Days Out Cities Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-center bg-white my-4">
        <h3 className="text-2xl sm:text-3.5xl font-black text-slate-800 mb-10 tracking-tight">
          Find the best family days out near you
        </h3>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-y-10 gap-x-6 sm:gap-x-10 lg:gap-x-14">
          {[
            { name: "Dubai", image: "/assets/dubai.png", searchName: "Dubai" },
            { name: "Abu Dhabi", image: "/assets/abu_dhabi.png", searchName: "Abu Dhabi" },
            { name: "Sharjah", image: "/assets/sharjah.png", searchName: "Sharjah" },
            { name: "Ajman", image: "/assets/ajman.png", searchName: "Ajman" },
            { name: "Ras Al Khaimah", image: "/assets/ras_al_khaimah.png", searchName: "Ras Al Khaimah" },
            { name: "Fujairah", image: "/assets/fujairah.png", searchName: "Fujairah" },
            { name: "Umm Al Quwain", image: "/assets/umm_al_quwain.png", searchName: "Umm Al Quwain" },
            { name: "Al Ain", image: "/assets/al_ain.png", searchName: "Al Ain" }
          ].map((city) => (
            <Link 
              key={city.name}
              to={`/activities?search=${encodeURIComponent(city.searchName)}`}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-slate-100 group-hover:border-cyan-500 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-xs sm:text-sm text-slate-700 mt-3 group-hover:text-cyan-500 transition-colors">
                {city.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Horizontal Categories Slider */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-y border-slate-200/60 bg-white">
        <div className="flex items-center justify-between gap-4">
          
          {/* Scroll Left button */}
          <button 
            onClick={() => scrollCarousel('left')}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-cyan-500 transition-all flex-shrink-0 cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="flex-1 flex gap-3 overflow-x-auto no-scrollbar py-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== "all") {
                    scrollToSection('outcomes-container');
                  }
                }}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  activeCategory === cat.id 
                    ? 'bg-cyan-50 border-cyan-300 text-cyan-600 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Scroll Right button */}
          <button 
            onClick={() => scrollCarousel('right')}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-cyan-500 transition-all flex-shrink-0 cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sections list */}
      <main className="relative w-full">
        {/* Section 2: Details */}
        <div 
          id="details-container" 
          className="w-full bg-slate-50 py-10 md:py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full"
          >
            <Details />
          </motion.div>
        </div>

        {/* Section 3: Outcomes (Curriculum) */}
        <div 
          id="outcomes-container" 
          className="w-full bg-white py-10 md:py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full"
          >
            <Outcomes />
          </motion.div>
        </div>

        {/* Section: Learning Layers */}
        <div 
          id="layer-container" 
          className="w-full bg-slate-50 py-10 md:py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full"
          >
            <LayerVisualizer />
          </motion.div>
        </div>

        {/* Section: Instructors */}
        <div 
          id="instructors-container" 
          className="w-full bg-[#111827] py-16 md:py-20 text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full max-w-7xl mx-auto px-6 text-center"
          >
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4.5xl font-black text-white tracking-tight mb-3">
                Meet Our Inspiring Instructors
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
                Learn from passionate experts who are eager to share their craft with your children.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
              {[
                {
                  name: "Colette Davis",
                  role: "Expert Pastry Chef & Baking Instructor",
                  location: "Dubai",
                  image: "/assets/teacher_colette.png"
                },
                {
                  name: "Anne Amin",
                  role: "Fashion Designer & Textile Artist",
                  location: "Sharjah",
                  image: "/assets/teacher_anne.png"
                },
                {
                  name: "Shailesh Kumar",
                  role: "Senior Guitar Instructor",
                  location: "Ajman",
                  image: "/assets/teacher_shailesh.png"
                },
                {
                  name: "J. Galindo",
                  role: "Lead STEM Educator",
                  location: "Abu Dhabi",
                  image: "/assets/teacher_galindo.png"
                },
                {
                  name: "Mariyam Fatima",
                  role: "Artisan Soap Maker & Founder",
                  location: "Ras Al Khaimah",
                  image: "/assets/teacher_mariyam.png"
                }
              ].map((teacher, idx) => (
                <motion.div 
                  key={teacher.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900 cursor-pointer"
                >
                  <img 
                    src={teacher.image} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                  
                  <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col justify-end text-left">
                    <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-tight">
                      {teacher.name}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-snug">
                      {teacher.role}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-2.5 flex items-center gap-1 uppercase tracking-wider">
                      <svg className="w-3 h-3 text-cyan-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {teacher.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link 
                to="/activities?category=stem" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer border-none"
              >
                View All Teachers
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Section: Our Impact Stats */}
        <div className="w-full">
          <div className="w-full h-1.5 bg-teal-500" />
          <div className="bg-[#111827] py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="max-w-5xl mx-auto px-6 text-center"
            >
              <span className="text-teal-400 text-sm font-bold tracking-wide">Our Impact</span>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-3 mb-3">
                Trusted by families across UAE
              </h2>
              
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-12 max-w-xl mx-auto">
                Helping parents discover and book the best activities for their children since 2017
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-[#1c2436] border border-slate-800/50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center">
                  <span className="text-3xl mb-3">⭐</span>
                  <span className="text-xl md:text-2xl font-black text-white">Trusted by over 6+</span>
                  <span className="text-xs text-slate-400 font-medium mt-1">partners since 2017</span>
                </div>

                <div className="bg-[#1c2436] border border-slate-800/50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center">
                  <span className="text-3xl mb-3">🎨</span>
                  <span className="text-3xl md:text-4xl font-black text-white">157+</span>
                  <span className="text-xs text-slate-400 font-medium mt-1">Experiences</span>
                </div>

                <div className="bg-[#1c2436] border border-slate-800/50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center">
                  <span className="text-3xl mb-3">🏢</span>
                  <span className="text-3xl md:text-4xl font-black text-white">123+</span>
                  <span className="text-xs text-slate-400 font-medium mt-1">Venue & Events</span>
                </div>

                <div className="bg-[#1c2436] border border-slate-800/50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center">
                  <span className="text-3xl mb-3">🏆</span>
                  <span className="text-3xl md:text-4xl font-black text-white">157+</span>
                  <span className="text-xs text-slate-400 font-medium mt-1">Classes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section: Why Families */}
        <div 
          id="why-families-container" 
          className="w-full bg-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full"
          >
            <WhyFamilies />
          </motion.div>
        </div>

        {/* Section: Reviews */}
        <div 
          id="reviews-container" 
          className="w-full bg-[#111827]"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full"
          >
            <Reviews />
          </motion.div>
        </div>

        {/* Section: Blogs */}
        <div 
          id="blogs-container" 
          className="w-full bg-[#0b0f19]"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full"
          >
            <Blogs />
          </motion.div>
        </div>

        {/* Section: FAQ */}
        <div 
          id="faq-container" 
          className="w-full bg-[#111827]"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full"
          >
            <FAQ />
          </motion.div>
        </div>

        {/* Section: Registration Form */}
        <div 
          id="register-container" 
          className="w-full bg-slate-50 py-10 md:py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="w-full"
          >
            <RegistrationForm />
          </motion.div>
        </div>
      </main>
    </>
  );
};
