# TaqwimUPA v2.2 — paket unggah GitHub Pages

## Isi paket
- `index.html` — halaman aplikasi, versi v2.2
- `app.js` — logika formulir dan ekspor
- `firebase.js` — autentikasi dan sinkronisasi Firestore
- `firestore.rules` — contoh aturan keamanan Firestore
- `README.md` — petunjuk pemasangan

## Penting sebelum mengunggah
ZIP ini **tidak diunggah sebagai ZIP ke GitHub Pages**. Ekstrak ZIP dahulu, lalu unggah/ganti berkas aplikasi satu per satu di folder utama repositori (sejajar dengan berkas lama), terutama `index.html`, `app.js`, dan `firebase.js`.

## Langkah pemasangan lewat HP
1. Unduh ZIP dan ekstrak menggunakan aplikasi pengelola berkas.
2. Buka repositori GitHub `1650afr/Taqwim`.
3. Pilih **Add file** → **Upload files**.
4. Pilih `index.html`, `app.js`, dan `firebase.js` hasil ekstrak. Pastikan berkas berada di tingkat utama repositori, bukan di dalam folder tambahan.
5. Jika GitHub menampilkan pilihan untuk mengganti berkas dengan nama sama, pastikan berkas lama diganti dengan berkas dari paket ini.
6. Isi pesan commit, misalnya `Perbarui Taqwim v2.2`, lalu tekan **Commit changes**.
7. Tunggu proses GitHub Pages selesai. Buka situs, muat ulang halaman, dan periksa versi `v2.2`.

## Pengaturan Firebase
- Pastikan Email/Password aktif di Firebase Authentication.
- Pastikan Firestore sudah dibuat.
- Aturan `firestore.rules` membatasi setiap akun ke dokumen miliknya sendiri di `users/{uid}/taqwim/data`. Periksa dan terbitkan aturan ini di Firebase Console jika belum sesuai.
- Domain `1650afr.github.io` harus tercantum pada Authorized domains.
- Konfigurasi Firebase di `firebase.js` adalah konfigurasi web client. Jangan pernah memasukkan service-account key atau private key ke aplikasi web.

## Uji sebelum penggunaan resmi
1. Buka aplikasi dan pilih tab Pengaturan Cloud.
2. Daftarkan akun uji menggunakan email yang bisa diakses dan kata sandi minimal 6 karakter.
3. Tambahkan satu peserta uji, isi dan simpan formulir.
4. Tekan **Kirim ke Cloud**. Pastikan pesan berhasil muncul.
5. Muat ulang aplikasi atau gunakan perangkat/browser lain, masuk dengan akun yang sama, lalu tekan **Tarik dari Cloud**. Pastikan data uji muncul.
6. Uji dengan akun kedua untuk memastikan akun tersebut tidak dapat membaca data akun pertama.
7. Hapus data uji setelah selesai, jika memang tidak diperlukan.

## Catatan
Paket ini memperbarui label versi dan instruksi, tetapi belum dapat diuji langsung terhadap proyek Firebase dan penerbitan GitHub Pages milik Anda. Lakukan pengujian di atas sebelum memasukkan data kader sungguhan. Buat backup JSON sebelum pengujian atau pemindahan data.
