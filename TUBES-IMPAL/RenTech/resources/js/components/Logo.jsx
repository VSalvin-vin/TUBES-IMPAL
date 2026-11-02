// Logo RenTech: kamera dengan tripod di dalam lingkaran + panah rotasi (sewa/kembali).
export function LogoMark({ className = 'size-11' }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M40.5 17A18.5 18.5 0 0 0 9 12.5" />
            <path d="M9 7v5.5h5.5" />
            <path d="M7.5 31A18.5 18.5 0 0 0 39 35.5" />
            <path d="M39 41v-5.5h-5.5" />
            <rect x="15" y="14" width="18" height="13" rx="3" />
            <circle cx="24" cy="20.5" r="3.6" />
            <circle cx="24" cy="20.5" r="1.2" fill="currentColor" />
            <path d="M24 27l-5 10M24 27l5 10M24 27v6" />
        </svg>
    );
}

export default function Logo({ className = '' }) {
    return (
        <div className={`flex items-center gap-1.5 ${className}`}>
            <LogoMark />
            <span className="text-[1.65rem] font-extrabold tracking-tight">RenTech</span>
        </div>
    );
}
