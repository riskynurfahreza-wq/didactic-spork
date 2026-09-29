# Sambung Jaga — Prototipe Interaktif

Prototipe web untuk **Sambung Jaga**, ruang komunitas digital untuk menjaga dukungan sosial dan
resiliensi pascabencana. Dibangun dengan React + Vite + Tailwind CSS. Semua data disimpan di
`localStorage` browser — tidak ada backend.

> **Saling bantu saat krisis, saling jaga setelahnya.**

## Struktur

- **Website publik** (`/`, `/about`, `/how-it-works`, `/features`) — memperkenalkan ide produk.
- **Aplikasi** (`/app`) — pengalaman interaktif: Beranda (Kabar ta'?), Ruang Pulih, Saling Jaga,
  Tali Jaga, Kita Bisa, Lingkar Jaga, Rujukan, dan Aku (Ruangku).
- Ketuk judul "Ruangku" 5 kali di halaman Aku untuk membuka panel **Evaluasi Prototipe**
  (indikator keterlibatan, bukan bukti efektivitas psikologis).

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build produksi

```bash
npm run build
npm run preview
```

## Mengunggah ke GitHub

```bash
git init
git add .
git commit -m "Sambung Jaga prototype"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) → **Add New Project** → impor repo GitHub di atas.
2. Framework Preset: **Vite** (biasanya terdeteksi otomatis).
3. Build Command: `npm run build` — Output Directory: `dist` (default Vite, sudah otomatis).
4. Klik **Deploy**.

Aplikasi menggunakan `HashRouter`, jadi routing tetap berfungsi di hosting statis tanpa
konfigurasi rewrite khusus (file `vercel.json` disertakan sebagai jaring pengaman tambahan).

## Catatan prototipe

- Semua nama menggunakan inisial, lokasi hanya sampai tingkat area umum (RW/Kelurahan).
- Data mitra, kapasitas komunitas, dan kontak Rujukan adalah **data contoh (dummy)** — bukan
  nomor layanan darurat sungguhan.
- Tidak ada diagnosis atau klasifikasi psikologis otomatis di mana pun dalam aplikasi ini.
