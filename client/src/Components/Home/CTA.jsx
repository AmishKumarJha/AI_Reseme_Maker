import React from "react";
import { Link } from "react-router-dom";
import LiquidGlass from "./LiquidGlass";

const CTA = ({ dark }) => {
  const bg = dark ? "bg-black border-white/5" : "bg-[#f4f4f0] border-gray-200";
  const cardBg = dark ? "from-white/5 to-white/0 border-white/10" : "from-green-50 to-white border-green-200 shadow-lg";
  const headingColor = dark ? "text-white" : "text-gray-900";
  const glowBg = dark ? "bg-green-500/20" : "bg-green-300/30";

  return (
    <section id="cta" className={`py-24 px-6 border-t transition-colors duration-300 ${bg}`}>
      <div className={`max-w-5xl mx-auto p-12 md:p-16 rounded-3xl bg-gradient-to-br border relative overflow-hidden text-center flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl ${cardBg}`}>
        <div className={`absolute top-0 right-0 w-64 h-64 ${glowBg} rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none`} />

        <h2 className={`text-2xl md:text-4xl font-semibold text-left max-w-lg leading-tight relative z-10 ${headingColor}`}>
          Build a Professional Resume That Helps You Stand Out and Get Hired
        </h2>

        <div className="relative z-10 shrink-0">
          <LiquidGlass dark={dark}>
            <Link to="/login">Get Started</Link>
          </LiquidGlass>
        </div>
      </div>
    </section>
  );
};

export default CTA;