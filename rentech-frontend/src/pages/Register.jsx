import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Rentech.png';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5 shrink-0" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isPasswordMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordMismatch) {
      alert('Konfirmasi kata sandi tidak cocok!');
      return;
    }
    console.log('Data pendaftaran:', formData);
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row bg-[#0E1014] relative w-full lg:overflow-hidden">
      {/* Kolom Kiri - Area Gelap & Dekorasi Abstrak (Terkunci Full Height) */}
      <div className="hidden lg:flex lg:w-[52%] h-full bg-[#0E1014] relative flex-col justify-between p-10 xl:p-14 text-white overflow-hidden shrink-0">
        
        {/* Dekorasi Lingkaran Abstrak di Kanan Bawah */}
        <div className="absolute -bottom-[160px] -right-[180px] w-[600px] h-[600px] opacity-90 pointer-events-none">
          <div className="absolute inset-[1.67%] border-2 border-[#2A2D35] bg-[#14161C] rounded-full"></div>
          <div className="absolute inset-[11.67%] border-2 border-[#2A2D35] bg-[#0E1014] rounded-full"></div>
          <div className="absolute inset-[21.67%] border-2 border-[#3A3E48] bg-[#181A20] rounded-full"></div>
          <div className="absolute inset-[31.67%] border-2 border-[#3A3E48] bg-[#0A0B0E] rounded-full"></div>
          <div className="absolute inset-[41.33%] border-2 border-[#4B5060] bg-[#14161C] rounded-full"></div>
          <div className="absolute inset-[42.33%] bg-white/10 rounded-full"></div>
        </div>

        {/* Header Kiri (Logo & Link Kembali) */}
        <div className="relative z-10 flex justify-between items-center w-full">
          <img src={logo} alt="RenTech Logo" className="h-[50px] w-auto object-contain" />
          <Link to="/" className="text-[13px] font-semibold text-white/78 hover:text-white flex items-center gap-2 transition-colors">
            &larr; Kembali ke Beranda
          </Link>
        </div>

        {/* Konten Teks Tengah */}
        <div className="relative z-10 w-full max-w-[480px] my-auto py-6">
          <p className="text-[11px] font-bold tracking-[2.2px] uppercase mb-6 text-white/70">
            SEWA PERANGKAT ELEKTRONIK BERKUALITAS
          </p>
          <h1 className="text-[40px] xl:text-[44px] font-extrabold mb-8 leading-[48px] xl:leading-[51px] text-white tracking-[-0.44px]">
            Optimalkan Pengalaman Anda Berkreasi Tanpa Budget Mahal
          </h1>
          <p className="text-[14px] xl:text-[15px] leading-[24px] xl:leading-[26px] text-white/78 max-w-[425px]">
            Daftar untuk memantau peminjaman, mengajukan sewa, dan mendapat rekomendasi perangkat dari AI Finder.
          </p>
          
          {/* Fitur / Badge Bawah */}
          <div className="flex flex-wrap gap-3 mt-10">
            <div className="flex items-center gap-2.5 px-[17px] py-[10px] border border-[#3A3E48] rounded-full bg-[#14161C]/50 backdrop-blur-sm">
              <div className="w-[18px] h-[18px] border-[1.5px] border-white rounded-full flex items-center justify-center">
                <span className="text-[10px]">✓</span>
              </div>
              <span className="text-white text-[13px] font-semibold">Hemat Biaya</span>
            </div>
            <div className="flex items-center gap-2.5 px-[17px] py-[10px] border border-[#3A3E48] rounded-full bg-[#14161C]/50 backdrop-blur-sm">
              <div className="w-[18px] h-[18px] border-[1.5px] border-white rounded-full flex items-center justify-center">
                <span className="text-[10px]">✓</span>
              </div>
              <span className="text-white text-[13px] font-semibold">Terjamin</span>
            </div>
            <div className="flex items-center gap-2.5 px-[17px] py-[10px] border border-[#3A3E48] rounded-full bg-[#14161C]/50 backdrop-blur-sm">
              <div className="w-[18px] h-[18px] border-[1.5px] border-white rounded-full flex items-center justify-center">
                <span className="text-[10px]">✓</span>
              </div>
              <span className="text-white text-[13px] font-semibold">Terorganisir</span>
            </div>
          </div>
        </div>

        {/* Footer Kiri */}
        <div className="relative z-10 text-[12px] text-white/40">
          © 2026 RenTech Platform. All rights reserved.
        </div>
      </div>

      {/* Kolom Kanan - Form Register (Scroll Mandiri) */}
      <div className="flex-1 min-h-screen lg:h-full bg-white flex justify-center items-center px-8 py-10 lg:overflow-y-auto">
        <div className="w-[420px] max-w-full flex flex-col gap-[24px] my-auto py-4">
          
          {/* Header Form */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[34px] xl:text-[36px] font-extrabold text-[#14161C] tracking-[-0.36px]">
              Daftar ke RenTech
            </h2>
            <p className="text-[14px] xl:text-[15px] text-[#6B7280] leading-[24px]">
              Buat akun dan siapkan alat untuk karya berikutnya.
            </p>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            
            {/* Input Nama */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#14161C]">
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nadia Putri"
                required
                className="w-full h-[50px] px-[18px] bg-[#F5F5F6] border border-[#D1D5DB] rounded-[12px] text-[15px] text-[#14161C] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#14161C] transition-all"
              />
            </div>

            {/* Input Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#14161C]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                required
                className="w-full h-[50px] px-[18px] bg-[#F5F5F6] border border-[#D1D5DB] rounded-[12px] text-[15px] text-[#14161C] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#14161C] transition-all"
              />
            </div>

            {/* Input No. Telepon */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#14161C]">
                No. Telepon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0812 3456 7890"
                className="w-full h-[50px] px-[18px] bg-[#F5F5F6] border border-[#D1D5DB] rounded-[12px] text-[15px] text-[#14161C] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#14161C] transition-all"
              />
            </div>

            {/* Input Kata Sandi */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#14161C]">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi"
                  required
                  className="w-full h-[50px] pl-[18px] pr-[56px] bg-[#F5F5F6] border border-[#D1D5DB] rounded-[12px] text-[15px] text-[#14161C] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#14161C] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[6px] top-[5px] w-[44px] h-[40px] flex items-center justify-center rounded-[10px] hover:bg-[#E5E7EB] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C2 10 4.90909 4.16667 10 4.16667C15.0909 4.16667 18 10 18 10C18 10 15.0909 15.8333 10 15.8333C4.90909 15.8333 2 10 2 10Z" stroke="#4B5563" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#4B5563" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Input Konfirmasi Kata Sandi */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#14161C]">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi kata sandi"
                  required
                  className={`w-full h-[50px] pl-[18px] pr-[56px] bg-[#F5F5F6] rounded-[12px] text-[15px] text-[#14161C] placeholder-[#6B7280] focus:outline-none transition-all border ${
                    isPasswordMismatch
                      ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                      : 'border-[#D1D5DB] focus:ring-2 focus:ring-[#14161C]'
                  }`}
                />
                
                {isPasswordMismatch ? (
                  <div className="absolute right-[16px] top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-[6px] top-[5px] w-[44px] h-[40px] flex items-center justify-center rounded-[10px] hover:bg-[#E5E7EB] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10C2 10 4.90909 4.16667 10 4.16667C15.0909 4.16667 18 10 18 10C18 10 15.0909 15.8333 10 15.8333C4.90909 15.8333 2 10 2 10Z" stroke="#4B5563" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#4B5563" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
              {isPasswordMismatch && (
                <p className="text-[12px] text-red-500 font-medium">
                  Konfirmasi kata sandi tidak cocok.
                </p>
              )}
            </div>

            {/* Tombol Daftar Utama (Pill Hitam) */}
            <button
              type="submit"
              className="w-full h-[54px] bg-[#14161C] hover:bg-gray-800 text-white font-bold text-[16px] rounded-full transition-colors flex items-center justify-center mt-2 cursor-pointer"
            >
              Daftar
            </button>
          </form>

          {/* Divider Atau */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-[#E5E7EB]"></div>
            <span className="text-[13px] text-[#6B7280]">atau daftar dengan</span>
            <div className="flex-1 h-[1px] bg-[#E5E7EB]"></div>
          </div>

          {/* Tombol Daftar dengan Google */}
          <button
            type="button"
            className="w-full h-[54px] bg-white hover:bg-gray-50 border border-[#14161C] text-[#14161C] font-bold text-[15px] rounded-full transition-colors flex items-center justify-center gap-3 cursor-pointer"
          >
            <GoogleIcon />
            Daftar dengan Google
          </button>

          {/* Footer Masuk */}
          <div className="text-center">
            <p className="text-[14px] text-[#4B5563]">
              Sudah punya akun?{' '}
              <Link to="/login" className="font-bold text-[#14161C] hover:underline">
                Masuk
              </Link>
            </p>
          </div>

          {/* Syarat & Ketentuan */}
          <div className="text-center text-[12px] text-[#6B7280] leading-[19px]">
            Dengan mendaftar, kamu menyetujui{' '}
            <a href="#" className="font-semibold text-[#14161C] underline">
              Syarat & Ketentuan
            </a>{' '}
            dan{' '}
            <a href="#" className="font-semibold text-[#14161C] underline">
              Kebijakan Privasi
            </a>{' '}
            RenTech.
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;