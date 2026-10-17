import { NavLink } from 'react-router';
import {
    ChartNoAxesColumn,
    LayoutDashboard,
    Settings, User
} from 'lucide-react';

const links = [
    { name: 'Dashboard', path: '/', Icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', Icon: ChartNoAxesColumn },
    { name: 'Settings', path: '/settings', Icon: Settings },
    { name: 'Users', path: '/users', Icon: User }
];

export default function Sidebar() {
    return (
        <nav className="flex flex-col gap-2 p-4">
            {links.map(({ name, path, Icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                        `flex items-center gap-4 rounded p-3 ${isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`
                    }
                >
                    <Icon size={24} />
                    <span>{name}</span>
                </NavLink>
            ))}
        </nav>
    );
}