# TaqwimUPA v2.3 — perbaikan format ekspor Excel

Paket ini memperbarui nomor versi menjadi v2.3 dan memperbaiki format ekspor Excel:
- Header tabel hijau dengan teks putih.
- Teks panjang dibungkus otomatis (wrap text).
- Lebar kolom dan tinggi baris ditata agar lebih mudah dibaca.
- Filter tabel dan baris judul dibekukan untuk lembar data.
- Lembar Data Kegiatan, Lampiran 1, Lampiran 2, Lampiran 3, dan Lampiran 4.
- Pengaturan halaman cetak landscape untuk tabel lebar.

## Cara memasang melalui HP
1. Unduh ZIP lalu ekstrak.
2. Buka https://github.com/1650afr/Taqwim
3. Pilih Add file → Upload files.
4. Unggah dan ganti `index.html`, `app.js`, dan `firebase.js` pada tingkat utama repositori. `firebase.js` disertakan sama seperti versi sebelumnya agar konfigurasi Firebase tidak berubah.
5. Commit changes.
6. Tunggu GitHub Pages memperbarui situs, lalu muat ulang dan pastikan header menampilkan v2.3.

Jangan unggah ZIP sebagai satu berkas ke halaman utama. Ekstrak dahulu dan unggah berkas aplikasi satu per satu.

## Catatan pengujian
Perubahan format telah disiapkan dalam kode, tetapi belum diuji langsung di browser pengguna atau terhadap semua aplikasi pembuka Excel. Sebelum penggunaan resmi, ekspor satu berkas uji dan periksa tampilannya. Buat backup JSON data penting terlebih dahulu.
