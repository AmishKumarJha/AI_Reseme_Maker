const AccentSelector = ({ setAccent, accent }) => {
  const colors = [
    { id: "black", bg: "bg-black-500" },
    { id: "blue", bg: "bg-blue-500" },
    { id: "green", bg: "bg-green-500" },
    { id: "purple", bg: "bg-purple-500" },
    { id: "red", bg: "bg-red-500" },
    { id: "orange", bg: "bg-orange-500" },
    { id: "teal", bg: "bg-teal-500" },
  ];

  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
      <p className="text-sm font-semibold mb-3 text-slate-300">Accent Color</p>
      <div className="flex gap-3 flex-wrap">
        {colors.map((c) => (
          <button
            key={c.id}
            onClick={() => setAccent(c.id)}
            className={`w-7 h-7 rounded-full ${c.bg} transition-all ${
              accent === c.id
                ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                : "opacity-70 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AccentSelector;