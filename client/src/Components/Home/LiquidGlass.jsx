import React, { useRef } from "react";

const LiquidGlass = ({ children, variant = "primary", dark = true }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  };

  const styles = variant === "primary"
    ? "bg-green-600 text-white shadow-lg shadow-green-500/30 hover:bg-green-500"
    : dark
      ? "bg-transparent border border-green-800 text-slate-200 hover:bg-green-950"
      : "bg-transparent border border-green-600 text-gray-800 hover:bg-green-50";

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`liquid-btn cursor-pointer relative px-8 py-3 rounded-full backdrop-blur-xl overflow-hidden transition-all duration-300 hover:scale-105 ${styles}`}
    >
      <span className="relative z-10">{children}</span>
    </div>
  );
};

export default LiquidGlass;