TAQWIMUPA v2.7.1 — PERBAIKAN LOGIN DAN PRIVASI DATA

File:
- index.html
- app.js
- firebase.js
- forms-data.js
- firestore.rules.v27 (referensi, jangan dipublikasikan otomatis)

Perubahan:
1. Form peserta dan data tidak ditampilkan sebelum login.
2. Data lokal dipisahkan per UID Firebase.
3. Data lokal lama hanya dimigrasikan ke akun Admin Utama.
4. Reset password menampilkan pesan keberhasilan/kegagalan lebih jelas.
5. Pesan kesalahan login dibuat lebih informatif.

Pemasangan:
Backup repository terlebih dahulu. Ganti empat file utama pada root repository.
JANGAN mengganti Firestore Rules saat ini pada tahap ini.
Jangan menghapus data Firestore.
Setelah deploy, uji login admin, reset password, logout, dan login akun biasa.

Catatan:
Jika login Admin Utama masih gagal, periksa pesan kesalahan yang tampil.
Perbaikan kode tidak dapat menebak atau mengganti kata sandi akun Firebase.
