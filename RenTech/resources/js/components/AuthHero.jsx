import { ArrowLeft, ShieldCheck, SquareCheckBig, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from './Logo';

const badges = [
    { icon: WalletCards, label: 'Hemat Biaya' },
    { icon: ShieldCheck, label: 'Terjamin' },
    { icon: SquareCheckBig, label: 'Terorganisir' },
];

// Lingkaran konsentris dekoratif menyerupai lensa kamera (pusat di kanan-bawah panel).
function LensDecoration() {
    const ring = (size, extra = '') => (
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ring ${extra}`}
            style={{ width: `${size}%`, height: `${size}%` }} />
    );
    return (
        <div aria-hidden="true"
            className="pointer-events-none absolute left-[88%] top-[84%] aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2">
            {ring(100)}
            {ring(79.5)}
            {ring(58.5)}
            {ring(38, 'bg-night-deep')}
            {ring(18, 'border-white/25')}
            <div className="absolute rounded-full bg-white/20"
                style={{ width: '4.9%', height: '4.9%', left: '44.6%', top: '44.6%' }} />
        </div>
    );
}

export default function AuthHero() {
    return (
        <aside className="relative hidden w-[52%] overflow-hidden bg-night text-white lg:flex lg:flex-col">
            <LensDecoration />

            <header className="relative z-10 flex items-center justify-between px-[5.5%] pt-8">
                <Logo />
                <Link to="/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition hover:text-white">
                    <ArrowLeft className="size-3.5" />
                    Kembali ke Beranda
                </Link>
            </header>

            <div className="relative z-10 mt-auto mb-auto px-[5.5%] pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Sewa Perangkat Elektronik Berkualitas
                </p>
                <h2 className="mt-8 max-w-[13.5ch] text-[clamp(2.25rem,3.9vw,4rem)] font-bold leading-[1.08] tracking-tight">
                    Optimalkan Pengalaman Anda Berkreasi Tanpa Budget Mahal
                </h2>
                <p className="mt-9 max-w-[30rem] text-lg leading-relaxed text-white/70">
                    Masuk untuk memantau peminjaman, mengajukan sewa, dan mendapat rekomendasi
                    perangkat dari AI Finder.
                </p>
            </div>

            <ul className="relative z-10 flex flex-wrap gap-3 px-[5.5%] pb-19">
                {badges.map(({ icon: Icon, label }) => (
                    <li key={label}
                        className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold">
                        <Icon className="size-[1.1rem]" strokeWidth={1.8} />
                        {label}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
