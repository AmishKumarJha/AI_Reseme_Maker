import React from "react";
import { Linkedin, Twitter, Youtube, Globe } from "lucide-react";

const Footer = ({ dark }) => {
  const bg = dark ? "bg-black border-white/10" : "bg-[#f4f4f0] border-gray-200";
  const text = dark ? "text-slate-400" : "text-gray-500";
  const heading = dark ? "text-white" : "text-gray-900";
  const link = dark ? "hover:text-green-400" : "hover:text-green-600";
  const iconColor = dark ? "text-slate-500 hover:text-white" : "text-gray-400 hover:text-gray-700";

  return (
    <footer className={`py-12 px-6 border-t transition-colors duration-300 ${bg} ${text}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
        <a href="/" className="inline-block mb-4">
  <img
    src="/src/assets/logo.svg"
    alt="Resume logo"
    className="h-8 opacity-90"
    style={{ filter: dark ? "none" : "invert(1) brightness(0)" }}
  />
</a>
        </div>

        <div>
          <h4 className={`font-semibold mb-4 ${heading}`}>Product</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Support", "Pricing", "Affiliate"].map(item => (
              <li key={item}><a href="#" className={`transition ${link}`}>{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={`font-semibold mb-4 ${heading}`}>Resources</h4>
          <ul className="space-y-2 text-sm">
            {["Company", "Blogs", "Community", "About"].map(item => (
              <li key={item}><a href="#" className={`transition ${link}`}>{item}</a></li>
            ))}
            <li>
              <a href="#" className={`transition ${link} flex items-center gap-2`}>
                Careers
                <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">WE'RE HIRING!</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={`font-semibold mb-4 ${heading}`}>Legal</h4>
          <ul className="space-y-2 text-sm">
            {["Privacy", "Terms"].map(item => (
              <li key={item}><a href="#" className={`transition ${link}`}>{item}</a></li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 text-sm md:text-right flex flex-col items-start md:items-end">
          <p className="mb-6 opacity-80 max-w-xs">
            Making every customer feel valued—no matter the stage of their career.
          </p>
          <div className={`flex gap-4 mb-4 ${iconColor}`}>
            <a href="#" className="transition"><Globe size={20} /></a>
            <a href="#" className="transition"><Linkedin size={20} /></a>
            <a href="#" className="transition"><Twitter size={20} /></a>
            <a href="#" className="transition"><Youtube size={20} /></a>
          </div>
          <p className="text-xs opacity-60">© 2024 Resume Builder</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;