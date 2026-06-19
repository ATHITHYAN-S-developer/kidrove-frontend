import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Mail, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // Default open the first one

  const faqs: FAQItem[] = [
    {
      question: "What types of events can I find on Kidrove?",
      answer: "Kidrove offers a wide variety of events including educational workshops, sports activities, arts & crafts, entertainment shows, music classes, technology camps, and adventure experiences for children of all ages across the UAE."
    },
    {
      question: "How do I book tickets for events?",
      answer: "You can book tickets instantly through our platform. Browse activities, select your preferred date and slot, select your package, and check out securely. Your booking confirmation and digital tickets will be sent immediately to your email."
    },
    {
      question: "Are the events suitable for all age groups?",
      answer: "Yes! Each activity listed on our platform includes clear age recommendations (e.g., Ages 3–5, 8–14, etc.) so you can easily choose events that match your child's age, skill level, and interest."
    }
  ];

  return (
    <section id="faq" className="relative w-full py-16 md:py-24 bg-[#111827] overflow-hidden text-white border-t border-slate-800/60">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 relative z-10 flex flex-col items-center">
        
        {/* FAQ Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center">
          {/* FAQ Icon Circle */}
          <div className="w-14 h-14 rounded-full bg-[#6366f1] flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-5 text-white">
            <HelpCircle className="w-7 h-7" />
          </div>
          
          <h2 className="text-3xl sm:text-4.5xl font-black text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Everything you need to know about finding and booking kids activities on our platform
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="w-full space-y-4 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-[#1c2436] border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm hover:border-slate-800 transition-all duration-300"
              >
                {/* Accordion Header Trigger */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-extrabold text-sm sm:text-base text-white hover:text-cyan-400 transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-cyan-400' : ''}`} 
                  />
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed font-light border-t border-slate-800/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center mb-10">
          <p className="text-slate-400 text-sm font-semibold mb-4">Still have questions?</p>
          <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer border-none">
            Contact Support
          </button>
        </div>

      </div>

      {/* Stuck for Ideas? Gift Card — FULL SCREEN WIDTH */}
      <div className="w-full bg-gradient-to-r from-[#5b21b6] via-[#6d28d9] to-[#4c1d95] px-6 sm:px-12 md:px-20 lg:px-32 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden group transition-all duration-300">
        
        {/* Sparkles Ambient Background Effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-900/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Left Text details */}
        <div className="flex-1 max-w-xl text-left">
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-6">
            Stuck for ideas? Give the gift card for 100+ activities!
          </h3>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm sm:text-base text-slate-200 font-bold">
              <span className="p-2 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </span>
              <span>Instantly via email</span>
            </li>
            <li className="flex items-center gap-3 text-sm sm:text-base text-slate-200 font-bold">
              <span className="p-2 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </span>
              <span>12 months to book</span>
            </li>
          </ul>
        </div>

        {/* Right Card Mockup (Pure CSS & HTML) */}
        <div className="flex-shrink-0 flex items-center justify-center relative select-none perspective-1000">
          <div 
            className="relative w-72 h-44 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] p-4 shadow-2xl border border-white/20 text-white flex flex-col justify-between overflow-hidden transform rotate-x-6 rotate-y-[-10deg] rotate-z-[-2deg] group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:rotate-z-0 transition-transform duration-500 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card Sparkle overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent pointer-events-none" />
            
            {/* Card Top: Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span className="text-sm font-black tracking-tight">Kidrove</span>
              </div>
              <span className="text-[8px] font-extrabold uppercase bg-white/10 px-2 py-0.5 rounded border border-white/10 tracking-widest">
                Gift Card
              </span>
            </div>

            {/* Card Bottom: Description & Image */}
            <div className="flex items-end justify-between gap-3 mt-4">
              <div className="text-left max-w-[140px]">
                <p className="text-[9px] font-black leading-tight">The gift card</p>
                <p className="text-[15px] font-black leading-none text-yellow-300 mt-0.5">Kidrove</p>
                <p className="text-[7px] text-slate-200 leading-normal font-light mt-1.5 line-clamp-3">
                  Over 100 activities for kids like Workshops and Competition...
                </p>
              </div>
              
              {/* Embedded photo layout on card */}
              <div className="w-18 h-18 rounded-xl overflow-hidden border border-white/20 bg-slate-900 shadow-md transform rotate-3 flex-shrink-0">
                <img 
                  src="/assets/projectworking image4.jpg" 
                  alt="Kid activity on card" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
