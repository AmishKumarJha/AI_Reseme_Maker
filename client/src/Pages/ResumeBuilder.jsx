import React, { useState, useRef, useEffect } from "react";
import FormSection from "../Components/Resume/FormSection";
import { defaultSections } from "../Components/Resume/sectionsConfig";
import ResumePreview from "../Components/Resume/ResumePreview";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import html2pdf from "html2pdf.js";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, Download, Check, ArrowLeft, Sun, Moon } from "lucide-react";
import { createResume, updateResume, getResume } from "../api";
import { useTheme } from "../context/ThemeContext";

const TEMPLATES = [
  { id: "classic", label: "Classic", desc: "A clean, traditional resume format with clear sections and professional typography" },
  { id: "modern", label: "Modern", desc: "Sleek design with strategic use of color and modern font choices" },
  { id: "minimal", label: "Minimal", desc: "Ultra-clean design that puts your content front and center" },
];

const ACCENTS = [
  { id: "blue", hex: "#3b82f6", label: "Blue" },
  { id: "indigo", hex: "#6366f1", label: "Indigo" },
  { id: "purple", hex: "#a855f7", label: "Purple" },
  { id: "green", hex: "#22c55e", label: "Green" },
  { id: "red", hex: "#ef4444", label: "Red" },
  { id: "orange", hex: "#f97316", label: "Orange" },
  { id: "teal", hex: "#14b8a6", label: "Teal" },
  { id: "pink", hex: "#ec4899", label: "Pink" },
  { id: "black", hex: "#111111", label: "Black" },
];

const emptyForm = {
  fullName: "", email: "", phone: "", location: "",
  profession: "", linkedin: "", website: "", summary: "",
  experience: "", education: "", skills: "", projects: "",
};

const Dropdown = ({ label, children, icon, dark }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
          open
            ? dark ? "bg-white/15 border-white/30 text-white" : "bg-gray-200 border-gray-300 text-gray-900"
            : dark ? "bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:text-white" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
        }`}
      >
        {icon && <span>{icon}</span>}
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 z-50 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: dark ? "rgba(10,10,10,0.98)" : "rgba(255,255,255,0.98)",
            backdropFilter: "blur(24px) saturate(180%)",
            border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
            minWidth: "220px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const ResumeBuilder = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [template, setTemplate] = useState("classic");
  const [accent, setAccent] = useState("blue");
  const [sections, setSections] = useState(defaultSections);
  const [mouseInPreview, setMouseInPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { ResumeId } = useParams();

  useEffect(() => {
    const fetchResume = async () => {
      if (ResumeId && ResumeId !== "new") {
        setLoading(true);
        try {
          const data = await getResume(ResumeId);
          setFormData({
            ...emptyForm,
            ...(data.formData || {}),
          });
          setTemplate(data.template || "classic");
          setAccent(data.accent || "blue");
          setResumeId(data._id);
        } catch (err) {
          console.error("Failed to load resume:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchResume();
  }, [ResumeId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const downloadPDF = () => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = "-9999px";
    iframe.style.left = "-9999px";
    iframe.style.width = "794px";
    iframe.style.height = "1123px";
    document.body.appendChild(iframe);

    const accentMap = {
      blue: "#3b82f6", indigo: "#6366f1", purple: "#a855f7",
      green: "#22c55e", red: "#ef4444", orange: "#f97316",
      teal: "#14b8a6", pink: "#ec4899", black: "#111111",
    };
    const color = accentMap[accent] || "#3b82f6";

    const contactInfo = [
      formData.email, formData.phone, formData.location,
      formData.linkedin, formData.website,
    ].filter(Boolean).join(" · ");

    const getTemplateHTML = () => {
      if (template === "classic") {
        return `<div style="text-align:center; border-bottom:2px solid ${color}; padding-bottom:16px; margin-bottom:20px;">
          <h1 style="color:${color}; font-size:28px; margin:0 0 4px 0;">${formData.fullName || "Your Name"}</h1>
          <p style="color:#666; font-size:14px; margin:0 0 8px 0;">${formData.profession || ""}</p>
          <p style="color:#888; font-size:12px; margin:0;">${contactInfo}</p>
        </div>`;
      } else if (template === "modern") {
        return `<div style="background:${color}; color:white; padding:24px; margin-bottom:20px; border-radius:4px;">
          <h1 style="font-size:28px; font-weight:300; margin:0 0 4px 0;">${formData.fullName || "Your Name"}</h1>
          <p style="opacity:0.8; font-size:14px; margin:0 0 8px 0;">${formData.profession || ""}</p>
          <p style="opacity:0.7; font-size:12px; margin:0;">${contactInfo}</p>
        </div>`;
      } else {
        return `<div style="margin-bottom:32px;">
          <h1 style="font-size:32px; font-weight:300; color:#333; margin:0 0 4px 0;">${formData.fullName || "Your Name"}</h1>
          <p style="color:#888; font-size:14px; margin:0 0 8px 0;">${formData.profession || ""}</p>
          <p style="color:#aaa; font-size:12px; margin:0;">${contactInfo}</p>
        </div>`;
      }
    };

    const sectionHTML = (title, content) => content ? `
      <div style="margin-bottom:20px;">
        <h3 style="color:${color}; font-size:11px; text-transform:uppercase; letter-spacing:2px; margin:0 0 8px 0; border-bottom:1px solid ${color}30; padding-bottom:4px;">${title}</h3>
        <p style="color:#555; font-size:13px; line-height:1.6; margin:0; white-space:pre-line;">${content}</p>
      </div>` : "";

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
      <style>* { margin:0; padding:0; box-sizing:border-box; } body { font-family:Georgia,serif; background:white; color:#333; }</style>
      </head><body><div style="padding:40px; background:white;">
        ${getTemplateHTML()}
        ${sectionHTML("Professional Summary", formData.summary)}
        ${sectionHTML("Experience", formData.experience)}
        ${sectionHTML("Projects", formData.projects)}
        ${sectionHTML("Education", formData.education)}
        ${sectionHTML("Skills", formData.skills)}
      </div></body></html>`;

    iframe.contentDocument.open();
    iframe.contentDocument.write(html);
    iframe.contentDocument.close();

    setTimeout(() => {
      html2pdf()
        .set({
          margin: 0,
          filename: `${formData.fullName || "resume"}.pdf`,
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(iframe.contentDocument.body)
        .save()
        .then(() => document.body.removeChild(iframe))
        .catch(() => document.body.removeChild(iframe));
    }, 500);
  };

  const handleSave = async () => {
    try {
      const payload = {
        title: formData.fullName ? `${formData.fullName}'s Resume` : "Untitled Resume",
        template, accent, formData,
      };
      if (resumeId) {
        await updateResume(resumeId, payload);
      } else {
        const result = await createResume(payload);
        setResumeId(result._id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save failed:", err.message);
    }
  };

  const currentAccent = ACCENTS.find((a) => a.id === accent);
  const currentTemplate = TEMPLATES.find((t) => t.id === template);

  const bg = dark ? "bg-black text-white" : "bg-[#f4f4f0] text-gray-900";
  const navBg = dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm";
  const toolbarBg = dark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200";
  const formBg = dark ? "border-white/10" : "border-gray-200 bg-white/50";
  const previewBg = dark ? "bg-black" : "bg-gray-100";
  const backBtn = dark ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-900";
  const toggleBg = dark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700";
  const saveBtn = saved
    ? "border-green-500 text-green-400"
    : dark ? "border-white/20 hover:border-green-500 text-slate-300 hover:text-white" : "border-gray-300 hover:border-green-500 text-gray-600 hover:text-green-600";

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className={`text-sm ${dark ? 'text-slate-400' : 'text-gray-500'}`}>Loading your resume...</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${bg}`}>

      {/* Background glow */}
      <div className={`absolute top-[-200px] left-[-200px] w-[500px] h-[500px] ${dark ? 'bg-green-500/10' : 'bg-green-300/15'} blur-[160px] rounded-full pointer-events-none`} />

      {/* NAVBAR */}
      <div className={`relative z-20 flex items-center justify-between px-6 md:px-10 py-4 border-b backdrop-blur-xl sticky top-0 ${navBg}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/app")} className={`flex items-center gap-2 text-sm transition-all group ${backBtn}`}>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </button>
          <div className={`w-px h-5 ${dark ? 'bg-white/10' : 'bg-gray-300'}`} />
          <h1 className="text-xl font-semibold">
            resume<span className="text-green-500">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className={`p-2 rounded-full transition-all ${toggleBg}`}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2 text-sm rounded-full border transition-all active:scale-[0.98] ${saveBtn}`}>
            {saved && <Check className="w-4 h-4" />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
          <button onClick={downloadPDF}
            className="flex items-center gap-2 px-5 py-2 text-sm rounded-full bg-green-500 hover:bg-green-400 text-black font-semibold transition-all hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98]">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className={`relative z-20 flex items-center gap-3 px-6 md:px-10 py-3 border-b backdrop-blur-md ${toolbarBg}`}>
        <Dropdown label={currentTemplate?.label} icon="🗂" dark={dark}>
          <div className="p-2">
            {TEMPLATES.map((t) => (
              <button key={t.id} onClick={() => setTemplate(t.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  template === t.id
                    ? dark ? "bg-white/10" : "bg-gray-100"
                    : dark ? "hover:bg-white/5" : "hover:bg-gray-50"
                }`}>
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{t.label}</p>
                  {template === t.id && <Check className="w-3 h-3 text-green-400" />}
                </div>
                <p className={`text-xs mt-0.5 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>{t.desc}</p>
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          label={currentAccent?.label}
          dark={dark}
          icon={<span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: currentAccent?.hex }} />}
        >
          <div className="p-3">
            <p className={`text-xs mb-3 px-1 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>Accent Color</p>
            <div className="grid grid-cols-4 gap-2">
              {ACCENTS.map((c) => (
                <button key={c.id} onClick={() => setAccent(c.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${dark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: c.hex }}>
                    {accent === c.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-xs ${dark ? 'text-slate-400' : 'text-gray-500'}`}>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Dropdown>
      </div>

      {/* BODY */}
      <div className="relative z-10 flex h-[calc(100vh-113px)]">
        <div className={`w-[42%] border-r overflow-y-auto p-5 space-y-4 ${formBg}`}>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections} strategy={verticalListSortingStrategy}>
              <FormSection sections={sections} formData={formData} handleChange={handleChange} dark={dark} />
            </SortableContext>
          </DndContext>
        </div>

        <div
          className={`w-[58%] overflow-y-auto p-10 ${previewBg}`}
          onMouseEnter={() => setMouseInPreview(true)}
          onMouseLeave={() => setMouseInPreview(false)}
        >
          <div id="resume-preview">
            <ResumePreview data={formData} template={template} accent={accent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;