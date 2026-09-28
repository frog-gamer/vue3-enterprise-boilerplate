# Enterprise Vue 3 Boilerplate

Vue 3 + TypeScript + Vite + Pinia + Vue Router + Axios.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Validasi production

```bash
npm run typecheck
npm run build
npm run preview
```

Aplikasi tetap dapat dijalankan tanpa backend karena dashboard menggunakan `Demo mode` jika endpoint `VITE_API_BASE_URL/health` belum tersedia.

## Struktur utama

- `src/components`: komponen UI reusable.
- `src/composables`: reusable logic seperti async state, toggle, dan pagination.
- `src/services`: integrasi API Axios global.
- `src/stores`: state global Pinia.
- `src/views`: halaman yang didaftarkan di router.
- `src/router`: konfigurasi navigasi.
