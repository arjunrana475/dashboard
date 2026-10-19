import { useState } from 'react';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    UsersRound,
    ShieldCheck,
    X,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import {
    createUser,
    updateUser,
    deleteUser,
} from '../services/userApi';

export default function Users() {
    const {
        users,
        dispatchUsers,
        loadingUsers,
        usersError,
    } = useUser();

    const [apiError, setApiError] = useState('');

    const [search, setSearch] = useState('');
    const [add, setAdd] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Developer',
    });

    const filteredUsers = users.filter(user =>
        [user.name, user.email, user.role]
            .some(value =>
                value.toLowerCase().includes(search.toLowerCase())
            )
    );

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function resetForm() {
        setFormData({ name: '', email: '', role: 'Developer' });
        setEditingId(null);
        setAdd(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setApiError('');

        const userData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            role: formData.role,
        };

        if (!userData.name || !userData.email) {
            setApiError('Name and email are required.');
            return;
        }

        try {
            if (editingId) {
                const savedUser = await updateUser(editingId, userData);

                dispatchUsers({
                    type: 'UPDATE_USER',
                    payload: {
                        ...savedUser,
                        id: savedUser._id,
                    },
                });
            } else {
                const savedUser = await createUser(userData);

                dispatchUsers({
                    type: 'ADD_USER',
                    payload: {
                        ...savedUser,
                        id: savedUser._id,
                    },
                });
            }

            resetForm();
        } catch (error) {
            setApiError(
                error.response?.data?.message || 'Failed to save user.'
            );
        }
    }
    function handleEdit(user) {
        setEditingId(user.id);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
        });
        setAdd(true);
    }

    async function handleDelete(id) {
        setApiError('');

        try {
            await deleteUser(id);

            dispatchUsers({
                type: 'DELETE_USER',
                payload: id,
            });
        } catch (error) {
            setApiError(
                error.response?.data?.message || 'Failed to delete user.'
            );
        }
    }

    function startAdd() {
        setFormData({ name: '', email: '', role: 'Developer' });
        setEditingId(null);
        setAdd(true);
    }

    function getInitials(name) {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part[0]?.toUpperCase() ?? '')
            .join('');
    }

    function roleStyle(role) {
        const styles = {
            Admin: 'bg-purple-50 text-purple-700 ring-purple-200',
            Designer: 'bg-pink-50 text-pink-700 ring-pink-200',
            Developer: 'bg-blue-50 text-blue-700 ring-blue-200',
        };

        return styles[role] ??
            'bg-gray-100 text-gray-700 ring-gray-200';
    }

    const adminCount = users.filter(
        user => user.role.toLowerCase() === 'admin'
    ).length;

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-7">

                {/* Page header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-medium text-blue-600">
                            WORKSPACE / USERS
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            User Management
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Manage your team members, roles, and access.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={startAdd}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                        <Plus size={18} />
                        Add User
                    </button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Total Users
                                </p>
                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {users.length}
                                </p>
                            </div>
                            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                <UsersRound size={23} />
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-slate-500">
                            All registered team members
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Administrators
                                </p>
                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {adminCount}
                                </p>
                            </div>
                            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                                <ShieldCheck size={23} />
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-slate-500">
                            Users with the Admin role
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Search Results
                                </p>
                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {filteredUsers.length}
                                </p>
                            </div>
                            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                <Search size={23} />
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-slate-500">
                            Users matching your search
                        </p>
                    </div>
                </div>

                {/* Add/Edit form */}
                {add && (
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                    >
                        <div className="mb-6 flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    {editingId !== null ? 'Edit User' : 'Add New User'}
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Enter the details for this team member.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={resetForm}
                                aria-label="Close form"
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="user-name"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Full name
                                </label>
                                <input
                                    id="user-name"
                                    name="name"
                                    type="text"
                                    placeholder="e.g. Arjun Sharma"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="user-email"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Email address
                                </label>
                                <input
                                    id="user-email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="user-role"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Role
                                </label>
                                <select
                                    id="user-role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                >
                                    <option value="Developer">Developer</option>
                                    <option value="Designer">Designer</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            >
                                {editingId !== null ? 'Save Changes' : 'Create User'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Users table */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                All Users
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                View and manage your team members.
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-sm">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                placeholder="Search name, email, or role..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                aria-label="Search users"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                            />
                        </div>
                    </div>
                    {loadingUsers && <p>Loading users...</p>}

                    {usersError && <p>{usersError}</p>}

                    {apiError && <p>{apiError}</p>}

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[680px] text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Team Member
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map(user => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-slate-50/80"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                                    {getInitials(user.name)}
                                                </div>
                                                <span className="font-semibold text-slate-800">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${roleStyle(user.role)}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(user)}
                                                    aria-label={`Edit ${user.name}`}
                                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                                >
                                                    <Pencil size={15} />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(user.id)}
                                                    aria-label={`Delete ${user.name}`}
                                                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center">
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                                <UsersRound size={24} />
                                            </div>
                                            <p className="mt-4 font-semibold text-slate-800">
                                                No users found
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Try a different search or add a new user.
                                            </p>
                                            {search && (
                                                <button
                                                    type="button"
                                                    onClick={() => setSearch('')}
                                                    className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                                                >
                                                    Clear search
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-slate-100 px-6 py-4">
                        <p className="text-sm text-slate-500">
                            Showing{' '}
                            <span className="font-semibold text-slate-700">
                                {filteredUsers.length}
                            </span>{' '}
                            of{' '}
                            <span className="font-semibold text-slate-700">
                                {users.length}
                            </span>{' '}
                            users
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
