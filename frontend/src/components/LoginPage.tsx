import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import heroMunnarPhoto from '../assets/images/hero-munnar.jpg';

interface LoginPageProps {
  onNavigateToSignUp?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToSignUp }) => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [keepSignedIn, setKeepSignedIn] = useState<boolean>(true);

  // Validation & status state
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'info' | 'error';
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Email format regex: standard RFC 5322 simplified pattern
  const validateEmailFormat = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) {
      if (!val.trim()) {
        setEmailError('Email address is required.');
      } else if (!validateEmailFormat(val)) {
        setEmailError('Please enter a valid email address (e.g., name@example.com).');
      } else {
        setEmailError(null);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (passwordError) {
      if (!val) {
        setPasswordError('Password is required.');
      } else if (val.length < 6) {
        setPasswordError('Password must be at least 6 characters.');
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    // Validate fields
    let hasError = false;

    if (!email.trim()) {
      setEmailError('Email address is required.');
      hasError = true;
    } else if (!validateEmailFormat(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (hasError) {
      return;
    }

    // Inform user of connection attempt (no hardcoded credentials or fake auth)
    setIsSubmitting(true);
    setStatusMessage({
      type: 'info',
      text: `Connecting ${email.trim()} to RAVEL authentication service... Backend identity provider will authenticate your session.`,
    });

    // Reset submission state after informing user
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmailFormat(email)) {
      setStatusMessage({
        type: 'info',
        text: 'Please enter your email address above, then click "Forgot password?" to receive a recovery link.',
      });
    } else {
      setStatusMessage({
        type: 'info',
        text: `Password reset instructions will be dispatched to ${email.trim()} once the identity service is verified.`,
      });
    }
  };

  const handleCreateAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    } else {
      navigate('/?signup=true');
    }
  };

  return (
    <div className="login-page">
      <div className="login-split-container">
        {/* ==================================================================
            LEFT COLUMN: AUTHENTICATION FORM
            ================================================================== */}
        <section className="login-form-column" aria-label="Sign In Section">
          {/* Top Bar with Brand & Back Navigation */}
          <div className="login-header-bar">
            {/* RAVEL Brand Link */}
            <Link to="/" className="login-brand-link" aria-label="RAVEL Home">
              <div className="login-brand-emblem" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                    fill="#FFFFFF"
                  />
                  <circle cx="12" cy="12" r="3" fill="#89F5E7" />
                </svg>
              </div>
              <span className="login-brand-text">RAVEL</span>
            </Link>

            {/* Back to Explore Navigation Link */}
            <Link to="/" className="back-to-explore-btn" aria-label="Back to Explore">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Explore</span>
            </Link>
          </div>

          {/* Form Card Body */}
          <div className="login-form-card-wrapper">
            {/* Welcome Back Heading & Description */}
            <div className="login-title-group">
              <h1 className="login-heading">Welcome Back</h1>
              <p className="login-subtitle">
                Sign in to access your saved itineraries, active trips, and personalized multi-agent travel plans.
              </p>
            </div>

            {/* Status / Feedback Banner */}
            {statusMessage && (
              <div
                className={`login-status-banner ${statusMessage.type === 'error' ? 'status-error' : 'status-info'}`}
                role="status"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Sign In Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email Address Field */}
              <div className="login-field-group">
                <label htmlFor="login-email" className="login-label">
                  Email Address
                </label>
                <div className="input-container">
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    className={`login-input ${emailError ? 'input-error' : ''}`}
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error-msg' : undefined}
                  />
                </div>
                {emailError && (
                  <span id="email-error-msg" className="field-error-text" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {emailError}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="login-field-group">
                <div className="login-label">
                  <label htmlFor="login-password">Password</label>
                </div>
                <div className="input-container">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className={`login-input input-with-toggle ${passwordError ? 'input-error' : ''}`}
                    value={password}
                    onChange={handlePasswordChange}
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? 'password-error-msg' : undefined}
                  />
                  {/* Show/Hide Password Toggle */}
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      /* Eye Off Icon */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      /* Eye Icon */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && (
                  <span id="password-error-msg" className="field-error-text" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {passwordError}
                  </span>
                )}
              </div>

              {/* Keep me signed in & Forgot Password Row */}
              <div className="login-options-row">
                <label className="checkbox-label" onClick={() => setKeepSignedIn(!keepSignedIn)}>
                  <span className={`checkbox-custom ${keepSignedIn ? 'checked' : ''}`}>
                    {keepSignedIn && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span>Keep me signed in</span>
                </label>

                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                className="btn-login-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              {/* Create Account Navigation Link */}
              <div className="create-account-prompt">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="create-account-link"
                  onClick={handleCreateAccountClick}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>

          {/* Privacy and Security Information */}
          <footer className="login-footer-info">
            <svg className="security-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>
              Protected by RAVEL security. By signing in, you agree to our{' '}
              <button type="button" className="legal-inline-link">Terms of Service</button>{' '}
              and{' '}
              <button type="button" className="legal-inline-link">Privacy Policy</button>.
            </span>
          </footer>
        </section>

        {/* ==================================================================
            RIGHT COLUMN: PREMIUM SCENIC TRAVEL PHOTOGRAPHY SPLIT
            ================================================================== */}
        <aside className="login-photo-column" aria-label="Scenic Travel Photography">
          <img
            src={heroMunnarPhoto}
            alt="Munnar tea plantations and misty mountains"
            className="login-scenic-photo"
          />
          <div className="login-photo-overlay" />

          {/* Floating Editorial Card over photograph */}
          <div className="login-photo-card">
            <div className="login-photo-chip-row">
              <span className="photo-chip-route">
                <span className="photo-pulse-dot" aria-hidden="true" />
                Verified Scenic Route
              </span>
              <span className="photo-location-name">Munnar Highlands, Western Ghats</span>
            </div>

            <h2 className="photo-card-quote">
              Plan <span className="editorial-italic">smarter</span>. Travel{' '}
              <span className="editorial-italic">better</span>.
            </h2>

            <p className="photo-card-subtext">
              Four specialized autonomous agents synchronize transit, boutique stays,
              live microclimates, and budget optimization for your journey.
            </p>

            <div className="photo-agents-synced-row">
              <span className="photo-agent-stat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Rail & Transit
              </span>
              <span className="photo-agent-stat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Curated Stays
              </span>
              <span className="photo-agent-stat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Weather Safeguards
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
