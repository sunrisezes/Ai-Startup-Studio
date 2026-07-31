<div align="center">

# 🚀 AI Startup Studio

**Turn any 1-sentence raw idea into an investor-ready, market-validated startup blueprint in seconds.**

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-startup-studio-eight.vercel.app)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Groq AI](https://img.shields.io/badge/AI-Groq%20Llama%203.3-F34F29?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[⚡ Live Application on Vercel](https://ai-startup-studio-eight.vercel.app) • [🚀 Deploy to Vercel](#-deploying-to-vercel) • [📖 Tech Specs & Architecture](#-tech-stack--architecture)

---

</div>

## 🌟 Executive Summary

**AI Startup Studio** is an autonomous, ultra-modern founder toolkit powered by **Groq Llama 3.3 70B AI**, **Three.js 3D Canvas**, **Framer Motion**, and **GSAP ScrollTrigger**. It synthesizes **7 complete startup engine modules**—including brand identity, competitive market metrics, landing page copy, monetization models, launch playbooks, and custom AI tools—all generated instantly from a single prompt.

Designed with a high-end dark glassmorphism aesthetic, responsive physics-based motion, and zero backend friction, AI Startup Studio turns rough concepts into polished pitch decks and execution plans in seconds.

---

## ✨ Key Features

- **⚡ Instant 7-Module Generation**: Formulates full branding, market metrics, strategy, copy, launch timeline, and custom AI tool specifications in a single click.
- **🎨 Cinematic 3D & Motion System**:
  - Interactive `@react-three/fiber` canvas background with cursor-tracking parallax.
  - Inertia smooth scrolling powered by `Lenis` & `GSAP ScrollTrigger`.
  - Full-viewport animated gradient mesh background.
  - 3D magnetic hover effects & continuous physics spring press interactions.
- **📱 100% Mobile Responsive**: Fully optimized layouts, flex containers, touch targets, and responsive grids for smartphones, tablets, and desktops.
- **💾 Saved Library Management**: Persists up to 10 generated startup concepts in `localStorage` with active concept switching and instant library retrieval.
- **🔗 Base64 Shareable URLs**: One-click shareable links (`?data=ENCODED`) that preserve and hydrate full concept states instantly without external database dependencies.
- **📊 Presentation Mode & High-Res PDF Export**: Render interactive 3-slide pitch deck presentations and export vector PDFs using `html2canvas` & `jspdf`.
- **⌨️ Keyboard Command Palette**: Global Command Palette (`⌘K` / `Ctrl+K`), custom API key configuration modal, and interactive guided tour.

---

## 🧩 7 Startup Engine Modules

| Module | Features & Capabilities |
| :--- | :--- |
| **1. Overview & Pitch** | 4 domain suggestions, Mission & Vision statements, 30-sec Elevator Pitch, 3 investor highlights |
| **2. Brand Identity** | 5-color HSL swatches with hex codes, typography pairings, Midjourney logo prompts, brand tagline |
| **3. Market Metrics** | TAM / SAM / SOM market size cards, macro industry trends, competitor differentiation matrix |
| **4. Copy & Messaging** | H1 / H2 hero copy, 3 value props, 3 customer pain point solutions, social media bio drafts |
| **5. Monetization** | 3-tier pricing architecture with highlighted plan styling, unit economics (CAC/LTV), moat analysis |
| **6. Launch Playbook** | 30-day interactive execution checklist, ProductHunt launch strategy, press outreach templates, MVP timeline |
| **7. AI Builder Tools** | Specs for 3 custom internal AI micro-tools, prompt blueprints, input/output schemas |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 19, Vite 8, React Router v7
- **3D Graphics & Visuals**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations & Smooth Scroll**: Framer Motion, GSAP, `ScrollTrigger`, Lenis
- **AI Inference Engine**: Groq Llama 3.3 70B API
- **Styling**: Vanilla CSS tokens, dark mode glassmorphism, HSL color palettes
- **PDF & Export Utilities**: `html2canvas`, `jspdf`, `lucide-react`

```
Ai-Startup-Studio/
├── public/
│   ├── favicon.svg              # App favicon
│   └── icons.svg                # SVG sprite assets
├── src/
│   ├── assets/                  # Vector illustrations and graphics
│   ├── components/              # 16 modular UI components (3D canvas, Modals, Cards, Buttons)
│   ├── context/                 # Application state & Toast notification providers
│   ├── hooks/                   # Custom hooks (analytics, debouncing, smooth scroll)
│   ├── layouts/                 # DashboardLayout & Sidebar navigation
│   ├── pages/                   # Dashboard (7 engine views), Home, NotFound
│   ├── services/                # Groq AI services & structured prompts
│   └── utils/                   # PDF export engines & helper utilities
├── vercel.json                  # Single-page application rewrite config for Vercel
├── vite.config.js               # Vite build configuration & code splitting setup
└── README.md
```

---

## 🚀 Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsunrisezes%2FAi-Startup-Studio)

### Step-by-Step Vercel Setup:

1. **Import Repository**: Connect your GitHub account and import `sunrisezes/Ai-Startup-Studio`.
2. **Environment Variables**: Add the following variable under **Project Settings > Environment Variables**:
   - **Key**: `VITE_GROQ_API_KEY`
   - **Value**: `gsk_your_actual_groq_api_key_here`
3. **Build & Deploy**: Click **Deploy**. Vercel will automatically run `npm run build` and route all single-page app routes seamlessly using `vercel.json`.

---

## 💻 Local Setup & Development

### 1. Clone Repository

```bash
git clone https://github.com/sunrisezes/Ai-Startup-Studio.git
cd Ai-Startup-Studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Local Environment

Create a `.env.local` file in the project root directory:

```env
VITE_GROQ_API_KEY=gsk_your_actual_groq_api_key_here
```

*(Note: You can also configure or update your API key directly inside the running app via the **API Key** modal in the sidebar.)*

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `⌘ K` / `Ctrl + K` | Open Command Palette |
| `Esc` | Close Active Modal / Command Palette |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
