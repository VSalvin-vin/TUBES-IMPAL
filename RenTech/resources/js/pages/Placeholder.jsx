import { Link } from 'react-router-dom';

// Halaman sementara untuk route yang belum dibangun.
export default function Placeholder({ title }) {
    return (
        <main className="grid min-h-screen place-items-center px-6 text-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="mt-2 text-muted">Halaman ini belum dibuat.</p>
                <Link
                    to="/login"
                    className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
                >
                    Ke halaman Masuk
                </Link>
            </div>
        </main>
    );
}
