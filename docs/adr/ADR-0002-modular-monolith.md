# ADR-0002 — Arsitektur Modular Monolith

**Status:** Accepted  
**Tanggal:** 2026-08-13

## Konteks

Sistem memiliki banyak domain (identity, competition, submission, event, commerce, payment, notification, media, admin, audit) yang perlu diorganisir dengan baik.

## Keputusan

**Modular Monolith** — semua modul berada dalam satu aplikasi Next.js dengan batasan modul yang jelas.

## Alasan

- Tidak ada kebutuhan scaling independen saat ini
- Satu deployment, satu database, operasional sederhana
- Modul bisa diekstrak menjadi microservice di masa depan jika diperlukan
- Kompleksitas operasional jauh lebih rendah

## Struktur Modul

```
src/modules/
├── identity/        # User, Session, Role, Permission
├── competition/     # Competition, Registration, Team
├── submission/      # Submission, File, Judging
├── event/           # Event, Schedule, Registration
├── commerce/        # Product, Cart, Order
├── payment/         # Payment, Webhook
├── notification/    # Email, In-app
├── media/           # File upload, Storage
├── admin/           # Dashboard, Management
└── audit/           # Audit logs
```

## Konsekuensi

- Komunikasi antar modul harus eksplisit
- Hindari circular dependency
- Setiap modul memiliki domain logic sendiri
