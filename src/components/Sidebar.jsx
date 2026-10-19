
import { NavLink } from 'react-router';
import {
    ChartNoAxesColumn,
    LayoutDashboard,
    Settings,
    UsersRound,
} from 'lucide-react';

const links = [
    { name: 'Dashboard', path: '/', Icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', Icon: ChartNoAxesColumn },
    { name: 'Users', path: '/users', Icon: UsersRound },
    { name: 'Settings', path: '/settings', Icon: Settings },
];

export default function Sidebar() {
    return (
        <nav className="flex flex-col gap-1.5 p-4">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
            </p>

            {links.map(({ name, path, Icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive
                            ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Icon
                                size={20}
                                strokeWidth={isActive ? 2.4 : 1.8}
                                className={
                                    isActive
                                        ? 'text-blue-600'
                                        : 'text-slate-400 transition group-hover:text-slate-700'
                                }
                            />
                            <span>{name}</span>
                            {isActive && (
                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
