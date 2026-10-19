
import { useState } from 'react';
import { Bell, ChevronDown, Settings, UserRound } from 'lucide-react';
import { Link } from 'react-router';
import { useUser } from '../context/UserContext';

export default function Navbar() {
    const { user } = useUser();
    const [profileOpen, setProfileOpen] = useState(false);

    const initials = user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase() ?? '')
        .join('');

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4 sm:px-6">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-sm">
                        D
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        DevBoard
                    </span>
                </Link>

                <div className="flex items-center gap-3 sm:gap-5">
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <Bell size={20} />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </button>

                    <div className="relative border-l border-slate-200 pl-3 sm:pl-5">
                        <button
                            type="button"
                            onClick={() => setProfileOpen(prev => !prev)}
                            aria-expanded={profileOpen}
                            aria-label="Toggle profile menu"
                            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50 sm:gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                {initials}
                            </div>

                            <div className="hidden text-left sm:block">
                                <p className="text-sm font-semibold text-slate-800">
                                    {user.name}
                                </p>
                                <p className="text-xs text-slate-500">{user.role}</p>
                            </div>

                            <ChevronDown
                                size={16}
                                className={`hidden text-slate-400 transition sm:block ${profileOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                                <div className="border-b border-slate-100 px-3 py-3">
                                    <p className="truncate text-sm font-semibold text-slate-900">
                                        {user.name}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">{user.role}</p>
                                </div>

                                <Link
                                    to="/settings"
                                    onClick={() => setProfileOpen(false)}
                                    className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100"
                                >
                                    <Settings size={17} />
                                    Settings
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => setProfileOpen(false)}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100"
                                >
                                    <UserRound size={17} />
                                    Close profile menu
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
