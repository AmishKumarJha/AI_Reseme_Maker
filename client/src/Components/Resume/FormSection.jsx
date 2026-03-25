import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Sparkles, Loader } from "lucide-react";
import { useState } from "react";

const callAI = async (prompt) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini error:", data.error);
    throw new Error(data.error?.message || "Gemini API error");
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

const AIButton = ({ onClick, loading, label = "Enhance with AI", dark }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full justify-center mt-2 ${
      dark
        ? "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/40"
        : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
    }`}
  >
    {loading
      ? <><Loader className="w-4 h-4 animate-spin" /> Generating...</>
      : <><Sparkles className="w-4 h-4" /> {label}</>
    }
  </button>
);

const SortableSection = ({ id, label, formData, handleChange, dark }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const [loading, setLoading] = useState(false);

  const inputClass = dark
    ? "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-green-400/50 transition-all"
    : "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all";

  const enhance = async (fieldName, prompt) => {
    setLoading(true);
    try {
      const result = await callAI(prompt);
      handleChange({ target: { name: fieldName, value: result } });
    } catch (err) {
      console.error("AI error:", err);
      alert("AI generation failed. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    // Safety check
    if (!formData) return null;

    switch (id) {
      case "personal":
        return (
          <div className="space-y-2.5">
            <input name="fullName" value={formData.fullName || ""} onChange={handleChange} placeholder="Full Name" className={inputClass} />
            <input name="profession" value={formData.profession || ""} onChange={handleChange} placeholder="Profession" className={inputClass} />
            <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className={inputClass} />
            <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Phone" className={inputClass} />
            <input name="location" value={formData.location || ""} onChange={handleChange} placeholder="Location" className={inputClass} />
            <input name="linkedin" value={formData.linkedin || ""} onChange={handleChange} placeholder="LinkedIn URL" className={inputClass} />
            <input name="website" value={formData.website || ""} onChange={handleChange} placeholder="Website URL" className={inputClass} />
          </div>
        );

      case "summary":
        return (
          <div className="space-y-2">
            <textarea
              name="summary"
              value={formData.summary || ""}
              onChange={handleChange}
              placeholder="Write a professional summary or generate one with AI..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
            <AIButton
              dark={dark}
              label="Generate Summary with AI"
              loading={loading}
              onClick={() => enhance("summary",
                `Write a professional resume summary for a ${formData.profession || "professional"} named ${formData.fullName || "the candidate"}.
                ${formData.experience ? `Their experience includes: ${formData.experience.substring(0, 300)}` : ""}
                ${formData.skills ? `Skills: ${formData.skills}` : ""}
                Write 2-3 concise, impactful sentences.
                Return ONLY the summary text, no labels, no formatting, no markdown.`
              )}
            />
          </div>
        );

      case "experience":
        return (
          <div className="space-y-2">
            <textarea
              name="experience"
              value={formData.experience || ""}
              onChange={handleChange}
              placeholder="Describe your work experience..."
              rows={5}
              className={`${inputClass} resize-none`}
            />
            <AIButton
              dark={dark}
              label="Enhance Experience with AI"
              loading={loading}
              onClick={() => enhance("experience",
                `Improve and enhance the following work experience for a ${formData.profession || "professional"} resume.
                Use strong action verbs and quantifiable achievements where possible.
                Current text: "${formData.experience || "Software developer with 2 years experience"}"
                Return ONLY the enhanced experience text in clean bullet-point style.
                No labels, no markdown symbols like ** or ##, no extra formatting.`
              )}
            />
          </div>
        );

      case "education":
        return (
          <div className="space-y-2">
            <textarea
              name="education"
              value={formData.education || ""}
              onChange={handleChange}
              placeholder="Describe your education..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
            <AIButton
              dark={dark}
              label="Enhance Education with AI"
              loading={loading}
              onClick={() => enhance("education",
                `Improve the following education section for a resume.
                Make it concise and highlight relevant achievements or coursework.
                Current text: "${formData.education || "Bachelor's degree"}"
                Return ONLY the enhanced education text.
                No labels, no markdown symbols like ** or ##, no extra formatting.`
              )}
            />
          </div>
        );

      case "skills":
        return (
          <div className="space-y-2">
            <input
              name="skills"
              value={formData.skills || ""}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, MongoDB"
              className={inputClass}
            />
            <AIButton
              dark={dark}
              label="Suggest Skills with AI"
              loading={loading}
              onClick={() => enhance("skills",
                `Based on this job role: "${formData.profession || "Software Developer"}"
                and experience: "${formData.experience?.substring(0, 200) || ""}",
                suggest the most relevant and in-demand technical and soft skills.
                Return ONLY a comma-separated list of skills. Maximum 15 skills.
                No labels, no markdown, no extra text.`
              )}
            />
          </div>
        );

      case "projects":
        return (
          <div className="space-y-2">
            <textarea
              name="projects"
              value={formData.projects || ""}
              onChange={handleChange}
              placeholder="Describe your projects..."
              rows={5}
              className={`${inputClass} resize-none`}
            />
            <AIButton
              dark={dark}
              label="Enhance Projects with AI"
              loading={loading}
              onClick={() => enhance("projects",
                `Improve the following projects section for a ${formData.profession || "developer"} resume.
                Make each project description more impactful, highlighting technologies used and outcomes.
                Current text: "${formData.projects || "Built a web application"}"
                Return ONLY the enhanced projects text in clean format.
                No labels, no markdown symbols like ** or ##, no extra formatting.`
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={`rounded-2xl p-4 border backdrop-blur-sm transition-colors duration-300 ${dark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white shadow-sm'}`}>
      <div className="flex items-center gap-2 mb-3 cursor-grab select-none group" {...attributes} {...listeners}>
        <span className="text-slate-600 group-hover:text-slate-400 transition text-base">☰</span>
        <p className={`font-semibold text-sm ${dark ? 'text-slate-300' : 'text-gray-700'}`}>{label}</p>
      </div>
      {renderFields()}
    </div>
  );
};

const FormSection = ({ sections, formData, handleChange, dark }) => {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <SortableSection
          key={section.id}
          id={section.id}
          label={section.label}
          formData={formData}
          handleChange={handleChange}
          dark={dark}
        />
      ))}
    </div>
  );
};

export default FormSection;