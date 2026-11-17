import { useState } from 'react';
import { Link } from 'react-router-dom';
import waveBg from '../assets/1.png';

// Import Aset Utama
import logo from '../assets/Rentech.png';
import bannerTop from '../assets/BannerTopDashboard.png';
import bannerBottom from '../assets/BannerBottomDashboard.png';

// Import Aset Produk
import sennheiserImg from '../products/Sennheiser MKE 600.png';
import sonyFX3Img from '../products/Sony Cinema FX3.png';
import droneDJIImg from '../products/Drone DJI mini 4 Pro.png';

const categories = [
  'Semua Perangkat', 'Kamera', 'Drone', 'Lensa', 'Audio', 'Gimbal', 'Lighting', 'Lensa HD', 'Proyektor', 'Aksesoris'
];

const products = [
  {
    id: 1,
    name: 'Sennheiser MKE 600',
    price: 'Rp100.000 / hari',
    desc: 'Body Only, 24.2MP Full-Frame',
    rating: 4.5,
    reviews: 104,
    rented: 102,
    stock: 5,
    image: sennheiserImg,
  },
  {
    id: 2,
    name: 'Sony Cinema FX3',
    price: 'Rp440.000 / hari',
    desc: 'Body Only, 24.2MP Full-Frame',
    rating: 4.8,
    reviews: 36,
    rented: 40,
    stock: 6,
    image: sonyFX3Img,
  },
  {
    id: 3,
    name: 'Drone DJI Mini 4 Pro',
    price: 'Rp450.000 / hari',
    desc: 'Fly More Combo, 4K HDR Camera',
    rating: 4.9,
    reviews: 93,
    rented: 90,
    stock: 5,
    image: droneDJIImg,
  },
];

const testimonialsTop = [
  {
    id: 1,
    name: 'Nadia Putri',
    role: 'Event Organizer',
    comment: 'Membantu memenuhi kebutuhan peralatan untuk acara tanpa harus membeli semuanya sendiri. Akan lebih baik jika pilihan jadwal sewa semakin beragam.',
  },
  {
    id: 2,
    name: 'Dina Maharani',
    role: 'Pelanggan',
    comment: 'Sangat membantu saat membutuhkan peralatan hanya untuk beberapa hari. Informasi produk juga memudahkan saya menentukan pilihan.',
  },
];

const testimonialsBottom = [
  {
    id: 3,
    name: 'Maya Lestari',
    role: 'Wirausaha',
    comment: 'Menyewa peralatan untuk kebutuhan sementara bisa membantu menghemat anggaran usaha. Informasi harga dan spesifikasi sangat penting untuk menentukan pilihan.',
  },
  {
    id: 4,
    name: 'Andi Pratama',
    role: 'Kreator Konten',
    comment: 'Proses penyewaannya praktis dan pilihan alatnya beragam. Cocok untuk kebutuhan produksi konten tanpa harus membeli peralatan sendiri.',
  },
  {
    id: 5,
    name: 'Rizky Ramadhan',
    role: 'Fotografer',
    comment: 'Menyewa kamera dan perlengkapan tambahan jadi alternatif yang praktis untuk proyek fotografi tertentu. Proses pencarian alatnya juga mudah.',
  },
];

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Semua Perangkat');
  const [aiPrompt, setAiPrompt] = useState('');

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-black selection:text-white">
      
      {/* ================= 1. HERO & NAVBAR ================= */}
      <header className="relative bg-[#080808] text-white overflow-hidden min-h-[560px] flex flex-col justify-between">
        {/* Gambar Background Banner Kanan */}
        <img 
          src={bannerTop} 
          alt="Studio Background" 
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-85 pointer-events-none hidden lg:block" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-transparent"></div>

        {/* Navbar Header */}
        <nav className="relative z-20 max-w-7xl w-full mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <img src={logo} alt="RenTech Logo" className="h-9 w-auto object-contain" />
            <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-300">
              <Link to="/" className="text-white border-b-2 border-white pb-1 font-bold">Beranda</Link>
              <Link to="/katalog" className="hover:text-white transition-colors">Katalog</Link>
              <a href="#cara-sewa" className="hover:text-white transition-colors">Tata Cara</a>
              <a href="#syarat" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
          <div className="flex items-center gap-5">
            {/* Search Icon */}
            <button className="text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <Link 
              to="/login" 
              className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
            >
              Masuk
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-8 py-14 flex-1 flex flex-col justify-center">
          <p className="text-[10px] font-extrabold tracking-[2px] text-gray-400 uppercase mb-4">
            SEWA PERANGKAT ELEKTRONIK BERKUALITAS
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-2xl leading-[1.1] mb-5 tracking-tight">
            Optimalkan Pengalaman Anda Berkreasi Tanpa Budget Mahal
          </h1>
          <p className="text-gray-300 max-w-md text-sm leading-relaxed mb-8">
            Rentech hadir untuk kamu yang ingin mengakses perangkat profesional dengan cara yang lebih mudah, fleksibel, dan terjangkau.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/katalog" 
              className="bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors text-xs flex items-center gap-2"
            >
              Jelajahi Katalog <span>&rarr;</span>
            </Link>
            <a 
              href="#ai-finder" 
              className="border border-white/60 text-white font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-xs"
            >
              Coba AI Finder ✦
            </a>
          </div>
        </div>
      </header>

      {/* ================= 2. AI RECOMMENDATION SECTION ================= */}
      <section id="ai-finder" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Kolom 1: Informasi AI */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-300 rounded-full text-[11px] font-bold tracking-wide">
              <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold">✦</span>
              <span>AI RECOMMENDATION</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">
              Temukan perangkat yang tepat dengan bantuan AI
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Ceritakan kebutuhan dan budget kamu, kami akan merekomendasikan perangkat terbaik yang tersedia di Rentech.
            </p>
            <a 
              href="#ai-finder" 
              className="inline-flex items-center gap-2 bg-[#14161C] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
            >
              Coba AI Finder <span>&rarr;</span>
            </a>
          </div>

          {/* Kolom 2: Form Input Chat AI */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-300 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">✦</div>
              <p className="text-xs text-gray-700 font-medium">Hai! Apa yang ingin kamu lakukan dengan perangkat ini?</p>
            </div>

            <div className="relative mt-2">
              <textarea
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Contoh: Buat video cinematic dengan budget 150rb/hari"
                className="w-full p-3.5 pr-10 bg-[#FAFAFA] border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black resize-none"
              />
              <button className="absolute right-3 bottom-3 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 text-xs">
                &rarr;
              </button>
            </div>
          </div>

          {/* Kolom 3: 3 Poin Keunggulan AI */}
         <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-300 shadow-sm space-y-5">
  <div className="flex items-start gap-3.5">
    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
      >
        <path
          d="M14.26 24.955C15.0867 26.8408 15.5 28.8558 15.5 31C15.5 28.8558 15.9004 26.8408 16.7012 24.955C17.5279 23.0692 18.6387 21.4287 20.0337 20.0337C21.4287 18.6387 23.0692 17.5408 24.955 16.74C26.8408 15.9133 28.8558 15.5 31 15.5C28.8558 15.5 26.8408 15.0996 24.955 14.2987C23.1196 13.5074 21.4499 12.3768 20.0337 10.9662C18.6232 9.55007 17.4926 7.88044 16.7012 6.045C15.9004 4.15917 15.5 2.14417 15.5 0C15.5 2.14417 15.0867 4.15917 14.26 6.045C13.4592 7.93083 12.3612 9.57125 10.9662 10.9662C9.55007 12.3768 7.88044 13.5074 6.045 14.2987C4.15917 15.0996 2.14417 15.5 0 15.5C2.14417 15.5 4.15917 15.9133 6.045 16.74C7.93083 17.5408 9.57125 18.6387 10.9662 20.0337C12.3612 21.4287 13.4592 23.0692 14.26 24.955Z"
          fill="black"
        />
      </svg>
    </div>
    <div>
      <h4 className="font-bold text-sm text-gray-900">Rekomendasi Personal</h4>
      <p className="text-[11px] text-gray-400 mt-0.5">Dapatkan saran perangkat sesuai kebutuhan dan budget kamu.</p>
    </div>
  </div>

  <div className="flex items-start gap-3.5 pt-3.5 border-t border-gray-100">
    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <svg
        width="26"
        height="21"
        viewBox="0 0 26 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-auto"
      >
        <path
          d="M0 20.6667H25.8333V15.5H0V20.6667ZM2.58333 16.7917H5.16667V19.375H2.58333V16.7917ZM0 0V5.16667H25.8333V0H0ZM5.16667 3.875H2.58333V1.29167H5.16667V3.875ZM0 12.9167H25.8333V7.75H0V12.9167ZM2.58333 9.04167H5.16667V11.625H2.58333V9.04167Z"
          fill="black"
        />
      </svg>
    </div>
    <div>
      <h4 className="font-bold text-sm text-gray-900">Informasi Lengkap</h4>
      <p className="text-[11px] text-gray-400 mt-0.5">Lihat spesifikasi, ulasan, dan ketersediaan perangkat.</p>
    </div>
  </div>

  <div className="flex items-start gap-3.5 pt-3.5 border-t border-gray-100">
    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <svg
        width="23"
        height="28"
        viewBox="0 0 23 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-auto"
      >
        <path
          d="M22.0427 0.249728C22.0092 0.175004 21.9548 0.11161 21.886 0.0672701C21.8172 0.0229305 21.737 -0.000439967 21.6552 6.27305e-06H9.65988C9.58784 0.000126285 9.51698 0.0183206 9.45379 0.0529226C9.39061 0.0875246 9.33711 0.137428 9.29821 0.198062L0.0757134 14.837C0.0313135 14.9007 0.00537242 14.9755 0.000748341 15.053C-0.00387574 15.1305 0.0129966 15.2079 0.0495066 15.2764C0.0860166 15.345 0.140747 15.4022 0.207667 15.4416C0.274586 15.4811 0.351097 15.5013 0.428769 15.5H7.03349L1.20377 26.9097C1.1703 26.9776 1.15457 27.0528 1.15804 27.1284C1.16152 27.204 1.18409 27.2774 1.22365 27.3419C1.2632 27.4064 1.31846 27.4598 1.38425 27.4972C1.45004 27.5346 1.52423 27.5546 1.59988 27.5556H4.18321C4.24298 27.556 4.30217 27.5439 4.35702 27.5202C4.41187 27.4965 4.46119 27.4616 4.50182 27.4178L19.6315 11.0653C19.6916 11.0041 19.732 10.9263 19.7476 10.842C19.7632 10.7576 19.7532 10.6705 19.719 10.5919C19.6848 10.5133 19.6278 10.4466 19.5555 10.4006C19.4831 10.3545 19.3987 10.3311 19.3129 10.3333H13.509L21.9738 0.706117C22.0283 0.644957 22.0639 0.569226 22.0762 0.488177C22.0884 0.407129 22.0767 0.324271 22.0427 0.249728Z"
          fill="black"
        />
      </svg>
    </div>
    <div>
      <h4 className="font-bold text-sm text-gray-900">Lebih Mudah & Cepat</h4>
      <p className="text-[11px] text-gray-400 mt-0.5">Hemat waktu mencari dan temukan pilihan yang tepat.</p>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* ================= 3. KATALOG & KATEGORI ================= */}
      <section id="katalog" className="py-20 max-w-7xl mx-auto px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-wide">Kategori</h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            Pilih kategori perangkat yang kamu butuhkan dan temukan solusi sewa yang tepat.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none mb-10 justify-start lg:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#F3F4F6] text-black border-gray-300'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-gray-300 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Gambar Produk Mentok Kanan Kiri */}
                <div className="h-64 w-full bg-gray-50 border-b border-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform" 
                  />
                </div>

                {/* Deskripsi Produk */}
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <p className="text-lg font-bold text-gray-900">{item.price}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>

                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                    <span className="text-xs font-semibold text-gray-900">{item.rating} ({item.reviews})</span>
                    <span className="text-xs text-gray-400">| Tersewa {item.rented} kali</span>
                  </div>

                  <p className="text-xs font-semibold text-green-600 pt-1">Stock: {item.stock}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors text-xs">
                  Lihat Detail &gt;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 4. MENGAPA HARUS RENTECH ================= */}
      <section className="py-20 bg-white border-t border-b border-gray-100">
  <div className="max-w-4xl mx-auto px-8">
    <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-16 tracking-tight">
      Mengapa Harus RenTech?
    </h2>

    {/* Grid 2x2 Presisi Desain Figma */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 text-center">

      {/* 1. Hemat Biaya */}
      <div className="flex flex-col items-center space-y-2.5">
        <div className="w-16 h-16 flex items-center justify-center mb-1">
          <svg
            width="84"
            height="99"
            viewBox="0 0 84 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-auto"
          >
            <path
              d="M75 24.5503H8.33333C3.75 24.5503 0 28.9715 0 34.3751V88.4118C0 93.8155 3.75 98.2366 8.33333 98.2366H75C79.5833 98.2366 83.3333 93.8155 83.3333 88.4118V78.5869H62.5C57.9167 78.5869 54.1667 74.1658 54.1667 68.7621V54.0248C54.1667 48.6212 57.9167 44.2 62.5 44.2H83.3333V34.3751C83.3333 28.9715 79.5833 24.5503 75 24.5503Z"
              fill="black"
            />
            <path
              d="M62.5003 54.0245H83.3337V68.7617H62.5003V54.0245ZM60.7087 0.872036C60.1492 0.415918 59.5036 0.1282 58.8281 0.0340073C58.1527 -0.0601858 57.4679 0.042009 56.8337 0.331669L25.042 14.7251H62.5003V4.90022C62.5003 3.27912 61.8337 1.75627 60.7087 0.872036Z"
              fill="black"
            />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-gray-900">Hemat Biaya</h3>
        <p className="text-xs font-medium text-gray-400 max-w-[210px] leading-relaxed">
          Lebih ekonomis untuk kebutuhan sementara.
        </p>
      </div>

      {/* 2. Mudah Dicari */}
      <div className="flex flex-col items-center space-y-2.5">
        <div className="w-16 h-16 flex items-center justify-center mb-1">
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <g clipPath="url(#clip0_1_573)">
              <path
                d="M62.3077 38.0769C62.3077 31.4062 59.9369 25.7001 55.1953 20.9585C50.4537 16.2169 44.7476 13.8462 38.0769 13.8462C31.4062 13.8462 25.7001 16.2169 20.9585 20.9585C16.2169 25.7001 13.8462 31.4062 13.8462 38.0769C13.8462 44.7476 16.2169 50.4537 20.9585 55.1953C25.7001 59.9369 31.4062 62.3077 38.0769 62.3077C44.7476 62.3077 50.4537 59.9369 55.1953 55.1953C59.9369 50.4537 62.3077 44.7476 62.3077 38.0769ZM90 83.0769C90 84.9519 89.3149 86.5745 87.9447 87.9447C86.5745 89.3149 84.9519 90 83.0769 90C81.1298 90 79.5072 89.3149 78.2091 87.9447L59.6575 69.4471C53.2031 73.9183 46.0096 76.1538 38.0769 76.1538C32.9207 76.1538 27.9898 75.1532 23.2843 73.152C18.5787 71.1508 14.5222 68.4465 11.1148 65.0391C7.70733 61.6316 5.00301 57.5751 3.0018 52.8696C1.0006 48.1641 0 43.2332 0 38.0769C0 32.9207 1.0006 27.9898 3.0018 23.2843C5.00301 18.5787 7.70733 14.5222 11.1148 11.1148C14.5222 7.70733 18.5787 5.00301 23.2843 3.0018C27.9898 1.0006 32.9207 0 38.0769 0C43.2332 0 48.1641 1.0006 52.8696 3.0018C57.5751 5.00301 61.6316 7.70733 65.0391 11.1148C68.4465 14.5222 71.1508 18.5787 73.152 23.2843C75.1532 27.9898 76.1538 32.9207 76.1538 38.0769C76.1538 46.0096 73.9183 53.2031 69.4471 59.6575L87.9988 78.2091C89.3329 79.5433 90 81.1659 90 83.0769Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_573">
                <rect width="90" height="90" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-gray-900">Mudah Dicari</h3>
        <p className="text-xs font-medium text-gray-400 max-w-[210px] leading-relaxed">
          Temukan alat melalui katalog terpusat.
        </p>
      </div>

      {/* 3. Terjamin */}
      <div className="flex flex-col items-center space-y-2.5">
        <div className="w-16 h-16 flex items-center justify-center mb-1">
          <svg
            width="93"
            height="101"
            viewBox="0 0 93 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-auto"
          >
            <path
              d="M36.1667 73.4567L15.5 55.0925L22.785 48.6191L36.1667 60.464L70.215 30.209L77.5 36.7283M46.5 0L0 18.3642V45.9104C0 71.3907 19.84 95.2182 46.5 101.003C73.16 95.2182 93 71.3907 93 45.9104V18.3642L46.5 0Z"
              fill="black"
            />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-gray-900">Terjamin</h3>
        <p className="text-xs font-medium text-gray-400 max-w-[210px] leading-relaxed">
          Ketahui kondisi dan stok alat.
        </p>
      </div>

      {/* 4. Terorganisir */}
      <div className="flex flex-col items-center space-y-2.5">
        <div className="w-16 h-16 flex items-center justify-center mb-1">
          <svg
            width="98"
            height="103"
            viewBox="0 0 98 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-auto"
          >
            <path
              d="M61.075 39.069C61.4477 40.2069 62.0782 41.2403 62.9157 42.0863C63.7532 42.9322 64.7744 43.5672 65.8975 43.9401C67.0206 44.3131 68.2142 44.4137 69.3825 44.234C70.5508 44.0542 71.6614 43.5989 72.625 42.9048C72.0757 43.8799 71.775 44.9786 71.75 46.1014C71.75 47.4617 72.163 48.79 72.94 49.9017C73.724 51.0134 74.823 51.8552 76.09 52.3169L79.59 53.4179C79.7767 53.4989 79.9439 53.62 80.0799 53.7731C80.2348 53.915 80.3444 54.1005 80.395 54.3059L81.4449 57.5379C81.9035 58.8663 82.7469 60.0312 83.8599 60.8766C84.8994 61.611 86.1247 62.0272 87.3904 62.0757C88.6561 62.1242 89.9089 61.8029 90.9999 61.15V87.0172C90.9999 91.2561 89.3406 95.3214 86.3869 98.3188C83.4332 101.316 79.4271 103 75.25 103H15.75C11.5728 103 7.56676 101.316 4.61306 98.3188C1.65937 95.3214 0 91.2561 0 87.0172V39.069H61.075ZM67.2245 54.3165C66.5681 53.6507 65.678 53.2766 64.75 53.2766C63.8219 53.2766 62.9318 53.6507 62.2755 54.3165L40.25 76.6675L30.4745 66.7476L30.2085 66.506C29.512 65.9387 28.6281 65.663 27.7378 65.7354C26.8475 65.8079 26.0182 66.223 25.4197 66.8957C24.8211 67.5684 24.4987 68.4479 24.5184 69.354C24.538 70.2601 24.8983 71.1244 25.5255 71.7697L37.7755 84.2007C38.4318 84.8666 39.3219 85.2406 40.25 85.2406C41.1781 85.2406 42.0681 84.8666 42.7245 84.2007L67.2245 59.3387C67.8806 58.6726 68.2492 57.7694 68.2492 56.8276C68.2492 55.8858 67.8806 54.9826 67.2245 54.3165ZM87.4335 35.5172C87.697 35.5151 87.9546 35.5969 88.1699 35.7511C88.3853 35.9052 88.5476 36.1241 88.6339 36.3768L89.6769 39.6372C90.005 40.6274 90.5551 41.5268 91.2839 42.2645C92.0127 43.0023 92.9004 43.5583 93.8769 43.8887L97.0864 44.9542L97.1529 44.9648C97.3379 45.0316 97.5051 45.1408 97.6416 45.284C97.7781 45.4271 97.8802 45.6004 97.9398 45.7902C97.9994 45.98 98.015 46.1812 97.9854 46.3781C97.9557 46.575 97.8817 46.7623 97.7689 46.9254C97.6169 47.1431 97.4015 47.307 97.1529 47.3942L93.9329 48.4562C92.9583 48.788 92.0728 49.3446 91.3458 50.0822C90.6189 50.8199 90.0704 51.7186 89.7434 52.7076L88.6934 55.9681C88.6048 56.2176 88.4425 56.4334 88.2286 56.5859C88.0147 56.7384 87.7596 56.8202 87.4982 56.8202C87.2368 56.8202 86.9817 56.7384 86.7678 56.5859C86.5539 56.4334 86.3916 56.2176 86.3029 55.9681L85.2564 52.7076C84.9314 51.7149 84.3834 50.8125 83.6558 50.0715C82.9281 49.3306 82.0406 48.7715 81.0635 48.4384L77.847 47.38C77.662 47.3132 77.4948 47.204 77.3583 47.0608C77.2218 46.9177 77.1197 46.7444 77.0601 46.5547C77.0005 46.3649 76.9849 46.1637 77.0145 45.9667C77.0441 45.7698 77.1182 45.5825 77.231 45.4194C77.383 45.2018 77.5984 45.0378 77.847 44.9506L81.0669 43.8887C82.0299 43.5485 82.9029 42.9881 83.6184 42.251C84.334 41.5138 84.8728 40.6195 85.1934 39.6372L86.2399 36.3768C86.3257 36.1258 86.4864 35.9082 86.6997 35.7542C86.913 35.6001 87.1682 35.5173 87.4299 35.5172M68.1345 3.53108e-06C68.615 0.00246151 69.0833 0.154706 69.4758 0.436128C69.8683 0.717551 70.1661 1.11456 70.329 1.57342L72.2435 7.55097C72.8402 9.36829 73.8463 11.0194 75.1816 12.3733C76.517 13.7272 78.1451 14.7466 79.9365 15.3506L85.8305 17.2933L85.9459 17.3218C86.3988 17.4864 86.7908 17.7884 87.0687 18.1867C87.3467 18.5851 87.4973 19.0606 87.4999 19.5487C87.4998 20.0374 87.3503 20.5141 87.0719 20.9129C86.7936 21.3118 86.4002 21.6132 85.9459 21.7756L80.0519 23.7184C78.2612 24.3228 76.6339 25.3424 75.2991 26.6963C73.9644 28.0502 72.9589 29.7011 72.3624 31.518L70.4445 37.4956C70.2861 37.9573 69.9893 38.3572 69.5958 38.6394C69.2023 38.9215 68.7318 39.0717 68.25 39.069C67.7688 39.0691 67.2994 38.9178 66.9064 38.6361C66.5134 38.3543 66.2161 37.9558 66.0555 37.4956L64.1375 31.518C63.5448 29.6958 62.5409 28.0392 61.206 26.6802C59.871 25.3212 58.2417 24.2973 56.448 23.69L50.554 21.7472C50.1011 21.5826 49.7092 21.2806 49.4312 20.8822C49.1532 20.4839 49.0027 20.0084 49 19.5203C49.0001 19.0315 49.1497 18.5549 49.428 18.156C49.7063 17.7572 50.0997 17.4558 50.554 17.2933L56.448 15.3506C58.1927 14.7394 59.7772 13.7328 61.0811 12.4072C62.385 11.0815 63.374 9.47176 63.973 7.70014L64.022 7.55097L65.9365 1.57342C66.0973 1.11255 66.3951 0.713699 66.7888 0.431877C67.1825 0.150056 67.6527 -0.000841649 68.1345 3.53108e-06ZM49 12.2179C47.4763 12.7198 46.1481 13.6977 45.2052 15.0118C44.2623 16.3259 43.7529 17.9089 43.75 19.5345C43.7836 21.1018 44.2874 22.6214 45.1942 23.8906C46.1009 25.1597 47.3675 26.1182 48.825 26.6379L54.81 28.6269C55.825 28.9572 56.749 29.529 57.505 30.2962C57.505 30.4241 57.645 30.5519 57.799 30.6869C57.8977 30.7714 57.9869 30.8667 58.065 30.971C58.3123 31.2812 58.527 31.6127 58.709 31.9655H0V26.6379C0 22.399 1.65937 18.3338 4.61306 15.3364C7.56676 12.3391 11.5728 10.6552 15.75 10.6552H53.5045L49 12.2179Z"
              fill="black"
            />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-gray-900">Terorganisir</h3>
        <p className="text-xs font-medium text-gray-400 max-w-[210px] leading-relaxed">
          Pantau peminjaman dengan lebih mudah.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* ================= CARA MENYEWA PERALATAN ================= */}
      <section id="cara-sewa" className="relative py-24 bg-white overflow-hidden border-b border-gray-100">
        {/* Latar Belakang Gambar Wave PNG1 */}
        <img 
          src={waveBg} 
          alt="Wave Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" 
        />

        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-20 tracking-wide">
            Cara Menyewa Peralatan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Langkah 01 */}
            <div className="flex flex-col space-y-4 pr-4">
              <div className="inline-block">
                <span className="text-4xl font-extrabold text-gray-900 border-b-4 border-black pb-1 inline-block">01</span>
              </div>
              <p className="text-base font-extrabold text-gray-900 leading-snug pt-2">
                Pilih barang yang dibutuhkan.
              </p>
            </div>

            {/* Langkah 02 */}
            <div className="flex flex-col space-y-4 pr-4 md:border-l md:border-gray-300 md:pl-8">
              <div className="inline-block">
                <span className="text-4xl font-extrabold text-gray-900 border-b-4 border-black pb-1 inline-block">02</span>
              </div>
              <p className="text-base font-extrabold text-gray-900 leading-snug pt-2">
                Ajukan penyewaan melalui website.
              </p>
            </div>

            {/* Langkah 03 */}
            <div className="flex flex-col space-y-4 md:border-l md:border-gray-300 md:pl-8">
              <div className="inline-block">
                <span className="text-4xl font-extrabold text-gray-900 border-b-4 border-black pb-1 inline-block">03</span>
              </div>
              <p className="text-base font-extrabold text-gray-900 leading-snug pt-2">
                Tunggu persetujuan dan ambil barang sesuai ketentuan.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 6. TESTIMONI PELANGGAN (APA KATA MEREKA) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide">
              Apa Kata Mereka Tentang Rentech?
            </h2>
            <p className="text-gray-500 text-xs">
              Simak Pengalaman Pelanggan Yang Telah Menggunakan Layanan Penyewaan Rentech.
            </p>
          </div>

          {/* Staggered Cards Layout */}
          <div className="space-y-6">
            
            {/* Baris Atas (2 Kartu Berdampingan) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonialsTop.map((item) => (
                <div key={item.id} className="bg-white border border-gray-300 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs">
                          {item.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                          <p className="text-[11px] text-gray-400">{item.role}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-500 text-xs">★★★★★</div>
                    </div>
                    <hr className="border-gray-100 my-2" />
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Baris Bawah (3 Kartu Sejajar) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonialsBottom.map((item) => (
                <div key={item.id} className="bg-white border border-gray-300 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs">
                          {item.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                          <p className="text-[11px] text-gray-400">{item.role}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-500 text-xs">★★★★★</div>
                    </div>
                    <hr className="border-gray-100 my-2" />
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ================= 7. BOTTOM CTA BANNER ================= */}
      <section className="relative bg-black text-white py-20 overflow-hidden">
        <img 
          src={bannerBottom} 
          alt="Studio Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" 
        />
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-wider">
            Sudah Tahu yang Kamu Butuhkan?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto font-medium leading-relaxed">
            Kalau sudah, langsung pilih perangkatmu. Kalau masih bingung, biarkan AI membantu!
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link 
              to="/katalog" 
              className="bg-white text-black font-extrabold px-7 py-3 rounded-xl hover:bg-gray-200 transition-colors text-xs flex items-center gap-2"
            >
              Jelajahi Katalog <span>&rarr;</span>
            </Link>
            <a 
              href="#ai-finder" 
              className="bg-black border border-white text-white font-extrabold px-7 py-3 rounded-xl hover:bg-white/10 transition-colors text-xs"
            >
              Coba AI Finder
            </a>
          </div>
        </div>
      </section>

      {/* ================= 8. FOOTER ================= */}
      <footer className="bg-[#131313] text-gray-400 py-14 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <img src={logo} alt="RenTech Logo" className="h-9 w-auto object-contain" />
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Sewa perangkat elektronik dan kreatif dengan mudah, aman, dan terpercaya. Wujudkan ide besar kamu bersama Rentech.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs">Navigasi</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Beranda</a></li>
              <li><Link to="/katalog" className="hover:text-white">Katalog</Link></li>
              <li><a href="#cara-sewa" className="hover:text-white">Tata Cara Penyewaan</a></li>
              <li><a href="#" className="hover:text-white">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs">Kategori Perangkat</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Kamera</a></li>
              <li><a href="#" className="hover:text-white">Drone</a></li>
              <li><a href="#" className="hover:text-white">Laptop</a></li>
              <li><a href="#" className="hover:text-white">Audio & Lighting</a></li>
              <li><a href="#" className="hover:text-white">Aksesoris</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs">Dapatkan Update Terbaru</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Jangan lewatkan promo, perangkat baru, dan tips menarik dari Rentech.
            </p>
            <div className="flex gap-2 pt-1">
              <input 
                type="email" 
                placeholder="Masukkan email kamu" 
                className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none w-full"
              />
              <button className="bg-white text-black font-bold px-3.5 py-2 rounded-lg text-xs hover:bg-gray-200 shrink-0">
                Kirim
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-8 pt-10 mt-10 border-t border-gray-800 text-[11px] flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
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

export default Dashboard;