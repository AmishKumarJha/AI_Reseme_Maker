import React from 'react';
import Banner from '../Components/Home/Banner';
import Hero from '../Components/Home/Hero';
import Features from '../Components/Home/Features';
import Testimonials from '../Components/Home/Testimonials';
import CTA from '../Components/Home/CTA';
import Footer from '../Components/Home/Footer';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { dark } = useTheme();

  return (
    <div className={`min-h-screen font-sans relative transition-colors duration-300 ${dark ? 'bg-black' : 'bg-[#f4f4f0]'}`}>
      <div className="relative z-10">
        <Banner dark={dark} />
        <Hero dark={dark} />
        <Features dark={dark} />
        <Testimonials dark={dark} />
        <CTA dark={dark} />
        <Footer dark={dark} />
      </div>
    </div>
  );
};

export default Home;