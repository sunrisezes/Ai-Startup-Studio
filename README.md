# AI Startup Studio v1.0 🚀

> **Turn any raw 1-sentence idea into an investor-ready, market-validated startup concept in seconds.**

AI Startup Studio is an autonomous, ultra-modern founder toolkit powered by **Groq Llama 3.3 70B AI**, **Three.js 3D Canvas**, **Framer Motion**, and **GSAP ScrollTrigger**. It synthesizes 7 complete startup engine modules—including branding, competitive market analysis, landing page copy, monetization strategy, launch playbooks, and custom AI tools.

---

## 📸 Screenshots & Showcase

- **3D Hero & Concept Generator**: Floating low-poly 3D geometric canvas with cursor parallax and instant prompt synthesis.
- **Engine Overview**: 4 available domain suggestions, 2-column Mission/Vision statements, Elevator Pitch card, and 3-card Investor Summary.
- **Visual Identity Engine**: Interactive 5-color palette swatches with hex codes, display/body typography pairing, and Midjourney logo prompts.
- **Market & Competitive Matrix**: TAM/SAM/SOM breakdown cards, macro industry trends, and competitor differentiation matrix.
- **Monetization & Strategy**: 3-tier pricing architecture with highlighted plan styling, financial unit economics table (CAC/LTV), and moat analysis.
- **Launch Playbook**: 30-day interactive execution checklist, ProductHunt launch strategy, press email drafts, and 5-phase vertical MVP timeline.

---

## ✨ Features

- **⚡ Instant 7-Module Generation**: Formulates full branding, market metrics, strategy, copy, launch timeline, and tools in a single click.
- **🎨 Cinematic 3D & Motion System**:
  - Interactive `@react-three/fiber` canvas background with cursor-tracking parallax.
  - Smooth inertia scrolling via `Lenis` synced with `GSAP ScrollTrigger`.
  - Full viewport animated gradient mesh background.
  - 3D magnetic hover & continuous physics spring press on buttons.
  - Cursor-following 3D depth tilt on cards.
- **💾 Saved Library Management**: Persists up to 10 generated startup concepts in `localStorage`, complete with active concept switching and checkmarks.
- **🔗 Base64 Shareable URLs**: Generate one-click shareable links (`?data=ENCODED`) that preserve and hydrate full concept states instantly without backend dependencies.
- **📊 Interactive Presentation & PDF Export**: Render interactive 3-slide pitch deck presentations and export high-res PDFs using `html2canvas` & `jspdf`.
- **⌨️ Keyboard Shortcuts & Guided Tour**: Built-in Command Palette (`⌘K`), API key modal configuration, and step-by-step interactive onboarding tour.
- **♿ Reduced Motion & Accessibility**: Full compliance with OS `prefers-reduced-motion: reduce` across Lenis, GSAP, Three.js, and Framer Motion (`<MotionConfig reducedMotion="user">`).

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 19, Vite 8, React Router v7
- **AI Inference Engine**: Groq Llama 3.3 70B API
- **3D & Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations & Scroll**: Framer Motion, GSAP, `ScrollTrigger`, Lenis
- **Styling**: Vanilla CSS tokens, glassmorphism, HSL color palettes
- **Utilities**: `lucide-react`, `jspdf`, `html2canvas`, `classnames`

```
ai-studio/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnimateOnScroll/
│   │   ├── ApiKeyModal/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── CommandPalette/
│   │   ├── CopyButton/
│   │   ├── ErrorBanner/
│   │   ├── GradientMesh/
│   │   ├── GuidedTour/
│   │   ├── Input/
│   │   ├── Logo/
│   │   ├── PresentationModal/
│   │   ├── Reveal/
│   │   ├── Scene3D/
│   │   ├── Skeleton/
│   │   ├── ThemeToggle/
│   │   └── Tooltip/
│   ├── context/
│   │   ├── AppContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/
│   │   ├── useAnalytics.js
│   │   ├── useDebounce.js
│   │   └── useSmoothScroll.js
│   ├── layouts/
│   │   ├── DashboardLayout/
│   │   └── Sidebar/
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── components/ (Overview, Market, Branding, Marketing, Business, Launch, AIBuilderTools)
│   │   ├── Home/
│   │   └── NotFound/
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── generatorEngine.js
│   │   └── prompts.js
│   └── utils/
│       └── exportPdf.js
├── vite.config.js
└── README.md
```

---

## 🚀 Installation & Local Development

### 1. Clone & Install Dependencies

```bash
cd "Ai Studio"
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root and add your Groq API Key:

```env
VITE_GROQ_API_KEY=gsk_your_actual_groq_api_key_here
```

> *(Alternatively, you can leave `.env.local` blank and enter your key inside the app via the "API Key" modal in the sidebar.)*

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧠 AI Prompt Engine

All AI prompts are defined in `src/services/prompts.js` with strict structured JSON contracts:

```javascript
Respond with ONLY valid JSON. No markdown code fences. No explanation text. No preamble.
```

The system uses `generatorEngine.js` to construct prompts dynamically, query Groq Llama 3.3 70B, and parse valid JSON with robust fallback error handling.

---

## 📦 Production Build & Deployment

To generate a optimized production bundle:

```bash
npm run build
```

The build is configured with `esbuild` minification, dynamic code-splitting across all 7 dashboard views (`React.lazy` + `Suspense`), vendor chunk isolation, and link prefetching.

### Deploying to Vercel or Netlify

1. Upload the project repository to GitHub / GitLab.
2. Connect to **Vercel** or **Netlify**.
3. Set Environment Variable: `VITE_GROQ_API_KEY`.
4. Build Command: `npm run build`
5. Output Directory: `dist`

---

## 📜 License

MIT License © 2026 AI Startup Studio. All rights reserved.
