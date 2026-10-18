# TaqwimUPA — Lampiran 1–4 (integrasi Firebase awal)

Paket ini adalah versi uji awal dari aplikasi Lampiran 1–4. Aplikasi mempertahankan penyimpanan lokal dan backup/restore JSON, serta menambahkan Firebase Authentication dan Cloud Firestore untuk sinkronisasi manual per akun.

## Isi paket
- `index.html` — tampilan aplikasi.
- `app.js` — formulir Lampiran 1–4, penyimpanan lokal, ekspor Excel/Word/cetak, backup/restore JSON.
- `firebase.js` — login, daftar akun, reset kata sandi, logout, dan sinkronisasi Firestore.
- `firestore.rules` — aturan keamanan Firestore per UID.
- `README_FIREBASE.md` — panduan pemasangan dan pengujian.

## Wajib sebelum penggunaan cloud
Ikuti `README_FIREBASE.md`. Khususnya, salin aturan dalam `firestore.rules` ke Firebase Console > Cloud Firestore > Rules, lalu tekan **Publish**. Jangan memakai aturan terbuka untuk semua pengguna.

## Catatan
Ini integrasi awal dan perlu diuji di GitHub Pages sebelum digunakan untuk data resmi. Backup JSON tetap berguna untuk cadangan lokal. Jangan memasukkan kredensial Admin SDK atau service-account private key ke aplikasi web publik.
