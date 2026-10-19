
import { useState } from 'react';
import { Outlet } from 'react-router';
import { Menu, X } from 'lucide-react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 shrink-0 bg-white border-r min-h-screen">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {/* Mobile Menu Button */}
                    <div className="border-b border-slate-200 bg-white p-3 md:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open navigation menu"
                            aria-expanded={mobileMenuOpen}
                            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
                        >
                            <Menu size={22} />
                        </button>
                    </div>

                    <Outlet />
                </main>
            </div>

            {/* Mobile Sidebar Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={() => setMobileMenuOpen(false)}
                        className="absolute inset-0 bg-black/40"
                    />

                    {/* Drawer */}
                    <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 p-4">
                            <h2 className="font-bold text-slate-900">
                                Navigation
                            </h2>

                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Close navigation menu"
                                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div onClick={(event) => {
                            if (event.target.closest('a')) {
                                setMobileMenuOpen(false);
                            }
                        }}>
                            <Sidebar />
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
}
