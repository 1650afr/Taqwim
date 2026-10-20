# TaqwimUPA v2.5 — Permohonan Anggota & Notifikasi

Paket ini meneruskan tampilan/laporan v2.4 dan menambahkan formulir permohonan anggota, jalur email langsung, daftar permohonan untuk Admin Utama, dan sumber Firebase Cloud Function untuk email otomatis.

## Penting sebelum dipasang
- Buat backup JSON dari aplikasi lama.
- Paket ini belum diuji langsung terhadap proyek Firebase Anda. Jangan pasang di waktu operasional sebelum tes.
- Data lama di `users/{uid}/taqwim/data` tidak dihapus atau dipindahkan.
- Fitur persetujuan pada paket ini hanya mengubah status permohonan; belum membuat akun Firebase otomatis atau menerapkan seluruh matriks peran Tim Taqwim/Murobby/Murobbiyah. Itu tetap tahap implementasi berikutnya.
- Notifikasi Gmail otomatis belum aktif sampai Cloud Functions dideploy dan kredensial SMTP disiapkan.

## File frontend
Unggah `index.html`, `app.js`, dan `firebase.js` ke root repositori GitHub yang sudah digunakan. Tunggu GitHub Pages terbarui.

## Firestore Rules
1. Buka Firebase Console → Firestore Database → Rules.
2. Simpan salinan rules saat ini.
3. Tinjau `firestore.rules` di paket ini lalu terapkan hanya setelah memastikan aturan cocok dengan proyek. Jangan mengganti rules lama tanpa memahami bahwa rules mengatur akses data.
4. Rules ini mempertahankan akses data lama per UID dan menambahkan koleksi `joinRequests`. Pengajuan publik dapat disalahgunakan/spam; aktifkan Firebase App Check/rate limiting sebelum penggunaan luas.

## Email otomatis (perlu komputer/terminal dan billing Firebase yang sesuai)
1. Pasang Firebase CLI dan masuk ke akun Google yang memiliki proyek `taqwimupa`.
2. Dari folder paket, jalankan `firebase use taqwimupa`.
3. Buat App Password Gmail khusus (jangan pernah kirim password akun Gmail biasa atau App Password ke chat).
4. Atur secret:
   `firebase functions:secrets:set TAQWIM_SMTP_USER`
   Masukkan alamat Gmail pengirim yang dipakai untuk SMTP.
   `firebase functions:secrets:set TAQWIM_SMTP_APP_PASSWORD`
   Masukkan App Password Gmail.
5. Jalankan `cd functions && npm install`, lalu kembali ke root folder.
6. Jalankan `firebase deploy --only functions:emailJoinRequest`.
7. Pastikan deployment sukses. Buat satu pengajuan uji dan cek Gmail admin serta log Functions.

Jika email pengirim adalah `pakmuha@gmail.com`, akun itu harus memiliki verifikasi 2 langkah dan App Password yang valid. Jangan simpan kredensial SMTP di `firebase.js` atau repositori.

## Uji sebelum dipakai
- Formulir mengirim permohonan dan menampilkan pesan berhasil.
- Admin Utama masuk memakai `pakmuha@gmail.com` dan melihat daftar permohonan di bagian Pengaturan Cloud.
- Pengajuan memicu email setelah Cloud Function dideploy.
- Akun lain tidak bisa membaca/meninjau koleksi permohonan.
- Data lama tetap tersedia dan backup bisa dipulihkan.
- Jalur email langsung membuka aplikasi email perangkat dengan rincian yang sudah diisi; pengiriman tetap dilakukan pengguna.
