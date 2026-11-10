TAQWIMUPA v2.8 – PEMULIHAN FORM TIGA JALUR

Isi paket:
- index.html: antarmuka dan login dari paket perbaikan status login v2.7.2
- firebase.js: modul Firebase/login/status sesi dari v2.7.2
- app.js + forms-data.js: basis form tiga jalur dari v2.6

Perbaikan:
1. Form tiga jalur dipulihkan.
2. Data lokal dipisahkan per UID akun (taqwimupa-user-{uid}).
3. Form dan data disembunyikan sebelum login.
4. Akun tanpa peran aktif tidak dapat membuka form.
5. Murobby/Murobbiyah dibatasi dari jalur ketiga.
6. Naqib/Naqibah diperlakukan sebagai lihat saja pada antarmuka.

PENTING:
- Paket ini tidak mengubah Firestore Rules atau data cloud.
- Jangan hapus/ubah data Firestore yang ada.
- Peran selain Admin Utama tetap harus ditetapkan secara aman di Firestore oleh Admin melalui prosedur admin yang belum dibangun dalam paket ini. Persetujuan permohonan saja belum membuat akun/peran.
- Pembatasan tampilan di browser bukan pengganti Firestore Security Rules. Jangan gunakan untuk data resmi/rahasia sampai aturan akses server-side dan pembagian data binaan diuji.
- Data lokal lama dengan kunci taqwimupa-v26 tidak otomatis dipindahkan. Buat backup terlebih dahulu bila masih diperlukan.
- Versi ini belum diuji pada Firebase proyek pengguna; lakukan uji login, logout, tiap peran, ekspor, dan sinkronisasi sebelum dipakai operasional.

Instalasi aman:
1. Unduh dan ekstrak ZIP.
2. Cadangkan salinan file GitHub yang sekarang.
3. Ganti empat file aplikasi: index.html, app.js, forms-data.js, firebase.js.
4. Jangan mengubah Firestore Rules pada tahap ini.
5. Commit/publish GitHub Pages, lalu uji dari mode samaran dan akun terpisah.
