# TUBES-IMPAL

# Deskripsi Web App (Equipment Rental)
RenTech adalah aplikasi berbasis web yang digunakan untuk mengelola proses penyewaan berbagai peralatan. Aplikasi ini ditujukan untuk membantu pengguna umum, baik perorangan maupun organisasi, dalam mencari, memesan, dan menyewa peralatan yang dibutuhkan untuk berbagai keperluan, seperti kamera, tripod, proyektor, mikrofon, speaker, dan peralatan lainnya.

Melalui aplikasi ini, pengguna dapat melihat katalog peralatan beserta informasi seperti kategori,spesifikasi, harga sewa, jumlah stok, dan kondisi barang. Pengguna dapat memilih peralatan,menentukan jumlah dan durasi penyewaan, kemudian melakukan pemesanan dan pembayaran melalui sistem. Setelah transaksi berhasil, sistem menyediakan bukti transaksi dalam bentuk invoice yang dapat diunduh atau dicetak.

Aplikasi juga menyediakan fitur pengelolaan pengambilan dan pengembalian barang. Petugas dapat mengonfirmasi pengambilan, mencatat kondisi barang saat dikembalikan, serta mencatat kerusakan atau denda apabila diperlukan. Admin dapat mengelola data peralatan, kategori, pengguna, transaksi, dan melihat informasi penyewaan melalui dashboard.

Sebagai fitur tambahan, aplikasi memanfaatkan kecerdasan buatan (AI) untuk memberikan
rekomendasi peralatan berdasarkan kebutuhan pengguna. Pengguna dapat menjelaskan kebutuhan mereka dengan bahasa sederhana, kemudian AI menganalisis kebutuhan tersebut dan memberikan rekomendasi peralatan yang tersedia. AI berfungsi sebagai fitur pendukung,sedangkan proses penyewaan, ketersediaan barang, perhitungan biaya, pembayaran, danpengelolaan transaksi tetap dikendalikan oleh sistem.

# Fitur Utama Sistem
1. **Katalog & Manajemen Peralatan:** Sistem pengelolaan peralatan yang menyediakan katalog barang secara terstruktur berdasarkan kategori. Pengguna dapat melihat informasi seperti nama, merek, foto, spesifikasi, kondisi, harga sewa per hari, serta ketersediaan stok. Admin memiliki akses untuk menambah, mengubah, dan menghapus data peralatan

2. **Penyewaan & Keranjang:** Sistem penyewaan yang memungkinkan pengguna memilih beberapa peralatan, menentukan jumlah serta periode penyewaan, kemudian memasukkannya ke dalam keranjang. Sistem akan memeriksa ketersediaan stok dan menghitung biaya penyewaan berdasarkan jumlah barang dan durasi secara otomatis.

3. **Checkout & Pembayaran:** Sistem transaksi yang mengelola proses checkout hingga pembayaran. Pengguna dapat melihat rincian pesanan, total biaya, jumlah pembayaran, serta kembalian. Sistem akan memperbarui status transaksi berdasarkan proses pembayaran dan menghasilkan data transaksi secara otomatis.
   
4. **Invoice & Bukti Transaksi:** Sistem menghasilkan bukti penyewaan setelah transaksi berhasil berupa invoice yang berisi informasi pengguna, daftar peralatan, jumlah, durasi penyewaan, harga, total pembayaran, dan kembalian. Invoice dapat diunduh dalam format PDF maupun dicetak sebagai bukti transaksi.
   
5. **Pengambilan & Pengembalian Peralatan:** Sistem pengelolaan proses pengambilan dan pengembalian barang oleh petugas. Petugas dapat mencatat waktu pengambilan, kondisi barang sebelum digunakan, waktu pengembalian, serta kondisi barang setelah digunakan. Sistem juga menyediakan pencatatan kerusakan dan perhitungan denda apabila terdapat kerusakan atau keterlambatan pengembalian.
   
6. **AI Equipment Recommendation:** Fitur kecerdasan buatan yang membantu pengguna menemukan peralatan berdasarkan kebutuhan yang ditulis menggunakan bahasa sederhana. AI menganalisis kebutuhan pengguna dan memberikan rekomendasi peralatan yang sesuai, sedangkan informasi stok, harga, dan ketersediaan tetap diambil dari database sistem.
   
7. **Review & Penilaian Peralatan:** Sistem penilaian yang memungkinkan pengguna memberikan rating dan ulasan setelah menyelesaikan penyewaan. Data ulasan dapat digunakan oleh admin untuk mengetahui pengalaman pengguna serta melihat peralatan yang memiliki tingkat kepuasan tinggi maupun masalah yang sering ditemukan.
   
8. **Dashboard & Laporan:** Dasbor pengelolaan yang menampilkan informasi mengenai jumlah peralatan, ketersediaan stok, jumlah penyewaan, pendapatan, peralatan yang paling sering disewa, rental yang sedang berlangsung, serta riwayat pengembalian. Admin dan petugas dapat menggunakan informasi tersebut untuk memantau aktivitas penyewaan.

# Pemiliham Teknologi
Tim pengembang aplikasi ini terdiri dari mahasiswa, sehingga faktor kepraktisan menjadi pertimbangan utama dalam menentukan teknologi yang dipakai. Setiap teknologi dipilih dengan memperhatikan seberapa mudah proses pembangunannya, seberapa ringan proses perawatannya di kemudian hari, dan seberapa lancar komponen-komponen sistem dapat saling terhubung.

**A. UI/UX & Prototyping**

• Tools: Figma

• Justifikasi: Figma digunakan untuk merancang tampilan aplikasi, mencakup wireframe, prototype, style guide, sampai komponen antarmuka. Tahapan perancangan ini memudahkan tim menetapkan lebih dulu struktur dan tampilan tiap halaman, sehingga implementasinya ke frontend menjadi lebih terarah.

**B. Frontend (Antarmuka Web)**

• Framework: React.js dengan Vite

• Styling: Tailwind CSS

• Library Tambahan: Axios untuk pertukaran data dengan REST API, dan React Router untuk
mengatur navigasi antar halaman.

• Justifikasi: React.js digunakan agar tampilan aplikasi bersifat dinamis serta mampu memberikan interaksi langsung kepada pengguna. Vite berperan mempercepat proses development maupun build selama pengembangan berlangsung. Tailwind CSS mempermudah penyusunan tampilan lewat kumpulan utility class yang sudah tersedia. Axios menjadi penghubung komunikasi data antara React dan layanan API di sisi backend Laravel.

**C. Backend (Logika Sistem & REST API)**

• Framework: Laravel 13 (PHP)

• API: REST API

• Library Tambahan: Laravel DomPDF untuk membangkitkan invoice dan bukti transaksi berformat PDF.

• Justifikasi: Laravel menangani proses di sisi server, mencakup autentikasi pengguna,pengelolaan data peralatan, transaksi penyewaan, pembayaran, pengembalian, hingga pertukaran data melalui REST API. Struktur kode yang terorganisasi berdasarkan fungsi juga memudahkan tim bekerja secara kolaboratif. Laravel DomPDF dipakai untuk menghasilkan dokumen invoice dan bukti transaksi yang dapat disimpan maupun dicetak pengguna.

**D. Basis Data & Autentikasi (Database & Auth)**

• Database: MySQL

• ORM: Eloquent ORM

• Authentication: Laravel Authentication

• Justifikasi: MySQL menjadi tempat penyimpanan seluruh data aplikasi, mulai dari data pengguna, kategori, peralatan, penyewaan, pembayaran, pengembalian, hingga ulasan. Eloquent ORM memudahkan tim melakukan operasi tambah, baca, ubah, dan hapus data melalui model yang disediakan Laravel. Fitur autentikasi bawaan Laravel mengatur proses registrasi dan login, sekaligus membatasi akses fitur berdasarkan peran penyewa, petugas, dan admin.

**E. Kecerdasan Buatan (AI Engine)**

• LLM API: Google Gemini API

• Integrasi: Laravel Backend

• Justifikasi: Google Gemini API diterapkan pada fitur AI Equipment Recommendation sebagai fitur pendukung untuk membantu pengguna menemukan peralatan yang sesuai kebutuhan. Pengguna cukup mendeskripsikan kebutuhannya dalam bentuk kalimat bebas, kemudian AI mengolah deskripsi tersebut untuk memberikan beberapa opsi rekomendasi peralatan. Sumber data utama seperti nama peralatan, harga, jumlah stok, dan status ketersediaan tetap diambil dari database aplikasi, sehingga peran AI hanya sebatas pemberi rekomendasi, bukan sumber data utama dalam proses penyewaan.

# Controlling Works
[![click link ini](https://shields.io)](https://docs.google.com/spreadsheets/d/1opxStc1adxnzAn5b3ZuOc_FDZ2FAvsJTYhdo0IPd6xE/edit?usp=sharing)
