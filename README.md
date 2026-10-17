# Lampiran 1–4 CKMY — GitHub Pages + JSONBin.io

## Isi
- `index.html`: antarmuka web responsif.
- `app.js`: input Lampiran 1–4, data lokal, backup/restore JSON, ekspor Excel, ekspor Word rekap Lampiran 4, cetak ke PDF.
- `worker-example.js`: contoh kerangka backend perantara. Ini belum aman untuk produksi sampai autentikasi nyata ditambahkan.
- `README.md`: petunjuk.

## Status prototipe
Aplikasi ini dapat berjalan sebagai situs statis GitHub Pages dan menyimpan data di browser. Fitur cloud hanya bekerja setelah endpoint API perantara disiapkan. GitHub Pages tidak dapat menjaga rahasia seperti JSONBin Master Key; jangan pernah menaruh Master Key di JavaScript publik. Jangan gunakan data pribadi nyata sebelum autentikasi dan aturan akses selesai.

## Deploy frontend
1. Buat repo GitHub baru.
2. Unggah `index.html` dan `app.js` ke root repo.
3. Aktifkan Settings → Pages → Deploy from branch → branch utama/root.
4. Buka alamat GitHub Pages yang disediakan.
5. Di menu Pengaturan Cloud, isi URL API HTTPS perantara. Jangan isi Master Key JSONBin pada halaman.

## Backend perantara
Gunakan server sendiri atau Cloudflare Worker, bukan panggilan JSONBin langsung dari browser.
- Simpan `JSONBIN_BIN_ID` dan `JSONBIN_MASTER_KEY` sebagai secret/environment variables di server.
- Batasi CORS hanya ke domain GitHub Pages Anda.
- Implementasikan login nyata dan validasi token. Header X-User-BIN saja bukan autentikasi.
- Terapkan izin per peran dan kecamatan di server, bukan hanya di UI.
- Untuk endpoint yang kompatibel dengan `app.js`, GET mengembalikan data JSON (bisa berupa `{ "record": { ... } }` atau data langsung); PUT menerima seluruh objek data dan menyimpan ke JSONBin.
- Contoh `worker-example.js` hanya kerangka pembelajaran; pemeriksaan bearer token di dalamnya belum memverifikasi identitas sungguhan. Jangan deploy untuk data nyata sebelum diganti dengan validasi token yang benar.
- Pastikan hanya petugas berizin dapat membaca/mengubah data. Pertimbangkan pembatasan per kegiatan/kecamatan.

## JSONBin
API JSONBin v3 umumnya menggunakan:
- GET `https://api.jsonbin.io/v3/b/{BIN_ID}/latest` dengan header `X-Master-Key`.
- PUT `https://api.jsonbin.io/v3/b/{BIN_ID}` dengan header `X-Master-Key` dan body JSON.
Periksa dokumentasi dan konfigurasi akun JSONBin Anda sebelum produksi; kuota, API, dan izin dapat berubah.

## Ekspor
- Excel: workbook dengan sheet Kegiatan, Lampiran 2, Lampiran 3, dan Lampiran 4.
- Word: prototipe mengekspor rekap Lampiran 4.
- PDF: gunakan tombol Cetak/Simpan PDF atau tombol cetak tiap lampiran; pilih "Simpan sebagai PDF" pada dialog cetak.
- Tata letak ekspor belum identik 100% dengan dokumen asli. Sebelum penggunaan resmi, perlu pengujian margin, ukuran kertas, header, tabel berlanjut, tanda tangan, dan ekspor masing-masing lampiran ke Word/PDF.


## Versi aplikasi dan kredit
- Header dan footer menampilkan `v2.1 · by Muhajir, ST`.
- Setiap kali ada rilis/update aplikasi, pengembang menaikkan konstanta `BUILD_VERSION` di awal `app.js` (misalnya `2.1` menjadi `2.2`). Browser akan otomatis menampilkan versi baru saat aplikasi diperbarui.
- Versi tidak dapat naik dengan benar hanya berdasarkan edit data pengguna; versi harus mengikuti rilis kode aplikasi agar tidak berubah setiap kali peserta mengedit data.
