# FRONTEND — Komponen & UI

Folder ini berisi semua komponen UI yang digunakan di halaman.

## Struktur

```
components/
├── ui/           # Komponen dasar (Button, Card, Input, Badge, Modal)
├── layout/       # Layout (Navbar, Footer, Sidebar)
├── sections/     # Section halaman (HeroSection, FeatureCards)
└── shared/       # Komponen yang dipakai di banyak tempat
```

## Aturan

- Semua komponen UI ada di sini
- Tidak boleh ada business logic di komponen
- Gunakan design token dari `globals.css`
- Setiap komponen harus responsif
