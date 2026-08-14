# ADR-0005 — Payment Gateway

**Status:** Accepted  
**Tanggal:** 2026-08-13

## Keputusan

**Midtrans** sebagai payment gateway utama.

## Alasan

- Populer di Indonesia, banyak digunakan oleh universitas dan event organizer
- Mendukung: GoPay, OVO, ShopeePay, bank transfer, kartu kredit/debit, QRIS
- Snap API untuk integrasi cepat (popup/redirect)
- Webhook/notification untuk konfirmasi pembayaran server-side
- Sandbox environment untuk development

## Flow Pembayaran

```
Create Order → Create Payment (Midtrans Snap) → User bayar
  → Midtrans Webhook → Verify Signature → Update Payment → Update Order
```

## Konsekuensi

- Perlu akun Midtrans (sandbox untuk dev, production untuk live)
- Server Key dan Client Key tidak boleh di-commit
- Webhook handler harus idempotent
- Perlu handle: pending, settlement, expire, cancel, deny, refund
