
export default function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow">
                    <span className="text-gray-500">Total Users</span>
                    <p className="text-2xl font-bold">1,240</p>
                    <p className="text-sm text-green-600">+12% this month</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <span className="text-gray-500">Revenue</span>
                    <p className="text-2xl font-bold">$8,450</p>
                    <p className="text-sm text-green-600">+8% this month</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <span className="text-gray-500">Orders</span>
                    <p className="text-2xl font-bold">326</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <span className="text-gray-500">Pending</span>
                    <p className="text-2xl font-bold">18</p>
                </div>
            </div>
        </div>
    );
}
