TAQWIMUPA v2.8.1 — AKTIVASI PERAN DARI PENGAJUAN DISETUJUI

TUJUAN
Memperbaiki kasus akun yang berhasil login tetapi tetap berstatus "peran belum ditetapkan",
padahal pengajuannya sudah disetujui.

ALUR
1. Admin Utama menyetujui permohonan.
2. Pengguna login dengan email yang SAMA PERSIS dengan email pengajuan.
3. Aplikasi mencari permohonan berstatus approved untuk email tersebut.
4. Aplikasi membuat profil akses awal. Firestore Rules memvalidasi bahwa permohonan
   benar-benar approved, email cocok, dan role sama dengan role yang diajukan.
5. Profil yang sudah ada tidak dapat diubah oleh pengguna biasa.

FILE
- index.html, app.js, forms-data.js: dipertahankan dari paket pemulihan v2.8.
- firebase.js: diperbaiki untuk aktivasi peran otomatis.
- firestore.rules.v2.8.1.txt: aturan Firestore yang harus dipasang agar proses aktivasi aman.

LANGKAH PEMASANGAN
A. Cadangkan file GitHub saat ini dan salin file ZIP ke perangkat.
B. Ganti index.html, app.js, forms-data.js, firebase.js dengan file dari paket.
C. Firebase Console > Firestore Database > Rules:
   - Salin isi firestore.rules.v2.8.1.txt.
   - Klik Publish.
D. Jangan hapus koleksi users, joinRequests, atau dokumen data yang sudah ada.
E. Setelah Rules dipublikasikan, keluar dari akun coba@gmail.com, lalu masuk kembali.
F. Pastikan email pengajuan = coba@gmail.com dan status pengajuan = approved.
G. Status aplikasi seharusnya berubah menjadi Murobby.

PENTING
- Aturan ini mempertahankan data lama di users/{uid}/taqwim/{documentId}.
- Aturan ini memberi pemohon akses baca hanya ke dokumen joinRequests dengan email miliknya.
- Hanya Admin Utama (pakmuha@gmail.com) yang dapat menyetujui permohonan dan mengubah profil akses.
- Admin Utama ditentukan dari email tersebut dalam kode/rules. Jangan ubah email tanpa memperbarui keduanya.
- Jika pengguna memiliki beberapa permohonan approved untuk email yang sama, aplikasi memilih permohonan dengan reviewedAt terbaru.
- Ini belum membuat sistem penugasan binaan lintas akun. Data laporan bersama dan penugasan binaan membutuhkan rancangan koleksi dan aturan tambahan; jangan menganggapnya sudah aktif.
- Uji di akun coba terlebih dahulu. Jangan mengubah Rules lain secara terpisah setelah paket dipasang.
