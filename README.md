# AI Resume Maker

A full-stack AI-powered resume builder that helps users create professional resumes with intelligent content generation and multiple template options.

---

## Features

- AI-Powered Writing — Generate and enhance resume sections using Google Gemini AI
- Multiple Templates — Classic, Modern, and Minimal resume layouts
- Accent Colors — Customize your resume with 9 different accent colors
- PDF Export — Download your resume as a professional PDF
- Authentication — Secure register/login with JWT and HTTP-only cookies
- Save and Load — Save resumes to MongoDB and access them anytime
- Drag and Drop — Reorder resume sections with drag and drop
- Dark Theme — Clean dark UI with mouse glow effect

---

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- React Router DOM
- DND Kit (drag and drop)
- html2pdf.js
- Lucide React
- Google Gemini AI API

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Cookie Parser
- CORS

---

## Project Structure
```
AI Resume Maker/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   │   ├── Home/
│   │   │   └── Resume/
│   │   ├── Pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── .env
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API Key

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Oisheek/AI-Resume-Maker.git
cd AI-Resume-Maker
```

**2. Setup the backend:**
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resumeDB
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**3. Setup the frontend:**
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Running the Application

**Start the backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Start the frontend (Terminal 2):**
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Login to existing account |
| POST | `/api/auth/logout` | Logout current user |
| GET | `/api/auth/me` | Get current user details |

### Resumes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resumes` | Get all resumes for current user |
| GET | `/api/resumes/:id` | Get a single resume by ID |
| POST | `/api/resumes` | Create a new resume |
| PUT | `/api/resumes/:id` | Update an existing resume |
| DELETE | `/api/resumes/:id` | Delete a resume |

---

## AI Features

Powered by Google Gemini AI. Each resume section includes an AI enhancement button:

- **Professional Summary** — Generates a tailored summary based on role and experience
- **Experience** — Rewrites with strong action verbs and quantifiable achievements
- **Education** — Polishes and formats education details
- **Skills** — Suggests relevant technical and soft skills based on job role
- **Projects** — Enhances project descriptions with impact and technologies used

Get your free API key at [aistudio.google.com](https://aistudio.google.com)

---

## License

MIT License

---

## Author

**Oisheek Chattopadhyay**

GitHub: [github.com/Oisheek](https://github.com/Oisheek)