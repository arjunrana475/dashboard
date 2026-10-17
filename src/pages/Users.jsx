import { useUser } from '../context/UserContext';

export default function Users() {
    const { users } = useUser();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                User Management
            </h1>

            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-t">
                                <td className="p-4 font-medium">
                                    {user.name}
                                </td>
                                <td className="p-4 text-gray-600">
                                    {user.email}
                                </td>
                                <td className="p-4">
                                    {user.role}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}