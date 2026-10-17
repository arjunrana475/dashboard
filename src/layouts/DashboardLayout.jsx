import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="flex">
                <aside className="hidden md:block w-64 shrink-0 bg-white border-r min-h-screen">
                    <Sidebar />
                </aside>

                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}