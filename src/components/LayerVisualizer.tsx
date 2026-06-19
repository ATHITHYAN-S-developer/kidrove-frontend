import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  BrainCircuit, 
  Terminal, 
  Layers, 
  CheckCircle2
} from 'lucide-react';

interface LayerData {
  id: number;
  level: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  colorClass: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  badges: string[];
}

export const LayerVisualizer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(2); // Default to L2

  const layers: LayerData[] = [
    {
      id: 1,
      level: "L1",
      tag: "FOUNDATION LABS",
      title: "Logic & Code Foundations",
      description: "Students learn standard computational logic, variables, and control flow. We build the conceptual muscle memory needed to instruct smart systems.",
      bullets: [
        "Visual flowcharts & block-based commands",
        "Conditional branching (If-Else loops)",
        "Variable scopes and state storage principles"
      ],
      colorClass: "from-blue-500 to-cyan-500",
      textColor: "text-blue-400",
      borderColor: "border-blue-500/30",
      glowColor: "rgba(59, 130, 246, 0.25)",
      badges: ["Logic Flow", "Block Coding", "Scratch/Blockly"],
    },
    {
      id: 2,
      level: "L2",
      tag: "HARDWARE INTERACTION",
      title: "Virtual Circuits & Sensor Labs",
      description: "Moving from pure screen code to physical computing. Students wire components in a virtual breadboard lab, learning electric flow and sensor outputs.",
      bullets: [
        "Breadboard and basic electrical wiring",
        "Reading ultrasonic & infrared proximity sensors",
        "Controlling servo motors and LED actuators"
      ],
      colorClass: "from-purple-500 to-indigo-500",
      textColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      glowColor: "rgba(168, 85, 247, 0.25)",
      badges: ["Circuit Design", "Sensor Triggers", "Virtual Arduino"],
    },
    {
      id: 3,
      level: "L3",
      tag: "AI & AUTONOMY",
      title: "Machine Learning & Smart Systems",
      description: "The capstone layer. Students write scripts to process sensor data, integrate pre-trained image classifiers, and build autonomous decision-making algorithms.",
      bullets: [
        "Computer vision image classification labs",
        "Proportional control loop steering algorithms",
        "Self-correcting autonomous obstacle avoidance"
      ],
      colorClass: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      glowColor: "rgba(16, 185, 129, 0.25)",
      badges: ["AI Classification", "Feedback Loops", "Capstone Pitch"],
    }
  ];

  // Colors mapping for SVG wires depending on active layer
  const getWireGlowStyle = (wireId: number) => {
    if (wireId === 1) { // Left wire (L1 active path)
      return activeLayer === 1 
        ? "stroke-blue-400 opacity-90 stroke-[3px]" 
        : "stroke-blue-500/30 opacity-40 stroke-[1.5px]";
    }
    if (wireId === 2) { // Center wire (L2 active path)
      return activeLayer === 2 
        ? "stroke-purple-400 opacity-90 stroke-[3px]" 
        : "stroke-purple-500/30 opacity-40 stroke-[1.5px]";
    }
    return activeLayer === 3 // Right wire (L3 active path)
      ? "stroke-emerald-400 opacity-90 stroke-[3px]" 
      : "stroke-emerald-500/30 opacity-40 stroke-[1.5px]";
  };

  const getLayerIcon = (id: number, active: boolean) => {
    const size = "w-4.5 h-4.5";
    if (id === 1) return <Terminal className={`${size} ${active ? 'text-blue-400' : 'text-slate-400'}`} />;
    if (id === 2) return <Cpu className={`${size} ${active ? 'text-purple-400' : 'text-slate-400'}`} />;
    return <BrainCircuit className={`${size} ${active ? 'text-emerald-400' : 'text-slate-400'}`} />;
  };

  const activeData = layers.find(l => l.id === activeLayer) || layers[1];

  return (
    <section id="layer-section" className="relative w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 bg-slate-50 overflow-hidden py-2">
      
      {/* Decorative Blur Background overlays */}
      <div className="absolute top-1/2 right-1/10 w-96 h-96 rounded-full bg-cyan-200/20 blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Title */}
        <div className="text-left mb-6 md:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Learning Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 leading-tight">
            How Students Progress Through The Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-1 max-w-2xl">
            Our curriculum builds concepts sequentially. Watch how skills stack from basic logic rules to physical circuits and autonomous machine intelligence.
          </p>
        </div>

        {/* 3D Dashboard Mockup Container */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header Grid Line Deco */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full z-10">
            
            {/* Left Column: 3D Stack visualizer */}
            <div className="flex flex-col items-center justify-center flex-shrink-0 w-[320px] h-[340px] relative">
              
              <div className="absolute -top-6 left-0 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>3D ARCHITECTURE RENDERER ACTIVE</span>
              </div>

              {/* 3D Stack Area with CSS Perspective */}
              <div className="layer-stack-3d w-[320px] h-[320px] relative perspective-1000 preserve-3d">
                
                {/* SVG Wires running between layers in 3D */}
                <svg 
                  className="layer-wires-svg absolute top-0 left-0 w-full h-full pointer-events-none z-10" 
                  viewBox="0 0 320 320" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: 'rotateX(52deg) rotateZ(-30deg)' }}
                >
                  {/* Left Wire connector (L1 -> L2 -> L3) */}
                  <path className="stroke-slate-800 stroke-[1.5px] fill-none" d="M80,240 L80,160 L80,80" />
                  <path 
                    className={`wire-flow-glow fill-none transition-all duration-500 ${getWireGlowStyle(1)}`} 
                    d="M80,240 L80,160 L80,80" 
                  />
                  
                  {/* Center Wire connector */}
                  <path className="stroke-slate-800 stroke-[1.5px] fill-none" d="M160,240 L160,160 L160,80" />
                  <path 
                    className={`wire-flow-glow fill-none transition-all duration-500 ${getWireGlowStyle(2)}`} 
                    d="M160,240 L160,160 L160,80" 
                    style={{ animationDuration: '4s', animationDirection: 'reverse' }}
                  />

                  {/* Right Wire connector */}
                  <path className="stroke-slate-800 stroke-[1.5px] fill-none" d="M240,240 L240,160 L240,80" />
                  <path 
                    className={`wire-flow-glow fill-none transition-all duration-500 ${getWireGlowStyle(3)}`} 
                    d="M240,240 L240,160 L240,80" 
                    style={{ animationDuration: '3s' }}
                  />
                </svg>

                {/* Card 3: Action/Intelligence Layer (Top) */}
                <div 
                  onClick={() => setActiveLayer(3)}
                  className={`absolute left-0 w-full h-[100px] rounded-2xl border bg-slate-950/85 backdrop-blur-md p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 shadow-xl ${
                    activeLayer === 3 
                      ? 'border-emerald-500 bg-slate-900/90 shadow-[0_20px_45px_rgba(16,185,129,0.18)] z-30' 
                      : 'border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/60 z-10'
                  }`}
                  style={{
                    transform: activeLayer === 3
                      ? 'rotateX(52deg) rotateZ(-30deg) translateY(-178px) translateZ(32px)'
                      : 'rotateX(52deg) rotateZ(-30deg) translateY(-170px) translateZ(0px)',
                  }}
                >
                  <div className="flex items-center gap-2.5 border-b border-white/5 pb-2">
                    <div className={`p-1 rounded bg-slate-800/80 border ${activeLayer === 3 ? 'border-emerald-500/30' : 'border-slate-700/50'}`}>
                      {getLayerIcon(3, activeLayer === 3)}
                    </div>
                    <span className="text-xs font-bold text-slate-100">Intelligence Layer</span>
                    <span className="ml-auto text-[10px] font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">L3</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {layers[2].badges.slice(0, 2).map((b, i) => (
                      <span key={i} className="text-[9px] font-medium text-slate-400 border border-slate-800 bg-slate-900 px-2 py-0.5 rounded">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card 2: Assembly/Circuit Layer (Middle) */}
                <div 
                  onClick={() => setActiveLayer(2)}
                  className={`absolute left-0 w-full h-[100px] rounded-2xl border bg-slate-950/85 backdrop-blur-md p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 shadow-xl ${
                    activeLayer === 2 
                      ? 'border-purple-500 bg-slate-900/90 shadow-[0_20px_45px_rgba(168,85,247,0.18)] z-29' 
                      : 'border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/60 z-11'
                  }`}
                  style={{
                    transform: activeLayer === 2
                      ? 'rotateX(52deg) rotateZ(-30deg) translateY(-93px) translateZ(32px)'
                      : 'rotateX(52deg) rotateZ(-30deg) translateY(-85px) translateZ(0px)',
                  }}
                >
                  <div className="flex items-center gap-2.5 border-b border-white/5 pb-2">
                    <div className={`p-1 rounded bg-slate-800/80 border ${activeLayer === 2 ? 'border-purple-500/30' : 'border-slate-700/50'}`}>
                      {getLayerIcon(2, activeLayer === 2)}
                    </div>
                    <span className="text-xs font-bold text-slate-100">Assembly Layer</span>
                    <span className="ml-auto text-[10px] font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">L2</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {layers[1].badges.slice(0, 2).map((b, i) => (
                      <span key={i} className="text-[9px] font-medium text-slate-400 border border-slate-800 bg-slate-900 px-2 py-0.5 rounded">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card 1: Data/Foundation Layer (Bottom) */}
                <div 
                  onClick={() => setActiveLayer(1)}
                  className={`absolute left-0 w-full h-[100px] rounded-2xl border bg-slate-950/85 backdrop-blur-md p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 shadow-xl ${
                    activeLayer === 1 
                      ? 'border-blue-500 bg-slate-900/90 shadow-[0_20px_45px_rgba(59,130,246,0.18)] z-28' 
                      : 'border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/60 z-12'
                  }`}
                  style={{
                    transform: activeLayer === 1
                      ? 'rotateX(52deg) rotateZ(-30deg) translateY(-8px) translateZ(32px)'
                      : 'rotateX(52deg) rotateZ(-30deg) translateY(0px) translateZ(0px)',
                  }}
                >
                  <div className="flex items-center gap-2.5 border-b border-white/5 pb-2">
                    <div className={`p-1 rounded bg-slate-800/80 border ${activeLayer === 1 ? 'border-blue-500/30' : 'border-slate-700/50'}`}>
                      {getLayerIcon(1, activeLayer === 1)}
                    </div>
                    <span className="text-xs font-bold text-slate-100">Foundation Layer</span>
                    <span className="ml-auto text-[10px] font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">L1</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {layers[0].badges.slice(0, 2).map((b, i) => (
                      <span key={i} className="text-[9px] font-medium text-slate-400 border border-slate-800 bg-slate-900 px-2 py-0.5 rounded">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="text-[10px] font-semibold text-slate-500 mt-2 flex gap-4">
                <span>🖱️ Click stack to swap layer</span>
              </div>
            </div>

            {/* Right Column: Information Panel with Tabs */}
            <div className="flex-1 flex flex-col min-h-[300px] w-full max-w-[500px]">
              
              {/* Tab navigation */}
              <div className="flex border-b border-slate-800 w-full mb-6">
                {layers.map(layer => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`flex-1 text-center py-3.5 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                      activeLayer === layer.id
                        ? 'border-slate-100 text-slate-100'
                        : 'border-transparent text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    {layer.level}: {layer.id === 1 ? "Foundation" : layer.id === 2 ? "Assembly" : "Intelligence"}
                  </button>
                ))}
              </div>

              {/* Active content panel with sliding animation */}
              <div className="flex-1 flex flex-col justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col text-left"
                  >
                    {/* Tag badge */}
                    <div className="mb-2">
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest ${activeData.textColor}`}>
                        {activeData.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                      <span>{activeData.title}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 border ${activeData.borderColor} text-slate-300`}>
                        {activeData.level}
                      </span>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                      {activeData.description}
                    </p>

                    {/* Bullet List */}
                    <div className="flex flex-col gap-3">
                      {activeData.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3 group">
                          <CheckCircle2 className={`w-4.5 h-4.5 mt-0.5 flex-shrink-0 ${activeData.textColor} opacity-85 group-hover:scale-110 transition-transform`} />
                          <span className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Inline badges */}
                    <div className="mt-8 flex items-center gap-2.5 flex-wrap">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Tags:</span>
                      {activeData.badges.map((badge, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-800 text-slate-400">
                          {badge}
                        </span>
                      ))}
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
