import { useUser } from '../context/UserContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function UsersBarChart() {
    const { users } = useUser();

    const data = ['Developer', 'Designer', 'Admin'].map(role => ({
        role,
        count: users.filter(user => user.role === role).length,
    }));
    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-1 text-lg font-bold text-slate-900">
                Users by Role
            </h2>
            <p className="mb-6 text-sm text-slate-500">
                Distribution of team members
            </p>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="role" tickLine={false} axisLine={false} />
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3977E8" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
