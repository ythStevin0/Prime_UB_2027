# ADR-0006 — Deployment

**Status:** Accepted  
**Tanggal:** 2026-08-13

## Keputusan

- **Frontend + API:** Vercel (Next.js native)
- **Database:** Railway (PostgreSQL)
- **Object Storage:** Diputuskan kemudian (Supabase Storage / Cloudflare R2)

## Alasan

### Vercel
- Zero-config deployment untuk Next.js
- Edge functions, preview deployments
- SSL otomatis, CDN global
- Free tier cukup untuk development

### Railway
- PostgreSQL managed, provisioning cepat
- Connection pooling built-in
- Monitoring dan backup bawaan
- Pricing transparan

## Environment

```
Development  → localhost (Next.js dev server)
Staging      → Vercel preview + Railway dev DB
Production   → Vercel production + Railway prod DB
```

## Konsekuensi

- Environment variables di-manage di Vercel dashboard
- Database connection string berbeda per environment
- `.env.example` wajib di-maintain
