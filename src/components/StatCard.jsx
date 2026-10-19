
export default function StatCard({ title, value, Icon, color }) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        emerald: 'bg-emerald-50 text-emerald-600',
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{title}</p>

                <div className={`rounded-xl p-3 ${colors[color] ?? colors.blue}`}>
                    <Icon size={22} />
                </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
        </div>
    );
}
