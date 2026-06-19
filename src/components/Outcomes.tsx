import React from 'react';
import { BrainCircuit, Cpu, Code2, Lightbulb, Trophy } from 'lucide-react';

export const Outcomes: React.FC = () => {
  const outcomes = [
    {
      icon: <BrainCircuit className="w-5 h-5 text-indigo-600" />,
      title: "AI & Machine Learning Basics",
      desc: "Understand how smart machines process images and make decisions based on patterns."
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-600" />,
      title: "Robotics & Hardware Labs",
      desc: "Learn to design simulated circuits, control actuators, and integrate proximity sensors."
    },
    {
      icon: <Code2 className="w-5 h-5 text-emerald-600" />,
      title: "Coding & Logic Building",
      desc: "Master logical control structures like loops, conditionals, and variables using visual coding."
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-amber-600" />,
      title: "IoT & Smart Systems",
      desc: "Apply robotics knowledge to create automatic nightlights and smart home automations."
    },
    {
      icon: <Trophy className="w-5 h-5 text-rose-600" />,
      title: "Capstone Presentation",
      desc: "Build and pitch a personal robotics project to mentors, reinforcing communication."
    }
  ];

  const instructors = [
    {
      name: "Dr. Ananya Sen",
      role: "Lead AI Scientist",
      degree: "Ph.D. MIT Robotics",
      image: "/assets/emploes working in office id 5.jpg"
    },
    {
      name: "Prof. Kabir Mehta",
      role: "Hardware Architect",
      degree: "Former Intel Lab Head",
      image: "/assets/emploes working in office id 6.webp"
    },
    {
      name: "Zara Yusuf",
      role: "Logic Design Lead",
      degree: "M.Tech IIT Coding",
      image: "/assets/emploes working in office id 7.webp"
    }
  ];

  return (
    <section id="outcomes" className="relative w-full py-8 px-6 md:px-16 lg:px-24 bg-white overflow-hidden">
      
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-96 bg-slate-100/50 rounded-r-full blur-2xl pointer-events-none" />
 
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start relative z-10">
        
        {/* Left Column: Outcomes Modules list */}
        <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
          <h2 className="text-cyan-500 font-bold uppercase tracking-wider text-xs sm:text-sm mb-1">Curriculum Highlights</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6 leading-tight">
            5 Modules to Build Real STEM Competency
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full">
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className={`flex gap-3.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200 group ${
                  idx === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="p-2.5 rounded-lg flex-shrink-0 flex items-center justify-center bg-white shadow-sm border border-slate-100 group-hover:scale-105 transition-transform h-11 w-11">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Right Column: Meet Our Inspiring Instructors (Horizontal Row layout) */}
        <div className="lg:col-span-5 flex flex-col items-start text-left w-full lg:pl-4">
          <h2 className="text-cyan-500 font-bold uppercase tracking-wider text-xs sm:text-sm mb-1">Our Mentors</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
            Meet Our Inspiring Instructors
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 font-light max-w-md">
            Learn from passionate industry experts who are eager to share their craft with your children.
          </p>
 
          {/* Instructor Cards Grid (3-column layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 w-full">
            {instructors.map((inst, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center text-center bg-slate-50/60 border border-slate-200/40 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full"
              >
                {/* Photo */}
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 mb-2.5 flex-shrink-0">
                  <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                </div>
                {/* Text details */}
                <div className="text-center">
                  <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-tight mb-0.5">{inst.name}</h4>
                  <p className="text-[10px] font-bold text-cyan-600 mb-0.5">{inst.role}</p>
                  <p className="text-[9px] text-slate-400 font-medium leading-none">{inst.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
 
      </div>
    </section>
  );
};
