# ADR-0004 — Autentikasi & Session

**Status:** Accepted  
**Tanggal:** 2026-08-13

## Keputusan

**Auth.js v5 (NextAuth)** untuk autentikasi dan session management.

## Alasan

- Integrasi native dengan Next.js App Router
- Mendukung credential provider (email + password)
- Mendukung OAuth (Google, GitHub, dll — opsional)
- Session management built-in (database session)
- Middleware untuk proteksi route

## Session Strategy

- Database-backed sessions (bukan JWT)
- HTTP-only, Secure, SameSite cookie
- Expiration configurable
- Server-side authorization di setiap operasi terproteksi

## Konsekuensi

- Perlu adapter Drizzle untuk Auth.js
- Credential provider perlu implementasi password hashing manual (bcrypt)
- Role/permission disimpan di database, bukan di token
