import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';
import heroMunnarPhoto from '../assets/images/hero-munnar.jpg';

export const RegisterPage: React.FC = () => {

  // Form states
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  // Field validation error states
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  // Submission & status state
  const [statusMessage, setStatusMessage] = useState<{
    type: 'info' | 'error';
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Standard email validation pattern
  const validateEmailFormat = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFullName(val);
    if (fullNameError) {
      if (!val.trim()) {
        setFullNameError('Full name is required.');
      } else if (val.trim().length < 2) {
        setFullNameError('Full name must be at least 2 characters.');
      } else {
        setFullNameError(null);
      }
    }
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
      } else if (val.length < 8) {
        setPasswordError('Password must be at least 8 characters.');
      } else {
        setPasswordError(null);
      }
    }
    // Re-check confirm password if already entered
    if (confirmPassword && confirmPasswordError) {
      if (val !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
      } else {
        setConfirmPasswordError(null);
      }
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (confirmPasswordError) {
      if (!val) {
        setConfirmPasswordError('Please confirm your password.');
      } else if (val !== password) {
        setConfirmPasswordError('Passwords do not match.');
      } else {
        setConfirmPasswordError(null);
      }
    }
  };

  const handleTermsChange = (checked: boolean) => {
    setAgreeTerms(checked);
    if (checked) {
      setTermsError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    let hasError = false;

    // Full Name validation
    if (!fullName.trim()) {
      setFullNameError('Full name is required.');
      hasError = true;
    } else if (fullName.trim().length < 2) {
      setFullNameError('Full name must be at least 2 characters.');
      hasError = true;
    } else {
      setFullNameError(null);
    }

    // Email validation
    if (!email.trim()) {
      setEmailError('Email address is required.');
      hasError = true;
    } else if (!validateEmailFormat(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    } else {
      setEmailError(null);
    }

    // Password validation (min 8 characters)
    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      hasError = true;
    } else {
      setPasswordError(null);
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      hasError = true;
    } else {
      setConfirmPasswordError(null);
    }

    // Terms agreement validation - explicitly require user to check it
    if (!agreeTerms) {
      setTermsError('You must agree to the Terms of Service and Privacy Policy to create an account.');
      hasError = true;
    } else {
      setTermsError(null);
    }

    if (hasError) {
      return;
    }

    // Form is completely valid. Provide clear status notification without fake auth
    setIsSubmitting(true);
    setStatusMessage({
      type: 'info',
      text: `Account details verified for ${fullName.trim()} (${email.trim()}). Backend registration service integration is in progress.`,
    });

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="register-page">
      <div className="register-split-container">
        {/* ==================================================================
            LEFT COLUMN: REGISTRATION FORM
            ================================================================== */}
        <section className="register-form-column" aria-label="Create Your Account Section">
          {/* Top Bar with Brand & Back Navigation */}
          <div className="register-header-bar">
            {/* RAVEL Brand Link */}
            <Link to="/" className="register-brand-link" aria-label="RAVEL Home">
              <div className="register-brand-emblem" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                    fill="#FFFFFF"
                  />
                  <circle cx="12" cy="12" r="3" fill="#89F5E7" />
                </svg>
              </div>
              <span className="register-brand-text">RAVEL</span>
            </Link>

            {/* Back to Explore Navigation Link */}
            <Link to="/" className="register-back-btn" aria-label="Back to Explore">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Explore</span>
            </Link>
          </div>

          {/* Form Card Body */}
          <div className="register-form-card-wrapper">
            {/* Heading & Supporting Description */}
            <div className="register-title-group">
              <h1 className="register-heading">Create Your Ravel Account</h1>
              <p className="register-subtitle">
                Join RAVEL to craft personalized, multi-agent itineraries with intelligent real-time adaptation.
              </p>
            </div>

            {/* Status / Feedback Banner */}
            {statusMessage && (
              <div
                className={`register-status-banner ${statusMessage.type === 'error' ? 'register-status-error' : 'register-status-info'}`}
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

            {/* Registration Form */}
            <form className="register-form" onSubmit={handleSubmit} noValidate>
              {/* Full Name Field */}
              <div className="register-field-group">
                <label htmlFor="register-fullname" className="register-label">
                  Full Name
                </label>
                <div className="register-input-container">
                  <input
                    id="register-fullname"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="e.g. Varsha Sharma"
                    className={`register-input ${fullNameError ? 'input-error' : ''}`}
                    value={fullName}
                    onChange={handleFullNameChange}
                    aria-invalid={!!fullNameError}
                    aria-describedby={fullNameError ? 'fullname-error-msg' : undefined}
                  />
                </div>
                {fullNameError && (
                  <span id="fullname-error-msg" className="register-error-text" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {fullNameError}
                  </span>
                )}
              </div>

              {/* Email Address Field */}
              <div className="register-field-group">
                <label htmlFor="register-email" className="register-label">
                  Email Address
                </label>
                <div className="register-input-container">
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    className={`register-input ${emailError ? 'input-error' : ''}`}
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error-msg' : undefined}
                  />
                </div>
                {emailError && (
                  <span id="email-error-msg" className="register-error-text" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {emailError}
                  </span>
                )}
              </div>

              {/* Password Field (min 8 characters) */}
              <div className="register-field-group">
                <label htmlFor="register-password" className="register-label">
                  Password
                </label>
                <div className="register-input-container">
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    placeholder="Minimum 8 characters"
                    className={`register-input register-input-with-toggle ${passwordError ? 'input-error' : ''}`}
                    value={password}
                    onChange={handlePasswordChange}
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? 'password-error-msg' : undefined}
                  />
                  {/* Show/Hide Password Toggle */}
                  <button
                    type="button"
                    className="register-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && (
                  <span id="password-error-msg" className="register-error-text" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {passwordError}
                  </span>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="register-field-group">
                <label htmlFor="register-confirm-password" className="register-label">
                  Confirm Password
                </label>
                <div className="register-input-container">
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    placeholder="Re-enter password"
                    className={`register-input register-input-with-toggle ${confirmPasswordError ? 'input-error' : ''}`}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    aria-invalid={!!confirmPasswordError}
                    aria-describedby={confirmPasswordError ? 'confirm-password-error-msg' : undefined}
                  />
                  {/* Show/Hide Confirm Password Toggle */}
                  <button
                    type="button"
                    className="register-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <span id="confirm-password-error-msg" className="register-error-text" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {confirmPasswordError}
                  </span>
                )}
              </div>

              {/* Terms of Service and Privacy Policy Agreement Checkbox */}
              <div className="register-terms-group">
                <label htmlFor="register-terms" className="register-checkbox-label">
                  <input
                    id="register-terms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => handleTermsChange(e.target.checked)}
                    className="register-checkbox-input"
                    aria-invalid={!!termsError}
                    aria-describedby={termsError ? 'terms-error-msg' : undefined}
                  />
                  <span
                    className={`register-checkbox-custom ${agreeTerms ? 'checked' : ''} ${termsError ? 'checkbox-error' : ''}`}
                    aria-hidden="true"
                  >
                    {agreeTerms && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span>
                    I agree to RAVEL&apos;s{' '}
                    <span className="terms-inline-link">Terms of Service</span>{' '}
                    and{' '}
                    <span className="terms-inline-link">Privacy Policy</span>.
                  </span>
                </label>
                {termsError && (
                  <span id="terms-error-msg" className="register-error-text" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {termsError}
                  </span>
                )}
              </div>

              {/* Primary Create Account Button */}
              <button
                type="submit"
                className="btn-register-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>

              {/* Already have an account? Sign In navigation link */}
              <div className="login-redirect-prompt">
                Already have an account?{' '}
                <Link to="/login" className="login-redirect-link">
                  Sign In
                </Link>
              </div>
            </form>
          </div>

          {/* Privacy and Security Information */}
          <footer className="register-footer-info">
            <svg className="register-security-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>
              Protected by RAVEL security protocols. Your travel preferences and account details remain secure.
            </span>
          </footer>
        </section>

        {/* ==================================================================
            RIGHT COLUMN: PREMIUM SCENIC TRAVEL PHOTOGRAPHY SPLIT
            ================================================================== */}
        <aside className="register-photo-column" aria-label="Scenic Travel Photography">
          <img
            src={heroMunnarPhoto}
            alt="Munnar tea plantations and misty mountains"
            className="register-scenic-photo"
          />
          <div className="register-photo-overlay" />

          {/* Floating Travel Editorial Card over photograph */}
          <div className="register-photo-card">
            <div className="register-chip-row">
              <span className="register-chip-route">
                <span className="register-pulse-dot" aria-hidden="true" />
                Autonomous Travel Engine
              </span>
              <span className="register-location-name">Munnar Highlands, Western Ghats</span>
            </div>

            <h2 className="register-card-quote">
              Craft your journey with{' '}
              <span className="editorial-italic">multi-agent</span> intelligence.
            </h2>

            <p className="register-card-subtext">
              Synchronized transport discovery, curated boutique stays, real-time weather
              safeguards, and budget optimization tailored to your travel rhythm.
            </p>

            <div className="register-agents-synced-row">
              <span className="register-agent-stat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Personalized Itineraries
              </span>
              <span className="register-agent-stat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Dynamic Replanning
              </span>
              <span className="register-agent-stat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Zero Generic Tours
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
