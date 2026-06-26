# smyslov.dev — Personal Portfolio

Personal portfolio of **Semyon Smyslov**, Junior Web Developer based in Alicante, Spain.
Built with **Vue 3** around a custom **Neo-Brutalist** design system. Includes a protected admin panel for managing portfolio content and a serverless contact form with bot protection.

---

## Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | Vue 3 — Composition API, `<script setup>` |
| Build tool | Vite 8 |
| Styling | TailwindCSS v4 with a custom `@theme` design system |
| Animation | GSAP — interactive dot-grid canvas |
| Carousel | Swiper.js — image carousel inside project detail modals |
| Routing | Vue Router 5 — `createWebHistory` |

### Backend (Vercel Serverless Functions)
| Layer | Technology |
|---|---|
| Portfolio data | Airtable — headless CMS, proxied via `/api/projects` |
| Contact form | Resend — transactional email delivery |
| Bot protection | Cloudflare Turnstile — server-side token verification |
| Admin auth | JWT — stateless authentication, tokens stored in `localStorage` |

### Typography
| Role | Font |
|---|---|
| Display / headings | Bebas Neue |
| Body | Plus Jakarta Sans |
| Code / labels | JetBrains Mono |

---

## Project Structure

```
/
├── api/
│   ├── admin/
│   │   ├── projects.js       # CRUD for portfolio projects (auth required)
│   │   └── schema.js         # Airtable field schema (auth required)
│   ├── auth/
│   │   └── login.js          # Admin login — returns JWT
│   ├── contact.js            # Contact form — Turnstile verify + Resend email
│   ├── projects.js           # Public portfolio data proxy to Airtable
│   └── verifyAuth.js         # Shared JWT verification helper
├── public/
│   ├── favicon.ico
│   ├── og-preview.png        # Open Graph social preview image
│   └── robots.txt            # Blocks /admin from search crawlers
├── src/
│   ├── assets/
│   │   └── main.css          # Global styles + Tailwind @theme tokens
│   ├── components/
│   │   ├── global/           # HeaderGlobal, FooterGlobal
│   │   ├── sections/         # HeroSection, AboutSection, PortfolioSection, ContactSection
│   │   └── ui/               # BrutalButton, BrutalModal, inputs, DotGrid, CardPortfolio, CardDetails
│   ├── composables/
│   │   ├── useAuthFetch.js   # Authenticated fetch wrapper with token refresh logic
│   │   └── useScrollTo.js    # Smooth scroll utility
│   ├── router/
│   │   └── index.js          # Routes + navigation guard for /admin
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── AdminLoginView.vue
│   │   ├── AdminDashboardView.vue
│   │   └── AdminProjectFormView.vue
│   └── main.js
├── .env                      # Local secrets — NOT committed to git
├── vercel.json               # Vercel build config + API rewrites
└── package.json
```

---

## Local Development

### 1. Install dependencies

```sh
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root with the following variables:

```env
# Airtable (headless CMS)
AIRTABLE_TOKEN=your_token_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=your_table_name_here

# Admin panel credentials
ADMIN_LOGIN=your_login_here
ADMIN_PASSWORD=your_password_here
JWT_SECRET=your_jwt_secret_here

# Email (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Cloudflare Turnstile (bot protection)
TURNSTILE_SECRET_KEY=your_turnstile_secret_here
```

> `.env` is listed in `.gitignore` and will never be committed to the repository.

### 3. Start the development server

```sh
npm run dev
```

This runs `vercel dev`, which starts Vite **and** the `/api/` serverless functions simultaneously.
Open [http://localhost:3000](http://localhost:3000).

> **Note:** Cloudflare Turnstile does not render on unregistered domains.
> For local testing, either add `localhost` to your Turnstile site's allowed domains in the Cloudflare Dashboard,
> or temporarily replace the `data-sitekey` in `ContactSection.vue` with the official test key `1x00000000000000000000AA`.

---

## Deployment

The project is connected to **Vercel** via GitHub. Every push to `main` triggers an automatic production deployment.

Before deploying for the first time, add all environment variables in the [Vercel Dashboard](https://vercel.com/dashboard) under **Settings → Environment Variables**:

```
AIRTABLE_TOKEN
AIRTABLE_BASE_ID
AIRTABLE_TABLE_NAME
ADMIN_LOGIN
ADMIN_PASSWORD
JWT_SECRET
RESEND_API_KEY
TURNSTILE_SECRET_KEY
```

---

## Contact

- **Website** — [smyslov.dev](https://smyslov.dev)
- **GitHub** — [github.com/SneakyMouse1](https://github.com/SneakyMouse1)
- **LinkedIn** — [linkedin.com/in/semyonsmyslov](https://www.linkedin.com/in/semyonsmyslov/)
- **Telegram** — [@sneaky_mouse](https://t.me/sneaky_mouse)
- **WhatsApp** — [+34 663 737 463](https://wa.me/34663737463)
