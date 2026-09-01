# ADR-0001 — Application Framework

**Status:** Accepted  
**Tanggal:** 2026-08-13  
**Pembuat Keputusan:** User + AI Agent

## Konteks

Prime UB 2027 membutuhkan framework full-stack yang mendukung:
- Server-side rendering untuk SEO dan performa
- API routes untuk backend logic
- File-based routing
- React Server Components untuk efisiensi
- Ekosistem yang kuat di Indonesia

## Alternatif

| Opsi | Kelebihan | Kekurangan |
|------|-----------|------------|
| **Next.js 15** | SSR/SSG, App Router, RSC, API routes, komunitas besar | Learning curve App Router |
| Nuxt.js | Vue ecosystem, auto-imports | Komunitas lebih kecil di Indonesia |
| SvelteKit | Performa terbaik, sintaks sederhana | Ekosistem lebih kecil, hiring sulit |

## Keputusan

**Next.js 15 dengan App Router** dipilih sebagai framework utama frontend.
**Hono.js** dipilih sebagai API backend handler yang berjalan di dalam Next.js (Hybrid Architecture).

## Alasan

1. Server Components mengurangi bundle JavaScript di client
2. App Router mendukung layout bersarang, loading/error states bawaan
3. Hono.js memberikan abstraksi routing yang lebih baik (seperti Express) dibandingkan Next.js API Routes murni, namun tetap bisa di-deploy menjadi satu kesatuan (monolith)
4. Komunitas developer Indonesia yang besar
5. Deployment mudah di Vercel (karena Hono kompatibel dengan Edge/Serverless Next.js)
6. Kompatibel dengan semua skill yang terinstal (shadcn/ui, Tailwind)

## Konsekuensi

- TypeScript wajib digunakan
- Perlu memahami perbedaan Server vs Client Components
- Perlu strategi yang jelas untuk client-side interactivity
- Terikat pada ekosistem React

## Validasi

- Project berhasil diinisialisasi dan berjalan di localhost
- Build production berhasil tanpa error
