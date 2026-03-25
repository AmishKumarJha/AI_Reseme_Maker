import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Trash2, Sun, Moon, Plus, Upload } from "lucide-react";
import { getMe, logoutUser, getResumes, deleteResume, createResume } from "../api";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
        const resumeData = await getResumes();
        setResumes(resumeData);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try { await logoutUser(); } catch (err) {}
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;

      const data = await response.json();
console.log("Gemini raw response:", JSON.stringify(data));
const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
console.log("Extracted text:", text); 
    }

    setUploading(true);

    try {
      // Convert PDF to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Send to Gemini to parse
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  inline_data: {
                    mime_type: "application/pdf",
                    data: base64,
                  }
                },
                {
                  text: `Extract the resume information from this PDF and return ONLY a valid JSON object with these exact fields:
{
  "fullName": "",
  "email": "",
  "phone": "",
  "location": "",
  "profession": "",
  "linkedin": "",
  "website": "",
  "summary": "",
  "experience": "",
  "education": "",
  "skills": "",
  "projects": ""
}
Fill in as much as you can find. Return ONLY the JSON, no markdown, no backticks, no explanation.`
                }
              ]
            }]
          }),
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

      // Clean and parse JSON
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      // Save as new resume and navigate to builder
      const result = await createResume({
        title: parsed.fullName ? `${parsed.fullName}'s Resume` : "Uploaded Resume",
        template: "classic",
        accent: "blue",
        formData: parsed,
      });

      navigate(`/app/builder/${result._id}`);

    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to parse PDF. Please try again or enter details manually.");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const filtered = resumes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const bg = dark ? "bg-black text-white" : "bg-[#f4f4f0] text-gray-900";
  const navBg = dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm";
  const cardBg = dark ? "bg-white/5 border-white/10 hover:border-green-500/50" : "bg-white border-gray-200 hover:border-green-400 shadow-sm hover:shadow-md";
  const statCard = dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm";
  const inputBg = dark ? "bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-green-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-green-500";
  const subText = dark ? "text-slate-400" : "text-gray-500";
  const headingColor = dark ? "text-white" : "text-gray-900";
  const actionCard = dark ? "bg-white/5 border-white/10 hover:border-green-500" : "bg-white border-gray-200 hover:border-green-400 shadow-sm hover:shadow-md";
  const emptyBorder = dark ? "border-white/10 text-slate-400" : "border-gray-300 text-gray-400";
  const toggleBg = dark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700";
  const logoutBtn = dark ? "border-white/20 hover:border-green-500 text-slate-300 hover:text-white" : "border-gray-300 hover:border-green-500 text-gray-600 hover:text-green-600";
  const divider = dark ? "border-white/10" : "border-gray-200";

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${bg}`}>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handlePDFUpload}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: dark ? "rgba(34,197,94,0.1)" : "rgba(134,239,172,0.2)",
          filter: "blur(160px)",
          pointerEvents: "none",
        }}
      />

      {/* NAVBAR */}
      <div className={`relative z-10 flex items-center justify-between px-6 md:px-16 py-4 border-b ${navBg}`}>
        <h1 className={`text-xl font-semibold ${headingColor}`}>
          resume<span className="text-green-500">.</span>
        </h1>
        <div className="flex items-center gap-3">
          <p className={`text-sm ${subText}`}>Hi, {user?.name || "..."}</p>
          <button onClick={toggleTheme} className={`p-2 rounded-full transition-all ${toggleBg}`}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={handleLogout}
            className={`px-4 py-1.5 text-sm rounded-full border transition ${logoutBtn}`}
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-6 md:px-16 py-12">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className={`text-2xl font-semibold ${headingColor}`}>Your Workspace</h2>
            <p className={`text-sm mt-1 ${subText}`}>Manage and build your resumes</p>
          </div>
          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border rounded-full px-5 py-2 text-sm outline-none focus:border-green-500 transition w-full md:w-[260px] ${inputBg}`}
          />
        </div>

        {/* STATS */}
        <div className="flex gap-6 mb-10 flex-wrap">
          <div className={`px-6 py-4 rounded-xl border ${statCard}`}>
            <p className={`text-sm ${subText}`}>Total Resumes</p>
            <p className={`text-2xl font-semibold mt-1 ${headingColor}`}>{resumes.length}</p>
          </div>
          <div className={`px-6 py-4 rounded-xl border ${statCard}`}>
            <p className={`text-sm ${subText}`}>Last Edited</p>
            <p className={`text-lg font-semibold mt-1 ${headingColor}`}>
              {resumes.length > 0 ? formatDate(resumes[0].updatedAt) : "—"}
            </p>
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="flex gap-6 flex-wrap">
          <div
            onClick={() => navigate("/app/builder/new")}
            className={`group w-[180px] h-[180px] border rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer backdrop-blur-md hover:-translate-y-1 transition-all relative overflow-hidden ${actionCard}`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle,rgba(34,197,94,0.1),transparent_70%)]" />
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/20">
              <Plus className="w-6 h-6" />
            </div>
            <p className={`text-sm group-hover:text-green-500 transition ${subText}`}>Create Resume</p>
          </div>

          {/* Upload Existing */}
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`group w-[180px] h-[180px] border rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer backdrop-blur-md hover:-translate-y-1 transition-all relative overflow-hidden ${actionCard} ${uploading ? 'opacity-70 cursor-wait' : ''}`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle,rgba(34,197,94,0.1),transparent_70%)]" />
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg">
              {uploading
                ? <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                : <Upload className="w-5 h-5" />
              }
            </div>
            <p className={`text-sm group-hover:text-green-500 transition ${subText}`}>
              {uploading ? "Parsing PDF..." : "Upload Existing"}
            </p>
          </div>
        </div>

        <div className={`mt-12 border-t ${divider}`} />

        {/* RECENT RESUMES */}
        <div className="mt-10">
          <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Recent Resumes</h3>

          {filtered.length === 0 ? (
            <div className={`text-center py-10 border border-dashed rounded-xl ${emptyBorder}`}>
              {search ? `No resumes matching "${search}"` : "No resumes yet. Start by creating one."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((resume) => (
                <div
                  key={resume._id}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className={`group relative border rounded-2xl p-5 hover:-translate-y-1 transition-all cursor-pointer ${cardBg}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${dark ? 'bg-green-500/10' : 'bg-green-100'}`}>
                    <FileText className="w-5 h-5 text-green-500" />
                  </div>
                  <h4 className={`font-semibold text-sm mb-1 truncate ${headingColor}`}>{resume.title}</h4>
                  <p className={`text-xs capitalize ${subText}`}>{resume.template} · {resume.accent}</p>
                  <p className={`text-xs mt-2 ${subText}`}>{formatDate(resume.updatedAt)}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(resume._id); }}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;