import React from "react";

const DUMMY_REVIEWS = [
  { id: 1, name: "Avery Johnson", handle: "@averywrites", text: "The AI suggestions completely transformed my bullet points. Landed 3 interviews in my first week!" },
  { id: 2, name: "Jordan Lee", handle: "@jordan_dev", text: "Sleek, fast, and incredibly intuitive. The templates are modern and actually pass ATS checks." },
  { id: 3, name: "Briar Martin", handle: "@briar_stellar", text: "I've tried 5 different resume builders. This is the only one that didn't mess up the formatting on export." },
  { id: 4, name: "Taylor Reed", handle: "@taylor_design", text: "Saved me hours of formatting nightmares. The liquid glass UI is also just gorgeous to look at." },
  { id: 5, name: "Samira Khan", handle: "@samirak", text: "The keyword optimization feature is a game changer. Exactly what I needed to get past the initial screen." },
];

const TestimonialCard = ({ review, dark }) => (
  <div className={`w-[350px] flex-shrink-0 p-6 rounded-2xl border backdrop-blur-sm mx-4 transition-colors duration-300 ${dark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border ${dark ? 'bg-green-900/50 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200'}`}>
        {review.name.charAt(0)}
      </div>
      <div>
        <h4 className={`font-semibold text-sm flex items-center gap-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
          {review.name} <span className="text-green-400 text-xs">✔</span>
        </h4>
        <p className={`text-xs ${dark ? 'text-slate-400' : 'text-gray-500'}`}>{review.handle}</p>
      </div>
    </div>
    <p className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-gray-600'}`}>"{review.text}"</p>
  </div>
);

const Testimonials = ({ dark }) => {
  const bg = dark ? "bg-black" : "bg-[#f4f4f0]";
  const headingColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-slate-400" : "text-gray-500";
  const badgeBg = dark ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-green-700 bg-green-100 border-green-300";
  const fadeLeft = dark ? "from-black" : "from-[#f4f4f0]";
  const fadeRight = dark ? "from-black" : "from-[#f4f4f0]";

  return (
    <section id="testimonials" className={`py-24 overflow-hidden relative transition-colors duration-300 ${bg}`}>
      <div className="text-center mb-16 relative z-10">
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 ${badgeBg}`}>
          💬 Testimonials
        </span>
        <h2 className={`text-3xl md:text-5xl font-semibold mb-6 ${headingColor}`}>Don't just take our words</h2>
        <p className={`max-w-2xl mx-auto ${subText}`}>
          Hear what our users say about us. We're always looking for ways to improve to help you land that dream job.
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className={`absolute top-0 left-0 w-32 h-full bg-gradient-to-r ${fadeLeft} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute top-0 right-0 w-32 h-full bg-gradient-to-l ${fadeRight} to-transparent z-10 pointer-events-none`} />

        <div className="flex animate-[scroll_40s_linear_infinite] group-hover:[animation-play-state:paused] w-[max-content]">
          {DUMMY_REVIEWS.map((review) => (
            <TestimonialCard key={`first-${review.id}`} review={review} dark={dark} />
          ))}
          {DUMMY_REVIEWS.map((review) => (
            <TestimonialCard key={`second-${review.id}`} review={review} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;