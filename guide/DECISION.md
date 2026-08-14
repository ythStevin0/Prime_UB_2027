# Architecture Decisions Index — Prime UB

File ini adalah index untuk semua Architecture Decision Records.

Detail setiap keputusan ada di: `docs/adr/`

## Status Legend

- **Accepted** — Disetujui dan berlaku
- **Proposed** — Diusulkan, menunggu persetujuan
- **Superseded** — Digantikan oleh keputusan baru
- **Rejected** — Ditolak

## Keputusan yang Sudah Disetujui

| ADR | Topik | Status | Tanggal |
|-----|-------|--------|---------|
| ADR-0001 | Application Framework (Next.js 15) | ✅ Accepted | 2026-08-13 |
| ADR-0002 | Modular Monolith Architecture | ✅ Accepted | 2026-08-13 |
| ADR-0003 | Database (PostgreSQL) & ORM (Drizzle) | ✅ Accepted | 2026-08-13 |
| ADR-0004 | Authentication (Auth.js v5) & Session | ✅ Accepted | 2026-08-13 |
| ADR-0005 | Payment Gateway (Midtrans) | ✅ Accepted | 2026-08-13 |
| ADR-0006 | Deployment (Vercel + Railway) | ✅ Accepted | 2026-08-13 |

## Keputusan yang Akan Datang

| ADR | Topik | Status |
|-----|-------|--------|
| ADR-0007 | Object Storage Strategy | Proposed |
| ADR-0008 | Background Job/Queue Strategy | Proposed |
| ADR-0009 | Caching Strategy | Deferred |
| ADR-0010 | Observability Strategy | Deferred |

## Aturan

Jangan menandai keputusan sebagai Accepted hanya karena AI agent mengusulkannya.

Setiap keputusan yang diterima membutuhkan:
- Konteks
- Alternatif
- Alasan
- Konsekuensi
- Persetujuan eksplisit