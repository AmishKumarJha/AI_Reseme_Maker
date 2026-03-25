import React from "react";
import { LineChart, ShieldCheck, FileDown } from "lucide-react";

const Features = ({ dark }) => {
  const bg = dark ? "bg-black" : "bg-[#f4f4f0]";
  const headingColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-slate-400" : "text-gray-500";
  const badgeBg = dark ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-green-700 bg-green-100 border-green-300";
  const cardHover = dark ? "hover:bg-white/5 hover:border-white/10" : "hover:bg-white hover:border-gray-200 hover:shadow-md";
  const iconColor = dark ? "text-green-400" : "text-green-600";
  const featureText = dark ? "text-slate-400" : "text-gray-500";
  const featureHeading = dark ? "text-white" : "text-gray-900";

  return (
    <section id="features" className={`relative py-24 px-6 md:px-16 ${bg} overflow-hidden transition-colors duration-300`}>
      <div className={`absolute top-1/2 left-1/4 w-[500px] h-[500px] ${dark ? 'bg-green-500/10' : 'bg-green-300/20'} rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none`} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 relative z-10">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 ${badgeBg}`}>
            ✨ Simple Process
          </span>
          <h2 className={`text-3xl md:text-5xl font-semibold mb-6 ${headingColor}`}>Build your resume</h2>
          <p className={`max-w-2xl mx-auto ${subText}`}>
            Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="relative h-[400px] md:h-[500px] w-full">
            <div className="absolute top-0 left-0 w-2/3 h-3/4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop" alt="Resume building" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-3/4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-10">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop" alt="Working on laptop" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { icon: LineChart, title: "Real-Time Analytics", desc: "Get instant insights into your resume's performance and keyword matching." },
              { icon: ShieldCheck, title: "Bank-Grade Security", desc: "End-to-end encryption, 2FA, compliance with strict data standards." },
              { icon: FileDown, title: "Customizable Exports", desc: "Export professional, ATS-friendly PDFs ready for your next application." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className={`p-6 rounded-2xl border border-transparent transition-all duration-200 ${cardHover}`}>
                <div className="flex items-center gap-4 mb-3">
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                  <h3 className={`text-lg font-semibold ${featureHeading}`}>{title}</h3>
                </div>
                <p className={`text-sm pl-10 ${featureText}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;