# Prime UB 2027

Platform kompetisi, event, dan merchandise resmi Prime UB 2027.

## Quick Start

```bash
# Masuk ke folder aplikasi
cd app

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Project

```
prime_ub/
│
├── app/                          # 🚀 APLIKASI UTAMA (Next.js 15)
│   ├── src/
│   │   ├── app/                  # 🌐 ROUTING & HALAMAN (Tetap di luar untuk router Next.js)
│   │   │   ├── (public)/        #     Halaman publik
│   │   │   ├── (auth)/          #     Halaman login, register
│   │   │   ├── api/             #     ⚙️ API ROUTES (BACKEND)
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── frontend/            # 🎨 FRONTEND
│   │   │   ├── components/      #     Komponen UI (Button, Card, Navbar)
│   │   │   ├── hooks/           #     React hooks custom
│   │   │   └── store/           #     State management
│   │   │
│   │   └── backend/             # ⚙️ BACKEND
│   │       ├── modules/         #     Business Logic per Domain
│   │       │   ├── identity/    #     User, Session, Role
│   │       │   ├── competition/ #     Kompetisi, Registrasi
│   │       │   └── ...
│   │       └── lib/             #     Database & Config
│   │           ├── db/          #     Drizzle ORM
│   │           └── auth/        #     Auth.js config
│   │
│   ├── .env.example             # Template environment variables
│   └── package.json             # Dependencies & scripts
│
├── docs/adr/                    # 📋 Architecture Decision Records
├── guide/                       # 📚 Dokumentasi project
└── .agents/skills/              # 🤖 AI/Design skills
```

## Pembeda Frontend vs Backend

| | **FRONTEND** 🎨 | **BACKEND** ⚙️ |
|---|---|---|
| **Lokasi** | `src/frontend/` + `src/app/` (halaman) | `src/backend/` + `src/app/api/` |
| **Fungsi** | Tampilan, UI, interaksi user | Business logic, database, API |
| **Contoh** | Button, Card, Navbar, HeroSection | CreateSubmission, ProcessPayment |
| **Bahasa** | TSX (React) + CSS | TypeScript |
| **Berjalan di** | Browser (client) + Server (SSR) | Server only |

## Technology Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Database | PostgreSQL + Drizzle ORM |
| Auth | Auth.js v5 |
| Payment | Midtrans |
| Icons | Lucide React |
| Deploy | Vercel + Railway |

## Branching

- `main` — production (stable)
- `staging` — development (default, aktif)
