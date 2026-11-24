import React, { useState, useEffect } from 'react';
import './App.css';
import heroMunnarPhoto from './assets/images/hero-munnar.jpg';
import ootyPhoto from './assets/images/ooty.jpg';
import goaPhoto from './assets/images/goa.jpg';
import manaliPhoto from './assets/images/manali.jpg';

/* ==========================================================================
   INTERFACES & COMPONENT DATA
   ========================================================================== */

interface DestinationItem {
  id: string;
  name: string;
  state: string;
  category: string;
  description: string;
  tags: string[];
  stats: string;
  image: string;
  imageAlt: string;
}

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
}

interface StepItem {
  number: string;
  title: string;
  description: string;
  preview: string;
}

/* ==========================================================================
   STATIC LANDING CONTENT
   ========================================================================== */

const DESTINATIONS_DATA: DestinationItem[] = [
  {
    id: 'ooty',
    name: 'Ooty',
    state: 'Tamil Nadu',
    category: 'Hill Station',
    description:
      'Rolling Nilgiri tea estates, misty viewpoints, and the heritage toy train winding through pine forests.',
    tags: ['Tea Plantations', 'Misty Hills', 'Cool Climate'],
    stats: 'Best: Oct–May • Avg. 16°C • 3–5 Days',
    image: ootyPhoto,
    imageAlt: 'Lush green terraced tea gardens and rolling Nilgiri mountain hills in Ooty, Tamil Nadu',
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'West Coast',
    category: 'Coastal Getaway',
    description:
      'Golden sun-kissed beaches, Portuguese-colonial architecture, vibrant spice plantations, and seaside dining.',
    tags: ['Arabian Sea', 'Coastal Cuisine', 'Sun & Surf'],
    stats: 'Best: Nov–Feb • Avg. 28°C • 4–6 Days',
    image: goaPhoto,
    imageAlt: 'Tropical sandy beach and turquoise coastline with coconut palm trees in Goa',
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    category: 'Highland Alpine',
    description:
      'Towering snow-clad Himalayan peaks, apple orchards, glacial rivers, and high-altitude mountain passes.',
    tags: ['Himalayan Peaks', 'Alpine Adventure', 'Snow Trails'],
    stats: 'Best: Year-round • Avg. 12°C • 5–7 Days',
    image: manaliPhoto,
    imageAlt: 'The tranquil Beas River flowing through pine-covered valleys and Himalayan mountains in Manali',
  },
];

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'itineraries',
    title: 'Personalized Itineraries',
    description:
      'Dynamic day-wise plans crafted from your unique pace, preferences, and dietary needs—never cookie-cutter templates.',
    tag: 'Custom Travel Logic',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: 'discovery',
    title: 'Transport & Hotel Discovery',
    description:
      'Seamless coordination across trains, flights, road transit, and handpicked boutique stays verified for comfort and proximity.',
    tag: 'Multi-Modal Synergy',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'weather',
    title: 'Weather-Aware Planning',
    description:
      'Continuous microclimate monitoring predicts precipitation, fog, or road conditions ahead of time with proactive reschedule proposals.',
    tag: 'Predictive Safeguards',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    id: 'budget',
    title: 'Budget Optimization',
    description:
      'Transparent expense modeling allocating resources smartly across transit, stays, food, and activities to maximize every rupee.',
    tag: '₹ Max Value Engine',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
        <path d="M16 12h.01" />
        <path d="M12 12h.01" />
      </svg>
    ),
  },
];

const STEPS_DATA: StepItem[] = [
  {
    number: '01',
    title: 'Enter Destination & Preferences',
    description:
      'Tell RAVEL where you wish to go, your dates, travel party size, budget, and travel vibe (adventure, relaxation, food, or culture).',
    preview: 'Takes under 2 minutes • No account required to browse',
  },
  {
    number: '02',
    title: 'AI Coordinates Everything',
    description:
      'Four specialized autonomous agents evaluate transit options, verify handpicked stays, analyze weather forecasts, and optimize costs.',
    preview: 'Transit ⇄ Stays ⇄ Microclimates ⇄ Budget synced',
  },
  {
    number: '03',
    title: 'Review & Personalize',
    description:
      'Inspect your complete interactive timeline, examine itemized cost breakdowns, adjust preferences, and approve your journey.',
    preview: 'Human-in-the-loop control • You remain in charge',
  },
];

/* ==========================================================================
   MAIN LANDING PAGE COMPONENT
   ========================================================================== */

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authFullName, setAuthFullName] = useState<string>('');
  const [authFeedback, setAuthFeedback] = useState<string | null>(null);

  // Active section tracking for smooth anchor highlighting
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Destination planner selection modal
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const destinationsEl = document.getElementById('destinations');
      const featuresEl = document.getElementById('features');
      const howEl = document.getElementById('how-it-works');

      if (howEl && scrollPos >= howEl.offsetTop) {
        setActiveSection('how-it-works');
      } else if (featuresEl && scrollPos >= featuresEl.offsetTop) {
        setActiveSection('features');
      } else if (destinationsEl && scrollPos >= destinationsEl.offsetTop) {
        setActiveSection('destinations');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuth = (tab: 'login' | 'signup') => {
    setAuthModalTab(tab);
    setAuthFeedback(null);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const closeAuth = () => {
    setAuthModalOpen(false);
    setAuthFeedback(null);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) {
      setAuthFeedback('Please enter your email address.');
      return;
    }
    if (authModalTab === 'login') {
      setAuthFeedback(`Welcome back to RAVEL! Authenticating ${authEmail}...`);
    } else {
      setAuthFeedback(`Welcome to RAVEL, ${authFullName || 'Traveller'}! Creating your profile...`);
    }
    setTimeout(() => {
      closeAuth();
      setAuthEmail('');
      setAuthPassword('');
      setAuthFullName('');
    }, 1800);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* ====================================================================
          1. HEADER COMPONENT
          Fixed at top, RAVEL logo, Explore / How It Works / Destinations, Login & Sign Up
          ==================================================================== */}
      <header className="site-header" role="banner">
        <div className="header-container">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="brand-link"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="brand-emblem" aria-hidden="true">
              {/* Stylized woven compass / multi-agent path logo */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  fill="#FFFFFF"
                />
                <circle cx="12" cy="12" r="3" fill="#89F5E7" />
              </svg>
            </div>
            <div className="brand-text-group">
              <span className="brand-title">RAVEL</span>
              <span className="brand-tagline">AI Travel Planner</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="site-nav" role="navigation" aria-label="Main Navigation">
            <ul className="nav-links">
              <li>
                <button
                  type="button"
                  className={`nav-link ${activeSection === 'destinations' ? 'active' : ''}`}
                  onClick={() => scrollTo('destinations')}
                >
                  Explore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
                  onClick={() => scrollTo('how-it-works')}
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-link ${activeSection === 'destinations' ? 'active' : ''}`}
                  onClick={() => scrollTo('destinations')}
                >
                  Destinations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
                  onClick={() => scrollTo('features')}
                >
                  Features
                </button>
              </li>
            </ul>
          </nav>

          {/* Desktop Header Actions */}
          <div className="header-actions">
            <button
              type="button"
              className="btn-header-login"
              onClick={() => openAuth('login')}
            >
              Login
            </button>
            <button
              type="button"
              className="btn-header-signup"
              onClick={() => openAuth('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" role="dialog" aria-modal="true">
            <ul className="mobile-nav-links">
              <li>
                <button
                  type="button"
                  className="mobile-nav-link"
                  onClick={() => scrollTo('destinations')}
                >
                  Explore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="mobile-nav-link"
                  onClick={() => scrollTo('how-it-works')}
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="mobile-nav-link"
                  onClick={() => scrollTo('destinations')}
                >
                  Destinations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="mobile-nav-link"
                  onClick={() => scrollTo('features')}
                >
                  Features
                </button>
              </li>
            </ul>

            <div className="mobile-actions">
              <button
                type="button"
                className="btn-header-signup"
                onClick={() => openAuth('signup')}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="btn-header-login"
                onClick={() => openAuth('login')}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          MAIN CONTENT AREA
          ==================================================================== */}
      <main id="main-content" role="main">
        {/* ==================================================================
            2. HERO SECTION
            Heading: Plan smarter. Travel better.
            Description of RAVEL AI-powered personalized travel planning
            CTAs: Explore Destinations & Start Planning
            Large scenic travel image + Floating AI assistant status card
            ================================================================== */}
        <section id="hero" className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-container">
            {/* Live Status Eyebrow Badge */}
            <div className="hero-eyebrow">
              <span className="pulse-dot" aria-hidden="true" />
              <span>Agentic AI Multi-Agent Engine</span>
            </div>

            {/* Editorial Heading */}
            <h1 id="hero-heading" className="hero-title">
              Plan <span className="editorial-italic">smarter</span>. Travel{' '}
              <span className="editorial-italic">better</span>.
            </h1>

            {/* Subtitle Description */}
            <p className="hero-subtitle">
              RAVEL coordinates specialized autonomous AI agents for transport, stays,
              curated local activities, and live microclimates—crafting and adapting your
              personalized travel journey in real time.
            </p>

            {/* Primary & Secondary Action Group */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="btn-primary-pill"
                onClick={() => scrollTo('destinations')}
              >
                <span>Explore Destinations</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                type="button"
                className="btn-secondary-pill"
                onClick={() => openAuth('signup')}
              >
                <span>Start Planning</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
            </div>

            {/* Large Scenic Travel Visual (21:9 aspect ratio) */}
            <div className="hero-media-wrapper">
              <img
                src={heroMunnarPhoto}
                alt="Panoramic view of emerald Munnar tea plantations and mist-covered Western Ghats mountain ridges in Kerala, India"
                className="hero-photo"
                loading="eager"
                decoding="async"
              />
              <div className="hero-scrim-overlay" aria-hidden="true" />

              {/* Floating AI Assistant Status Card / HUD Panel */}
              <aside className="hero-hud-card" aria-label="RAVEL AI Assistant Live Status">
                <div className="hud-top-row">
                  <div className="hud-status-badge">
                    <span className="hud-pulse-ring" aria-hidden="true" />
                    <span>Ravel AI Assistant</span>
                  </div>
                  <div className="hud-confidence-chip">
                    98.4% Optimization Confidence
                  </div>
                </div>

                <p className="hud-engine-desc">
                  Multi-Agent Engine Active • 4 Specialized Agents Synchronized for Seamless Routing
                </p>

                {/* Synchronized Agent Status Grid */}
                <div className="hud-agents-grid">
                  <div className="hud-agent-pill">
                    <svg className="hud-agent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <div className="hud-agent-info">
                      <span className="hud-agent-name">Transport Agent</span>
                      <span className="hud-agent-status">Rail & Flights Synced</span>
                    </div>
                  </div>

                  <div className="hud-agent-pill">
                    <svg className="hud-agent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <div className="hud-agent-info">
                      <span className="hud-agent-name">Hotel Agent</span>
                      <span className="hud-agent-status">Boutique Stays Verified</span>
                    </div>
                  </div>

                  <div className="hud-agent-pill">
                    <svg className="hud-agent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    </svg>
                    <div className="hud-agent-info">
                      <span className="hud-agent-name">Weather Agent</span>
                      <span className="hud-agent-status">Clear Skies Forecast</span>
                    </div>
                  </div>

                  <div className="hud-agent-pill">
                    <svg className="hud-agent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <div className="hud-agent-info">
                      <span className="hud-agent-name">Budget Optimizer</span>
                      <span className="hud-agent-status">Optimal ₹ Balance</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. FEATURED DESTINATIONS SECTION
            Ooty, Goa, Manali
            3 destination cards with travel images, names and short descriptions
            ================================================================== */}
        <section id="destinations" className="destinations-section" aria-labelledby="destinations-heading">
          <div className="destinations-container">
            <div className="section-header">
              <span className="section-eyebrow">Curated Getaways</span>
              <h2 id="destinations-heading" className="section-title">
                Featured Destinations
              </h2>
              <p className="section-subtitle">
                Explore handpicked Indian destinations with instant multi-agent planning,
                intelligent route sequencing, and continuous disruption safeguards.
              </p>
            </div>

            {/* 3-column responsive destination cards */}
            <div className="destinations-grid">
              {DESTINATIONS_DATA.map((dest) => (
                <article key={dest.id} className="destination-card">
                  <div className="card-image-wrapper">
                    <img
                      src={dest.image}
                      alt={dest.imageAlt}
                      className="card-photo"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="card-image-overlay" aria-hidden="true" />
                    <span className="card-badge">{dest.category}</span>
                  </div>

                  <div className="card-body">
                    <div className="card-title-row">
                      <h3 className="card-destination-name">{dest.name}</h3>
                      <span className="card-destination-state">{dest.state}</span>
                    </div>

                    <p className="card-description">{dest.description}</p>

                    <div className="card-meta-chips">
                      {dest.tags.map((tag) => (
                        <span key={tag} className="card-chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="card-footer">
                      <span className="card-stats-text">{dest.stats}</span>
                      <button
                        type="button"
                        className="card-action-btn"
                        onClick={() => setSelectedDestination(dest)}
                      >
                        <span>Plan {dest.name} Trip</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. KEY FEATURES SECTION
            Personalized Itineraries, Transport & Hotel Discovery,
            Weather-Aware Planning, Budget Optimization
            ================================================================== */}
        <section id="features" className="features-section" aria-labelledby="features-heading">
          <div className="features-container">
            <div className="section-header">
              <span className="section-eyebrow">Agentic Intelligence</span>
              <h2 id="features-heading" className="section-title">
                Key Features
              </h2>
              <p className="section-subtitle">
                Autonomous multi-agent orchestration replaces hours of scattered searching
                with intelligent, synchronized travel design.
              </p>
            </div>

            {/* 4-column feature grid */}
            <div className="features-grid">
              {FEATURES_DATA.map((feature) => (
                <div key={feature.id} className="feature-card">
                  <div className="feature-icon-box" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <span className="feature-highlight-badge">{feature.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. HOW IT WORKS SECTION
            Step 01 Enter Destination & Preferences
            Step 02 AI Coordinates Everything
            Step 03 Review & Personalize
            ================================================================== */}
        <section id="how-it-works" className="how-it-works-section" aria-labelledby="how-heading">
          <div className="how-container">
            <div className="section-header">
              <span className="section-eyebrow">Seamless Process</span>
              <h2 id="how-heading" className="section-title">
                How It Works
              </h2>
              <p className="section-subtitle">
                From initial idea to fully coordinated, disruption-resilient travel in three effortless steps.
              </p>
            </div>

            {/* 3 Steps responsive grid */}
            <div className="steps-grid">
              {STEPS_DATA.map((step) => (
                <div key={step.number} className="step-card">
                  <div className="step-number-row">
                    <span className="step-counter">Step {step.number}</span>
                    <div className="step-flow-indicator" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  <div className="step-micro-preview">
                    <span className="step-micro-dot" aria-hidden="true" />
                    <span>{step.preview}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. CTA SECTION
            Encourage users to start planning with primary and secondary actions
            ================================================================== */}
        <section className="cta-section" aria-labelledby="cta-heading">
          <div className="cta-container">
            <div className="cta-banner-card">
              <div className="cta-banner-content">
                <h2 id="cta-heading" className="cta-title">
                  Ready to experience <span className="editorial-italic">effortless</span>, intelligent travel?
                </h2>
                <p className="cta-desc">
                  Join travellers who plan smarter and travel better without the friction of
                  manual coordination or unexpected weather disruption.
                </p>

                <div className="cta-actions">
                  <button
                    type="button"
                    className="btn-cta-primary"
                    onClick={() => openAuth('signup')}
                  >
                    Start Planning Your Trip
                  </button>
                  <button
                    type="button"
                    className="btn-cta-secondary"
                    onClick={() => scrollTo('destinations')}
                  >
                    Explore Destinations
                  </button>
                </div>

                <div className="cta-trust-indicators">
                  <span className="trust-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    No credit card required
                  </span>
                  <span className="trust-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Instant multi-agent generation
                  </span>
                  <span className="trust-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Human-in-the-loop control
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          7. FOOTER COMPONENT
          RAVEL brand description; Explore, Features and Support links;
          copyright © 2026 RAVEL. All rights reserved.; tagline Plan smarter. Travel better.
          ==================================================================== */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <div className="brand-link">
                <div className="brand-emblem" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                      fill="#FFFFFF"
                    />
                    <circle cx="12" cy="12" r="3" fill="#89F5E7" />
                  </svg>
                </div>
                <div className="brand-text-group">
                  <span className="brand-title">RAVEL</span>
                  <span className="brand-tagline">AI Travel Planner</span>
                </div>
              </div>

              <p className="footer-desc">
                RAVEL is an Agentic AI-Based Multi-Agent System for Personalized Travel
                Planning and Dynamic Replanning. Seamlessly coordinating transport, stays,
                curated experiences, and weather intelligence.
              </p>

              <p className="footer-tagline-quote">
                &ldquo;Plan smarter. Travel better.&rdquo;
              </p>
            </div>

            {/* Explore Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Explore</h4>
              <ul className="footer-link-list">
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('destinations')}>
                    Ooty Getaways
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('destinations')}>
                    Goa Coastline
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('destinations')}>
                    Manali Highlands
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('destinations')}>
                    Curated Stays
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('destinations')}>
                    Scenic Road Routes
                  </button>
                </li>
              </ul>
            </div>

            {/* Features Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Features</h4>
              <ul className="footer-link-list">
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('features')}>
                    Personalized Itineraries
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('features')}>
                    Transport & Hotel Discovery
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('features')}>
                    Weather-Aware Planning
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('features')}>
                    Budget Optimization
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('features')}>
                    Dynamic Replanning
                  </button>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Support</h4>
              <ul className="footer-link-list">
                <li>
                  <button type="button" className="footer-link" onClick={() => scrollTo('how-it-works')}>
                    How It Works
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => openAuth('login')}>
                    Sign In Help
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => openAuth('signup')}>
                    Create Account
                  </button>
                </li>
                <li>
                  <span className="footer-link">Planning Guidelines</span>
                </li>
                <li>
                  <span className="footer-link">Travel Safety</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Row */}
          <div className="footer-bottom-row">
            <p className="footer-copyright">
              &copy; 2026 RAVEL. All rights reserved.
            </p>
            <div className="footer-system-pill">
              <span className="step-micro-dot" aria-hidden="true" />
              <span>Multi-Agent System Operational • All Systems Normal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          8. AUTHENTICATION MODAL (LOGIN & SIGN UP)
          Clean modal dialog for public visitors exploring account entry
          ==================================================================== */}
      {authModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          onClick={closeAuth}
        >
          <div
            className="modal-content-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-bar">
              <h3 id="auth-modal-title" className="modal-title">
                {authModalTab === 'login' ? 'Welcome Back' : 'Join RAVEL'}
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                aria-label="Close modal"
                onClick={closeAuth}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-tab-row" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={authModalTab === 'login'}
                className={`modal-tab ${authModalTab === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setAuthModalTab('login');
                  setAuthFeedback(null);
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={authModalTab === 'signup'}
                className={`modal-tab ${authModalTab === 'signup' ? 'active' : ''}`}
                onClick={() => {
                  setAuthModalTab('signup');
                  setAuthFeedback(null);
                }}
              >
                Create Account
              </button>
            </div>

            <form className="modal-body" onSubmit={handleAuthSubmit}>
              {authFeedback && (
                <div className="modal-feedback-alert" role="alert">
                  {authFeedback}
                </div>
              )}

              {authModalTab === 'signup' && (
                <div className="form-group">
                  <label htmlFor="fullname-input" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="fullname-input"
                    type="text"
                    required
                    placeholder="e.g. Varsha Sharma"
                    className="form-input"
                    value={authFullName}
                    onChange={(e) => setAuthFullName(e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email-input" className="form-label">
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="form-input"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password-input" className="form-label">
                  Password
                </label>
                <input
                  id="password-input"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="form-input"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="modal-submit-btn">
                {authModalTab === 'login' ? 'Sign In to RAVEL' : 'Create Free Account'}
              </button>

              <p className="modal-note">
                By proceeding, you agree to RAVEL&apos;s Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          9. DESTINATION PLANNING PREVIEW MODAL
          Interactive preview dialog when clicking on a destination card
          ==================================================================== */}
      {selectedDestination && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dest-preview-title"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="modal-content-card"
            style={{ maxWidth: '520px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-bar">
              <div>
                <span className="card-badge" style={{ position: 'static' }}>
                  {selectedDestination.category}
                </span>
                <h3 id="dest-preview-title" className="modal-title" style={{ marginTop: '6px' }}>
                  Trip to {selectedDestination.name}
                </h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                aria-label="Close modal"
                onClick={() => setSelectedDestination(null)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-body" style={{ paddingTop: '8px' }}>
              <p className="card-description" style={{ marginBottom: '16px' }}>
                {selectedDestination.description}
              </p>

              <div style={{ background: 'var(--surface-low)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                  Multi-Agent Coordination Ready
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: '20px' }}>
                  <li><strong>Transport:</strong> Direct trains, scenic flights and road connections scanned.</li>
                  <li><strong>Stay:</strong> Handpicked boutique stays matched to your style.</li>
                  <li><strong>Weather:</strong> Microclimate forecast evaluated ({selectedDestination.stats.split('•')[1]?.trim() || 'Favorable'}).</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  className="modal-submit-btn"
                  style={{ flex: 1, margin: 0 }}
                  onClick={() => {
                    setSelectedDestination(null);
                    openAuth('signup');
                  }}
                >
                  Generate {selectedDestination.name} Plan
                </button>
                <button
                  type="button"
                  className="btn-secondary-pill"
                  style={{ padding: '12px 20px', fontSize: '13px' }}
                  onClick={() => setSelectedDestination(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
