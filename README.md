# Resume. — AI Resume Builder

A full-stack AI-powered resume builder that helps you create professional resumes in minutes.

## Features
- 🤖 AI-powered content generation using Google Gemini
- 📄 Upload existing PDF resumes and auto-parse content
- 🎨 Multiple templates (Classic, Modern, Minimal) with accent colors
- 📥 Download as ATS-friendly PDF
- 🌙 Dark/Light mode
- 🔐 JWT authentication with secure cookie sessions
- 💾 Save and manage multiple resumes
- ✏️ Drag-and-drop section reordering

## Tech Stack
**Frontend:** React, Vite, Tailwind CSS, DnD Kit  
**Backend:** Node.js, Express.js, MongoDB, JWT  
**AI:** Google Gemini API  

## Setup
1. Clone the repo
2. Add `.env` files for both `client` and `server`
3. Run `npm run dev` in both folders

## Environment Variables
**Client:** `VITE_GEMINI_API_KEY`, `VITE_API_URL`  
**Server:** `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `PORT`, `CLIENT_URL`
