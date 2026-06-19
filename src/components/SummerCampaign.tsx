import React, { useState } from 'react';

import { 
  Users, 
  Star, 
  Megaphone, 
  Globe, 
  BookOpen, 
  Smartphone, 
  FileText, 
  Mail, 
  Volume2, 
  Check, 
  ArrowRight,
  TrendingUp,
  Settings
} from 'lucide-react';

interface PartnerInquiry {
  contactName: string;
  email: string;
  phone: string;
  organizationName: string;
  website: string;
  activityType: string;
  emirate: string;
  expectedKids: string;
  ageGroups: string[];
  description: string;
  anythingElse: string;
  package: string;
  agreedToTerms: boolean;
}

export const SummerCampaign: React.FC = () => {
  const [formData, setFormData] = useState<PartnerInquiry>({
    contactName: '',
    email: '',
    phone: '',
    organizationName: '',
    website: '',
    activityType: 'Summer Camp',
    emirate: '',
    expectedKids: '',
    ageGroups: [],
    description: '',
    anythingElse: '',
    package: 'Growth Package (AED 699)',
    agreedToTerms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/partner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          contactName: '',
          email: '',
          phone: '',
          organizationName: '',
          website: '',
          activityType: 'Summer Camp',
          emirate: '',
          expectedKids: '',
          ageGroups: [],
          description: '',
          anythingElse: '',
          package: 'Growth Package (AED 699)',
          agreedToTerms: false
        });
      } else {
        alert(data.message || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('API submission error:', error);
      alert('Could not connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const partnerPoints = [
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "High-Intent Parents",
      desc: "Reach parents actively searching for summer camps and kids activities — not passive browsers."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Stand Out",
      desc: "We limit listings per category to ensure your brand gets real visibility, not just another listing."
    },
    {
      icon: <Megaphone className="w-6 h-6 text-pink-600" />,
      title: "Multi-Channel Push",
      desc: "Website, social media, email campaigns, school networks — all amplified during peak June–August."
    }
  ];

  const channels = [
    {
      icon: <Globe className="w-5 h-5 text-indigo-600" />,
      title: "Website",
      desc: "Featured on dedicated Summer Camps section with high-intent parent traffic."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-cyan-600" />,
      title: "Summer Guide",
      desc: "Professionally curated digital book shared with parents & schools."
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-600" />,
      title: "Social Media",
      desc: "Reels, Carousels & Stories across Instagram and Facebook."
    },
    {
      icon: <FileText className="w-5 h-5 text-amber-600" />,
      title: "Blog Content",
      desc: "\"Top Summer Camps in Dubai 2026\" & curated activity guides."
    },
    {
      icon: <Mail className="w-5 h-5 text-rose-600" />,
      title: "Email Marketing",
      desc: "Sent to parent database and shared with school networks."
    },
    {
      icon: <Volume2 className="w-5 h-5 text-purple-600" />,
      title: "Website Ticker",
      desc: "Continuous visibility during peak browsing period."
    }
  ];

  const pricingPackages = [
    {
      name: "Basic Listing",
      price: "AED 0",
      bullets: [
        "Listing on Summer Camps Pages"
      ],
      isPopular: false,
      isExclusive: false,
      tag: "Free"
    },
    {
      name: "Starter Listing",
      price: "AED 299",
      bullets: [
        "Listing on Summer Camps page",
        "Visibility in category search",
        "Basic inclusion in Summer Guide",
        "1 Story mention"
      ],
      isPopular: false,
      isExclusive: false,
      tag: "Starter"
    },
    {
      name: "Growth Package",
      price: "AED 699",
      bullets: [
        "Featured listing (priority placement)",
        "½ Page Ad in Summer Guide",
        "1 Reel + 1 Carousel post",
        "3-5 Story mentions",
        "Inclusion in 1 curated blog/guide"
      ],
      isPopular: true,
      isExclusive: false,
      tag: "Most Popular"
    },
    {
      name: "Premium Partner",
      price: "AED 1,299",
      bullets: [
        "Top Featured placement",
        "Full Page Ad in Summer Guide",
        "Homepage ticker/banner visibility",
        "3-4 social media posts (Reels + Posts)",
        "Dedicated email newsletter blast"
      ],
      isPopular: false,
      isExclusive: false,
      tag: "Premium"
    },
    {
      name: "Category Sponsor",
      price: "AED 2,500+",
      bullets: [
        "\"Powered by [Your Brand]\" category sponsorship",
        "Top placement across all listings",
        "Premium guide positioning",
        "10+ dedicated social media posts",
        "Exclusive banner on home dashboard"
      ],
      isPopular: false,
      isExclusive: true,
      tag: "Exclusive"
    }
  ];

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. Campaign Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 py-16 md:py-24 text-white overflow-hidden border-b border-orange-500/20">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-yellow-300/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
            <Settings className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Summer 2026 Campaign — Limited Slots Available</span>
          </div>

          {/* Smiling Sun Emoji */}
          <div className="text-5xl sm:text-6xl mb-4 animate-bounce-slow">
            ☀️
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-4 uppercase drop-shadow-sm">
            KIDROVE SUMMER 2026
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-100 max-w-2xl mb-4">
            Get Discovered by Parents Planning Summer Activities
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium mb-10 max-w-2xl">
            Reach families actively searching for summer camps, play zones, workshops, and kids experiences across the UAE.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => scrollToSection('pricing-packages')}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50 text-orange-600 font-extrabold px-8 py-4 rounded-full shadow-md hover:shadow-lg hover:scale-103 active:scale-97 transition-all duration-200 text-sm tracking-wide"
            >
              <span>View Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => scrollToSection('partner-inquiry-form')}
              className="inline-flex items-center justify-center bg-orange-700/35 hover:bg-orange-700/50 border border-white/20 text-white font-extrabold px-8 py-4 rounded-full shadow-sm hover:scale-103 active:scale-97 transition-all duration-200 text-sm tracking-wide"
            >
              <span>Apply Now</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. Why Partner with Kidrove Section */}
      <section className="relative w-full py-16 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1">
            Why Partner with Kidrove?
          </h2>
          <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto mb-12">
            Connect with high-intent parents actively planning summer for their kids.
          </p>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partnerPoints.map((point, index) => (
              <div 
                key={index}
                className="bg-slate-50 border border-slate-100/80 p-6 rounded-2xl flex flex-col items-center text-center shadow-apple hover:shadow-apple-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm mb-4 group-hover:scale-105 transition-transform duration-300">
                  {point.icon}
                </div>
                <h3 className="font-extrabold text-slate-800 text-base mb-2">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. What You Get Across Channels Section */}
      <section className="relative w-full py-16 bg-slate-50 border-b border-slate-200/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-10">
            What You Get Across Channels
          </h2>

          {/* Grid Layout (2x3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {channels.map((chan, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200/50 p-5 rounded-2xl text-left flex gap-4 shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="p-3 rounded-lg flex-shrink-0 flex items-center justify-center bg-slate-50 border border-slate-100 h-11 w-11 shadow-sm">
                  {chan.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
                    {chan.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-light">
                    {chan.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Choose Your Package (Pricing table) */}
      <section id="pricing-packages" className="relative w-full py-20 bg-slate-900 text-white overflow-hidden">
        
        {/* Deco lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>PRICING</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-1">
            Choose Your Package
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl mx-auto mb-16">
            All packages run May–August 2026. Early partners get better placement.
          </p>

          {/* Pricing cards columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto text-left items-stretch">
            {pricingPackages.map((pkg, index) => {
              const isSelected = formData.package.startsWith(pkg.name);
              return (
                <div 
                  key={index}
                  className={`relative rounded-2xl p-5 flex flex-col justify-between border transition-all duration-300 ${
                    isSelected 
                      ? 'bg-slate-800 border-blue-500 shadow-[0_20px_40px_rgba(59,130,246,0.25)] scale-103 sm:scale-105 z-10 ring-2 ring-blue-500' 
                      : pkg.isPopular 
                      ? 'bg-slate-800 border-slate-700 shadow-[0_20px_40px_rgba(0,0,0,0.15)]' 
                      : pkg.isExclusive 
                      ? 'bg-slate-800/90 border-orange-500/60 shadow-[0_20px_40px_rgba(249,115,22,0.1)]'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  
                  {/* Popular / Exclusive Ribbon Badge */}
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                      Most Popular
                    </div>
                  )}
                  {pkg.isExclusive && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                      Exclusive
                    </div>
                  )}

                  {/* Package Head */}
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                      {pkg.tag}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-100 leading-tight mb-2">
                      {pkg.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="my-4">
                      <p className="text-xl sm:text-2xl font-black text-white">
                        {pkg.price}
                      </p>
                      <span className="text-[9px] font-mono text-slate-500 uppercase block mt-0.5">Campaign duration</span>
                    </div>

                    {/* Bullets */}
                    <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-2.5">
                      {pkg.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-light leading-relaxed">
                          <Check className="w-3.5 h-3.5 mt-0.5 text-cyan-400 flex-shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div className="mt-8">
                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, package: `${pkg.name} (${pkg.price})` }));
                        scrollToSection('partner-inquiry-form');
                      }}
                      className={`w-full font-extrabold text-xs py-2.5 rounded-xl cursor-pointer transition-all hover:scale-103 active:scale-97 text-center ${
                        isSelected 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                          : pkg.isPopular 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
                          : pkg.isExclusive
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : 'Select Package'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Subtext */}
          <p className="text-xs text-slate-400 font-bold mt-8 flex items-center justify-center gap-1.5">
            <span>🚀</span>
            <span>We limit partners per category — better visibility, higher engagement, less competition.</span>
          </p>

        </div>
      </section>

      {/* 5. Campaign Timeline & Apply to Partner Form Section */}
      {(() => {
        const packagesList = [
          { name: "Basic Listing", price: "AED 0" },
          { name: "Starter Listing", price: "AED 299" },
          { name: "Growth Package", price: "AED 699" },
          { name: "Premium Partner", price: "AED 1,299" },
          { name: "Category Sponsor", price: "AED 2,500-3,500" }
        ];

        const ageGroupsList = ["Under 3", "3-5 years", "6-9 years", "10-12 years", "13-16 years"];
        
        return (
          <section id="partner-inquiry-form" className="relative w-full py-16 bg-[#FAF7F0] overflow-hidden border-t border-slate-200/50">
            <div className="max-w-4xl mx-auto px-6 text-center">
              
              {/* Timeline */}
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">
                Campaign Timeline
              </h2>
              
              <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto mt-12 mb-16 px-4">
                <div className="absolute left-10 right-10 top-5 h-[3px] bg-slate-200 z-0">
                  <div className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 via-orange-400 to-purple-500 w-full rounded-full" />
                </div>
                
                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center border-4 border-[#FAF7F0] shadow-sm">1</div>
                  <span className="text-xs font-bold text-slate-800 mt-2">Now</span>
                  <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">Listings Open</span>
                </div>

                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-extrabold flex items-center justify-center border-4 border-[#FAF7F0] shadow-sm">2</div>
                  <span className="text-xs font-bold text-slate-800 mt-2">May</span>
                  <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">Promotion Starts</span>
                </div>

                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-extrabold flex items-center justify-center border-4 border-[#FAF7F0] shadow-sm">3</div>
                  <span className="text-xs font-bold text-slate-800 mt-2">Jun–Jul</span>
                  <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">Peak Campaign</span>
                </div>

                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white font-extrabold flex items-center justify-center border-4 border-[#FAF7F0] shadow-sm">4</div>
                  <span className="text-xs font-bold text-slate-800 mt-2">August</span>
                  <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">Extended Reach</span>
                </div>
              </div>

              {/* Envelope Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-100 text-violet-500 mb-4 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>

              {/* Header Title */}
              <h2 className="text-3xl font-black text-slate-800 mb-2">
                Apply to Partner
              </h2>
              <p className="text-sm text-slate-500 font-bold mb-6">
                Share your activity details and we'll onboard and position your listing.
              </p>

              {/* Selected Package Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold mb-10 shadow-sm">
                <span>☀️</span>
                <span>Selected: {formData.package.replace(/\s*\(.*\)/, '')} — {formData.package.match(/\(([^)]+)\)/)?.[1] || 'AED 699'}</span>
              </div>

              {submitted ? (
                <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 text-center flex flex-col items-center max-w-2xl mx-auto shadow-sm">
                  <span className="text-4xl mb-3">🎉</span>
                  <h3 className="font-extrabold text-emerald-800 text-lg mb-2">Application Received!</h3>
                  <p className="text-xs sm:text-sm text-emerald-600 font-medium leading-relaxed max-w-sm">
                    Thank you for applying. A partnership manager from Kidrove will call or email you shortly. Let's make Summer 2026 amazing!
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs text-emerald-700 font-bold hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left space-y-6 bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm">
                  
                  {/* Selected Package selector cards */}
                  <div className="space-y-3">
                    <label className="text-xs font-extrabold text-slate-700 block">Selected Package *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {packagesList.map((pkg) => {
                        const isSelected = formData.package.startsWith(pkg.name);
                        return (
                          <button
                            key={pkg.name}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, package: `${pkg.name} (${pkg.price})` }))}
                            className={`flex justify-between items-center px-4 py-3 rounded-xl border text-left cursor-pointer transition-all ${
                              isSelected 
                                ? 'border-orange-500 bg-orange-50/10 text-slate-900 shadow-sm ring-1 ring-orange-500' 
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-sm font-bold">{pkg.name}</span>
                            <span className="text-xs font-semibold text-slate-500">{pkg.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Contact Name */}
                    <div>
                      <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Contact Name *</label>
                      <input
                        type="text"
                        required
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold"
                      />
                    </div>
                    
                    {/* Email Address */}
                    <div>
                      <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+971 XX XXX XXXX"
                        className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold"
                      />
                    </div>
                    
                    {/* Organization / Camp Name */}
                    <div>
                      <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Organization / Camp Name *</label>
                      <input
                        type="text"
                        required
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        placeholder="Your camp or activity name"
                        className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Website */}
                    <div>
                      <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://yoursite.com"
                        className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold"
                      />
                    </div>
                    
                    {/* Activity Type */}
                    <div>
                      <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Activity Type *</label>
                      <select
                        name="activityType"
                        value={formData.activityType}
                        onChange={handleInputChange}
                        className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-bold appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%2522%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat cursor-pointer"
                      >
                        <option value="Summer Camp">Summer Camp</option>
                        <option value="Winter Camp">Winter Camp</option>
                        <option value="Spring Camp">Spring Camp</option>
                        <option value="After School Activity">After School Activity</option>
                        <option value="Sports Academy">Sports Academy</option>
                        <option value="Robotics & Coding Lab">Robotics & Coding Lab</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Emirate */}
                    <div>
                      <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Emirate</label>
                      <select
                        name="emirate"
                        value={formData.emirate}
                        onChange={handleInputChange}
                        className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-bold appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%2522%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat cursor-pointer"
                      >
                        <option value="">Select Emirate</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Sharjah">Sharjah</option>
                        <option value="Ajman">Ajman</option>
                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                        <option value="Fujairah">Fujairah</option>
                      </select>
                    </div>

                    {/* Expected # of Kids */}
                    <div>
                      <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Expected # of Kids</label>
                      <input
                        type="text"
                        name="expectedKids"
                        value={formData.expectedKids}
                        onChange={handleInputChange}
                        placeholder="e.g. 50-100"
                        className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Age Groups Served */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-700 block">Age Groups Served</label>
                    <div className="flex flex-wrap gap-2">
                      {ageGroupsList.map((age) => {
                        const isSelected = formData.ageGroups.includes(age);
                        return (
                          <button
                            key={age}
                            type="button"
                            onClick={() => {
                              setFormData(prev => {
                                const ageGroups = prev.ageGroups.includes(age)
                                  ? prev.ageGroups.filter(a => a !== age)
                                  : [...prev.ageGroups, age];
                                return { ...prev, ageGroups };
                              });
                            }}
                            className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {age}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tell Us About Your Activity */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Tell Us About Your Activity *</label>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Briefly describe your camp, what kids will do, dates, location..."
                      className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold resize-none"
                    />
                  </div>

                  {/* Anything Else */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 block mb-1.5">Anything Else?</label>
                    <textarea
                      name="anythingElse"
                      value={formData.anythingElse}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Questions, special requirements, or additional info..."
                      className="w-full text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold resize-none"
                    />
                  </div>

                  {/* Terms and conditions */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
                        className="mt-1 rounded border-slate-300 text-orange-500 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs text-slate-500 font-semibold leading-relaxed">
                        I agree to the <a href="#" className="text-orange-500 hover:underline">terms and conditions</a> and consent to being contacted by the Kidrove team.
                      </span>
                    </label>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-99 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>☀️</span>
                      <span>{loading ? 'Submitting Application...' : 'Submit Partnership Application'}</span>
                    </button>
                  </div>

                  {/* Contact directly */}
                  <div className="text-center pt-2">
                    <a href="mailto:partnerships@kidrove.com" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-orange-500 transition-colors font-semibold">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Or reach us directly at partnerships@kidrove.com</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </section>
        );
      })()}

    </div>
  );
};

// Simple floating emoji bounce animation added to Tailwind v4 inline custom animations
const styleEl = document.createElement('style');
styleEl.innerHTML = `
  @keyframes bounceSlow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .animate-bounce-slow {
    animation: bounceSlow 3s ease-in-out infinite;
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spinSlow 12s linear infinite;
  }
`;
document.head.appendChild(styleEl);
