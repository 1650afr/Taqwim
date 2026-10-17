# TaqwimUPA — Firebase build (uji awal)

Paket ini menambahkan Firebase Authentication (email/kata sandi) dan Cloud Firestore ke prototipe Taqwim Lampiran 1–4.

## Yang berubah
- Identitas tampilan menjadi TaqwimUPA.
- JSONBin API settings dihapus dari tampilan; backup/restore JSON tetap ada.
- Login, pendaftaran akun, reset kata sandi, dan logout memakai Firebase Authentication.
- Tombol Kirim ke Cloud / Tarik dari Cloud menyimpan satu dokumen per akun di `users/{uid}/taqwim/data`.
- Data lokal tetap disimpan di browser. Sinkronisasi cloud dilakukan manual agar perubahan lokal tidak menimpa cloud tanpa persetujuan.
- Formulir Lampiran 1–4 dan ekspor Excel/Word/cetak tetap ada.

## Langkah wajib sebelum mencoba cloud
1. Di Firebase Console > Authentication > Sign-in method, pastikan Email/Password aktif.
2. Di Cloud Firestore > Rules, salin isi `firestore.rules` ke editor Rules dan tekan **Publish**.
3. Jangan gunakan aturan `allow read, write: if true` atau mode uji terbuka.
4. Buka aplikasi melalui HTTPS (misalnya GitHub Pages), bukan dengan membuka file HTML langsung dari penyimpanan HP.
5. Buka tab Pengaturan Cloud, daftar akun dengan email sendiri dan kata sandi minimal 6 karakter. Jangan berbagi akun.
6. Isi data, tekan **Simpan di perangkat**, lalu **Kirim ke Cloud**. Untuk menguji, masuk akun yang sama di perangkat/browser lain lalu tekan **Tarik dari Cloud**.

## Struktur data dan aturan
Dokumen disimpan di `users/{uid}/taqwim/data`. Aturan yang disertakan hanya memberi akses kepada pemilik UID yang sedang login.

## Catatan penting
- Ini adalah build integrasi awal; lakukan uji menyeluruh sebelum dipakai untuk data resmi.
- File `app.js` tetap menyimpan data lokal menggunakan localStorage. Backup JSON tetap tersedia.
- Konfigurasi Firebase Web bukan kata sandi, tetapi kunci API sebaiknya dibatasi di Google Cloud Console sesuai kebutuhan. Jangan pernah memasukkan service-account private key atau kredensial admin ke aplikasi publik.
- Jika menggunakan domain GitHub Pages, tambahkan domain itu di Firebase Authentication > Settings > Authorized domains bila belum ada.
- Library ekspor Excel dan Word diambil dari CDN, sehingga memerlukan koneksi internet saat ekspor.
