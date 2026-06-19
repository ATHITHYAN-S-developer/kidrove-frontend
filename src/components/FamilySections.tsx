import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Headphones, Smartphone, Star, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';

/* ==========================================================================
   1. Why Families Love Us Component
   ========================================================================== */
export const WhyFamilies: React.FC = () => {
  const cards = [
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Curated Activities",
      desc: "Every activity is carefully vetted by our expert team to ensure quality, safety, and fun for your children.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Trusted Vendors",
      desc: "750+ verified vendors with background checks, insurance, and safety certifications.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Star className="w-6 h-6 text-white fill-white" />,
      title: "Best Price Guarantee",
      desc: "Find the best deals on kids activities. We match prices and offer exclusive discounts.",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      title: "24/7 Support",
      desc: "Dedicated customer support team available around the clock to help with bookings and inquiries.",
      gradient: "from-purple-500 to-blue-600"
    },
    {
      icon: <Ticket className="w-6 h-6 text-white" />,
      title: "Instant Booking",
      desc: "Secure your child's slot instantly with our seamless and real-time booking system.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Mobile Friendly",
      desc: "Browse and book on the go. Our platform works seamlessly on all mobile devices.",
      gradient: "from-blue-500 to-purple-600"
    }
  ];

  return (
    <section id="why-families" className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4.5xl font-black text-slate-400 tracking-tight mb-4 uppercase">
            Why Families Love Us
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
            Discover why thousands of families trust us to create unforgettable experiences for their children
          </p>
        </div>

        {/* Grid of 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-[#111827] text-white p-8 rounded-3xl flex flex-col items-start text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon container */}
              <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${card.gradient} mb-6 flex items-center justify-center shadow-md`}>
                {card.icon}
              </div>
              
              <h3 className="font-extrabold text-xl mb-3 text-white">{card.title}</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   2. Our Customers Love It Component
   ========================================================================== */
export const Reviews: React.FC = () => {
  const reviews = [
    {
      venue: "Legoland® Dubai",
      text: "Legoland theme park and water park is an absolutely amazing experience and a true heaven for children. My family had a wonderful time exploring both parks",
      initial: "m",
      name: "moeen iqbal",
      time: "3 weeks ago",
      rating: "4.4",
      bgClass: "bg-teal-600"
    },
    {
      venue: "Ferrari World Yas Island, Abu Dhabi",
      text: "SUPER INCREDIBLE EXPERIENCE. The turbo ride is simply the best feeling of being alive and experiencing quickness. It was beautiful.",
      initial: "E",
      name: "Essence Pickett",
      time: "2 months ago",
      rating: "4.5",
      bgClass: "bg-cyan-600"
    },
    {
      venue: "Kidzania",
      text: "5 stars for the venue itself...my 6 year just loves it and the variety here is commendable.",
      initial: "M",
      name: "Meghan Nicole",
      time: "2 weeks ago",
      rating: "4.3",
      bgClass: "bg-indigo-600"
    },
    {
      venue: "Warner Bros. World Abu Dhabi",
      text: "Absolutely stunning indoor theme park! The themed lands are incredibly detailed, and the rides are world-class. Kids had a blast with Cartoon Junction.",
      initial: "S",
      name: "Sarah K.",
      time: "1 month ago",
      rating: "4.8",
      bgClass: "bg-rose-600"
    },
    {
      venue: "The Green Planet Dubai",
      text: "A beautiful tropical rainforest in the desert. Highly educational experience for children to see birds, reptiles, and sloths up close.",
      initial: "R",
      name: "Rahul M.",
      time: "3 weeks ago",
      rating: "4.6",
      bgClass: "bg-blue-600"
    }
  ];

  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = React.useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 24; // gap-6
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 24;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveDot(index);
    }
  };

  return (
    <section id="reviews" className="relative w-full py-16 md:py-24 bg-[#111827] overflow-hidden text-white">


      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10 text-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4.5xl font-black text-white tracking-tight mb-3 flex items-center justify-center gap-3">
            <span>Our customers love it!</span>
            <span className="flex items-center text-yellow-400 text-2xl sm:text-3.5xl">★ <span className="text-white ml-1 font-black text-xl sm:text-3xl">4.7/5</span></span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
            100,000 reviews to help you choose
          </p>
        </div>

        {/* Carousel container with Navigation buttons */}
        <div className="relative px-2">
          
          {/* Left Arrow Button */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700/50 shadow-md transition-all active:scale-90 z-20 cursor-pointer"
            aria-label="Scroll reviews left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Scroll Row */}
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((rev, idx) => (
              <div 
                key={idx}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-start bg-[#0b0f19] border border-slate-800/40 p-6 md:p-8 rounded-3xl flex flex-col justify-between items-start text-left shadow-lg relative group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Quotes and Verified badge */}
                  <div className="flex items-center justify-between w-full mb-6">
                    {/* Quote SVG */}
                    <svg className="w-8 h-8 text-emerald-500/20 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    
                    {/* Verified Pill */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Verified
                    </span>
                  </div>

                  {/* Location Venue */}
                  <h3 className="font-extrabold text-[#14b8a6] text-base sm:text-lg mb-3 leading-snug">
                    {rev.venue}
                  </h3>
                  
                  {/* Review Text */}
                  <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                    "{rev.text}"
                  </p>
                </div>

                {/* Reviewer Details (Name, time, rating in vertical stack next to avatar) */}
                <div className="flex items-center gap-3.5 w-full border-t border-slate-800/60 pt-4 mt-auto">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm uppercase flex-shrink-0 ${rev.bgClass}`}>
                    {rev.initial}
                  </div>
                  {/* Info Stack */}
                  <div className="flex flex-col text-left">
                    <h4 className="font-bold text-white text-sm leading-tight">{rev.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">{rev.time}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex text-yellow-400 text-[10px]">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-400">{rev.rating}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700/50 shadow-md transition-all active:scale-90 z-20 cursor-pointer"
            aria-label="Scroll reviews right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (carouselRef.current) {
                  const cardWidth = carouselRef.current.firstElementChild?.getBoundingClientRect().width || 320;
                  const gap = 24;
                  carouselRef.current.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeDot === i ? 'bg-cyan-400 w-6' : 'bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   3. Get Our Latest Blogs Component
   ========================================================================== */
export const Blogs: React.FC = () => {
  return (
    <section id="blogs" className="relative w-full py-16 md:py-24 bg-[#0b0f19] overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="flex items-end justify-between w-full mb-12 border-b border-slate-800/40 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4.5xl font-black text-white tracking-tight">
              Get Our Latest Blogs
            </h2>
          </div>
          <Link to="/activities" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider">
            See All
          </Link>
        </div>

        {/* Blog layout: Left large card, Right two smaller stacked cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Large Column (Col span 7) */}
          <div className="lg:col-span-7">
            <div className="relative group w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900 cursor-pointer">
              {/* Floating Badge (Top Left) */}
              <span className="absolute top-6 left-6 inline-block px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#ca8a04] text-white uppercase tracking-wider z-20 shadow-md">
                Kidrove Team
              </span>
              
              {/* Image */}
              <img 
                src="/assets/dubai.png" 
                alt="Dubai Eid Parks" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 sm:p-8 z-20 flex flex-col justify-end items-start text-left">
                <h3 className="font-black text-2xl sm:text-3.5xl text-white leading-tight mb-2 uppercase tracking-wide">
                  DUBAI'S BEST PARKS FOR A RELAXED EID
                </h3>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-200 mb-1">
                  Best Picnic Spots in Dubai for Eid
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light hidden sm:block">
                  Discover the city's top parks and scenic picnic spots. From serene green lawns to sandy beach views, plan the perfect family day out.
                </p>
              </div>
            </div>
          </div>

          {/* Right Small Column (Col span 5) - Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card A (Top) */}
            <div className="bg-[#111827] border border-slate-800/40 rounded-3xl p-5 shadow-md flex items-center gap-4 group cursor-pointer hover:border-slate-800 transition-all duration-300">
              <div className="flex-1 text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#ca8a04] text-white uppercase tracking-wider mb-2.5 shadow-sm">
                  Kidrove Team
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  The Ultimate Parent's Guide: 8 Best Things to Do with Kids
                </h3>
                <p className="text-[11px] text-slate-400 font-light line-clamp-2 leading-relaxed">
                  Planning a family trip to Dubai this Eid? Skip the stress with our guide to 8 epic kid-friendly spots, playgrounds, and cafes.
                </p>
              </div>
              
              {/* Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/40 flex-shrink-0">
                <img 
                  src="/assets/abu_dhabi.png" 
                  alt="Abu Dhabi Kids Guide" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Card B (Bottom) */}
            <div className="bg-[#111827] border border-slate-800/40 rounded-3xl p-5 shadow-md flex items-center gap-4 group cursor-pointer hover:border-slate-800 transition-all duration-300">
              <div className="flex-1 text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#ca8a04] text-white uppercase tracking-wider mb-2.5 shadow-sm">
                  Kidrove Team
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  Weekend Pop-Ups & Markets Families Will Love This Month
                </h3>
                <p className="text-[11px] text-slate-400 font-light line-clamp-2 leading-relaxed">
                  Looking for a fun weekend activity with the kids? Check out the best family pop-up markets, artisan fairs, and food stalls.
                </p>
              </div>
              
              {/* Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/40 flex-shrink-0">
                <img 
                  src="/assets/projectworking image2.webp" 
                  alt="Pop up Markets" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
