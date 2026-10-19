import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UsersDonutChart from './components/UsersDonutChart';
import UsersBarChart from './components/UsersBarChart';
import {
  Settings as SettingsIcon,
  Bell,
  Palette,
  ShieldCheck,
} from 'lucide-react';


function Analytics() {
  return (
    <div className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analytics
          </h1>
          <p className="mt-2 text-slate-500">
            Explore your team's distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <UsersBarChart />
          <UsersDonutChart />
        </div>
      </div>
    </div>
  );
}


function Settings() {
  const [notifications, setNotifications] = useState(
    () => localStorage.getItem('devboard-notifications') !== 'false'
  );

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('devboard-dark-mode') === 'true'
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  function handleSave() {
    localStorage.setItem(
      'devboard-notifications',
      String(notifications)
    );

    localStorage.setItem(
      'devboard-dark-mode',
      String(darkMode)
    );

    setSaved(true);
  }

  return (
    <div className={`min-h-screen p-5 sm:p-8 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}>
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-sm font-medium text-blue-500">
            WORKSPACE / PREFERENCES
          </p>
          <h1 className="mt-2 text-3xl font-bold">Settings</h1>
          <p className={darkMode ? 'mt-2 text-slate-400' : 'mt-2 text-slate-500'}>
            Manage your application preferences.
          </p>
        </div>

        <section className={`rounded-2xl border p-6 shadow-sm ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
          }`}>
          <h2 className="font-bold">General Preferences</h2>
          <p className={darkMode ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>
            Customize your experience.
          </p>

          <div className={`mt-4 divide-y ${darkMode ? 'divide-slate-700' : 'divide-slate-100'
            }`}>
            <label className="flex cursor-pointer items-center justify-between gap-4 py-5">
              <div>
                <p className="font-medium">Notifications</p>
                <p className={darkMode ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>
                  Enable notification preferences.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={e => {
                  setNotifications(e.target.checked);
                  setSaved(false);
                }}
                className="h-5 w-5 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-4 py-5">
              <div>
                <p className="font-medium">Dark mode</p>
                <p className={darkMode ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>
                  Preview and save your preferred appearance.
                </p>
              </div>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={e => {
                  setDarkMode(e.target.checked);
                  setSaved(false);
                }}
                className="h-5 w-5 accent-blue-600"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save Preferences
          </button>

          {saved && (
            <p role="status" className="mt-3 text-sm font-medium text-emerald-500">
              Preferences saved successfully.
            </p>
          )}
        </section>

        <section className={`rounded-2xl border p-6 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
          }`}>
          <h2 className="font-bold">Security</h2>
          <p className={darkMode ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>
            Authentication and account security will be configured when we connect the backend.
          </p>
        </section>
      </div>
    </div>
  );
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