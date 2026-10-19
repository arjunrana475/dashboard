import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { useUser } from '../context/UserContext';

const COLORS = ['#3977E8', '#D946EF', '#10B981'];

export default function UsersDonutChart() {
    const { users } = useUser();

    const data = ['Developer', 'Designer', 'Admin'].map(role => ({
        name: role,
        value: users.filter(user => user.role === role).length,
    }));

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
                Team Distribution
            </h2>
            <p className="mt-1 text-sm text-slate-500">
                Share of users by role
            </p>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={4}
                        >
                            {data.map((entry, index) => (
                                <Cell key={entry.name} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
