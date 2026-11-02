import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthHero from '../components/AuthHero';
import Logo from '../components/Logo';

const inputClass =
    'w-full rounded-2xl border border-field-border bg-field px-5 py-[0.95rem] text-[0.95rem] ' +
    'placeholder:text-muted/80 outline-none transition focus:border-ink focus:bg-white focus:ring-4 focus:ring-ink/10';

function GoogleIcon() {
    return (
        <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
            <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
        </svg>
    );
}

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const update = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    };

    const validate = () => {
        const next = {};
        if (!form.email.trim()) next.email = 'Email wajib diisi.';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Format email tidak valid.';
        if (!form.password) next.password = 'Kata sandi wajib diisi.';
        return next;
    };

    const submit = async (e) => {
        e.preventDefault();
        const clientErrors = validate();
        if (Object.keys(clientErrors).length) {
            setErrors(clientErrors);
            return;
        }

        setProcessing(true);
        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content ?? '',
                },
                body: JSON.stringify(form),
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                window.location.href = data.redirect ?? '/dashboard';
                return;
            }
            // 422 = validasi / kredensial salah (format error bawaan Laravel)
            const serverErrors = {};
            Object.entries(data.errors ?? {}).forEach(([key, msgs]) => (serverErrors[key] = msgs[0]));
            setErrors(Object.keys(serverErrors).length
                ? serverErrors
                : { general: data.message ?? 'Terjadi kesalahan. Coba lagi.' });
        } catch {
            setErrors({ general: 'Tidak dapat terhubung ke server. Periksa koneksi Anda.' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <AuthHero />

            <main className="flex flex-1 flex-col px-6 py-8 sm:px-10">
                {/* Logo & tautan kembali hanya tampil di layar kecil (panel gelap disembunyikan) */}
                <div className="flex items-center justify-between lg:hidden">
                    <Logo className="[&_svg]:size-9 [&_span]:text-xl" />
                    <Link to="/" className="text-sm font-medium text-muted hover:text-ink">← Beranda</Link>
                </div>

                <div className="m-auto w-full max-w-[26.5rem] py-10">
                    <h1 className="text-[2.6rem] font-extrabold leading-none tracking-tight">Masuk</h1>
                    <p className="mt-4 text-base leading-relaxed text-muted">
                        Selamat datang kembali! Masuk untuk melanjutkan penyewaan perangkatmu.
                    </p>

                    <form onSubmit={submit} noValidate className="mt-9">
                        {errors.general && (
                            <div role="alert"
                                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {errors.general}
                            </div>
                        )}

                        <label htmlFor="email" className="mb-2 block text-sm font-bold">Email</label>
                        <input id="email" type="email" autoComplete="email" placeholder="nama@email.com"
                            value={form.email} onChange={update('email')}
                            aria-invalid={!!errors.email}
                            className={`${inputClass} ${errors.email ? 'border-red-400' : ''}`} />
                        {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}

                        <div className="mb-2 mt-5 flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-bold">Kata Sandi</label>
                            <Link to="/forgot-password" className="text-sm font-semibold underline underline-offset-2">
                                Lupa kata sandi?
                            </Link>
                        </div>
                        <div className="relative">
                            <input id="password" type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password" placeholder="Masukkan kata sandi"
                                value={form.password} onChange={update('password')}
                                aria-invalid={!!errors.password}
                                className={`${inputClass} pr-12 ${errors.password ? 'border-red-400' : ''}`} />
                            <button type="button" onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/80 hover:text-ink">
                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}

                        <label className="mt-5 flex cursor-pointer items-center gap-3 text-[0.95rem] text-ink/80">
                            <input type="checkbox" checked={form.remember} onChange={update('remember')}
                                className="size-5 cursor-pointer rounded-md border-field-border accent-ink" />
                            Ingat saya di perangkat ini
                        </label>

                        <button type="submit" disabled={processing}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-[1.05rem] text-base font-bold text-white transition hover:bg-black focus-visible:ring-4 focus-visible:ring-ink/25 disabled:cursor-not-allowed disabled:opacity-70">
                            {processing && <LoaderCircle className="size-5 animate-spin" />}
                            {processing ? 'Memproses…' : 'Masuk'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4 text-sm text-muted">
                        <span className="h-px flex-1 bg-field-border" />
                        atau masuk dengan
                        <span className="h-px flex-1 bg-field-border" />
                    </div>

                    <a href="/auth/google"
                        className="flex w-full items-center justify-center gap-3 rounded-full border border-ink py-[1.05rem] text-base font-bold transition hover:bg-field">
                        <GoogleIcon />
                        Masuk dengan Google
                    </a>

                    <p className="mt-7 text-center text-[0.95rem] text-muted">
                        Belum punya akun?{' '}
                        <Link to="/register" className="font-bold text-ink underline underline-offset-2">Daftar sekarang</Link>
                    </p>

                    <p className="mt-6 text-center text-[0.8rem] leading-relaxed text-muted">
                        Dengan masuk, kamu menyetujui{' '}
                        <a href="/syarat-ketentuan" className="font-semibold text-ink underline underline-offset-2">Syarat &amp; Ketentuan</a>{' '}
                        dan{' '}
                        <a href="/kebijakan-privasi" className="font-semibold text-ink underline underline-offset-2">Kebijakan Privasi</a>{' '}
                        RenTech.
                    </p>
                </div>
            </main>
        </div>
    );
}
