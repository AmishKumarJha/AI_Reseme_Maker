const ResumePreview = ({ data, template, accent }) => {
  const accentMap = {
    blue: "#3b82f6", indigo: "#6366f1", purple: "#a855f7",
    green: "#22c55e", red: "#ef4444", orange: "#f97316",
    teal: "#14b8a6", pink: "#ec4899", black: "#111111",
  };

  const color = accentMap[accent] || "#3b82f6";

  const ContactRow = () => (
    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mt-2">
      {data.email && <span>{data.email}</span>}
      {data.phone && <span>{data.phone}</span>}
      {data.location && <span>{data.location}</span>}
      {data.linkedin && <span>{data.linkedin}</span>}
      {data.website && <span>{data.website}</span>}
    </div>
  );

  const Section = ({ title, content }) =>
    content ? (
      <div className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-2 pb-1 border-b" style={{ color, borderColor: color + "30" }}>
          {title}
        </h3>
        <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">{content}</p>
      </div>
    ) : null;

  const templates = {
    classic: (
      <>
        <div className="text-center mb-6 pb-6 border-b-2" style={{ borderColor: color }}>
          <h1 className="text-3xl font-bold mb-1" style={{ color }}>
            {data.fullName || "Your Name"}
          </h1>
          {data.profession && <p className="text-gray-600 text-sm">{data.profession}</p>}
          <ContactRow />
        </div>
        <Section title="Professional Summary" content={data.summary} />
        <Section title="Experience" content={data.experience} />
        <Section title="Projects" content={data.projects} />
        <Section title="Education" content={data.education} />
        <Section title="Skills" content={data.skills} />
      </>
    ),
    modern: (
      <>
        <div className="p-6 mb-6 text-white rounded-lg" style={{ backgroundColor: color }}>
          <h1 className="text-3xl font-light">{data.fullName || "Your Name"}</h1>
          {data.profession && <p className="opacity-80 mt-1 text-sm">{data.profession}</p>}
          <div className="flex flex-wrap gap-4 text-sm opacity-70 mt-2">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </div>
        <Section title="Professional Summary" content={data.summary} />
        <Section title="Experience" content={data.experience} />
        <Section title="Projects" content={data.projects} />
        <Section title="Education" content={data.education} />
        <Section title="Skills" content={data.skills} />
      </>
    ),
    minimal: (
      <>
        <div className="mb-8">
          <h1 className="text-4xl font-thin tracking-wide text-gray-800">
            {data.fullName || "Your Name"}
          </h1>
          {data.profession && <p className="text-gray-500 text-sm mt-1">{data.profession}</p>}
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </div>
        <Section title="Professional Summary" content={data.summary} />
        <Section title="Experience" content={data.experience} />
        <Section title="Projects" content={data.projects} />
        <Section title="Education" content={data.education} />
        <Section title="Skills" content={data.skills} />
      </>
    ),
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full">
      {templates[template] || templates.classic}
    </div>
  );
};

export default ResumePreview;