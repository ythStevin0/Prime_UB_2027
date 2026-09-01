# ADR-0003 — Database & ORM

**Status:** Accepted  
**Tanggal:** 2026-08-13

## Keputusan

- **Database:** PostgreSQL (via Podman untuk local development)
- **ORM:** Drizzle ORM

## Alasan

### PostgreSQL
- Relational database yang kuat untuk data transaksional
- Dukungan JSON, full-text search, indexing yang baik
- Berjalan di Podman Container memastikan konsistensi *environment* tanpa membebani sistem host Windows secara langsung.

### Drizzle ORM
- Type-safe query builder, dekat dengan SQL
- Drizzle Kit untuk migrasi database
- Bundle size kecil, performa baik
- Tidak ada query overhead yang tersembunyi

## Konsekuensi

- Perlu menulis SQL-like syntax (bukan abstraksi tinggi seperti Prisma)
- Migrasi menggunakan `drizzle-kit`
- Wajib menyalakan Podman machine sebelum melakukan development
- Koneksi pool menggunakan `postgres.js` driver (bukan serverless)
