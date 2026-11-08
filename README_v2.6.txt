TAQWIMUPA v2.6 - Form tiga jalur

Isi paket:
- index.html: antarmuka responsif
- app.js: logika form, penyimpanan lokal, backup/restore, ekspor Excel
- forms-data.js: label jalur, biodata, persyaratan, dan Muasyirat diekstrak dari tiga workbook sumber
- firebase.js: mekanisme Firebase Auth/Firestore yang digunakan pada v2.5 (tidak diubah)
- firestore.rules: aturan Firestore yang sedang digunakan (salin dari proyek yang sudah dipublish)

Pemasangan:
1. Backup folder/repository TaqwimUPA saat ini.
2. Ganti index.html dan app.js dengan file paket ini.
3. Tambahkan forms-data.js ke root repository.
4. Pertahankan firebase.js dan firestore.rules versi aktif yang sudah diuji.
5. Commit dan push ke GitHub Pages.
6. Buka aplikasi, uji data lokal, lalu login dan uji Kirim ke Cloud/Tarik dari Cloud.

Batasan yang belum selesai:
- Hak akses peran Tim Taqwim/Murobby/Murobbiyah belum ditegakkan pada Firestore/server. Rules lama hanya memisahkan dokumen per UID.
- Persetujuan permohonan belum otomatis membuat akun atau menetapkan peran.
- Notifikasi Gmail otomatis belum dikonfigurasi.
- Ekspor Excel saat ini berupa rekap digital lintas jalur, belum meniru tata letak cetak workbook asli sel demi sel.
- Cetak PDF browser menggunakan tampilan form, belum merupakan reproduksi resmi setiap lampiran.
- Uji lintas perangkat dan keamanan harus dilakukan sebelum pemakaian resmi.
