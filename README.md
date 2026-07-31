<div align="center">

# 🚀 AI Startup Studio

**Turn any 1-sentence raw idea into an investor-ready, market-validated startup blueprint in seconds.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Groq AI](https://img.shields.io/badge/AI-Groq%20Llama%203.3-F34F29?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[🌐 Live Demo](https://sunrisezes.github.io/Ai-Startup-Studio/) • [⚡ Deploy on Vercel](#-deploy-to-vercel-or-netlify) • [📖 Documentation](#-tech-stack--architecture)

---

</div>

## 🌟 Overview

**AI Startup Studio** is an autonomous, ultra-modern founder toolkit powered by **Groq Llama 3.3 70B AI**, **Three.js 3D Canvas**, **Framer Motion**, and **GSAP ScrollTrigger**. It synthesizes **7 complete startup engine modules**—including brand identity, competitive market metrics, landing page copy, monetization models, launch playbooks, and custom AI tools—all generated instantly from a single prompt.

---

## ✨ Core Features

- **⚡ Instant 7-Module Generation**: Formulates full branding, market metrics, strategy, copy, launch timeline, and custom AI tool specifications in seconds.
- **🎨 Cinematic 3D & Physics Motion System**:
  - Interactive `@react-three/fiber` canvas background with cursor-tracking parallax.
  - Smooth inertia scrolling via `Lenis` synced with `GSAP ScrollTrigger`.
  - Dynamic full-viewport animated gradient mesh background.
  - 3D magnetic hover effects & continuous physics spring interactions on buttons.
  - Cursor-following 3D depth tilt on cards.
- **💾 Saved Library Management**: Persists up to 10 generated startup concepts in `localStorage`, complete with active concept switching and instant history retrieval.
- **🔗 Base64 Shareable URLs**: Generate one-click shareable links (`?data=ENCODED`) that preserve and hydrate full concept states instantly without backend dependencies.
- **📊 Interactive Presentation & PDF Export**: Render interactive 3-slide pitch deck presentations and export high-res PDFs using `html2canvas` & `jspdf`.
- **⌨️ Command Palette & Onboarding**: Built-in Command Palette (`⌘K` / `Ctrl+K`), custom API key configuration modal, and interactive step-by-step guided tour.
- **♿ Accessibility & Reduced Motion**: Full compliance with `prefers-reduced-motion: reduce` across Lenis, GSAP, Three.js, and Framer Motion (`<MotionConfig reducedMotion="user">`).

---

## 🧩 7 Startup Engine Modules

| Module | Features & Capabilities |
| :--- | :--- |
| **1. Overview & Pitch** | 4 domain suggestions, Mission & Vision statements, 30-sec Elevator Pitch, 3 investor highlights |
| **2. Brand Identity** | 5-color HSL swatches with hex codes, typography pairings, Midjourney logo prompts, tagline |
| **3. Market Metrics** | TAM / SAM / SOM market breakdown cards, macro industry trends, competitor matrix |
| **4. Copy & Messaging** | H1 / H2 hero copy, 3 value props, 3 customer pain point solutions, social media bio drafts |
| **5. Monetization** | 3-tier pricing architecture with highlighted plan styling, unit economics (CAC/LTV), moat analysis |
| **6. Launch Playbook** | 30-day interactive execution checklist, ProductHunt launch copy, press outreach templates, MVP timeline |
| **7. AI Builder Tools** | Specs for 3 custom internal AI micro-tools, prompt blueprints, input/output schemas |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 19, Vite 8, React Router v7
- **3D Graphics & Visuals**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations & Smooth Scroll**: Framer Motion, GSAP, `ScrollTrigger`, Lenis
- **AI Inference Engine**: Groq Llama 3.3 70B API
- **Styling & Design System**: Vanilla CSS tokens, dark mode glassmorphism, HSL color palettes
- **PDF & Export Utilities**: `html2canvas`, `jspdf`, `lucide-react`

```
Ai-Startup-Studio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages automated deployment pipeline
├── public/
│   ├── favicon.svg              # App favicon
│   └── icons.svg                # SVG sprite assets
├── src/
│   ├── assets/                  # Hero illustrations and vector graphics
│   ├── components/              # 16 reusable UI components (3D canvas, Modals, Cards, Buttons)
│   ├── context/                 # Application state & Toast notification providers
│   ├── hooks/                   # Custom React hooks (analytics, debouncing, smooth scroll)
│   ├── layouts/                 # DashboardLayout & Sidebar navigation
│   ├── pages/                   # Dashboard (7 module views), Home, NotFound
│   ├── services/                # Gemini / Groq API services & structured prompts
│   └── utils/                   # PDF export engines & helper utilities
├── vercel.json                  # Single-page application rewrite config for Vercel
├── vite.config.js               # Vite build optimization & chunking setup
└── README.md
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone Repository

```bash
git clone https://github.com/sunrisezes/Ai-Startup-Studio.git
cd Ai-Startup-Studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Key

Create a `.env.local` file in the root directory:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

*(Note: You can also enter or update your API key directly within the app UI using the "API Key" modal in the sidebar.)*

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deploy to Vercel or Netlify

### Option 1: Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsunrisezes%2FAi-Startup-Studio)

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import `sunrisezes/Ai-Startup-Studio`.
4. Add Environment Variable:
   - `VITE_GROQ_API_KEY`: *(Your Groq API key)*
5. Click **Deploy**. Vercel will automatically build using `vercel.json`.

### Option 2: GitHub Pages (Automated Workflow)

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Go to your repository settings on GitHub: **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push changes to the `main` branch. GitHub Pages will build and host your project automatically!

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `⌘ K` / `Ctrl + K` | Open Command Palette |
| `Esc` | Close Modal / Command Palette |

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and build upon it.
