import React, { useState, useEffect, useLayoutEffect, useRef, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Palette,
  FileText,
  Target,
  Rocket,
  Cpu,
  Layers
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../../context/AppContext';
import useAnalytics from '../../hooks/useAnalytics';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import Card from '../../components/Card/Card';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import AnimateOnScroll from '../../components/AnimateOnScroll/AnimateOnScroll';
import ApiKeyModal from '../../components/ApiKeyModal/ApiKeyModal';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Scene3D = lazy(() => import('../../components/Scene3D/Scene3D'));

const EXAMPLE_CHIPS = [
  { text: 'AgriTech mango supply chain B2B marketplace', color: '#10B981' },
  { text: 'AI-powered clinical note taker for vet clinics', color: '#7C3AED' },
  { text: 'Autonomous drone inventory scanner for warehouses', color: '#06B6D4' },
  { text: 'Hyper-personalized AI language tutor for kids', color: '#F59E0B' },
  { text: 'Decentralized green energy trading marketplace', color: '#6366F1' },
];

const FEATURES = [
  {
    icon: Palette,
    iconBg: 'rgba(124, 58, 237, 0.15)',
    iconColor: '#7C3AED',
    title: 'Brand & Visual Identity',
    description: 'Generated brand names, domain options, color palettes, typography systems, and logo prompts.',
    tags: ['Color Palettes', 'Logo Concepts', 'Typography System']
  },
  {
    icon: FileText,
    iconBg: 'rgba(6, 182, 212, 0.15)',
    iconColor: '#06B6D4',
    title: 'Marketing & Messaging',
    description: 'High-converting landing page copy, value propositions, social media hooks, and email drips.',
    tags: ['Landing Page Copy', 'Value Props', 'Social Hooks']
  },
  {
    icon: Target,
    iconBg: 'rgba(79, 70, 229, 0.15)',
    iconColor: '#4F46E5',
    title: 'Business Strategy',
    description: 'Comprehensive TAM/SAM estimates, pricing tier architectures, and competitive analysis matrices.',
    tags: ['TAM/SAM Estimates', 'Pricing Models', 'Competitor Matrix']
  },
  {
    icon: Rocket,
    iconBg: 'rgba(16, 185, 129, 0.15)',
    iconColor: '#10B981',
    title: 'Launch Playbook',
    description: 'ProductHunt launch timelines, press release templates, investor pitch deck slides, and checklists.',
    tags: ['ProductHunt Plan', 'Pitch Deck', 'Press Release']
  }
];

const STEPS = [
  {
    number: '01',
    title: 'Enter your raw concept',
    description: 'Type a single sentence about your business idea or pick one of our curated industry templates.'
  },
  {
    number: '02',
    title: 'AI Engine generates 7 modules',
    description: 'Groq-powered Llama 3 algorithms construct full branding, strategy, marketing, and launch assets.'
  },
  {
    number: '03',
    title: 'Export pitch deck & launch',
    description: 'Download investor PDFs, launch your landing page copy, and present interactively in real time.'
  }
];

export const Home = () => {
  const [ideaText, setIdeaText] = useState('');
  const { createNewConcept, isGenerating, setIsApiKeyModalOpen } = useApp();
  const { logEvent } = useAnalytics();
  const navigate = useNavigate();

  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howRef = useRef(null);
  const footerRef = useRef(null);
  const cardsGridRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    logEvent('page_view', { page: 'Home' });
  }, [logEvent]);

  // GSAP ScrollTrigger 3D section pinning, cross-fade, and card tilt scrub
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 3D section entrance cross-fade + subtle scaling
      const sections = [heroRef.current, featuresRef.current, howRef.current, footerRef.current].filter(Boolean);

      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0.85, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 0.5,
            },
          }
        );
      });

      // Feature cards staggered 3D tilt-in scrub (rotateX 15deg -> 0deg)
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.feature-card-wrapper');
        gsap.fromTo(
          cards,
          { rotateX: 18, opacity: 0, y: 50 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 0.8,
            },
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const checkApiKeyAndGenerate = async (queryText) => {
    const key = sessionStorage.getItem('groqKey') || localStorage.getItem('groq_api_key') || import.meta.env.VITE_GROQ_API_KEY;
    if (!key) {
      setIsApiKeyModalOpen(true);
      return;
    }
    try {
      await createNewConcept(queryText);
      navigate('/dashboard/overview');
    } catch (err) {
      console.error('Failed to generate startup concept:', err);
    }
  };

  const handleGenerate = (e) => {
    e?.preventDefault();
    if (!ideaText.trim()) return;
    checkApiKeyAndGenerate(ideaText);
  };

  const handleChipClick = (chipText) => {
    setIdeaText(chipText);
    checkApiKeyAndGenerate(chipText);
  };

  return (
    <div className="home-page" ref={mainRef}>
      {/* Top Navbar */}
      <header className="home-navbar">
        <div className="container home-navbar__container">
          <Logo size="md" />
          <div className="home-navbar__actions">
            <ThemeToggle />
            <Button variant="primary" size="sm" onClick={() => navigate('/dashboard/overview')}>
              Launch Studio →
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="home-hero" ref={heroRef}>
        <Suspense fallback={<div className="home-hero__3d-fallback" />}>
          <Scene3D />
        </Suspense>

        <div className="container home-hero__container">
          <AnimateOnScroll>
            <div className="home-hero__badge-wrap">
              <Badge variant="primary" icon={Sparkles}>
                Next-Gen Founder Toolkit Powered by AI
              </Badge>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <h1 className="home-hero__title">
              Turn any raw idea into a <br />
              <span className="home-hero__title-gradient">market-ready startup</span> concept
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <p className="home-hero__subtitle">
              Instantly generate visual identity, market analysis, landing page copy, pricing models, and investor pitch decks in seconds.
            </p>
          </AnimateOnScroll>

          {/* Idea Input Box */}
          <AnimateOnScroll delay={200}>
            <form className="home-hero__input-box" onSubmit={handleGenerate}>
              <input
                type="text"
                className="home-hero__input"
                placeholder="Describe your startup concept in 1 sentence..."
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                disabled={isGenerating}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isGenerating}
                icon={ArrowRight}
                iconPosition="right"
              >
                Generate Startup
              </Button>
            </form>
          </AnimateOnScroll>

          {/* Try an Example Chips */}
          <AnimateOnScroll delay={250}>
            <div className="home-hero__chips-strip">
              <span className="chips-label">Try an example:</span>
              <div className="chips-list">
                {EXAMPLE_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="example-chip"
                    onClick={() => handleChipClick(chip.text)}
                    disabled={isGenerating}
                  >
                    <span className="chip-dot" style={{ backgroundColor: chip.color }} />
                    <span className="chip-text">{chip.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features" ref={featuresRef}>
        <div className="container">
          <div className="section-header">
            <Badge variant="cyan">Complete Ecosystem</Badge>
            <h2>Everything your startup needs to launch</h2>
            <p>From visual identity to go-to-market execution plans, AI Startup Studio covers every angle.</p>
          </div>

          <div className="home-features__grid" ref={cardsGridRef} style={{ perspective: '1000px' }}>
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="feature-card-wrapper">
                  <Card variant="glass" className="feature-card">
                    <div
                      className="feature-card__icon-box"
                      style={{ background: feat.iconBg, color: feat.iconColor }}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="feature-card__title">{feat.title}</h3>
                    <p className="feature-card__desc">{feat.description}</p>
                    <div className="feature-card__tags">
                      {feat.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="feature-tag">{tag}</span>
                      ))}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="home-how" ref={howRef}>
        <div className="container">
          <div className="section-header">
            <Badge variant="primary">Instant Execution</Badge>
            <h2>From 1-Sentence Idea to Investor-Ready Pack</h2>
            <p>Built for rapid validation, hackathons, and serial entrepreneurs.</p>
          </div>

          <div className="home-how__grid">
            {STEPS.map((step, idx) => (
              <div key={idx} className="how-step">
                <div className="how-step__number">{step.number}</div>
                <h3 className="how-step__title">{step.title}</h3>
                <p className="how-step__desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer" ref={footerRef}>
        <div className="container home-footer__container">
          <Logo size="sm" />
          <p className="home-footer__copy">
            © {new Date().getFullYear()} AI Startup Studio. All rights reserved.
          </p>
          <div className="home-footer__badges">
            <Badge variant="secondary" icon={Cpu}>Production Ready Foundation</Badge>
            <Badge variant="secondary" icon={Layers}>Clean Architecture</Badge>
          </div>
        </div>
      </footer>

      <ApiKeyModal />
    </div>
  );
};

export default Home;
