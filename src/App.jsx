import { Routes, Route } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

function Analytics() {
  return <h1 className="p-6 text-2xl font-bold">Analytics Page</h1>;
}

function Settings() {
  return <h1 className="p-6 text-2xl font-bold">Settings Page</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}