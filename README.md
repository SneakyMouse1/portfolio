# smyslov.dev — Personal Portfolio

Personal portfolio of **Semyon Smyslov**, Web Developer based in Alicante, Spain.  
Built with **Vue 3** and **TailwindCSS** in a neo-brutalist style. Features English and Spanish versions, individual project pages, an admin panel for updating projects via Airtable, and a contact form with spam protection.

---

## Features

- **Bilingual (EN / ES)**: Clean `/es` subdirectory routes with reactive switching and dynamic Airtable translation.
- **Project Case Studies**: Dedicated `/project/:id` pages with image carousels, tech stacks, and adjacent navigation.
- **Admin Dashboard**: Simple JWT-protected area at `/admin` to create and edit projects in Airtable.
- **Contact Form**: Serverless endpoint with Cloudflare Turnstile verification and email delivery via Resend.

---

## Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite 8 |
| Styling | TailwindCSS v4 with custom `@theme` tokens |
| Localization | Custom i18n composable with `/es` routing |
| Carousel | Swiper.js |
| Canvas Animation | GSAP |
| Routing | Vue Router 5 (`createWebHistory`) |

### Backend (Vercel Serverless Functions)
| Layer | Technology |
|---|---|
| Projects data | Airtable (proxied via `/api/projects`) |
| Contact form | Resend (`/api/contact`) |
| Spam protection | Cloudflare Turnstile |
| Admin auth | JWT (stored in `localStorage`) |

### Typography
| Role | Font |
|---|---|
| Headings | Bebas Neue |
| Body | Plus Jakarta Sans |
| Code & labels | JetBrains Mono |

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
│   ├── utils/
│   │   ├── airtable.js       # Airtable API client & error handler
│   │   └── withAuth.js       # Authentication wrapper
│   ├── contact.js            # Contact form — Turnstile verify + Resend email
│   ├── projects.js           # Public portfolio data proxy to Airtable
│   └── verifyAuth.js         # JWT verification helper
├── public/
│   ├── favicon.ico
│   ├── og-preview.png        # Social preview image
│   └── robots.txt            # Search crawler rules
├── src/
│   ├── assets/
│   │   └── main.css          # Styles + Tailwind @theme tokens
│   ├── components/
│   │   ├── global/           # HeaderGlobal, FooterGlobal
│   │   ├── sections/         # HeroSection, AboutSection, PortfolioSection, ContactSection
│   │   └── ui/               # BrutalButton, MarqueeTicker, DotGrid, CardPortfolio, SkeletonBox, inputs
│   ├── composables/
│   │   ├── useAuthFetch.js   # Fetch wrapper with auth header
│   │   ├── useI18n.js        # Localization state, localePath helper & Airtable resolver
│   │   └── useScrollTo.js    # Smooth scroll utility
│   ├── locales/
│   │   ├── en.js             # English texts
│   │   └── es.js             # Spanish texts
│   ├── router/
│   │   └── index.js          # Routes (/ & /es, /project/:id, /admin) + auth guards
│   ├── views/
│   │   ├── HomeView.vue              # Main portfolio page
│   │   ├── ProjectView.vue           # Project case study page
│   │   ├── AdminLoginView.vue        # Admin login
│   │   ├── AdminDashboardView.vue    # Admin projects list
│   │   └── AdminProjectFormView.vue  # Project edit/create form
│   └── main.js
├── .env                      # Local secrets — NOT committed to git
├── vercel.json               # Vercel configuration & SPA rewrites
└── package.json
```

---

## Local Development

### 1. Install dependencies

```sh
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
# Airtable
AIRTABLE_TOKEN=your_token_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=your_table_name_here

# Admin panel credentials
ADMIN_LOGIN=your_login_here
ADMIN_PASSWORD=your_password_here
JWT_SECRET=your_jwt_secret_here

# Email (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Cloudflare Turnstile
TURNSTILE_SECRET_KEY=your_turnstile_secret_here
```

### 3. Start the development server

```sh
npm run dev
```

This starts Vite and the `/api/` serverless functions via `vercel dev`.  
Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

The project is connected to **Vercel** via GitHub. Every push to `main` triggers an automatic deployment.

Add the required environment variables in the [Vercel Dashboard](https://vercel.com/dashboard) under **Settings → Environment Variables**:

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
