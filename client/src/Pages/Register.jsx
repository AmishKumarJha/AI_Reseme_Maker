import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { useTheme } from "../context/ThemeContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await registerUser(form.name, form.email, form.password);
      navigate("/app");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const bg = dark ? "bg-[#0a0a0a]" : "bg-[#f4f4f0]";
  const cardBg = dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-xl";
  const inputBg = dark
    ? "bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-green-400/60"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-green-500";
  const labelColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-slate-400" : "text-gray-500";
  const iconColor = dark ? "text-slate-400" : "text-gray-400";
  const toggleBg = dark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700";
  const linkColor = dark ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700";
  const dividerColor = dark ? "border-white/10" : "border-gray-200";
  const logoColor = dark ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen ${bg} flex items-center justify-center relative overflow-hidden transition-colors duration-300 py-10`}>

      {dark ? (
        <>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-300/10 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5">
        <Link to="/" className={`font-bold text-xl flex items-center gap-1 ${logoColor}`}>
          resume<span className="text-green-500 text-2xl leading-none">.</span>
        </Link>
        <button onClick={toggleTheme} className={`p-2 rounded-full transition-all ${toggleBg}`}>
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4 mt-10">
        <div className={`border rounded-3xl px-8 py-10 backdrop-blur-sm transition-all duration-300 ${cardBg}`}>

          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 text-xl font-bold">r.</span>
            </div>
            <h1 className={`text-3xl font-semibold mb-2 ${labelColor}`}>Create account</h1>
            <p className={`text-sm ${subText}`}>Start building your resume today</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${iconColor}`} />
              <input type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange}
                className={`w-full border rounded-full py-3 pl-11 pr-4 text-sm focus:outline-none transition-all ${inputBg}`} required />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${iconColor}`} />
              <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange}
                className={`w-full border rounded-full py-3 pl-11 pr-4 text-sm focus:outline-none transition-all ${inputBg}`} required />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${iconColor}`} />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange}
                className={`w-full border rounded-full py-3 pl-11 pr-11 text-sm focus:outline-none transition-all ${inputBg}`} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${iconColor} hover:text-green-500`}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${iconColor}`} />
              <input type={showConfirm ? "text" : "password"} name="confirm" placeholder="Confirm password" value={form.confirm} onChange={handleChange}
                className={`w-full border rounded-full py-3 pl-11 pr-11 text-sm focus:outline-none transition-all ${inputBg}`} required />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${iconColor} hover:text-green-500`}>
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password hint */}
            {form.password && (
              <p className={`text-xs -mt-2 ml-2 ${subText}`}>
                {form.password.length < 6 ? "⚠️ Too short — minimum 6 characters"
                  : form.password === form.confirm ? "✅ Passwords match"
                  : "❌ Passwords don't match"}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98] mt-1">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className={`flex-1 border-t ${dividerColor}`} />
              <span className={`text-xs ${subText}`}>or</span>
              <div className={`flex-1 border-t ${dividerColor}`} />
            </div>

            <p className={`text-center text-sm ${subText}`}>
              Already have an account?{" "}
              <Link to="/login" className={`font-medium transition-colors ${linkColor}`}>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;