import { Bell } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Navbar() {
    const { user, dispatch } = useUser();

    return (
        <nav className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-xl font-bold">DevBoard</div>

            <div className="flex items-center gap-3">
                <Bell size={20} />

                <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                </div>

                <button
                    onClick={() => dispatch({ type: 'CHANGE_NAME', payload: 'Senior Developer' })}
                    className="rounded bg-blue-600 px-3 py-2 text-white"
                >
                    Change Name
                </button>

                <button
                    onClick={() => dispatch({ type: 'CHANGE_ROLE',payload: 'Senior Developer' })}
                    className="rounded bg-purple-600 px-3 py-2 text-white"
                >
                    Change Role
                </button>

                <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="rounded bg-gray-600 px-3 py-2 text-white"
                >
                    Reset
                </button>
            </div>
        </nav>
    );
}