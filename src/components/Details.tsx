import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface TicketItem {
  title: string;
  displayTitle: string;
  location: string;
  emoji: string;
  image: string;
  count: string;
}

export const Details: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const tickets: TicketItem[] = [
    {
      title: "Dubai Festival City Mall",
      displayTitle: "Dubai Festival Cit...",
      location: "Dubai",
      emoji: "🛍️",
      image: "/assets/dubai_festival_city.png",
      count: "0"
    },
    {
      title: "Al Wathba Wetland Reserve",
      displayTitle: "Al Wathba...",
      location: "Abu Dhabi",
      emoji: "🦩",
      image: "/assets/al_wathba.png",
      count: "0"
    },
    {
      title: "Al Seef Heritage District",
      displayTitle: "Al Seef",
      location: "Dubai",
      emoji: "🕌",
      image: "/assets/al_seef.png",
      count: "0"
    },
    {
      title: "Al Qudra Lakes",
      displayTitle: "Al Qudra Lakes",
      location: "Dubai",
      emoji: "🌅",
      image: "/assets/al_qudra_lakes.png",
      count: "0"
    },
    {
      title: "Al Fahidi Historical Neighborhood",
      displayTitle: "Al Fahidi Historical...",
      location: "Dubai",
      emoji: "🏛️",
      image: "/assets/al_fahidi.png",
      count: "0"
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 260; // Approximate card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="details" className="relative w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 bg-slate-50 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10 w-full text-left">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">☀️</span>
              <span>Best-Price Tickets to Make the Most of the Sunshine!</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
              Sunshine's out, fun's in! Grab best-price e-tickets now and make the most of this glorious weather.
            </p>
          </div>
          
          {/* View All link */}
          <Link 
            to="/activities" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors whitespace-nowrap group self-start sm:self-end"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Carousel / Card List */}
        <div className="relative w-full">
          
          {/* Cards Flex Row */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-4 py-2 w-full snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tickets.map((ticket, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-[210px] sm:w-[235px] aspect-[3/4] rounded-3xl overflow-hidden shadow-apple hover:shadow-apple-hover hover:-translate-y-1 transition-all duration-300 snap-start group bg-slate-200"
              >
                {/* Background Card Image */}
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 text-white">
                  
                  {/* Emoji & Title */}
                  <h4 className="font-extrabold text-sm sm:text-base leading-tight mb-2.5 flex items-center gap-1.5 text-left text-shadow-sm select-none">
                    <span className="text-base sm:text-lg flex-shrink-0">{ticket.emoji}</span>
                    <span className="truncate">{ticket.displayTitle}</span>
                  </h4>

                  {/* Metadata Row */}
                  <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-xs font-bold text-white/90">
                    {/* Left: Count */}
                    <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] sm:text-xs">
                      {ticket.count}
                    </span>

                    {/* Right: Location with MapPin */}
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{ticket.location}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Bottom Slider Nav Buttons (centered like screenshot) */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-cyan-500 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Slide left"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-cyan-500 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Slide right"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
