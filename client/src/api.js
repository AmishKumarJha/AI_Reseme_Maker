const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = async (endpoint, method = "GET", body = null) => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  // Safe JSON parse — prevents "Unexpected end of JSON" crash
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) throw new Error(data.message || "Something went wrong");

  return data;
};

// AUTH
export const registerUser = (name, email, password) =>
  api("/auth/register", "POST", { name, email, password });

export const loginUser = (email, password) =>
  api("/auth/login", "POST", { email, password });

export const logoutUser = () => api("/auth/logout", "POST");

export const getMe = () => api("/auth/me");

// RESUMES
export const getResumes = () => api("/resumes");

export const getResume = (id) => api(`/resumes/${id}`);

export const createResume = (data) => api("/resumes", "POST", data);

export const updateResume = (id, data) => api(`/resumes/${id}`, "PUT", data);

export const deleteResume = (id) => api(`/resumes/${id}`, "DELETE");