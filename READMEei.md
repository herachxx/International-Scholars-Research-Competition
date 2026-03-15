# MIT Critical Data Global Research Challenge
### Official Competition Website

[![Competition](https://img.shields.io/badge/Competition-Open-brightgreen)](https://nsri.org)
[![Partners](https://img.shields.io/badge/Partners-NSRI_×_Synthica-red)](https://nsri.org)
[![Awards](https://img.shields.io/badge/Student_Awards-$10,000+-gold)](https://nsri.org)
[![Deadline](https://img.shields.io/badge/Deadline-May_30-blue)](https://nsri.org)

---

## About the Competition

The **MIT Critical Data Global Research Challenge** is a continental student research competition hosted by the **National Student Researchers Institute (NSRI)** in partnership with **Synthica**. The competition invites students from all academic disciplines worldwide to submit original research papers for review by leading professors and industry experts.

Modeled after elite competitions like iGO, KSEF, iSEF, Regeneron, and YISF, this challenge provides students a prestigious platform to present groundbreaking research, earn global recognition, and compete for over **$10,000 in student awards**.

---

## Competition Details

| Detail | Info |
|--------|------|
| **Organizer** | NSRI (National Student Researchers Institute) × Synthica |
| **Total Funding** | $13,000+ |
| **Student Awards** | $10,000+ |
| **Entry Fee** | $30 (registration + 1 submission) |
| **Additional Submissions** | +$10 each |
| **Team Size** | Up to 3 members |
| **Submission Format** | PDF (academic research format) |
| **Review Process** | Blind peer review (2 reviewers per paper) |

---

## Awards & Recognition

### Global Grand Award
Top 3 papers judged by PhD researchers, Associate Professors, and Professors.

| Place | Prize |
|-------|-------|
| 🥇 1st Place | $1,500 |
| 🥈 2nd Place | $500 |
| 🥉 3rd Place | $250 |

### Best Paper Award
Awarded per category — 1st, 2nd, and 3rd place in each of the 5 research categories.

### Recognition Tiers

| Tier | Cutoff | Benefits |
|------|--------|----------|
| **Research Distinction** | Top 300 researchers | Research Distinction Certificate, Competition Recognition |
| **Semi-Finalist** | Top 100 researchers | Official Semi-Finalist Certificate, NSRI Recognition Letter |
| **Global Finalist** | Top 40 researchers | Official Global Finalist Recognition, Published on NSRI Website, Featured on NSRI Research Showcase |

---

## Research Categories

1. **Health & Life Sciences** — Biology, medicine, neuroscience, public health, biotechnology, biomedical engineering
2. **Engineering & Technology** — Computer science, AI/ML, electrical, mechanical, and software engineering
3. **Physical & Chemical Sciences** — Physics, chemistry, materials science, nanotechnology, quantum research
4. **Environmental & Earth Sciences** — Climate science, ecology, geology, sustainability, environmental policy
5. **Social Sciences, Humanities & Policy** — Economics, sociology, political science, psychology, history, public policy

---

## Competition Timeline

```
May 30          Paper Submission Deadline
                └── All fields accepted · Online submission portal closes at 11:59 PM EST

May 31 – Jun 6  Blind Review Period
                └── 2 expert reviewers per paper
                └── Top 300 → Research Distinction
                └── Top 100 → Semi-Finalist
                └── Top 40  → Global Finalist

Jun 7 – Jun 10  Finalist Confirmation
                └── Top 40 Global Finalists confirmed
                └── Presentation preparation
                └── Travel and logistics coordination

June 13         Finals Day
                └── Oral presentation + Q&A with professor judges
                └── Grand Award and Best Paper winners announced same day
```

---

## Program Partners

| Partner | Role |
|---------|------|
| MIT | Academic partner |
| MIT Critical Data | Research framework partner |
| Stanford University | Academic partner |
| NSRI | Host organization |
| Synthica | Co-host and operations partner |
| Hack Club | Community partner |
| ColdMatch | Technology partner |

---

## Website Structure

```
MIT-Research-Challenge-Website/
├── index.html                    # Main landing page (hero, awards, about, categories, timeline, partners, FAQ)
├── register.html                 # Account creation (Step 1 of 2)
├── competition-register.html     # Competition registration & payment (Step 2 of 2)
├── login.html                    # Participant login
├── submit.html                   # Research paper submission portal
├── dashboard.html                # Participant dashboard (submissions, timeline, profile)
├── google-form-registration.html # Google Form registration embed page ⭐ NEW
├── style.css                     # Global design system and component styles
├── main.js                       # Interactivity: navbar, scroll, FAQ accordion, reveal animations
├── README.md                     # This file
└── assets/
    ├── MIT-Critical-Data-Global-Research-Competition-website-logo.png
    ├── MIT-university-logo.png
    ├── MIT-critical-data-logo.png
    ├── Stanford-university-logo.png
    ├── NSRI_logo.png
    ├── synthica-logo.jpg
    ├── HackClub-logo.jpg
    ├── ColdMatch-logo.jpg
    ├── CrackD-logo.jpg
    ├── website-background.png
    └── Maratova-Aruzhan.jpeg
```

---

## Technical Overview

### Stack
- **Pure HTML5 / CSS3 / Vanilla JavaScript** — no build tools, no frameworks required
- **Google Fonts** — Libre Baskerville (serif headings) + Inter (body)
- **CSS Custom Properties** — full design token system for consistent theming
- **IntersectionObserver API** — scroll-reveal animations
- **localStorage** — demo user session management (replace with real backend for production)

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--red` | `#A31F34` | MIT cardinal red — primary brand color |
| `--red-dk` | `#7c1728` | Hover state for red elements |
| `--ink` | `#111` | Primary text / dark backgrounds |
| `--body` | `#444` | Body text |
| `--muted` | `#767676` | Secondary text, labels |
| `--bg` | `#f8f8f7` | Light section backgrounds |
| `--serif` | Libre Baskerville | Headings, titles, display text |
| `--sans` | Inter | Body, UI, navigation |

### Key Features
- **Responsive** — mobile-first, breakpoints at 480px, 768px, 1024px
- **Accessible** — skip-to-content link, `:focus-visible` styles, semantic HTML, ARIA labels
- **Performance** — lazy-loaded images, passive scroll listeners, `requestAnimationFrame` throttling
- **SEO** — Open Graph tags, Twitter Card meta, descriptive alt text, semantic structure
- **Smooth UX** — hide-on-scroll-down navbar, scroll-reveal animations, FAQ accordion, mobile hamburger menu

---

## Setup & Deployment

### Local Development

No build step required — open directly in a browser:

```bash
# Clone or unzip the project
cd MIT-Research-Challenge-Website

# Option 1: Open directly
open index.html

# Option 2: Local server (recommended — avoids CORS issues with assets)
python3 -m http.server 8080
# Then visit http://localhost:8080
```

### Deployment

This is a static site — deploy to any static hosting provider:

| Provider | Steps |
|----------|-------|
| **Netlify** | Drag & drop the folder at netlify.com/drop |
| **Vercel** | `vercel deploy` in the project directory |
| **GitHub Pages** | Push to a repo, enable Pages in Settings |
| **AWS S3** | Upload all files to an S3 bucket with static hosting enabled |

No server-side dependencies. Works on any CDN or static host.

---

## Google Form Registration Setup

The file `google-form-registration.html` embeds your competition registration Google Form. To activate it:

1. Create your Google Form at [forms.google.com](https://forms.google.com)
2. Click **Send** → **Embed** (`<>` icon)
3. Copy the `src` URL from the iframe code
4. Open `google-form-registration.html` and replace `PLACEHOLDER_FORM_ID` with your real form ID in two places:
   - The `iframe src` attribute
   - The fallback `<a href>` link

**Recommended Google Form fields for competition registration:**
- Full Name (required)
- Email Address (required)
- Institution / University (required)
- Country (required)
- Academic Level (dropdown: High School / Undergraduate / Graduate / PhD / Postdoc)
- Research Category (dropdown: 5 categories)
- Research Title (required)
- Team Members (optional, up to 2 additional)
- How did you hear about us? (optional)
- Agreement to Terms & Conditions (checkbox, required)

---

## Production Checklist

Before going live, replace or update the following:

- [ ] **Google Form URL** in `google-form-registration.html` — replace `PLACEHOLDER_FORM_ID`
- [ ] **Payment processor** — replace localStorage mock in `competition-register.html` with real Stripe / PayPal integration
- [ ] **Authentication** — replace localStorage session in `register.html` / `login.html` with real backend auth
- [ ] **Email confirmation** — add transactional email (SendGrid / Mailgun) on registration
- [ ] **Contact email** — update `info@nsri.org` references throughout
- [ ] **Social links** — add real social media URLs to footer
- [ ] **Privacy Policy & Terms** — link real legal documents from `#` placeholders
- [ ] **OG image** — add `og:image` meta tag with competition banner image URL
- [ ] **Analytics** — add Google Analytics / Plausible / Fathom tracking script
- [ ] **Custom domain** — configure DNS for your domain registrar

---

## Competition Contacts

| Role | Contact |
|------|---------|
| Competition Organizer | NSRI (National Student Researchers Institute) |
| Co-host | Synthica |
| General Inquiries | info@nsri.org |

---

## License & Copyright

© 2025 MIT Critical Data Global Research Challenge · NSRI × Synthica · All rights reserved.

This website was created for the MIT Critical Data Global Research Challenge. All partner logos and trademarks are property of their respective owners and are used with permission.
