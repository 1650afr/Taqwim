TAQWIMUPA v2.9 — PENGELOLAAN BINAAN (POLA B)

ISI PAKET
- index.html, app.js, forms-data.js: formulir tiga jalur yang dipertahankan dari v2.8.1.
- firebase.js: login, aktivasi peran dari pengajuan approved, dan panel awal pengelolaan binaan.
- firestore.rules.v2.9.txt: aturan keamanan untuk koleksi penugasan dan laporan.
- README_v2.9.txt: petunjuk dan batasan implementasi.

POLA KERJA
- Murobby/Murobbiyah mengelola data binaannya.
- Admin Utama/Tim Taqwim mengatur penugasan.
- Admin Utama/Tim Taqwim/Naqib/Naqibah dapat membaca koleksi laporan bersama sesuai rules.
- Data lama di users/{uid}/taqwim/data tetap dipertahankan.

PENTING — BATASAN YANG HARUS DIPAHAMI
Paket ini menambahkan panel dasar untuk membuat/mencabut penugasan dan membaca daftar penugasan/laporan yang sudah ada di koleksi baru.
Namun, versi dasar formulir yang diwarisi masih menyimpan data lokal dan melakukan sinkronisasi pribadi ke users/{uid}/taqwim/data. Paket ini BELUM otomatis mengubah tombol "Kirim ke Cloud" menjadi penulisan dokumen ke taqwimReports. Karena itu, laporan lintas akun belum aktif sampai modul penyimpanan laporan diintegrasikan dan diuji.
Penugasan menggunakan UID Firebase pembina dan UID Firebase peserta. Saat ini panel memakai input UID manual, belum ada pencarian nama anggota.
Panel ini tidak menganggap peserta harus punya akun login untuk dimasukkan ke formulir lokal; UID peserta dipakai sebagai identitas akun bila peserta memang memiliki akun.

PEMASANGAN AMAN
1. Cadangkan semua file GitHub dan ekspor data Firebase sebelum mengganti apa pun.
2. Ganti empat file aplikasi: index.html, app.js, forms-data.js, firebase.js.
3. Buka Firestore > Rules, cadangkan aturan aktif, lalu tinjau firestore.rules.v2.9.txt sebelum Publish.
4. Aturan baru mempertahankan data pribadi lama dan menambah koleksi binaanAssignments serta taqwimReports.
5. Jangan hapus koleksi users atau joinRequests.
6. Setelah deploy, uji login setiap peran dan buat satu penugasan uji.

PENGUJIAN YANG WAJIB
- Admin Utama dan Tim Taqwim dapat membuat/mencabut penugasan.
- Murobby/Murobbiyah hanya dapat membaca penugasan dengan mentorUid miliknya.
- Akun lain tidak dapat membaca penugasan tersebut.
- Admin/Tim/Naqib/Naqibah dapat membaca taqwimReports; Naqib/Naqibah tidak dapat menulis.
- Murobby/Murobbiyah hanya dapat membaca/menulis laporan dengan mentorUid dan ownerUid miliknya.

CATATAN QUERY
Firestore dapat meminta indeks untuk query gabungan. Jika muncul tautan pembuatan indeks, buat indeks sesuai pesan Firebase.
Jangan klaim laporan lintas akun aktif sebelum integrasi penyimpanan taqwimReports diuji.
