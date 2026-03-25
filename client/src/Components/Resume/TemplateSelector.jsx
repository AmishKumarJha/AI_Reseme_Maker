const TemplateSelector = ({ setTemplate, template }) => {
  const templates = [
    { id: "classic", label: "Classic" },
    { id: "modern", label: "Modern" },
    { id: "minimal", label: "Minimal" },
  ];

  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
      <p className="text-sm font-semibold mb-3 text-slate-300">Template</p>
      <div className="flex gap-2 flex-wrap">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`px-4 py-1.5 text-sm rounded-full border transition ${
              template === t.id
                ? "bg-green-500 border-green-500 text-black font-semibold"
                : "border-white/20 text-slate-300 hover:border-green-500 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;