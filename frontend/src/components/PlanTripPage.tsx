import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlanTripPage.css';
import ootyPhoto from '../assets/images/ooty.jpg';
import goaPhoto from '../assets/images/goa.jpg';
import manaliPhoto from '../assets/images/manali.jpg';
import heroMunnarPhoto from '../assets/images/hero-munnar.jpg';
import cultureHeritagePhoto from '../assets/images/culture-heritage.jpg';
import foodCuisinePhoto from '../assets/images/food-cuisine.jpg';
import artArchitecturePhoto from '../assets/images/art-architecture.jpg';

/* ==========================================================================
   TYPES & CONSTANTS
   ========================================================================== */

interface TrendingDestination {
  id: string;
  name: string;
  state: string;
  image: string;
  badge: string;
}

const TRENDING_DESTINATIONS: TrendingDestination[] = [
  { id: 'ooty', name: 'Ooty', state: 'Tamil Nadu', image: ootyPhoto, badge: 'Hill Station' },
  { id: 'goa', name: 'Goa', state: 'West Coast', image: goaPhoto, badge: 'Coastal' },
  { id: 'manali', name: 'Manali', state: 'Himachal Pradesh', image: manaliPhoto, badge: 'Alpine' },
  { id: 'munnar', name: 'Munnar', state: 'Kerala', image: heroMunnarPhoto, badge: 'Hill Station' },
];

type GroupType = 'Solo' | 'Couple' | 'Family' | 'Friends';
type Transport = 'Train' | 'Bus' | 'Flight' | 'Car / Road Trip' | 'No Preference';
type Budget = 'Below ₹5,000' | '₹5,000–₹10,000' | '₹10,000–₹20,000' | 'Above ₹20,000';
type Preference = 'Adventure' | 'Relaxation' | 'Culture & Heritage' | 'Food & Cuisine' | 'Nature & Wilderness' | 'Art & Architecture';
type Pace = 'Unhurried' | 'Balanced' | 'High Energy';

const GROUP_TYPES: GroupType[] = ['Solo', 'Couple', 'Family', 'Friends'];
const TRANSPORTS: Transport[] = ['Train', 'Bus', 'Flight', 'Car / Road Trip', 'No Preference'];
const BUDGETS: Budget[] = ['Below ₹5,000', '₹5,000–₹10,000', '₹10,000–₹20,000', 'Above ₹20,000'];
const PREFERENCES: Preference[] = ['Adventure', 'Relaxation', 'Culture & Heritage', 'Food & Cuisine', 'Nature & Wilderness', 'Art & Architecture'];
const PACES: Pace[] = ['Unhurried', 'Balanced', 'High Energy'];

const POPULAR_ORIGINS = ['Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Hyderabad', 'Kolkata', 'Pune', 'Kochi'];

/* ==========================================================================
   ICONS
   ========================================================================== */

const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconTrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="3" width="16" height="13" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <path d="M8 20l-2 2" />
    <path d="M16 20l2 2" />
    <path d="M8 20h8" />
  </svg>
);

const IconBus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 6v6" />
    <path d="M16 6v6" />
    <path d="M2 12h19.6" />
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const IconFlight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 10 2.8 8.2l-2 2 7 2.3-1.3 3.5L5 17l2 2 1.5-1.5 3.5-1.3 2.3 7z" />
  </svg>
);

const IconCar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2" />
    <circle cx="9" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M13 2v5h5" />
  </svg>
);

const IconNoPreference = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

const TRANSPORT_ICONS: Record<Transport, React.ReactNode> = {
  'Train': <IconTrain />,
  'Bus': <IconBus />,
  'Flight': <IconFlight />,
  'Car / Road Trip': <IconCar />,
  'No Preference': <IconNoPreference />,
};

/*
 * Preference photo map — uses the four locally available, properly licensed
 * travel photographs (Wikimedia Commons, CC BY-SA) rather than emojis.
 * Each entry pairs an imported image asset with a tint overlay so every card
 * is visually distinct even when two categories share the same base photo.
 *
 * Photo sources (see frontend/src/assets/images/README.md):
 *  manali.jpg   — Beas River & Himalayan scenery, Manali (CC BY-SA 4.0, Sanyam Bahga)
 *  goa.jpg      — Tropical coastline & beach, Goa (CC BY-SA 4.0, Anishshetty)
 *  hero-munnar.jpg — Munnar tea plantations, Kerala (CC BY-SA 4.0, IM3847)
 *  ooty.jpg     — Nilgiri tea gardens, Ooty, Tamil Nadu (CC BY-SA 3.0, Dineshkannambadi)
 */
interface PreferencePhoto {
  src: string;
  tint: string;      // CSS linear-gradient overlay for visual differentiation
  alt: string;
}


const PREFERENCE_PHOTOS: Record<Preference, PreferencePhoto> = {
  'Adventure': {
    src: manaliPhoto,
    tint: 'linear-gradient(160deg, rgba(14,36,56,0.55) 0%, rgba(0,104,95,0.30) 100%)',
    alt: 'Himalayan peaks and alpine river valley in Manali',
  },
  'Relaxation': {
    src: goaPhoto,
    tint: 'linear-gradient(160deg, rgba(14,56,80,0.45) 0%, rgba(0,131,120,0.25) 100%)',
    alt: 'Serene tropical beach and turquoise coastline in Goa',
  },
  'Culture & Heritage': {
    src: cultureHeritagePhoto,
    tint: 'linear-gradient(160deg, rgba(60,30,10,0.40) 0%, rgba(140,80,20,0.15) 100%)',
    alt: 'Historic Amer Fort in Rajasthan',
  },
  'Food & Cuisine': {
    src: foodCuisinePhoto,
    tint: 'linear-gradient(160deg, rgba(140,50,10,0.30) 0%, rgba(200,100,30,0.10) 100%)',
    alt: 'Traditional South Indian thali meal',
  },
  'Nature & Wilderness': {
    src: ootyPhoto,
    tint: 'linear-gradient(160deg, rgba(10,50,20,0.50) 0%, rgba(0,100,60,0.25) 100%)',
    alt: 'Rolling Nilgiri tea gardens and mist-covered hills in Ooty',
  },
  'Art & Architecture': {
    src: artArchitecturePhoto,
    tint: 'linear-gradient(160deg, rgba(50,20,80,0.35) 0%, rgba(90,40,120,0.15) 100%)',
    alt: 'Chennakeshava Temple architecture and stone carvings',
  },
};


// Computed once at module load — not during render — to satisfy React purity rules
const TODAY_DATE = new Date().toISOString().split('T')[0];

const PACE_DESCRIPTIONS: Record<Pace, string> = {
  'Unhurried': 'Slow & Leisurely',
  'Balanced': 'Mix of Rest & Explore',
  'High Energy': 'Packed & Active',
};

/* ==========================================================================
   RAVEL LOGO (reused inline)
   ========================================================================== */

function RavelLogo() {
  return (
    <div className="pt-brand-emblem" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#FFFFFF" />
        <circle cx="12" cy="12" r="3" fill="#89F5E7" />
      </svg>
    </div>
  );
}

/* ==========================================================================
   AUTHENTICATED HEADER
   ========================================================================== */

function AuthHeader({ activePage }: { activePage: string }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Plan a Trip', path: '/plan' },
    { label: 'My Trips', path: '/my-trips' },
    { label: 'Explore', path: '/#destinations' },
  ];

  return (
    <header className="pt-auth-header" role="banner">
      <div className="pt-header-inner">
        {/* Brand */}
        <button type="button" className="pt-brand-btn" onClick={() => navigate('/')} aria-label="Go to RAVEL home">
          <RavelLogo />
          <div className="pt-brand-text">
            <span className="pt-brand-name">RAVEL</span>
            <span className="pt-brand-sub">AI Travel Planner</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="pt-desktop-nav" aria-label="Authenticated Navigation">
          <ul className="pt-nav-list">
            {navLinks.map(link => (
              <li key={link.label}>
                <button
                  type="button"
                  className={`pt-nav-link${activePage === link.label ? ' active' : ''}`}
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile pill */}
        <div className="pt-profile-pill" aria-label="User account">
          <div className="pt-avatar" aria-hidden="true">R</div>
          <span className="pt-profile-name">My Account</span>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="pt-mobile-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="pt-mobile-drawer" role="dialog" aria-modal="true">
          <ul className="pt-mobile-nav-list">
            {navLinks.map(link => (
              <li key={link.label}>
                <button
                  type="button"
                  className="pt-mobile-nav-link"
                  onClick={() => { setMobileOpen(false); navigate(link.path); }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* ==========================================================================
   PROGRESS INDICATOR
   ========================================================================== */

function PlanningProgress({ pct }: { pct: number }) {
  return (
    <div className="pt-progress-wrap" aria-label={`Form completion: ${pct}%`}>
      <div className="pt-progress-header">
        <span className="pt-progress-label">Planning Progress</span>
        <span className="pt-progress-pct">{pct}%</span>
      </div>
      <div className="pt-progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="pt-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="pt-progress-hint">
        {pct < 40 ? 'Fill in destination & dates to get started' :
          pct < 70 ? 'Great! Add transport & budget' :
            pct < 95 ? 'Almost there — add preferences & pace' :
              'Ready to generate your itinerary!'}
      </p>
    </div>
  );
}

/* ==========================================================================
   DESTINATION PREVIEW CARD
   ========================================================================== */

function DestinationPreviewCard({ destination }: { destination: TrendingDestination | null }) {
  if (!destination) {
    return (
      <div className="pt-preview-card pt-preview-empty">
        <div className="pt-preview-placeholder">
          <IconMapPin />
          <p>Select a destination to see a preview</p>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-preview-card">
      <div className="pt-preview-img-wrap">
        <img src={destination.image} alt={`Scenic view of ${destination.name}, ${destination.state}`} className="pt-preview-img" />
        <div className="pt-preview-img-overlay" aria-hidden="true" />
        <span className="pt-preview-badge">{destination.badge}</span>
      </div>
      <div className="pt-preview-body">
        <h3 className="pt-preview-name">{destination.name}</h3>
        <p className="pt-preview-state">{destination.state}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   AI PLANNING INFO PANEL
   ========================================================================== */

function AIPlanningPanel() {
  const agents = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      name: 'Transport Options Search',
      desc: 'Trains, buses, flights & road routes',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      name: 'Hotel Discovery',
      desc: 'Handpicked stays near your destination',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      name: 'Attractions & Restaurant Discovery',
      desc: 'Curated experiences & dining',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      ),
      name: 'Weather & Route Information',
      desc: 'Microclimate monitoring & safe routes',
    },
  ];

  return (
    <div className="pt-ai-panel">
      <div className="pt-ai-panel-header">
        <div className="pt-ai-pulse" aria-hidden="true" />
        <span className="pt-ai-panel-title">RAVEL AI Coordinates Everything</span>
      </div>
      <p className="pt-ai-panel-desc">
        Once you submit your preferences, four specialized autonomous agents run in parallel to plan your perfect trip.
      </p>
      <ul className="pt-ai-agents-list">
        {agents.map(agent => (
          <li key={agent.name} className="pt-ai-agent-item">
            <div className="pt-ai-agent-icon">{agent.icon}</div>
            <div className="pt-ai-agent-info">
              <span className="pt-ai-agent-name">{agent.name}</span>
              <span className="pt-ai-agent-desc">{agent.desc}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="pt-ai-disclaimer">
        AI orchestration will begin after you submit your trip details. Results depend on backend service availability.
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN PLAN TRIP PAGE
   ========================================================================== */

export function PlanTripPage() {
  const navigate = useNavigate();

  /* ---- form state ---- */
  const [destination, setDestination] = useState('');
  const [destSuggOpen, setDestSuggOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<TrendingDestination | null>(null);

  const [origin, setOrigin] = useState('');
  const [originSuggOpen, setOriginSuggOpen] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [travellers, setTravellers] = useState(1);
  const [groupType, setGroupType] = useState<GroupType | ''>('');

  const [transport, setTransport] = useState<Transport | ''>('');
  const [budget, setBudget] = useState<Budget | ''>('');
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [pace, setPace] = useState<Pace | ''>('');

  /* ---- validation ---- */
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const destInputRef = useRef<HTMLInputElement>(null);
  const originInputRef = useRef<HTMLInputElement>(null);

  /* ---- progress calculation ---- */
  const calcProgress = () => {
    let score = 0;
    if (destination.trim()) score += 20;
    if (origin.trim()) score += 10;
    if (startDate) score += 10;
    if (endDate) score += 10;
    if (transport) score += 15;
    if (budget) score += 15;
    if (preferences.length) score += 10;
    if (pace) score += 10;
    return score;
  };

  /* ---- close suggestion dropdowns on outside click ---- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (destInputRef.current && !destInputRef.current.closest('.pt-dest-field')?.contains(e.target as Node)) {
        setDestSuggOpen(false);
      }
      if (originInputRef.current && !originInputRef.current.closest('.pt-origin-field')?.contains(e.target as Node)) {
        setOriginSuggOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ---- helpers ---- */
  const selectDestination = (dest: TrendingDestination) => {
    setDestination(dest.name);
    setSelectedDest(dest);
    setDestSuggOpen(false);
    if (errors['destination']) setErrors(e => ({ ...e, destination: '' }));
  };

  const selectOrigin = (city: string) => {
    setOrigin(city);
    setOriginSuggOpen(false);
    if (errors['origin']) setErrors(e => ({ ...e, origin: '' }));
  };

  const handleDestChange = (val: string) => {
    setDestination(val);
    setDestSuggOpen(val.length > 0);
    const match = TRENDING_DESTINATIONS.find(d => d.name.toLowerCase() === val.toLowerCase());
    setSelectedDest(match ?? null);
    if (errors['destination']) setErrors(e => ({ ...e, destination: '' }));
  };

  const handleTravellers = (delta: number) => {
    setTravellers(prev => Math.max(1, prev + delta));
  };

  const togglePreference = (pref: Preference) => {
    setPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleTransportSelect = (t: Transport) => {
    if (t === 'No Preference') {
      setTransport(transport === 'No Preference' ? '' : 'No Preference');
    } else {
      setTransport(transport === t ? '' : t);
    }
    if (errors['transport']) setErrors(e => ({ ...e, transport: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!destination.trim()) errs['destination'] = 'Please enter a destination.';
    if (!origin.trim()) errs['origin'] = 'Please enter your starting city.';
    if (!startDate) errs['startDate'] = 'Please select a start date.';
    if (!endDate) errs['endDate'] = 'Please select an end date.';
    if (startDate && endDate && endDate < startDate) errs['endDate'] = 'End date cannot be before start date.';
    if (!transport) errs['transport'] = 'Please select a mode of transport.';
    if (!budget) errs['budget'] = 'Please select a budget range.';
    if (!pace) errs['pace'] = 'Please select a trip pace.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Navigate to itinerary page once backend is connected
      navigate('/itinerary');
    }
  };

  /* ---- filtered suggestions ---- */
  const destSuggestions = destination.length > 0
    ? TRENDING_DESTINATIONS.filter(d => d.name.toLowerCase().startsWith(destination.toLowerCase()))
    : TRENDING_DESTINATIONS;

  const originSuggestions = origin.length > 0
    ? POPULAR_ORIGINS.filter(c => c.toLowerCase().startsWith(origin.toLowerCase()))
    : POPULAR_ORIGINS;

  const today = TODAY_DATE;

  return (
    <div className="pt-page">
      <AuthHeader activePage="Plan a Trip" />

      <main className="pt-main" id="main-content" role="main">
        <div className="pt-page-header">
          <div className="pt-page-header-inner">
            <span className="pt-eyebrow">AI-Powered Planning</span>
            <h1 className="pt-page-title">Plan Your Trip</h1>
            <p className="pt-page-subtitle">
              Tell RAVEL where you want to go and your preferences. Our specialized AI agents will coordinate transport, hotels, attractions and weather for your perfect itinerary.
            </p>
          </div>
        </div>

        <div className="pt-layout">
          {/* ================================================================
              MAIN FORM COLUMN
              ================================================================ */}
          <div className="pt-form-col">
            <form onSubmit={handleSubmit} noValidate aria-label="Trip planning form">

              {/* ---- SECTION 1: TRIP DETAILS ---- */}
              <section className="pt-section" aria-labelledby="sec-trip-details">
                <div className="pt-section-header">
                  <span className="pt-section-num">01</span>
                  <h2 id="sec-trip-details" className="pt-section-title">Trip Details</h2>
                </div>

                {/* Destination */}
                <div className="pt-field-group">
                  <label htmlFor="destination" className="pt-label">
                    Destination <span className="pt-required" aria-hidden="true">*</span>
                  </label>
                  <div className="pt-dest-field">
                    <div className={`pt-input-wrap${errors['destination'] ? ' pt-input-error' : ''}`}>
                      <span className="pt-input-icon"><IconSearch /></span>
                      <input
                        id="destination"
                        ref={destInputRef}
                        type="text"
                        className="pt-text-input pt-text-input--icon-l"
                        placeholder="Where do you want to go?"
                        value={destination}
                        onChange={e => handleDestChange(e.target.value)}
                        onFocus={() => setDestSuggOpen(true)}
                        autoComplete="off"
                        aria-describedby={errors['destination'] ? 'destination-err' : undefined}
                        aria-invalid={!!errors['destination']}
                      />
                    </div>
                    {errors['destination'] && (
                      <p id="destination-err" className="pt-error-msg" role="alert">{errors['destination']}</p>
                    )}

                    {/* Suggestion dropdown */}
                    {destSuggOpen && destSuggestions.length > 0 && (
                      <ul className="pt-suggestions" role="listbox" aria-label="Destination suggestions">
                        {destSuggestions.map(d => (
                          <li key={d.id} role="option" aria-selected={selectedDest?.id === d.id}>
                            <button
                              type="button"
                              className="pt-suggestion-item"
                              onClick={() => selectDestination(d)}
                            >
                              <span className="pt-sugg-icon"><IconMapPin /></span>
                              <span className="pt-sugg-text">
                                <span className="pt-sugg-name">{d.name}</span>
                                <span className="pt-sugg-state">{d.state} · {d.badge}</span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Trending quick-select chips */}
                  <div className="pt-trending-wrap">
                    <span className="pt-trending-label">Trending:</span>
                    <div className="pt-trending-chips">
                      {TRENDING_DESTINATIONS.map(d => (
                        <button
                          key={d.id}
                          type="button"
                          className={`pt-trend-chip${selectedDest?.id === d.id ? ' active' : ''}`}
                          onClick={() => selectDestination(d)}
                          aria-pressed={selectedDest?.id === d.id}
                        >
                          {d.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Origin */}
                <div className="pt-field-group">
                  <label htmlFor="origin" className="pt-label">
                    Starting City / Origin Hub <span className="pt-required" aria-hidden="true">*</span>
                  </label>
                  <div className="pt-origin-field">
                    <div className={`pt-input-wrap${errors['origin'] ? ' pt-input-error' : ''}`}>
                      <span className="pt-input-icon"><IconMapPin /></span>
                      <input
                        id="origin"
                        ref={originInputRef}
                        type="text"
                        className="pt-text-input pt-text-input--icon-l"
                        placeholder="e.g. Bangalore, Chennai, Mumbai…"
                        value={origin}
                        onChange={e => { setOrigin(e.target.value); setOriginSuggOpen(true); if (errors['origin']) setErrors(er => ({ ...er, origin: '' })); }}
                        onFocus={() => setOriginSuggOpen(true)}
                        autoComplete="off"
                        aria-describedby={errors['origin'] ? 'origin-err' : undefined}
                        aria-invalid={!!errors['origin']}
                      />
                    </div>
                    {errors['origin'] && (
                      <p id="origin-err" className="pt-error-msg" role="alert">{errors['origin']}</p>
                    )}
                    {originSuggOpen && originSuggestions.length > 0 && (
                      <ul className="pt-suggestions" role="listbox" aria-label="Origin city suggestions">
                        {originSuggestions.map(city => (
                          <li key={city} role="option" aria-selected={origin === city}>
                            <button type="button" className="pt-suggestion-item" onClick={() => selectOrigin(city)}>
                              <span className="pt-sugg-icon"><IconMapPin /></span>
                              <span className="pt-sugg-text">
                                <span className="pt-sugg-name">{city}</span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Dates row */}
                <div className="pt-dates-row">
                  <div className="pt-field-group">
                    <label htmlFor="start-date" className="pt-label">
                      Start Date <span className="pt-required" aria-hidden="true">*</span>
                    </label>
                    <div className={`pt-input-wrap${errors['startDate'] ? ' pt-input-error' : ''}`}>
                      <span className="pt-input-icon"><IconCalendar /></span>
                      <input
                        id="start-date"
                        type="date"
                        className="pt-text-input pt-text-input--icon-l"
                        value={startDate}
                        min={today}
                        onChange={e => {
                          setStartDate(e.target.value);
                          if (endDate && e.target.value > endDate) setEndDate('');
                          if (errors['startDate']) setErrors(er => ({ ...er, startDate: '' }));
                        }}
                        aria-describedby={errors['startDate'] ? 'startdate-err' : undefined}
                        aria-invalid={!!errors['startDate']}
                      />
                    </div>
                    {errors['startDate'] && (
                      <p id="startdate-err" className="pt-error-msg" role="alert">{errors['startDate']}</p>
                    )}
                  </div>

                  <div className="pt-field-group">
                    <label htmlFor="end-date" className="pt-label">
                      End Date <span className="pt-required" aria-hidden="true">*</span>
                    </label>
                    <div className={`pt-input-wrap${errors['endDate'] ? ' pt-input-error' : ''}`}>
                      <span className="pt-input-icon"><IconCalendar /></span>
                      <input
                        id="end-date"
                        type="date"
                        className="pt-text-input pt-text-input--icon-l"
                        value={endDate}
                        min={startDate || today}
                        onChange={e => {
                          setEndDate(e.target.value);
                          if (errors['endDate']) setErrors(er => ({ ...er, endDate: '' }));
                        }}
                        aria-describedby={errors['endDate'] ? 'enddate-err' : undefined}
                        aria-invalid={!!errors['endDate']}
                      />
                    </div>
                    {errors['endDate'] && (
                      <p id="enddate-err" className="pt-error-msg" role="alert">{errors['endDate']}</p>
                    )}
                  </div>
                </div>

                {/* Travellers + Group Type */}
                <div className="pt-travellers-row">
                  <div className="pt-field-group">
                    <label className="pt-label">
                      <span className="pt-label-icon"><IconUsers /></span>
                      Number of Travellers
                    </label>
                    <div className="pt-counter">
                      <button
                        type="button"
                        className="pt-counter-btn"
                        onClick={() => handleTravellers(-1)}
                        disabled={travellers <= 1}
                        aria-label="Decrease travellers"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      </button>
                      <span className="pt-counter-val" aria-live="polite" aria-label={`${travellers} traveller${travellers !== 1 ? 's' : ''}`}>{travellers}</span>
                      <button
                        type="button"
                        className="pt-counter-btn"
                        onClick={() => handleTravellers(1)}
                        aria-label="Increase travellers"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="pt-field-group">
                    <label className="pt-label">Group Type</label>
                    <div className="pt-chip-group" role="group" aria-label="Group type">
                      {GROUP_TYPES.map(g => (
                        <button
                          key={g}
                          type="button"
                          className={`pt-chip${groupType === g ? ' active' : ''}`}
                          onClick={() => setGroupType(groupType === g ? '' : g)}
                          aria-pressed={groupType === g}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ---- SECTION 2: TRANSPORT ---- */}
              <section className="pt-section" aria-labelledby="sec-transport">
                <div className="pt-section-header">
                  <span className="pt-section-num">02</span>
                  <h2 id="sec-transport" className="pt-section-title">Mode of Transport</h2>
                </div>
                <p className="pt-section-hint">Select your preferred way to travel. "No Preference" is mutually exclusive with individual modes.</p>
                {errors['transport'] && submitted && (
                  <p className="pt-error-msg" role="alert">{errors['transport']}</p>
                )}
                <div className="pt-transport-grid" role="group" aria-label="Mode of transport">
                  {TRANSPORTS.map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`pt-transport-card${transport === t ? ' active' : ''}`}
                      onClick={() => handleTransportSelect(t)}
                      aria-pressed={transport === t}
                    >
                      <span className="pt-transport-icon">{TRANSPORT_ICONS[t]}</span>
                      <span className="pt-transport-label">{t}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ---- SECTION 3: BUDGET ---- */}
              <section className="pt-section" aria-labelledby="sec-budget">
                <div className="pt-section-header">
                  <span className="pt-section-num">03</span>
                  <h2 id="sec-budget" className="pt-section-title">Estimated Budget <span className="pt-section-subtitle-inline">per person</span></h2>
                </div>
                {errors['budget'] && submitted && (
                  <p className="pt-error-msg" role="alert">{errors['budget']}</p>
                )}
                <div className="pt-budget-grid" role="group" aria-label="Budget range">
                  {BUDGETS.map(b => (
                    <button
                      key={b}
                      type="button"
                      className={`pt-budget-card${budget === b ? ' active' : ''}`}
                      onClick={() => { setBudget(budget === b ? '' : b); if (errors['budget']) setErrors(e => ({ ...e, budget: '' })); }}
                      aria-pressed={budget === b}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </section>

              {/* ---- SECTION 4: PREFERENCES ---- */}
              <section className="pt-section" aria-labelledby="sec-preferences">
                <div className="pt-section-header">
                  <span className="pt-section-num">04</span>
                  <h2 id="sec-preferences" className="pt-section-title">Travel Preferences &amp; Vibe</h2>
                </div>
                <p className="pt-section-hint">Select all that apply — your itinerary will reflect your style.</p>
                <div className="pt-prefs-grid" role="group" aria-label="Travel preferences">
                  {PREFERENCES.map(pref => {
                    const photo = PREFERENCE_PHOTOS[pref];
                    const isActive = preferences.includes(pref);
                    return (
                      <button
                        key={pref}
                        type="button"
                        className={`pt-pref-card${isActive ? ' active' : ''}`}
                        onClick={() => togglePreference(pref)}
                        aria-pressed={isActive}
                        aria-label={`${pref}${isActive ? ' — selected' : ''}`}
                      >
                        {/* Photo thumbnail */}
                        <div className="pt-pref-photo-wrap" aria-hidden="true">
                          <img
                            src={photo.src}
                            alt=""
                            className="pt-pref-photo"
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Colour tint overlay for visual differentiation */}
                          <div className="pt-pref-photo-tint" style={{ background: photo.tint }} />
                          {/* Selected checkmark badge */}
                          {isActive && (
                            <div className="pt-pref-check-badge">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {/* Category label */}
                        <span className="pt-pref-label">{pref}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* ---- SECTION 5: TRIP PACE ---- */}
              <section className="pt-section" aria-labelledby="sec-pace">
                <div className="pt-section-header">
                  <span className="pt-section-num">05</span>
                  <h2 id="sec-pace" className="pt-section-title">Trip Pace</h2>
                </div>
                {errors['pace'] && submitted && (
                  <p className="pt-error-msg" role="alert">{errors['pace']}</p>
                )}
                <div className="pt-pace-grid" role="group" aria-label="Trip pace">
                  {PACES.map(p => (
                    <button
                      key={p}
                      type="button"
                      className={`pt-pace-card${pace === p ? ' active' : ''}`}
                      onClick={() => { setPace(pace === p ? '' : p); if (errors['pace']) setErrors(e => ({ ...e, pace: '' })); }}
                      aria-pressed={pace === p}
                    >
                      <span className="pt-pace-title">{p}</span>
                      <span className="pt-pace-desc">{PACE_DESCRIPTIONS[p]}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ---- SUBMIT ---- */}
              {submitted && Object.keys(validate()).length > 0 && (
                <div className="pt-form-error-banner" role="alert" aria-live="assertive">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Please fill in all required fields before generating your itinerary.
                </div>
              )}

              <div className="pt-submit-wrap">
                <button type="submit" className="pt-submit-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Generate My Itinerary
                </button>
                <p className="pt-submit-note">
                  RAVEL's AI agents will coordinate transport, hotels, attractions and weather for your trip.
                  Backend integration coming soon.
                </p>
              </div>
            </form>
          </div>

          {/* ================================================================
              SIDEBAR: Preview + Progress + AI Panel
              ================================================================ */}
          <aside className="pt-sidebar" aria-label="Trip planning sidebar">
            {/* Progress */}
            <PlanningProgress pct={calcProgress()} />

            {/* Destination preview */}
            <div className="pt-sidebar-section">
              <h3 className="pt-sidebar-section-title">Destination Preview</h3>
              <DestinationPreviewCard destination={selectedDest} />
            </div>

            {/* AI planning info */}
            <div className="pt-sidebar-section">
              <AIPlanningPanel />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default PlanTripPage;
