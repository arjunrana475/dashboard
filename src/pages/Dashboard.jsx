import StatCard from '../components/StatCard';
import {
    UsersRound,
    ShieldCheck,
    UserCheck,
    ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';
import { useUser } from '../context/UserContext';

export default function Dashboard() {
    const { users } = useUser();

    const stats = [
        {
            title: 'Total Users',
            value: users.length,
            Icon: UsersRound,
            color: 'blue',
        },
        {
            title: 'Administrators',
            value: users.filter(user => user.role === 'Admin').length,
            Icon: ShieldCheck,
            color: 'purple',
        },
        {
            title: 'Developers',
            value: users.filter(user => user.role === 'Developer').length,
            Icon: UserCheck,
            color: 'emerald',
        },
    ];

    const recentUsers = [...users].slice(-5).reverse();

    return (
        <div className="min-h-screen bg-slate-50 p-5 sm:p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <header>
                    <p className="text-sm font-medium text-blue-600">
                        WORKSPACE / OVERVIEW
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Welcome back! Here's what's happening with your team.
                    </p>
                </header>

                {/* Statistics */}
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {stats.map(stat => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </section>

                {/* Recent Users */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5">
                        <div>
                            <h2 className="font-bold text-slate-900">
                                Team Members
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {users.length} team member{users.length !== 1 ? 's' : ''} in your workspace
                            </p>
                        </div>

                        <Link
                            to="/users"
                            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>

                    {recentUsers.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {recentUsers.map(user => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between gap-3 p-5 transition hover:bg-slate-50"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                            {user.name.trim().charAt(0).toUpperCase()}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-slate-800">
                                                {user.name}
                                            </p>
                                            <p className="truncate text-sm text-slate-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                        {user.role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 text-center">
                            <UsersRound className="mx-auto mb-3 text-slate-400" size={32} />
                            <h3 className="font-semibold text-slate-800">
                                No team members yet
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Add your first team member to see them here.
                            </p>
                            <Link
                                to="/users"
                                className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Add a user
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
