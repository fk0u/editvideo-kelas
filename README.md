<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

# 🎬 Memori Kelulusan — Motion Web Video

> **Video kelulusan sinematik yang 100% dibuat dengan kode.** Tanpa After Effects. Tanpa DaVinci Resolve. Cukup React, Framer Motion, dan secangkir kopi ☕

Proyek ini adalah **motion web video** untuk kelulusan SMK Negeri 7 Samarinda — Jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) angkatan 2026. Seluruh animasi, transisi, dan efek 3D di-render langsung di browser menggunakan teknologi web modern.

---

## ✨ Fitur Utama

- 🎥 **7 Scene Sinematik** — Intro chromatic, Apple Music 3D player, IG post carousel, bento widgets, IG story overlay, macOS Finder floating, dan cinematic outro
- 🎵 **Audio Sync** — Timeline animasi disinkronkan dengan lagu _"Everything U Are"_ oleh Hindia
- 📱 **Responsive Safe Area** — Konten 1920×1080 di-scale otomatis ke semua ukuran layar dengan letterbox
- 🎬 **Browser Recording** — Rekam langsung dari browser menggunakan `MediaRecorder` API, export sebagai `.webm`
- 🌀 **3D CSS Transforms** — Efek perspektif dan depth menggunakan `preserve-3d` + Framer Motion
- ✨ **Micro-Animations** — RGB split, glitch, floating elements, ambient glow, film grain overlay

---

## 🚀 Quick Start

### Prasyarat

- [Node.js](https://nodejs.org/) v18+
- npm atau pnpm

### Instalasi

```bash
# Clone repository
git clone https://github.com/fk0u/kelact.git
cd kelact

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka `http://localhost:5173` di browser (disarankan **Chrome** atau **Edge**).

### Build Produksi

```bash
npm run build
npm run preview
```

---

## 🎞️ Struktur Scene

| Scene | Waktu       | Lirik                         | Konsep Visual                             |
| ----- | ----------- | ----------------------------- | ----------------------------------------- |
| 1     | 0:00 – 0:03 | _"Cerita kita"_               | Intro — Photo grid + chromatic aberration |
| 2     | 0:03 – 0:07 | _"Tak jauh berbeda"_          | Apple Music 3D player + lyrics            |
| 3     | 0:07 – 0:10 | _"Got beat down..."_          | Instagram post carousel 3D                |
| 4     | 0:10 – 0:13 | _"Sometimes I wanna fold"_    | Bento grid widgets floating               |
| 5     | 0:13 – 0:16 | _"Namun suratmu..."_          | Instagram Story dengan chat bubble        |
| 6     | 0:18 – 0:25 | _"Bahwa aku pernah dicintai"_ | macOS Finder + VS Code + Terminal         |
| 7     | 0:25 – 0:28 | _"Seada-adanya..."_           | Cinematic outro + credits                 |

---

## 🛠️ Tech Stack

| Teknologi            | Fungsi                  |
| -------------------- | ----------------------- |
| **React 19**         | UI framework            |
| **Vite 7**           | Build tool & dev server |
| **Framer Motion 12** | Animasi & transisi      |
| **Tailwind CSS 4**   | Styling utility-first   |
| **Remotion**         | Video rendering engine  |
| **TypeScript**       | Type safety             |
| **Lucide React**     | Icon library            |

---

## 📂 Struktur Folder

```
kelact/
├── public/          # Asset gambar & video
├── src/
│   ├── App.tsx      # Main app — scene timeline & controller
│   ├── main.tsx     # Entry point
│   ├── index.css    # Global styles
│   ├── components/  # Komponen reusable (LyricsDisplay, FloatingWindow, dll)
│   └── assets/      # Asset statis
├── index.html       # HTML entry
├── vite.config.ts   # Konfigurasi Vite
├── tsconfig.json    # Konfigurasi TypeScript
├── package.json
├── LICENSE          # Lisensi MIT
└── README.md
```

---

## 🎨 Cara Pakai Sebagai Template

Proyek ini **boleh digunakan sebagai template** untuk video kelulusan kalian sendiri! Cukup:

1. **Fork** atau **clone** repo ini
2. Ganti foto-foto di folder `public/` dengan foto kalian
3. Edit teks, nama, dan sekolah di `src/App.tsx`
4. Ganti lagu BGM di `ASSETS.audioTrack`
5. Sesuaikan timeline di `useEffect` dalam komponen `App()`
6. **Wajib** tetap menyertakan copyright notice di source code atau README:

   ```
   Original template by Al-Ghani Desta Setyawan (KOU.sozo)
   https://github.com/fk0u/kelact
   ```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](./LICENSE).

**Artinya:**

- ✅ Boleh digunakan untuk keperluan pribadi maupun komersial
- ✅ Boleh dimodifikasi dan didistribusikan ulang
- ✅ Boleh dijadikan template untuk proyek lain
- ⚠️ **Wajib** menyertakan copyright notice asli

```
Copyright (c) 2026 Al-Ghani Desta Setyawan (KOU)
```

---

## 🙏 Credits

| Role                     | Nama                                       |
| ------------------------ | ------------------------------------------ |
| **Producer & Developer** | Al-Ghani Desta Setyawan (KOU.sozo)         |
| **Music**                | Hindia — _Everything U Are_                |
| **Special Thanks**       | PPLG Class of 2026, SMK Negeri 7 Samarinda |

---

<p align="center">
  <sub>Built with ❤️ and code, not After Effects.</sub><br/>
  <sub>© 2026 Al-Ghani Desta Setyawan (KOU) — SMK Negeri 7 Samarinda</sub>
</p>
