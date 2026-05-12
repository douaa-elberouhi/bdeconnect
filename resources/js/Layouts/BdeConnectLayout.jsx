import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

function CalendarIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
            />
        </svg>
    );
}

function ShieldIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
        </svg>
    );
}

function UserIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
        </svg>
    );
}

export default function BdeConnectLayout({ children, title }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const url = usePage().url || '';
    const isAdmin = user?.role === 'admin';
    const [menuOpen, setMenuOpen] = useState(false);

    const adminActive = url.startsWith('/admin');
    const etudiantActive =
        url.startsWith('/calendrier') || url.startsWith('/mes-inscriptions') || url === '/dashboard';

    const etudiantHref = isAdmin ? '/calendrier' : '/dashboard';

    return (
        <div className="min-h-screen bg-[#faf7f2] text-stone-800">
            <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
                            <CalendarIcon className="h-5 w-5" />
                        </span>
                        <span>BDE Connect</span>
                    </Link>

                    <div className="flex flex-1 justify-center">
                        <div className="inline-flex rounded-full bg-stone-100/90 p-1 shadow-inner">
                            {isAdmin && (
                                <Link
                                    href="/admin/dashboard"
                                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                                        adminActive
                                            ? 'bg-white text-stone-900 shadow-sm'
                                            : 'text-stone-500 hover:text-stone-800'
                                    }`}
                                >
                                    <ShieldIcon className="h-4 w-4 text-orange-500" />
                                    Admin
                                </Link>
                            )}
                            <Link
                                href={etudiantHref}
                                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                                    etudiantActive && !adminActive
                                        ? 'bg-white text-stone-900 shadow-sm'
                                        : 'text-stone-500 hover:text-stone-800'
                                }`}
                            >
                                <UserIcon className="h-4 w-4 text-orange-500" />
                                Étudiant
                            </Link>
                        </div>
                    </div>

                    <div className="relative flex items-center gap-2">
                        <div className="hidden min-w-0 text-right sm:block">
                            <p className="truncate text-sm font-medium text-stone-900">{user?.name}</p>
                            <p className="truncate text-xs text-stone-500">
                                {isAdmin ? 'Administrateur' : 'Étudiant'}
                            </p>
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                            {(user?.name || '?')
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 3)
                                .toUpperCase()}
                        </div>
                        <button
                            type="button"
                            onClick={() => setMenuOpen((o) => !o)}
                            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                            aria-expanded={menuOpen}
                            aria-label="Menu compte"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>
                        {menuOpen && (
                            <>
                                <button
                                    type="button"
                                    className="fixed inset-0 z-40 cursor-default"
                                    aria-label="Fermer le menu"
                                    onClick={() => setMenuOpen(false)}
                                />
                                <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
                                    <Link
                                        href={route('profile.edit')}
                                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Profil
                                    </Link>
                                    <Link
                                        href="/mes-inscriptions"
                                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 sm:hidden"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Mes inscriptions
                                    </Link>
                                    <button
                                        type="button"
                                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            router.post(route('logout'));
                                        }}
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
        </div>
    );
}
