## Spesifikasi Kebutuhan Perangkat Lunak (SKPL)

**RenTech Web App – Equipment Rental**

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
   - [1.1 Tujuan Penulisan Dokumen](#11-tujuan-penulisan-dokumen)
   - [1.2 Lingkup Masalah](#12-lingkup-masalah)
2. [Deskripsi Umum](#2-deskripsi-umum)
   - [2.1 Perspektif Produk](#21-perspektif-produk)
   - [2.2 Fungsi Produk](#22-fungsi-produk)
   - [2.3 Karakteristik Pengguna](#23-karakteristik-pengguna)
   - [2.4 Lingkungan Operasi](#24-lingkungan-operasi)
   - [2.5 Batasan Perancangan dan Implementasi](#25-batasan-perancangan-dan-implementasi)
   - [2.6 Asumsi dan Ketergantungan](#26-asumsi-dan-ketergantungan)
3. [Kebutuhan Spesifik](#3-kebutuhan-spesifik)
   - [3.1 Kebutuhan Antarmuka Eksternal](#31-kebutuhan-antarmuka-eksternal)
   - [3.2 Kebutuhan Fungsional](#32-kebutuhan-fungsional)
     - [3.2.1 Autentikasi dan Manajemen Pengguna](#321-autentikasi-dan-manajemen-pengguna)
     - [3.2.2 Katalog dan Manajemen Peralatan](#322-katalog-dan-manajemen-peralatan)
     - [3.2.3 Keranjang dan Penyewaan](#323-keranjang-dan-penyewaan)
     - [3.2.4 Checkout dan Pembayaran](#324-checkout-dan-pembayaran)
     - [3.2.5 Invoice dan Bukti Transaksi](#325-invoice-dan-bukti-transaksi)
     - [3.2.6 Pengambilan dan Pengembalian](#326-pengambilan-dan-pengembalian)
     - [3.2.7 Rekomendasi Peralatan Berbasis AI](#327-rekomendasi-peralatan-berbasis-ai)
     - [3.2.8 Review dan Penilaian](#328-review-dan-penilaian)
     - [3.2.9 Dashboard dan Laporan](#329-dashboard-dan-laporan)
   - [3.3 Daftar Use Case](#33-daftar-use-case)
   - [3.4 Kebutuhan Nonfungsional](#34-kebutuhan-nonfungsional)
   - [3.5 Kebutuhan Data](#35-kebutuhan-data)
4. [Matriks Keterlacakan](#4-matriks-keterlacakan)

---

## 1. Pendahuluan

### 1.1 Tujuan Penulisan Dokumen

Dokumen SKPL ini mendefinisikan kebutuhan fungsional dan nonfungsional dari aplikasi RenTech, yaitu aplikasi berbasis web untuk mengelola penyewaan peralatan secara umum. Dokumen ini menjadi acuan bagi tim pengembang (backend, frontend, QA) dalam membangun, menguji, dan memvalidasi sistem, serta menjadi dasar penyusunan Deskripsi Perancangan Perangkat Lunak (DPPL).

### 1.2 Lingkup Masalah

Penyewaan peralatan (kamera, tripod, proyektor, mikrofon, speaker, dan lainnya) membutuhkan pencatatan stok, jadwal, pembayaran, serta kondisi barang yang akurat. RenTech menyediakan:

- katalog peralatan beserta spesifikasi, harga, stok, dan kondisi;
- penyewaan dengan keranjang, perhitungan biaya otomatis, checkout, dan pembayaran;
- invoice yang dapat diunduh (PDF) atau dicetak;
- pengelolaan pengambilan dan pengembalian oleh petugas, termasuk pencatatan kerusakan dan denda;
- rekomendasi peralatan berbasis AI (Google Gemini API) sebagai fitur pendukung;
- review dan rating peralatan;
- dashboard dan laporan untuk admin dan petugas.

**Di luar lingkup:** aplikasi mobile native, integrasi payment gateway pihak ketiga, pengiriman barang, dan manajemen aset di luar peralatan sewa.

---

## 2. Deskripsi Umum

### 2.1 Perspektif Produk

RenTech adalah sistem mandiri berarsitektur client-server. Frontend (React.js + Vite + Tailwind CSS) berkomunikasi dengan backend (Laravel 13) melalui REST API menggunakan Axios. Data disimpan pada MySQL melalui Eloquent ORM. Backend terhubung ke Google Gemini API untuk rekomendasi AI dan memakai Laravel DomPDF untuk invoice. Seluruh data inti (stok, harga, ketersediaan, transaksi) dikendalikan oleh sistem, bukan oleh AI.

### 2.2 Fungsi Produk

- Autentikasi dan otorisasi berbasis peran.
- Manajemen kategori dan peralatan.
- Katalog, pencarian, dan filter peralatan.
- Keranjang dan penyewaan.
- Checkout dan pembayaran.
- Invoice dan bukti transaksi.
- Pengambilan dan pengembalian peralatan.
- Rekomendasi peralatan berbasis AI.
- Review dan rating.
- Dashboard dan laporan.

### 2.3 Karakteristik Pengguna

| Pengguna | Deskripsi | Hak Akses Utama |
| --- | --- | --- |
| Penyewa | Pengguna umum (perorangan atau organisasi) yang menyewa peralatan | Melihat katalog, menyewa, membayar, mengunduh invoice, melihat riwayat, memberi review, memakai rekomendasi AI |
| Petugas | Staf yang melayani serah-terima barang | Konfirmasi pengambilan, pencatatan kondisi, pengembalian, kerusakan, denda, melihat dashboard operasional |
| Admin | Pengelola sistem | Seluruh hak Petugas, CRUD peralatan, kategori, pengguna, transaksi, laporan, dan melihat review |

### 2.4 Lingkungan Operasi

- **Klien:** peramban web modern (Chrome, Firefox, Edge, Safari) pada desktop maupun perangkat mobile.
- **Server:** PHP (Laravel 13), web server, dan MySQL.
- **Layanan eksternal:** Google Gemini API (memerlukan koneksi internet).

### 2.5 Batasan Perancangan dan Implementasi

- Frontend memakai React.js, Vite, Tailwind CSS, Axios, dan React Router.
- Backend memakai Laravel 13 dengan REST API, Eloquent ORM, dan Laravel Authentication.
- Basis data memakai MySQL.
- Invoice dibuat dengan Laravel DomPDF.
- Rekomendasi AI memakai Google Gemini API dan hanya sebagai fitur pendukung.
- Pengembangan dilakukan dalam 16 minggu oleh 4 anggota tim.

### 2.6 Asumsi dan Ketergantungan

- Pembayaran dicatat oleh sistem (jumlah bayar dan kembalian); tidak ada integrasi payment gateway.
- Pengguna terdaftar menggunakan akun masing-masing sebelum menyewa.
- Pengambilan dan pengembalian barang dilakukan secara fisik di lokasi layanan penyewaan.
- Layanan Gemini API tersedia; bila gagal, fitur lain tetap berjalan.

---

## 3. Kebutuhan Spesifik

### 3.1 Kebutuhan Antarmuka Eksternal

**Antarmuka Pengguna.** Berbasis web, responsif, dirancang pada Figma, dengan navigasi yang berbeda sesuai role. Halaman utama: login/registrasi, katalog, detail peralatan, keranjang, checkout, riwayat sewa, invoice, rekomendasi AI, serta halaman admin/petugas (kelola peralatan, transaksi, pengembalian, dashboard).

**Antarmuka Perangkat Keras.** Tidak ada perangkat keras khusus; pengguna memakai komputer atau ponsel dengan peramban. Pencetakan invoice memakai fitur cetak peramban.

**Antarmuka Perangkat Lunak.** REST API (JSON) antara frontend dan backend; MySQL melalui Eloquent ORM; Google Gemini API melalui backend Laravel; Laravel DomPDF untuk PDF.

**Antarmuka Komunikasi.** HTTP/HTTPS, dengan autentikasi pada setiap permintaan API terproteksi.

### 3.2 Kebutuhan Fungsional

#### 3.2.1 Autentikasi dan Manajemen Pengguna

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-001 | Sistem harus menyediakan registrasi akun dengan data nama, email, dan kata sandi. | Tinggi |
| SKPL-F-002 | Sistem harus menyediakan login dan logout. | Tinggi |
| SKPL-F-003 | Sistem harus membatasi akses fitur berdasarkan role (Penyewa, Petugas, Admin). | Tinggi |
| SKPL-F-004 | Admin dapat mengelola data pengguna (lihat, ubah role, nonaktifkan). | Sedang |
| SKPL-F-005 | Pengguna dapat melihat dan mengubah profil sendiri. | Rendah |

#### 3.2.2 Katalog dan Manajemen Peralatan

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-006 | Admin dapat menambah, mengubah, dan menghapus kategori peralatan. | Tinggi |
| SKPL-F-007 | Admin dapat menambah, mengubah, dan menghapus peralatan (nama, kategori, merek, foto, deskripsi, spesifikasi, harga sewa per hari, stok, kondisi, status ketersediaan). | Tinggi |
| SKPL-F-008 | Sistem menampilkan katalog peralatan per kategori beserta stok, harga, dan kondisi. | Tinggi |
| SKPL-F-009 | Sistem menyediakan halaman detail peralatan. | Tinggi |
| SKPL-F-010 | Sistem menyediakan pencarian berdasarkan nama dan filter berdasarkan kategori, ketersediaan, dan harga. | Sedang |
| SKPL-F-011 | Sistem otomatis memperbarui stok dan status ketersediaan saat barang disewa atau dikembalikan. | Tinggi |

#### 3.2.3 Keranjang dan Penyewaan

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-012 | Penyewa dapat menambah beberapa peralatan ke keranjang dengan jumlah dan periode sewa (tanggal mulai dan selesai). | Tinggi |
| SKPL-F-013 | Sistem memeriksa ketersediaan stok pada periode yang dipilih sebelum item dimasukkan atau di-checkout. | Tinggi |
| SKPL-F-014 | Sistem menghitung biaya otomatis: harga per hari × jumlah × durasi, dijumlahkan seluruh item. | Tinggi |
| SKPL-F-015 | Penyewa dapat mengubah jumlah/durasi dan menghapus item dari keranjang. | Sedang |
| SKPL-F-016 | Penyewa dapat melihat riwayat dan status penyewaan (menunggu pembayaran, dibayar, diambil, dikembalikan, terlambat, dibatalkan). | Tinggi |

#### 3.2.4 Checkout dan Pembayaran

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-017 | Sistem menampilkan rincian pesanan dan total biaya pada halaman checkout. | Tinggi |
| SKPL-F-018 | Sistem mencatat pembayaran: metode, jumlah dibayar, dan menghitung kembalian. | Tinggi |
| SKPL-F-019 | Sistem menolak pembayaran bila jumlah dibayar kurang dari total. | Tinggi |
| SKPL-F-020 | Sistem memperbarui status transaksi sesuai proses pembayaran dan membuat data transaksi secara otomatis. | Tinggi |

#### 3.2.5 Invoice dan Bukti Transaksi

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-021 | Sistem membuat invoice setelah transaksi berhasil, memuat data pengguna, daftar peralatan, jumlah, durasi, harga, total, pembayaran, dan kembalian. | Tinggi |
| SKPL-F-022 | Invoice dapat diunduh dalam format PDF. | Tinggi |
| SKPL-F-023 | Invoice dapat dicetak. | Sedang |

#### 3.2.6 Pengambilan dan Pengembalian

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-024 | Petugas dapat mengonfirmasi pengambilan, mencatat waktu pengambilan dan kondisi barang sebelum digunakan. | Tinggi |
| SKPL-F-025 | Petugas dapat mencatat waktu pengembalian dan kondisi barang setelah digunakan. | Tinggi |
| SKPL-F-026 | Sistem mendeteksi keterlambatan dan menghitung denda keterlambatan secara otomatis. | Tinggi |
| SKPL-F-027 | Petugas dapat mencatat kerusakan beserta keterangan dan nominal denda kerusakan. | Tinggi |
| SKPL-F-028 | Sistem mengembalikan stok dan memperbarui status peralatan setelah pengembalian dikonfirmasi. | Tinggi |
| SKPL-F-029 | Sistem menampilkan rincian denda kepada pengguna dan mencatatnya pada transaksi. | Sedang |

#### 3.2.7 Rekomendasi Peralatan Berbasis AI

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-030 | Penyewa dapat menulis kebutuhan dalam bahasa natural pada kolom input rekomendasi. | Sedang |
| SKPL-F-031 | Backend mengirim kebutuhan pengguna dan daftar peralatan relevan ke Google Gemini API, lalu menerima rekomendasi. | Sedang |
| SKPL-F-032 | Sistem menampilkan rekomendasi dengan data nama, harga, stok, dan ketersediaan yang diambil dari database, bukan dari keluaran AI. | Tinggi |
| SKPL-F-033 | Sistem hanya menampilkan rekomendasi untuk peralatan yang ada di database; hasil di luar database dibuang. | Tinggi |
| SKPL-F-034 | Bila Gemini API gagal atau lambat, sistem menampilkan pesan kesalahan dan fitur lain tetap berfungsi. | Sedang |

#### 3.2.8 Review dan Penilaian

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-035 | Penyewa dapat memberi rating (1–5) dan ulasan setelah penyewaan selesai. | Sedang |
| SKPL-F-036 | Satu transaksi hanya dapat diulas satu kali per peralatan. | Rendah |
| SKPL-F-037 | Sistem menampilkan rata-rata rating dan ulasan pada detail peralatan. | Sedang |
| SKPL-F-038 | Admin dapat melihat ulasan untuk mengetahui peralatan dengan kepuasan tinggi maupun masalah berulang. | Rendah |

#### 3.2.9 Dashboard dan Laporan

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| SKPL-F-039 | Dashboard menampilkan jumlah peralatan, ketersediaan stok, jumlah penyewaan, dan pendapatan. | Sedang |
| SKPL-F-040 | Dashboard menampilkan peralatan yang paling sering disewa, rental yang sedang berlangsung, dan riwayat pengembalian. | Sedang |
| SKPL-F-041 | Admin dan Petugas dapat memfilter laporan berdasarkan periode. | Rendah |

### 3.3 Daftar Use Case

| ID | Use Case | Aktor |
| --- | --- | --- |
| UC-01 | Registrasi dan Login | Penyewa, Petugas, Admin |
| UC-02 | Mengelola Pengguna | Admin |
| UC-03 | Mengelola Kategori dan Peralatan | Admin |
| UC-04 | Melihat dan Mencari Katalog | Penyewa |
| UC-05 | Mengelola Keranjang dan Menyewa | Penyewa |
| UC-06 | Checkout dan Pembayaran | Penyewa |
| UC-07 | Mengunduh/Mencetak Invoice | Penyewa, Admin |
| UC-08 | Konfirmasi Pengambilan | Petugas |
| UC-09 | Proses Pengembalian, Kerusakan, dan Denda | Petugas |
| UC-10 | Meminta Rekomendasi AI | Penyewa |
| UC-11 | Memberi Review | Mahasiswa |
| UC-12 | Melihat Dashboard dan Laporan | Admin, Petugas |

### 3.4 Kebutuhan Nonfungsional

| ID | Kategori | Kebutuhan |
| --- | --- | --- |
| SKPL-NF-001 | Kinerja | Halaman utama dan katalog dimuat maksimal 3 detik pada koneksi normal; respons API non-AI maksimal 2 detik. |
| SKPL-NF-002 | Kinerja | Respons rekomendasi AI maksimal 10 detik; setelah itu sistem menampilkan pesan waktu habis. |
| SKPL-NF-003 | Keamanan | Kata sandi disimpan terenkripsi (hash); seluruh endpoint terproteksi memerlukan autentikasi dan pemeriksaan role. |
| SKPL-NF-004 | Keamanan | Sistem melindungi dari SQL injection, XSS, dan CSRF melalui mekanisme bawaan Laravel dan validasi input. |
| SKPL-NF-005 | Keamanan | Kunci API Gemini disimpan pada konfigurasi server (`.env`), tidak pernah terekspos ke frontend. |
| SKPL-NF-006 | Keandalan | Transaksi penyewaan dan pembayaran bersifat atomik sehingga stok tidak bernilai negatif dan data tetap konsisten. |
| SKPL-NF-007 | Kegunaan | Antarmuka mudah dipakai, konsisten, responsif pada layar desktop dan mobile, dengan pesan kesalahan yang jelas. |
| SKPL-NF-008 | Kompatibilitas | Berjalan pada versi terbaru Chrome, Firefox, Edge, dan Safari. |
| SKPL-NF-009 | Pemeliharaan | Kode terstruktur (pola MVC Laravel, komponen React) dan dikelola dengan Git. |
| SKPL-NF-010 | Ketersediaan | Kegagalan layanan AI tidak boleh mengganggu fitur penyewaan inti. |
| SKPL-NF-011 | Integritas Data | Perhitungan biaya, denda, dan stok dilakukan di backend, bukan di klien. |

### 3.5 Kebutuhan Data

Entitas utama yang disimpan: pengguna, kategori, peralatan, keranjang, penyewaan (header dan detail item), pembayaran, invoice, pengambilan dan pengembalian, kerusakan/denda, dan ulasan. Rincian struktur dibahas pada DPPL.

---

## 4. Matriks Keterlacakan

| Fitur Utama (Rencana Konstruksi) | Kebutuhan SKPL | Use Case |
| --- | --- | --- |
| Autentikasi dan hak akses | SKPL-F-001 s.d. 005 | UC-01, UC-02 |
| Katalog dan manajemen peralatan | SKPL-F-006 s.d. 011 | UC-03, UC-04 |
| Penyewaan dan keranjang | SKPL-F-012 s.d. 016 | UC-05 |
| Checkout dan pembayaran | SKPL-F-017 s.d. 020 | UC-06 |
| Invoice dan bukti transaksi | SKPL-F-021 s.d. 023 | UC-07 |
| Pengambilan dan pengembalian | SKPL-F-024 s.d. 029 | UC-08, UC-09 |
| AI Equipment Recommendation | SKPL-F-030 s.d. 034 | UC-10 |
| Review dan penilaian | SKPL-F-035 s.d. 038 | UC-11 |
| Dashboard dan laporan | SKPL-F-039 s.d. 041 | UC-12 |

