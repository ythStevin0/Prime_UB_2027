# BACKEND — Business Logic & API

Folder ini berisi semua logic backend: domain, use case, dan integrasi.

## Struktur

```
modules/
├── identity/        # User, Session, Role, Permission
│   ├── domain/      # Entity, value object, business rules
│   ├── services/    # Use case / application service
│   ├── repository/  # Database access
│   └── types.ts     # TypeScript types
│
├── competition/     # Competition, Registration, Team
├── submission/      # Submission, File, Judging
├── event/           # Event, Schedule, Registration
├── commerce/        # Product, Cart, Order
├── payment/         # Payment, Webhook
├── notification/    # Email, In-app
├── media/           # File upload, Storage
└── audit/           # Audit logs
```

## Aturan

- Semua business logic ada di sini
- Domain logic TIDAK boleh bergantung pada HTTP/UI
- Repository mengabstraksi akses database
- Service mengkoordinasi workflow
