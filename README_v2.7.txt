TAQWIMUPA v2.7 — PEMBARUAN PERAN DAN JALUR

Perubahan:
- Peran permohonan: Tim Taqwim, Murobby, Murobbiyah, Naqib, Naqibah.
- Murobby/Murobbiyah hanya melihat dua jalur pertama.
- Naqib/Naqibah, Tim Taqwim, Admin Utama melihat tiga jalur.
- Profil akses dibaca dari users/{uid}/profile/access.
- Akun tanpa profil akses dianggap belum diaktifkan.

PENTING: Ini adalah tahap awal kontrol tampilan. Data Taqwim masih tersimpan per UID, belum menjadi basis data bersama antar pengguna. Murobby/Murobbiyah belum otomatis dibatasi ke binaan masing-masing. Sebelum pemakaian resmi, diperlukan rancangan data bersama dan aturan server untuk akses per binaan.

Pemasangan: backup repository, ganti index.html, app.js, firebase.js, tambahkan forms-data.js jika belum ada. Jangan publish firestore.rules.v27 sebelum memeriksa konsistensi aturan dengan kebutuhan data lama. Rules v2.7 menambahkan akses profil; path data Taqwim lama dipertahankan.

Penetapan peran manual sementara:
1. Pengguna harus membuat akun Firebase Auth terlebih dahulu.
2. Admin melihat UID pengguna di Firebase Authentication.
3. Di Firestore buat users/{UID}/profile/access dengan field role (string) bernilai salah satu: Tim Taqwim, Murobby, Murobbiyah, Naqib, Naqibah.
4. Pengguna keluar lalu masuk kembali.

Status pengujian: pemeriksaan sintaks lokal dilakukan; belum diuji pada Firebase produksi / perangkat pengguna.
