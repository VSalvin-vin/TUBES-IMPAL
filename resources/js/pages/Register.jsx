import { useState } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import AuthHero from '../components/AuthHero';
import Logo from '../components/Logo';

const inputClass =
    'w-full rounded-2xl border border-field-border bg-field px-5 py-[0.95rem] text-[0.95rem] ' +
    'placeholder:text-muted/80 outline-none transition focus:border-ink focus:bg-white focus:ring-4 focus:ring-ink/10';

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

export default function Register() {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        noTelepon: '',
        kataSandi: '',
        konfirmasiKataSandi: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === 'konfirmasiKataSandi' || name === 'kataSandi') setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.kataSandi !== formData.konfirmasiKataSandi) {
            setError('Konfirmasi kata sandi tidak cocok.');
            return;
        }

        setProcessing(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            const response = await fetch('/register', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const validationErrors = data.errors;
                if (validationErrors) {
                    const firstError = Object.values(validationErrors)[0]?.[0];
                    setError(firstError || 'Data pendaftaran tidak valid.');
                } else {
                    setError(data.message || 'Registrasi gagal.');
                }
                return;
            }

            window.location.href = data.redirect || '/dashboard';
        } catch {
            setError('Tidak dapat terhubung ke server. Silakan coba lagi.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <AuthHero />

            <main className="h-full min-h-0 min-w-0 flex-1 overflow-y-auto px-6 py-8 sm:px-10">
                <div className="flex items-center justify-between lg:hidden">
                    <Logo className="[&_svg]:size-9 [&_span]:text-xl" />
                    <Link to="/" className="text-sm font-medium text-muted transition hover:text-ink">
                        ← Beranda
                    </Link>
                </div>

                <div className="mx-auto my-auto w-full max-w-[26.5rem] py-10">
                    <h1 className="text-[2.6rem] font-extrabold leading-none tracking-tight">Buat Akun</h1>
                    <p className="mt-4 text-base leading-relaxed text-muted">
                        Daftar ke RenTech untuk mulai menyewa perangkat dan menyiapkan karya berikutnya.
                    </p>

                    {error && (
                        <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
                        <div>
                            <label htmlFor="nama" className="mb-2 block text-sm font-bold">Nama lengkap</label>
                            <input id="nama" name="nama" type="text" autoComplete="name" placeholder="Nama lengkap" value={formData.nama} onChange={handleChange} required className={inputClass} />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-bold">Email</label>
                            <input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" value={formData.email} onChange={handleChange} required className={inputClass} />
                        </div>

                        <div>
                            <label htmlFor="noTelepon" className="mb-2 block text-sm font-bold">Nomor Telepon</label>
                            <input id="noTelepon" name="noTelepon" type="tel" autoComplete="tel" placeholder="0812 3456 7890" value={formData.noTelepon} onChange={handleChange} required className={inputClass} />
                        </div>

                        <div>
                            <label htmlFor="kataSandi" className="mb-2 block text-sm font-bold">Kata Sandi</label>
                            <div className="relative">
                                <input id="kataSandi" name="kataSandi" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Buat kata sandi" value={formData.kataSandi} onChange={handleChange} required className={`${inputClass} pr-12`} />
                                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/80 hover:text-ink">
                                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="konfirmasiKataSandi" className="mb-2 block text-sm font-bold">Konfirmasi Kata Sandi</label>
                            <div className="relative">
                                <input id="konfirmasiKataSandi" name="konfirmasiKataSandi" type={showConfirmation ? 'text' : 'password'} autoComplete="new-password" placeholder="Ulangi kata sandi" value={formData.konfirmasiKataSandi} onChange={handleChange} required aria-invalid={!!error} className={`${inputClass} pr-12 ${error ? 'border-red-400' : ''}`} />
                                <button type="button" onClick={() => setShowConfirmation((value) => !value)} aria-label={showConfirmation ? 'Sembunyikan konfirmasi kata sandi' : 'Tampilkan konfirmasi kata sandi'} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/80 hover:text-ink">
                                    {showConfirmation ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </button>
                            </div>
                        </div>

                        <p className="pt-1 text-center text-xs leading-relaxed text-muted">
                            Dengan mendaftar, kamu menyetujui{' '}
                            <a href="/syarat-ketentuan" className="font-semibold text-ink underline underline-offset-2">Syarat &amp; Ketentuan</a>{' '}
                            dan{' '}
                            <a href="/kebijakan-privasi" className="font-semibold text-ink underline underline-offset-2">Kebijakan Privasi</a>{' '}
                            RenTech.
                        </p>

                        <button type="submit" disabled={processing} className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-[1.05rem] text-base font-bold text-white transition hover:bg-black focus-visible:ring-4 focus-visible:ring-ink/25 disabled:cursor-not-allowed disabled:opacity-70">
                            {processing && <LoaderCircle className="size-5 animate-spin" />}
                            {processing ? 'Memproses…' : 'Daftar'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4 text-sm text-muted">
                        <span className="h-px flex-1 bg-field-border" />
                        atau daftar dengan
                        <span className="h-px flex-1 bg-field-border" />
                    </div>

                    <a href="/auth/google" className="flex w-full items-center justify-center gap-3 rounded-full border border-ink py-[1.05rem] text-base font-bold transition hover:bg-field focus-visible:ring-4 focus-visible:ring-ink/10">
                        <GoogleIcon />
                        Daftar dengan Google
                    </a>

                    <p className="mt-7 text-center text-[0.95rem] text-muted">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="font-bold text-ink underline underline-offset-2">Masuk</Link>
                    </p>

                    <p className="mt-6 text-center text-[0.8rem] leading-relaxed text-muted">
                        Dengan mendaftar, kamu dapat mengelola akun dan penyewaan perangkat RenTech.
                    </p>
                </div>
            </main>
        </div>
    );
}
