# RAVEL — Frontend Design System

> **Document purpose:** Reference specification for implementing the six approved RAVEL desktop UI designs in the React + TypeScript frontend.
>
> **Source:** Design values transcribed from the RAVEL Google Stitch design-token inspection performed through Stitch MCP, together with the six approved screen designs reviewed by the team.
>
> **Important:** Values explicitly identified as verified in the Stitch inspection are recorded as verified. Values inferred from screen appearance or project decisions are marked as implementation guidance. If a value was not present in the inspected design data, it is not presented as an exact token.

---

## 1. Project overview

**Product name:** RAVEL  
**Product description:** An Agentic AI-Based Multi-Agent System for Personalized Travel Planning and Dynamic Replanning.  
**Frontend target:** Desktop-first responsive website.  
**Frontend stack planned by the team:** React + TypeScript.  
**Design tool:** Google Stitch.  
**Design-to-development integration:** Stitch MCP with Google Antigravity.

RAVEL helps users explore destinations, enter trip details and preferences, review an AI-generated itinerary, and monitor an active trip. The planned system coordinates transport search, hotel discovery, attractions and restaurant discovery, and weather/route information. When a disruption is detected, the system can propose alternatives and a revised itinerary for the user's review.

### Design principles

- Keep a consistent RAVEL brand identity across all six screens.
- Use a warm off-white/parchment canvas, teal primary actions, restrained coral alerts, and clear dark text.
- Use **Newsreader** for editorial/display headings and **Plus Jakarta Sans** for interface text.
- Prefer spacious layouts, clear hierarchy, rounded cards, restrained shadows, and readable information density.
- Treat itinerary, weather, transport, hotel, cost, and disruption examples in the designs as illustrative sample data until connected provider data is available.
- Do not display unsupported live tracking, confirmed availability, booking confirmation, telemetry, or provider status as real functionality.
- User approval is required before applying a proposed itinerary change or proceeding with provider-dependent booking/payment actions.

---

## 2. Colour palette

The following tokens were reported as exact values in the Stitch theme, `designMd` specification, or inspected screen HTML. Keep token roles distinct; do not substitute one teal for another without a design reason.

### 2.1 Primary / teal

| Token / name | HEX | Intended use recorded in inspection |
|---|---|---|
| `primary` | `#00685F` | Base primary actions and confirmed states |
| Primary override / seed | `#0D9488` | Brand seed and active states |
| Luminous teal hover | `#14B8A6` | Hover state and active glow |
| `primary-container` | `#008378` | Elevated primary fill and button hover |
| `primary-fixed` | `#89F5E7` | Checkmark indicators and icon badges |
| `primary-fixed-dim` | `#6BD8CB` | Online indicator pulse dot |
| `on-primary` | `#FFFFFF` | Foreground text on primary fills |
| `on-primary-container` | `#F4FFFC` | Foreground on primary container |

### 2.2 Secondary / slate

| Token / name | HEX | Intended use recorded in inspection |
|---|---|---|
| `secondary` | `#565E74` | Structural secondary token |
| Deep Obsidian Navy | `#0F172A` | Typographic counterweight and seed |
| `secondary-container` | `#DAE2FD` | Secondary icon container background |
| `on-secondary` | `#FFFFFF` | Text on secondary container |
| `on-secondary-fixed` | `#131B2E` | Text on secondary fixed badge |
| `on-secondary-container` | `#5C647A` | Muted text on secondary container |

### 2.3 Accent / urgent / coral

| Token / name | HEX | Intended use recorded in inspection |
|---|---|---|
| `tertiary` | `#B90538` | Base accent token |
| Kinetic Coral | `#F43F5E` | Urgent prompts and alerts |
| Coral glow variants | `#FB7185`, `#FF6B6B` | Ambient alert glows |
| `tertiary-container` | `#DC2C4F` | Hero eyebrow live pulse dot |
| `tertiary-fixed` | `#FFDADB` | Weather alert icon container |
| `on-tertiary-fixed` | `#40000D` | Weather icon foreground |

### 2.4 Backgrounds and surfaces

| Token / name | HEX | Intended use recorded in inspection |
|---|---|---|
| `surface` / `background` | `#FAF9F6` | Warm parchment base surface / canvas |
| Recessed Sand Tone | `#F4F2EB` | Recessed containers and chips |
| `surface-container-lowest` | `#FFFFFF` | White card surfaces |
| `surface-container-low` | `#F4F3F1` | Destination section and footer background |
| `surface-container` | `#EFEEEB` | How-it-works section and dividers |
| `surface-container-highest` | `#E3E2E0` | Form divider rules |

### 2.5 Text and outlines

| Token / name | HEX / value | Intended use recorded in inspection |
|---|---|---|
| `on-surface` / `on-background` | `#1A1C1A` | High-contrast headline and body text |
| `on-surface-variant` | `#3D4947` | Muted descriptions and subtitles |
| `outline` | `#6D7A77` | Input placeholder and icon colour |
| `outline-variant` | `#BCC9C6` | Hairline border token |
| Translucent Slate Rule | `rgba(15, 23, 42, 0.06)` | Level 1 card border |

### 2.6 Usage guidance

- Use `#00685F` for the standard primary action colour.
- Use `#0D9488` for the brand seed and selected/active states where the Stitch design uses it.
- Use `#14B8A6` for hover/glow treatment, not as a universal replacement for the primary colour.
- Use coral (`#F43F5E` or the appropriate tertiary token) for disruption and urgent states.
- Use `#FAF9F6` as the overall warm canvas and white (`#FFFFFF`) for elevated card surfaces.
- Maintain sufficient contrast between foreground and background colours.

---

## 3. Typography

### 3.1 Font families

| Role | Font family | Usage |
|---|---|---|
| Headings and editorial display | **Newsreader** | Display headings, section titles, editorial emphasis, large numerical counters; italic style may be used where shown in the designs |
| Body and interface | **Plus Jakarta Sans** | Body copy, navigation, buttons, labels, inputs, status badges and all other interface text |
| Iconography | **Material Symbols Outlined** | Interface icons; variable icon font with optical sizes 20–48 and weights 100–700 as reported |

### 3.2 Typography scale reported by Stitch

| Tier | Font family | Size | Line height | Weight | Letter spacing |
|---|---|---:|---:|---:|---:|
| `display-lg` | Newsreader | 56px | 64px | 400 | -0.02em |
| `display-lg-mobile` | Newsreader | 38px | 46px | 400 | -0.01em |
| `display-md` | Newsreader | 40px | 48px | 400 | -0.015em |
| `display-md-mobile` | Newsreader | 30px | 38px | 400 | -0.01em |
| `headline-lg` | Plus Jakarta Sans | 32px | 40px | 700 | -0.02em |
| `headline-md` | Plus Jakarta Sans | 24px | 32px | 600 | -0.015em |
| `headline-sm` | Plus Jakarta Sans | 20px | 28px | 600 | -0.01em |
| `title-md` | Plus Jakarta Sans | 16px | 24px | 600 | 0 |
| `body-lg` | Plus Jakarta Sans | 18px | 28px | 400 | -0.005em |
| `body-md` | Plus Jakarta Sans | 15px | 24px | 400 | 0 |
| `body-sm` | Plus Jakarta Sans | 13px | 20px | 400 | 0.01em |
| `label-md` | Plus Jakarta Sans | 12px | 16px | 600 | 0.05em |
| `label-sm` | Plus Jakarta Sans | 10px | 14px | 700 | 0.08em |

**Usage rule:** Do not use Newsreader for ordinary interface/body copy. Use Plus Jakarta Sans for readable form labels, buttons, and descriptive content.

---

## 4. Spacing and layout

### 4.1 Spacing tokens

| Token | CSS value | Pixel equivalent |
|---|---:|---:|
| `space-xs` | `0.25rem` | 4px |
| `space-sm` | `0.5rem` | 8px |
| `space-md` | `1rem` | 16px |
| `space-lg` | `1.5rem` | 24px |
| `space-xl` | `2.5rem` | 40px |
| Desktop gutter | `1.5rem` | 24px |
| Mobile gutter | `1rem` | 16px |
| Desktop margin | `3rem` | 48px |
| Mobile margin | `1.25rem` | 20px |

### 4.2 Container and page dimensions

| Element | Specification |
|---|---|
| Maximum page content width | 1320px (`max-w-[1320px]`) |
| Landing-page header height | 80px (`h-20`) |
| Subpage/auth/explore header height | 64px (`h-16`) |
| Main content top offset | 80px (`pt-20`) |
| Section vertical padding | 40px (`py-space-xl`) |
| Desktop horizontal page margin | 48px (`px-margin`) |
| Mobile horizontal page margin | 20px (`px-margin-mobile`) |
| Hero text maximum width | 896px (`max-w-4xl`) |
| Hero subtitle maximum width | 672px (`max-w-2xl`) |
| Floating HUD maximum width | 576px (`md:max-w-xl`) |
| Hero media aspect ratio | 21:9 desktop; 16:9 mobile |

### 4.3 Grid and gaps

- Featured destinations: 3-column grid on desktop; responsive collapse on smaller screens.
- Feature cards: 1 column on small screens, 2 columns at medium widths, 4 columns on large screens.
- How-it-works steps: 3-column desktop grid, stacked on smaller screens.
- Footer: 12-column responsive grid on desktop, collapsing to one column on small screens.
- Common grid gaps: 8px, 16px, 24px and 40px (`gap-space-sm`, `gap-space-md`, `gap-space-lg`, `gap-space-xl`).

**Responsive guidance:** The six approved screens were primarily designed as desktop screens. Use the reported mobile typography, mobile gutters and mobile hero aspect ratio as responsive guidance. Verify all six layouts at mobile/tablet breakpoints during implementation; do not assume every desktop arrangement will work unchanged on mobile.

---

## 5. Buttons and action controls

### 5.1 Primary solid pill button

- Shape: fully rounded / pill (`rounded-full`, 9999px).
- Background: `#00685F`.
- Hover background: `#008378` or `#0D9488`, depending on the component/state.
- Text: `#FFFFFF`.
- Hero CTA height: 48px; horizontal padding approximately 40px.
- Header CTA height: 32px; horizontal padding approximately 24px.
- Form action: full width; padding `24px × 14px` (`px-6 py-3.5`).
- Reported shadow: `0 8px 20px -4px rgba(0, 104, 95, 0.35)` for the primary solid pill variant.
- A signup button shadow was also reported as `0 4px 14px rgba(0, 104, 95, 0.25)`.

### 5.2 Secondary / surface button

- Shape: pill (`rounded-full`).
- Background: `#FFFFFF`.
- Hover background: `#F4F3F1` or `#F4F2EB`.
- Text: `#1A1C1A` or `#0F172A`, depending on context.
- Border: `1px solid rgba(15, 23, 42, 0.12)` where shown.
- Padding: approximately `40px × 14px` for the large secondary variant.

### 5.3 Urgent / booking tertiary button

- Shape: pill (`rounded-full`).
- Background: `#F43F5E`.
- Text: `#FFFFFF`.
- Reserve for urgent/disruption/booking-related emphasis where appropriate.

### 5.4 Social / utility action button

- Shape: rounded rectangle (`rounded-xl`, 12px radius).
- Padding: approximately `12px × 16px`.
- Background: `#EFEEEB`.
- Hover background: `#E9E8E5`.
- Text: `#1A1C1A`.

### 5.5 Text and inline actions

- Inline arrow links may use an arrow icon and a subtle horizontal movement on hover.
- Keep button labels action-oriented and consistent across screens: for example, “Sign In”, “Create Account”, “Generate My Itinerary”, “Approve My Itinerary”, “Modify Preferences”, “Apply Updated Itinerary”, and “Keep Original Plan”.

---

## 6. Input fields, forms and selection controls

### 6.1 Standard form input

- Shape/radius: `rounded-xl`, 12px (`0.75rem`).
- Padding: `px-4 py-3` (16px horizontal, 12px vertical).
- Background: `#F4F3F1`.
- Focus background: `#FFFFFF`.
- Typography: Plus Jakarta Sans, 15px, 24px line height, weight 400.
- Placeholder colour: `#6D7A77`.
- Focus ring: 2px solid teal (`#00685F`) as reported.
- Icon, when present: approximately 20px, positioned inside the right side of the field; reserve sufficient right padding (reported `pr-11`, 44px).

### 6.2 Prompt/search input

- Height: 56px.
- Shape: pill (`rounded-full`, 9999px).
- Background: `#FFFFFF`.
- Focus ring: `0 0 0 3px rgba(13, 148, 136, 0.15)`.
- Reported ambient shadow: `0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)`.

### 6.3 Date and guest-count controls

- Use rounded recessed containers with clear upper labels.
- Use readable date placeholders (for example, “Select start date” and “Select end date”).
- Avoid pre-filled dates that could be mistaken for a user's actual trip.
- Provide a clear exact traveller-count selector. Optional group types (Solo, Couple, Family, Friends/Group) may supplement, but should not replace, the numeric count.

### 6.4 Checkbox and toggle

- Checkbox size: 16px × 16px.
- Checkbox radius: 4px.
- Fill: `#00685F` or `#0D9488`; white checkmark.
- Toggle: pill-shaped track with `#0D9488` active fill and white knob.

### 6.5 Select/dropdown availability

The Stitch inspection reported that native select dropdown styling was not available in the inspected designs; custom pill chips and modal popups were used instead. Match the actual selected component appearance rather than inventing an unverified native dropdown style.

---

## 7. Cards, borders, radii and shadows

### 7.1 Border-radius scale

| Token / use | Radius |
|---|---:|
| `sm` | 4px — checkbox corners |
| Default | 8px — inner nested micro-surfaces and timestamps |
| `md` | 12px — form inputs, social-auth buttons and inner card highlight strips |
| `lg` | 16px — standard destination cards, feature cards and modal sheets (`rounded-2xl`) |
| `xl` | 24px — large CTA banner container (`rounded-3xl`) |
| `full` | 9999px — pill buttons, filter chips and prompt/search bar |
| Hero media card | 32px (`rounded-[2rem]`) |

### 7.2 Elevation levels

**Level 0 — Parchment foundation**
- Background: `#FAF9F6`.
- Flat; no shadow.

**Level 1 — Card deck, destination and step cards**
- Background: `#FFFFFF`.
- Ambient shadow: `0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)`.
- Border: `1px solid rgba(15, 23, 42, 0.06)` or `#EFEEEB` where applicable.

**Level 2 — Active cards and hover states**
- Shadow: `0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)`.

**Level 3 — Modal sheets and AI agent HUD panel**
- Background: `rgba(250, 249, 246, 0.90)` or `rgba(255, 255, 255, 0.85)`, as appropriate to the component.
- Blur: 16px (`backdrop-filter: blur(16px)`).
- Highlight stroke: `1px solid rgba(255, 255, 255, 0.60)`.
- Shadow: `shadow-2xl` as reported.

### 7.3 Specific reported shadows

| Component | Shadow |
|---|---|
| Header bottom | `0 1px 8px rgba(0, 0, 0, 0.04)` |
| Footer top | `0 -1px 12px rgba(0, 0, 0, 0.02)` |
| Signup button | `0 4px 14px rgba(0, 104, 95, 0.25)` |
| Primary solid pill | `0 8px 20px -4px rgba(0, 104, 95, 0.35)` |
| Level 1 card | `0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)` |
| Level 2 active card | `0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)` |
| Level 3 modal/HUD | `shadow-2xl` (exact pixel parameters not available in the report) |

---

## 8. Navigation and footer

### 8.1 Navigation header

- Position: fixed at top, full width, z-index 50 (as reported for the inspected landing page header).
- Landing header height: 80px.
- Subpage/auth/explore header height: 64px.
- Content max width: 1320px, centered.
- Desktop horizontal padding: 48px; mobile horizontal padding: 24px.
- Background: `rgba(250, 249, 246, 0.90)` with 16px backdrop blur.
- Bottom shadow: `0 1px 8px rgba(0, 0, 0, 0.04)`.
- Navigation links: Plus Jakarta Sans, 16px, weight 600.
- Standard link colour: `#3D4947`; hover: `#1A1C1A`; active: `#00685F` with semibold weight.
- Expected navigation labels across the signed-in pages: Home, Plan a Trip, My Trips, Explore.
- Public landing navigation includes Explore, How It Works and Destinations, with Login and Sign Up actions.

### 8.2 Footer

- Background: `#F4F3F1` (`surface-container-low`).
- Top shadow: `0 -1px 12px rgba(0, 0, 0, 0.02)`.
- Container: max width 1320px, centered; horizontal padding 48px; top padding 40px; bottom padding 24px.
- Responsive 12-column grid on desktop; collapse to a readable stacked layout on smaller screens.
- Category titles: 12px, weight 600, uppercase, wider letter spacing, colour `#1A1C1A`.
- Link items: 13px, weight 400, colour `#3D4947`; hover `#1A1C1A`.
- Approved footer copyright: **© 2026 RAVEL. All rights reserved.**
- Approved tagline: **Plan smarter. Travel better.**
- Do not use “Academic Project” in the public-facing website footer.
- Do not claim company registration, governance certification, security certification, or integrations that have not been implemented and verified.

---

## 9. Reusable UI components

The following reusable component patterns were identified in the Stitch inspection and approved screens:

### Brand and navigation
- `RavelLogo`
- `PublicHeader`
- `AuthenticatedHeader`
- `Footer`
- `ProfileMenu` (visual reference only; behavior to be implemented)

### Buttons and status
- `PrimaryButton`
- `SecondaryButton`
- `UtilityButton`
- `InlineArrowLink`
- `StatusBadge`
- `FeatureTag`
- `OnlineStatusIndicator`

### Cards and content
- `DestinationCard`
- `FeatureCard`
- `ProcessStepCard`
- `TripSummaryCard`
- `HotelOptionCard`
- `TransportOptionCard`
- `WeatherCard`
- `BudgetBreakdownCard`
- `DisruptionAlertCard`
- `AlternativeOptionCard`
- `ItineraryActivityCard`

### Form controls
- `TextInput`
- `PasswordInput`
- `DateInput`
- `TravellerCountSelector`
- `BudgetSelector`
- `PreferenceCard`
- `TransportPreferenceSelector`
- `Checkbox`

### Itinerary and monitoring
- `DayTabs`
- `ItineraryTimeline`
- `OptimizationSummary`
- `RouteMapPanel` (only when a map/route provider is integrated; otherwise show a clearly labelled placeholder)
- `ScheduleComparison`
- `NotificationLog`
- `ReplanningActions`

These are suggested component names for implementation, not a claim that these React components already exist.

---

## 10. Six approved RAVEL screens

### Screen 1 — Public Explore / Landing Page

**Purpose:** Let visitors explore RAVEL and destinations before signing in.

**Main elements:**
- RAVEL brand and public navigation.
- Login and Sign Up actions.
- Hero heading: “Plan smarter. Travel better.”
- Descriptive subheading and Explore Destinations / Start Planning actions.
- Featured destination cards, including Ooty, Goa and Manali.
- Four feature areas: Personalized Itineraries, Transport & Hotel Discovery, Weather-Aware Planning and Budget Optimization.
- How It Works three-step section.
- Call-to-action banner and footer.

**Flow:** Public exploration is available without an account. Starting a personalized trip leads into the account access flow.

### Screen 2 — Login Page

**Purpose:** Allow an existing user to sign in.

**Main elements:**
- RAVEL logo and Back to Explore link.
- Premium split-screen layout with travel photograph.
- Welcome Back heading and supporting text.
- Email and password inputs, show/hide password control, Forgot Password link.
- Sign In action and Create Account link.
- Privacy/terms links where shown.

**Implementation note:** The screen is a design reference. Authentication, password recovery and any Google sign-in option require actual identity-provider/backend integration before they are functional.

### Screen 3 — Register Page

**Purpose:** Allow a new user to create an account.

**Main elements:**
- RAVEL logo and Back to Explore link.
- Split-screen travel photograph and registration form.
- Full Name, Email Address, Password and Confirm Password inputs.
- Password show/hide controls.
- Terms of Service and Privacy Policy checkbox.
- Create Account action and Sign In link.

**Implementation note:** Account creation, validation, password policy and persistence must be implemented and tested. Do not imply verification/OTP capabilities unless the backend supports them.

### Screen 4 — Plan Your Trip / Trip Details & Preferences

**Purpose:** Collect travel requirements before invoking the AI planning workflow.

**Main elements:**
- Signed-in navigation: Home, Plan a Trip, My Trips, Explore.
- Destination and starting city.
- Start and end dates.
- Exact number of travellers, with optional group type.
- Preferred mode(s) of transport: Train, Bus, Flight, Car/Taxi, or Any Suitable Transport. “Any Suitable Transport” should be mutually exclusive with individual mode selections if implemented as a single “any” choice.
- Estimated budget per person in INR.
- Multi-select preferences: Adventure, Relaxation, Culture & Heritage, Food & Cuisine, Nature & Sightseeing and Shopping.
- Travel style: Budget, Balanced or Luxury.
- Generate My Itinerary action.
- Explain that RAVEL coordinates the planning searches in the background.

**Planning activities shown in the design:**
1. Transport Options Search.
2. Hotel Discovery.
3. Attractions & Restaurant Discovery.
4. Weather & Route Information.

**Implementation note:** These are workflow responsibilities; actual search results depend on available backend services and provider APIs.

### Screen 5 — Personalized Itinerary / Plan Review

**Purpose:** Present a generated draft travel plan for user review.

**Main elements:**
- Trip summary: destination, dates, travellers, selected transport and estimated budget.
- Optimization summary: Time, Budget, Distance and Preference Matching.
- Day-wise itinerary timeline with activity, time, duration and location.
- Recommended stays / hotel cards.
- Transport options and comparison.
- Weather and route information.
- Budget breakdown: accommodation, transport, food, activities/sightseeing and other estimated expenses.
- Approve My Itinerary action.
- Modify Preferences action.
- Download Itinerary PDF action.

**Flow:** Modify Preferences returns the user to planning for changes and regeneration. Approval proceeds to booking/payment coordination only where provider integrations are available and the user confirms.

### Screen 6 — Active Trip Monitoring / Dynamic Replanning

**Purpose:** Show an active trip and support user-reviewed changes when disruptions occur.

**Main elements:**
- Active trip summary and trip status.
- Weather, transport and route monitoring panels.
- Today's itinerary timeline with activity status.
- Disruption alert panel.
- Alternative activity, route or transport suggestions.
- Original versus updated schedule comparison, including estimated cost/time impact where available.
- Apply Updated Itinerary action.
- Keep Original Plan action.
- Notification log and RAVEL AI Assistant entry point.

**Required workflow:**

`Start Trip → Monitor Weather / Transport / Other Conditions → Detect Disruption?`

- **No disruption:** Continue the original trip.
- **Disruption detected:** Find alternative options → Generate revised itinerary → Compare original and revised plans → Obtain user confirmation → Update itinerary → Notify user.

**Implementation note:** Monitoring frequency, live alerts, live transport status, GPS/location, SMS/WhatsApp delivery and provider data must only be presented as live capabilities if their respective integrations are implemented and verified. Until then, use explicitly labelled sample/demo data.

---

## 11. User journey and navigation flow

1. Visitor opens the Public Explore page.
2. Visitor explores destinations and RAVEL features.
3. Visitor chooses Login or Sign Up when starting a personalized trip.
4. User enters trip details, dates, traveller count, transport preference, budget and interests.
5. Frontend submits trip requirements to the backend.
6. Backend/AI services coordinate transport, hotel, attraction/restaurant and weather/route searches.
7. Frontend displays the generated itinerary for review.
8. User approves the plan or modifies preferences and requests regeneration.
9. After approval, provider-dependent booking/payment coordination may occur with explicit user confirmation.
10. When the trip starts, the active-trip screen displays monitoring information.
11. If a disruption occurs, the system proposes alternatives and a revised plan for user approval.
12. The user applies the revised itinerary or keeps the original plan.

---

## 12. Data integrity, labels and implementation cautions

- Treat sample destinations, dates, hotels, prices, schedules, weather readings, route conditions and disruption events in the Stitch screens as **illustrative demonstration data**, not verified live data.
- Do not hard-code sample hotel availability, train schedules, ticket prices, weather, ratings, vehicle details or booking confirmations as factual results.
- Make provider-backed values traceable to the backend/API response and show an unavailable/error state if a provider does not return data.
- Do not claim private chauffeur tracking, vehicle telemetry, FASTag, GPS tracking, fixed polling intervals, SMS/WhatsApp delivery or live route telemetry unless the team implements and verifies those integrations.
- Never apply a revised itinerary or change bookings automatically without explicit user confirmation.
- Keep UI text aligned with the agreed RAVEL product language: “RAVEL AI Planning Engine”, “Ravel AI Assistant” and “AI-Assisted Replanning”. Avoid unrelated luxury-concierge, aviation, baggage or escort terminology.
- Keep the approved public-facing footer: “© 2026 RAVEL. All rights reserved.” and “Plan smarter. Travel better.”

---

## 13. Verified values versus values requiring confirmation

### Reported as verified in Stitch inspection
- The listed colour tokens and HEX codes in Section 2.
- Font families: Newsreader, Plus Jakarta Sans and Material Symbols Outlined.
- Typography scale in Section 3.
- Spacing, page width, header heights and image aspect ratios in Section 4.
- Button, form input, checkbox, toggle, radius, shadow, navigation and footer specifications in Sections 5–8, to the extent explicitly recorded above.

### Requires implementation or team confirmation
- Actual mobile layouts and responsive behavior for every screen.
- Which authentication provider and password-reset flow will be used.
- Which hotel, transport, weather, map and route providers are integrated.
- Whether a PDF export, email notifications, SMS/WhatsApp notifications or live monitoring will be implemented.
- Exact values for any design token not listed in this document.
- Exact shadow parameters for `shadow-2xl` and any component whose source value was not available.

When a value is not available, inspect the source design or choose a documented implementation value and mark it as an implementation decision. Do not describe an estimate as a verified Stitch token.

---

## 14. Document maintenance

- Update this document only when the team approves a design-system change or an implementation detail needs to be clarified.
- Keep the six approved Stitch screens as the visual reference.
- If a screen is changed in Stitch, review its corresponding section here and update the component guidance consistently.
- Keep secrets, API keys, credentials and environment variables out of this file and out of Git commits.
