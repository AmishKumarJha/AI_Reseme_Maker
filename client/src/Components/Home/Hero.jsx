import React, { useState } from "react";
import { Link } from "react-router-dom";
import LiquidGlass from "./LiquidGlass";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Hero = ({ dark }) => {
  const { toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const navBg = dark
    ? "border-white/10 backdrop-blur-xl bg-white/5"
    : "border-gray-200 backdrop-blur-xl bg-white/80 shadow-sm";
  const navText = dark ? "text-white hover:text-slate-300" : "text-gray-700 hover:text-green-600";
  const logoColor = dark ? "text-white" : "text-gray-900";
  const heroText = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-slate-300" : "text-gray-600";
  const trustedText = dark ? "text-slate-400" : "text-gray-500";
  const brandOpacity = dark ? "opacity-60 hover:opacity-100" : "opacity-40 hover:opacity-80";
  const mobileBg = dark ? "bg-black border-white/10" : "bg-white border-gray-200";

  return (
    <section className={`relative min-h-screen overflow-hidden transition-colors duration-300`}>

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {dark ? (
          <>
            <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[120px] animate-[float_10s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[120px] animate-[float_12s_ease-in-out_infinite]" />
            <div className="absolute top-[30%] left-[60%] w-[300px] h-[300px] bg-teal-400/20 rounded-full blur-[120px] animate-[float_14s_ease-in-out_infinite]" />
          </>
        ) : (
          <>
            <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-green-300/30 rounded-full blur-[120px] animate-[float_10s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-emerald-300/30 rounded-full blur-[120px] animate-[float_12s_ease-in-out_infinite]" />
            <div className="absolute top-[30%] left-[60%] w-[300px] h-[300px] bg-teal-300/30 rounded-full blur-[120px] animate-[float_14s_ease-in-out_infinite]" />
          </>
        )}
      </div>

      {/* NAVBAR */}
      <nav className={`relative z-20 flex items-center justify-between px-6 md:px-16 py-4 border-b ${navBg}`}>
      <a href="/">
  <img
    src="/src/assets/logo.svg"
    alt="Resume logo"
    className="h-10"
    style={{ filter: dark ? "none" : "invert(1) brightness(0)" }}
  />
</a>

        <div className={`hidden md:flex gap-8 text-sm ${navText}`}>
          <a href="#" className="transition-colors">Home</a>
          <a href="#features" className="transition-colors">Features</a>
          <a href="#testimonials" className="transition-colors">Testimonials</a>
          <a href="#cta" className="transition-colors">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <LiquidGlass dark={dark}>
            <Link to="/register">Get Started</Link>
          </LiquidGlass>
        </div>

        <button className={`md:hidden text-2xl ${dark ? 'text-white' : 'text-gray-900'}`} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className={`md:hidden flex flex-col items-center gap-6 py-8 border-b relative z-20 ${mobileBg} ${navText}`}>
          <a href="#" onClick={closeMenu}>Home</a>
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
          <a href="#cta" onClick={closeMenu}>Contact</a>
          <button onClick={toggleTheme} className={`p-2 rounded-full ${dark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <LiquidGlass dark={dark}><Link to="/register" onClick={closeMenu}>Register</Link></LiquidGlass>
          <LiquidGlass variant="secondary" dark={dark}><Link to="/login" onClick={closeMenu}>Login</Link></LiquidGlass>
        </div>
      )}

      {/* HERO CONTENT */}
      <div className="flex flex-col items-center text-center pt-32 px-6 relative z-10">
        <h1 className={`text-4xl md:text-6xl font-semibold mt-6 max-w-3xl leading-tight ${heroText}`}>
          Land your dream job with{" "}
          <span className="bg-[linear-gradient(90deg,#34d399,#22c55e,#14b8a6,#34d399)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[gradient-shift_6s_linear_infinite] drop-shadow-[0_0_8px_rgba(34,197,94,0.35)]">
            AI-powered
          </span>{" "}
          resumes.
        </h1>

        <p className={`max-w-lg mt-5 ${subText}`}>
          Create, edit and download professional resumes with AI-powered assistance.
        </p>

        <div className="flex gap-4 mt-10">
          <LiquidGlass dark={dark}><Link to="/register">Register</Link></LiquidGlass>
          <LiquidGlass variant="secondary" dark={dark}><Link to="/login">Login</Link></LiquidGlass>
        </div>

        <p className={`mt-24 ${trustedText}`}>Trusted by leading brands</p>

        <div className={`flex flex-wrap items-center justify-center gap-12 mt-10 transition mb-20 ${brandOpacity}`}>
          <img src="https://cdn.simpleicons.org/google/white" alt="Google" className="h-6" style={{ filter: dark ? 'invert(0)' : 'invert(1) brightness(0)' }} />
          <img src="https://cdn.simpleicons.org/nvidia/white" alt="NVIDIA" className="h-6" style={{ filter: dark ? 'invert(0)' : 'invert(1) brightness(0)' }} />
          <img src="https://cdn.simpleicons.org/meta/white" alt="Meta" className="h-6" style={{ filter: dark ? 'invert(0)' : 'invert(1) brightness(0)' }} />
          <img src="https://cdn.simpleicons.org/apple/white" alt="Apple" className="h-6" style={{ filter: dark ? 'invert(0)' : 'invert(1) brightness(0)' }} />
          <img src="https://cdn.simpleicons.org/netflix/white" alt="Netflix" className="h-6" style={{ filter: dark ? 'invert(0)' : 'invert(1) brightness(0)' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;