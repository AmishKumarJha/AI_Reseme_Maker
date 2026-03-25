import React from "react";

const Banner = ({ dark }) => {
  return (
    <div className={`w-full py-2.5 text-sm text-center transition-colors duration-300 ${dark ? 'bg-gradient-to-r from-[#0f9b0f] to-[#00c853] text-white' : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'}`}>
      <p>
        <span className={`px-3 py-1 rounded-md mr-2 font-bold ${dark ? 'text-green-600 bg-white' : 'text-green-600 bg-white'}`}>
          New
        </span>
        AI Feature Added
      </p>
    </div>
  );
};

export default Banner;