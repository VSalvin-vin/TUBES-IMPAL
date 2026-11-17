import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import Aset Utama
import logo from '../assets/Rentech.png';

// Import Aset Produk
import sennheiserImg from '../products/Sennheiser MKE 600.png';
import sonyFX3Img from '../products/Sony Cinema FX3.png';
import droneDJIImg from '../products/Drone DJI mini 4 Pro.png';
import sonyA7IVImg from '../products/Sony Alpha A7 IV.png';
import godoxAD600Img from '../products/Godox AD600 Pro.png';
import manfrottoImg from '../products/Manfrotto Befree.png';
import jblEonImg from '../products/JBL EON610.jpg';
import godoxSL60WImg from '../products/Godox SL60W.jpg';
import { Icon } from '@iconify/react'

const categoriesList = [
  'Semua Kategori', 'Kamera', 'Drone', 'Lensa', 'iPhone', 'Tripod', 
  'Memory Card', 'Lampu LED', 'Proyektor', 'Wireless Mic', 
  'Lighting', 'Digicam', 'Gimbal', 'Mikrofon', 'Speaker'
];

const initialProducts = [
  {
    id: 1,
    name: 'Sennheiser MKE 600',
    brand: 'SENNHEISER',
    category: 'Mikrofon',
    spec: 'Shotgun mic • XLR • baterai AA',
    price: 'Rp100.000',
    stockText: 'Tersedia • 5 unit',
    condition: 'Kondisi: Baik',
    available: true,
    image: sennheiserImg,
  },
  {
    id: 2,
    name: 'Sony Cinema FX3',
    brand: 'SONY',
    category: 'Kamera',
    spec: 'Cinema Line • full-frame • 4K',
    price: 'Rp440.000',
    stockText: 'Tersedia • 6 unit',
    condition: 'Kondisi: Baik',
    available: true,
    image: sonyFX3Img,
  },
  {
    id: 3,
    name: 'DJI Mini 4 Pro',
    brand: 'DJI',
    category: 'Drone',
    spec: 'Video 4K • gimbal 3-axis',
    price: 'Rp450.000',
    stockText: 'Tersedia • 5 unit',
    condition: 'Kondisi: Baik',
    available: true,
    image: droneDJIImg,
  },
  {
    id: 4,
    name: 'Sony Alpha A7 IV',
    brand: 'SONY',
    category: 'Kamera',
    spec: 'Body only • full-frame • 33 MP',
    price: 'Rp250.000',
    stockText: 'Tersedia • 7 unit',
    condition: 'Kondisi: Baik',
    available: true,
    image: sonyA7IVImg,
  },
  {
    id: 5,
    name: 'Godox AD600Pro',
    brand: 'GODOX',
    category: 'Lighting',
    spec: 'Flash outdoor • 600 Ws • TTL',
    price: 'Rp200.000',
    stockText: 'Tersedia • 2 unit',
    condition: 'Kondisi: Baik',
    available: true,
    image: godoxAD600Img,
  },
  {
    id: 6,
    name: 'Manfrotto Befree',
    brand: 'MANFROTTO',
    category: 'Tripod',
    spec: 'Aluminium • ball head • ringkas',
    price: 'Rp75.000',
    stockText: 'Tersedia • 3 unit',
    condition: 'Kondisi: Cukup',
    available: true,
    image: manfrottoImg,
  },
  {
    id: 7,
    name: 'Epson EB-X500',
    brand: 'EPSON',
    category: 'Proyektor',
    spec: '3LCD • XGA • HDMI',
    price: 'Rp200.000',
    stockText: 'Tidak tersedia',
    condition: 'Kondisi: Baik',
    available: false,
    image: godoxSL60WImg, // Fallback jika gambar spesifik proyektor tidak ada
  },
  {
    id: 8,
    name: 'JBL EON610',
    brand: 'JBL',
    category: 'Speaker',
    spec: 'Speaker aktif • 10 inci',
    price: 'Rp150.000',
    stockText: 'Tersedia • 2 unit',
    condition: 'Kondisi: Baik',
    available: true,
    image: jblEonImg,
  },
  {
    id: 9,
    name: 'Godox SL60W',
    brand: 'GODOX',
    category: 'Lampu LED',
    spec: 'LED continuous • daylight 5600K',
    price: 'Rp100.000',
    stockText: 'Tidak tersedia',
    condition: 'Kondisi: Cukup',
    available: false,
    image: godoxSL60WImg,
  },
];

const Katalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [availabilityStatus, setAvailabilityStatus] = useState('Semua status');
  const [quantities, setQuantities] = useState(
    initialProducts.reduce((acc, item) => ({ ...acc, [item.id]: item.available ? 1 : 0 }), {})
  );

  const handleQuantityChange = (id, delta, available) => {
    if (!available) return;
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = current + delta;
      return { ...prev, [id]: next < 1 ? 1 : next };
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-black selection:text-white">
      
      {/* ================= 1. NAVIGASI UTAMA ================= */}
      <header className="bg-[#080808] text-white">
        <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/">
              <img src={logo} alt="RenTech Logo" className="h-9 w-auto object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-7 text-sm font-bold text-[#CFCFCF]">
              <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
              <Link to="/katalog" className="text-white border-b-2 border-white pb-1">Katalog</Link>
              <a href="#cara-sewa" className="hover:text-white transition-colors">Tata Cara</a>
              <a href="#syarat" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-white hover:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <Link 
              to="/login" 
              className="bg-white text-[#111111] font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
            >
              Masuk
            </Link>
          </div>
        </nav>
      </header>

      {/* ================= 2. PEMBUKA HALAMAN ================= */}
      <section className="max-w-7xl mx-auto px-8 pt-9 pb-10 space-y-4">
        {/* Breadcrumb */}
        <div className="text-xs text-[#737373] font-medium">
          <Link to="/" className="hover:underline">Beranda</Link> / <span className="text-[#111111]">Katalog</span>
        </div>

        {/* Judul & Pengantar */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Perangkat tepat. Ide jadi nyata.
          </h1>
          <p className="text-gray-500 text-base max-w-3xl leading-relaxed">
            Jelajahi peralatan untuk produksi, acara, dan kebutuhan kreatifmu. Pilih periode sewa untuk melihat ketersediaan perangkat.
          </p>
        </div>
      </section>

      {/* ================= 3. KONTEN KATALOG ================= */}
      <main className="max-w-7xl mx-auto px-8 pb-20 space-y-7">
        
        {/* Search Bar & Keranjang */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input 
              type="text" 
              placeholder="Cari nama peralatan, misalnya Sony Alpha A7 IV"
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#E2E2E2] rounded-full text-sm placeholder-gray-400 focus:outline-none focus:border-black"
            />
          </div>
          <button className="w-full sm:w-auto px-6 py-3 border border-[#E2E2E2] rounded-full text-sm font-bold text-[#111111] hover:bg-gray-50 whitespace-nowrap">
            Keranjang (0)
          </button>
        </div>

        {/* Periode Sewa Box */}
        <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-normal text-[#111111]">Kapan kamu butuh alatnya?</h3>
            <p className="text-xs text-[#737373]">Stok mengikuti periode yang dipilih.</p>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 w-full lg:w-auto">
            
            {/* Tanggal Mulai */}
            <div className="space-y-1.5 flex-1 min-w-[180px]">
              <label className="text-xs font-semibold text-[#737373]">Tanggal mulai</label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border border-[#E2E2E2] rounded-xl text-sm text-[#111111]">
                <span>20 Oktober 2026</span>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M4.18343 0.850006V2.18345M4.18343 2.18345V3.51689M4.18343 2.18345H2.18343C1.44705 2.18345 0.850098 2.78045 0.850098 3.51689V6.18377M4.18343 2.18345H9.51676M9.51676 0.850006V2.18345M9.51676 2.18345V3.51689M9.51676 2.18345H11.5168C12.2531 2.18345 12.8501 2.78045 12.8501 3.51689V6.18377M0.850098 6.18377H12.8501M0.850098 6.18377V12.851C0.850098 13.5874 1.44705 14.1844 2.18343 14.1844H11.5168C12.2531 14.1844 12.8501 13.5874 12.8501 12.851V6.18377M4.18343 8.85065H4.1901M6.8501 8.85065H6.85676M9.51676 8.85065H9.52343M4.18343 11.5175H4.1901M6.8501 11.5175H6.85676M9.51676 11.5175H9.52343"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    stroke="#111111"
                  />
                </svg>
              </div>
            </div>

            {/* Tanggal Selesai */}
            <div className="space-y-1.5 flex-1 min-w-[180px]">
              <label className="text-xs font-semibold text-[#737373]">Tanggal selesai</label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border border-[#E2E2E2] rounded-xl text-sm text-[#111111]">
                <span>22 Oktober 2026</span>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M4.18343 0.850006V2.18345M4.18343 2.18345V3.51689M4.18343 2.18345H2.18343C1.44705 2.18345 0.850098 2.78045 0.850098 3.51689V6.18377M4.18343 2.18345H9.51676M9.51676 0.850006V2.18345M9.51676 2.18345V3.51689M9.51676 2.18345H11.5168C12.2531 2.18345 12.8501 2.78045 12.8501 3.51689V6.18377M0.850098 6.18377H12.8501M0.850098 6.18377V12.851C0.850098 13.5874 1.44705 14.1844 2.18343 14.1844H11.5168C12.2531 14.1844 12.8501 13.5874 12.8501 12.851V6.18377M4.18343 8.85065H4.1901M6.8501 8.85065H6.85676M9.51676 8.85065H9.52343M4.18343 11.5175H4.1901M6.8501 11.5175H6.85676M9.51676 11.5175H9.52343"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    stroke="#111111"
                  />
                </svg>
              </div>
            </div>

            {/* Durasi Sewa */}
            <div className="space-y-1 min-w-[100px]">
              <p className="text-xs text-[#737373]">Durasi sewa</p>
              <p className="text-xl font-normal text-[#111111]">2 hari</p>
            </div>

            {/* Tombol Cek */}
            <button className="bg-[#111111] hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors mt-auto w-full lg:w-auto">
              Cek Ketersediaan
            </button>
          </div>
        </div>

        {/* Layout Utama: Sidebar Filter + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
          
          {/* ================= SIDEBAR FILTER ================= */}
          <aside className="lg:col-span-3 space-y-7">
            {/* Header Filter */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h2 className="text-2xl font-normal text-[#111111]">Filter</h2>
              <button 
                onClick={() => { setSelectedCategory('Semua Kategori'); setAvailabilityStatus('Semua status'); }}
                className="text-xs text-[#737373] underline hover:text-black"
              >
                Reset
              </button>
            </div>

            {/* Kategori Perangkat */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#111111]">Kategori perangkat</h4>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
                      selectedCategory === cat
                        ? 'bg-black text-white border-black'
                        : 'bg-[#F3F4F6] text-black border-[#D1D5DB] hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-[#E2E2E2]" />

            {/* Harga Sewa Per Hari */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#111111]">Harga sewa per hari</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#737373]">Minimum</label>
                  <select className="w-full p-2.5 bg-white border border-[#E2E2E2] rounded-xl text-sm focus:outline-none">
                    <option>Rp0</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#737373]">Maksimum</label>
                  <select className="w-full p-2.5 bg-white border border-[#E2E2E2] rounded-xl text-sm focus:outline-none">
                    <option>Rp500.000</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-[#E2E2E2]" />

            {/* Ketersediaan */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#111111]">Ketersediaan</h4>
              <div className="space-y-2 text-sm text-[#111111]">
                {['Semua status', 'Tersedia', 'Tidak tersedia'].map((status) => (
                  <label key={status} className="flex items-center gap-2.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="availability"
                      checked={availabilityStatus === status}
                      onChange={() => setAvailabilityStatus(status)}
                      className="accent-black w-4 h-4"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Catatan Pemesanan Box */}
            <div className="bg-[#F5F5F5] rounded-2xl p-5 space-y-2 text-xs text-[#737373] leading-relaxed">
              <div className="w-5 h-5 rounded-full border border-[#111111] text-[#111111] flex items-center justify-center font-bold text-[10px]">
                i
              </div>
              <p>
                Pilih jumlah dan periode sebelum menambah alat. Stok diperiksa sebelum masuk keranjang dan saat checkout.
              </p>
            </div>
          </aside>

          {/* ================= PRODUCT GRID ================= */}
          <section className="lg:col-span-9 space-y-5">
            {/* Summary & Sorting Header */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm font-normal text-[#111111]">Menampilkan 1–9 dari 18 peralatan</p>
                <select className="p-2 border border-[#E2E2E2] rounded-xl text-xs text-[#737373] bg-white focus:outline-none">
                  <option>Urutkan: Rekomendasi</option>
                </select>
              </div>
              <p className="text-xs text-[#737373]">Data peralatan ditampilkan sebagai contoh rancangan</p>
            </div>

            {/* Grid 3 Kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialProducts.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-[#E2E2E2] rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    {/* Frame Foto Produk */}
                    <div className="relative h-52 w-full bg-[#F5F5F5] overflow-hidden border-b border-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform" 
                      />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-medium text-[#111111]">
                        {item.category}
                      </span>
                    </div>

                    {/* Informasi Produk */}
                    <div className="p-5 space-y-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#737373]">{item.brand}</p>
                        <h3 className="text-base font-semibold text-[#111111] leading-tight mt-0.5">{item.name}</h3>
                        <p className="text-xs text-[#737373] mt-1">{item.spec}</p>
                      </div>

                      <p className="text-xl font-normal text-[#111111]">{item.price} <span className="text-xs text-gray-400">/ hari</span></p>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className={`font-semibold ${item.available ? 'text-[#111111]' : 'text-gray-400'}`}>
                          {item.stockText}
                        </span>
                        <span className="text-[#737373]">{item.condition}</span>
                      </div>

                      <hr className="border-[#E2E2E2]" />

                      {/* Quantity & Detail Link */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-[#E2E2E2] rounded-lg px-3 py-1 gap-3 text-xs">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1, item.available)}
                            className="text-[#949494] hover:text-black font-bold"
                          >
                            -
                          </button>
                          <span className="font-medium text-[#111111]">{quantities[item.id]}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1, item.available)}
                            className="text-black font-bold"
                          >
                            +
                          </button>
                        </div>

                        <a href="#detail" className="text-xs font-semibold text-[#111111] hover:underline flex items-center gap-1">
                              Lihat Detail <Icon icon="akar-icons:arrow-up-right" width={11} height={11} />
                        </a>
                      </div>
                    </div>
                  </div>

                 {/* Tombol Tambah Ke Keranjang */}
                  <div className="p-5 pt-0">
                    {item.available ? (
                      <button className="w-full bg-[#111111] hover:bg-gray-800 text-white font-bold py-3 rounded-full text-xs transition-colors flex items-center justify-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            d="M1.36646 1.36646H2.69979L3.41369 4.69996M3.41369 4.69996L4.47312 9.64687C4.53817 9.95013 4.7069 10.2212 4.95026 10.4135C5.19362 10.6057 5.49639 10.7072 5.80646 10.7003H12.3265C12.6299 10.6998 12.9241 10.5958 13.1605 10.4055C13.3968 10.2152 13.5612 9.94991 13.6265 9.65354L14.7265 4.69996H3.41369ZM3.41369 4.69996H3.41312M5.99992 14.0006C5.99992 14.3688 5.70144 14.6673 5.33325 14.6673C4.96506 14.6673 4.66659 14.3688 4.66659 14.0006C4.66659 13.6323 4.96506 13.3339 5.33325 13.3339C5.70144 13.3339 5.99992 13.6323 5.99992 14.0006ZM13.3333 14.0006C13.3333 14.3688 13.0348 14.6673 12.6666 14.6673C12.2984 14.6673 11.9999 14.3688 11.9999 14.0006C11.9999 13.6323 12.2984 13.3339 12.6666 13.3339C13.0348 13.3339 13.3333 13.6323 13.3333 14.0006Z"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            stroke="white"
                          />
                        </svg>
                        <span>Tambah ke Keranjang</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-[#E7E7E7] text-[#949494] font-bold py-3 rounded-full text-xs cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            d="M3.28539 3.28539L3.28554 3.28554M3.28554 3.28554L12.7135 12.7141M3.28554 3.28554C2.07902 4.49207 1.33276 6.15887 1.33276 7.99996C1.33276 11.6822 4.31777 14.6672 7.99996 14.6672C11.6822 14.6672 14.6672 11.6822 14.6672 7.99996C14.6672 4.31777 11.6822 1.33276 7.99996 1.33276C6.15887 1.33276 4.49207 2.07902 3.28554 3.28554Z"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            stroke="#949494"
                          />
                        </svg>
                        <span>Tidak dapat disewa</span>
                      </button>
                    )}
                  </div>
                  </div>
                  ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between pt-6">
                    <p className="text-xs text-[#737373]">Halaman 1 dari 2</p>
                    <div className="flex items-center gap-2">
                      <button className="w-9 h-9 border border-[#E2E2E2] rounded-full text-xs text-[#111111] flex items-center justify-center hover:bg-gray-100">&lt;</button>
                      <button className="w-9 h-9 bg-black text-white rounded-full text-xs font-bold flex items-center justify-center">1</button>
                      <button className="w-9 h-9 border border-[#E2E2E2] rounded-full text-xs text-[#111111] flex items-center justify-center hover:bg-gray-100">2</button>
                      <button className="w-9 h-9 border border-[#E2E2E2] rounded-full text-xs text-[#111111] flex items-center justify-center hover:bg-gray-100">&gt;</button>
                    </div>
                  </div>

                  {/* AI Finder Helper Box */}
                  <div className="border-2 border-[#C1C1C0] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
                    <div className="flex items-center gap-4">
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 shrink-0"
                      >
                        <path
                          d="M14.26 24.955C15.0867 26.8408 15.5 28.8558 15.5 31C15.5 28.8558 15.9004 26.8408 16.7012 24.955C17.5279 23.0692 18.6387 21.4287 20.0337 20.0337C21.4287 18.6387 23.0692 17.5408 24.955 16.74C26.8408 15.9133 28.8558 15.5 31 15.5C28.8558 15.5 26.8408 15.0996 24.955 14.2987C23.1196 13.5074 21.4499 12.3768 20.0337 10.9662C18.6232 9.55007 17.4926 7.88044 16.7012 6.045C15.9004 4.15917 15.5 2.14417 15.5 0C15.5 2.14417 15.0867 4.15917 14.26 6.045C13.4592 7.93083 12.3612 9.57125 10.9662 10.9662C9.55007 12.3768 7.88044 13.5074 6.045 14.2987C4.15917 15.0996 2.14417 15.5 0 15.5C2.14417 15.5 4.15917 15.9133 6.045 16.74C7.93083 17.5408 9.57125 18.6387 10.9662 20.0337C12.3612 21.4287 13.4592 23.0692 14.26 24.955Z"
                          fill="black"
                        />
                      </svg>
                      <div className="space-y-1">
                        <h4 className="text-base font-normal text-[#111111]">Masih bingung memilih? Coba AI Finder.</h4>
                        <p className="text-xs text-[#737373]">
                          AI membantu memilih. Harga, stok, dan ketersediaan tetap berasal dari sistem.
                        </p>
                      </div>
                    </div>

                    <div className="relative w-full md:w-auto flex-1 max-w-md">
                      <input
                        type="text"
                        placeholder="Untuk podcast, budget 150rb/hari"
                        className="w-full pl-4 pr-10 py-2.5 border border-[#C1C1C0] rounded-xl text-xs placeholder-gray-400 focus:outline-none"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-black font-bold">
                        &rarr;
                      </button>
                    </div>
                  </div>

                  </section>

                  </div>

                  </main>

      {/* ================= 4. FOOTER ================= */}
      <footer className="bg-[#131313] text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
          
          <div className="md:col-span-2 space-y-4">
            <img src={logo} alt="RenTech Logo" className="h-9 w-auto object-contain" />
            <p className="text-sm text-[#DCDCDC] max-w-sm leading-relaxed">
              Sewa perangkat elektronik dan kreatif dengan mudah, aman, dan terpercaya. Wujudkan ide besar kamu bersama Rentech.
            </p>
            <div className="flex gap-4 text-lg pt-2 text-white">
               <Icon icon="akar-icons:phone" width={24} height={24} />
               <Icon icon="akar-icons:instagram-fill" width={24} height={24} />
               <Icon icon="akar-icons:tiktok-fill" width={24} height={24} />
               <Icon icon="bi:twitter-x" width={22} height={22} />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-base">Navigasi</h4>
            <ul className="space-y-2 text-sm text-[#E6E6E6]">
              <li><Link to="/" className="hover:text-white">Beranda</Link></li>
              <li><Link to="/katalog" className="hover:text-white">Katalog</Link></li>
              <li><a href="#cara-sewa" className="hover:text-white">Tata Cara Penyewaan</a></li>
              <li><a href="#syarat" className="hover:text-white">Syarat & Ketentuan</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-base">Kategori Perangkat</h4>
            <ul className="space-y-2 text-sm text-[#E6E6E6]">
              <li><a href="#" className="hover:text-white">Kamera</a></li>
              <li><a href="#" className="hover:text-white">Drone</a></li>
              <li><a href="#" className="hover:text-white">Laptop</a></li>
              <li><a href="#" className="hover:text-white">Audio & Lighting</a></li>
              <li><a href="#" className="hover:text-white">Aksesoris</a></li>
              <li><a href="#" className="hover:text-white">Lainnya</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-base">Dapatkan Update Terbaru</h4>
            <p className="text-xs text-[#D6D6D6] leading-relaxed">
              Jangan lewatkan promo, perangkat baru, dan tips menarik dari Rentech.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Masukkan email kamu" 
                className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none w-full"
              />
              <button className="bg-white text-black font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-gray-200 shrink-0">
                &rarr;
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-8 pt-10 mt-12 border-t border-[#2C2C2C] text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-[#CFCFCF]">
          <p>© 2026 Rentech. Semua hak dilindungi undang-undang.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Kebijakan Privasi</a>
            <span>|</span>
            <a href="#" className="hover:underline">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Katalog;