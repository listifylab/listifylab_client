
import { useState } from 'react';
import ListingPage from './pages/ListingPage';
import CreateListingPage from './pages/CreateListingPage';
import ImportPage from './pages/ImportPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage';
import HomePage from './pages/HomePage';
import CatalogingPage from './pages/CatalogingPage';
import SubscriptionBanner from './components/SubscriptionBanner';
import { useAuth } from './hooks/useAuth';
import { useSubscription } from './hooks/useSubscription';
import './App.css';

const NAV = [
  { id: 'listings',   label: 'Catalogue' },
  { id: 'create',     label: 'Add Style' },
  { id: 'import',     label: 'CSV Import' },
  { id: 'cataloging', label: 'Cataloging' },
  { id: 'admin',      label: 'Admin' },
];

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
      <span className="text-white text-xs font-black">C</span>
    </div>
    <div className="hidden sm:block">
      <div className="text-sm font-bold text-gray-900 leading-none">CMS</div>
      <div className="text-[10px] text-gray-400 leading-none mt-0.5">Catalog Management System</div>
    </div>
  </div>
);

function App() {
  const [page, setPage]             = useState('listings');
  const [refreshKey, setRefreshKey] = useState(0);
  const { user, loading, login, register, logout } = useAuth();
  const { sub } = useSubscription(user);
  const isSuperAdmin = user?.role === 'superadmin';

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center animate-pulse">
          <span className="text-white text-xs font-black">C</span>
        </div>
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-800 border-t-transparent"></div>
      </div>
    );
  }

  /* ── Unauthenticated ── */
  if (!user) {
    if (page === 'login')    return <LoginPage    onLogin={async (d) => { await login(d);    setPage('listings'); }} onSwitchToRegister={() => setPage('register')} />;
    if (page === 'register') return <RegisterPage onRegister={async (d) => { await register(d); setPage('listings'); }} onSwitchToLogin={() => setPage('login')} />;
    return <HomePage onGetStarted={() => setPage('register')} onSignIn={() => setPage('login')} />;
  }

  /* ── Super Admin ── */
  if (isSuperAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-[10px] font-black uppercase tracking-wider text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                Super Admin
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
              <button onClick={async () => { await logout(); setPage('home'); }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition border border-transparent hover:border-red-100">
                Sign out
              </button>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SuperAdminPage />
        </main>
      </div>
    );
  }

  /* ── Regular User ── */
  return (
    <div className="min-h-screen bg-gray-50">
      <SubscriptionBanner sub={sub} />

      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">

            {/* Logo */}
            <Logo />

            {/* Desktop nav tabs */}
            <div className="hidden sm:flex items-center gap-0.5 flex-1 justify-center max-w-sm">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => setPage(n.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    page === n.id
                      ? 'bg-slate-900 text-white'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            {/* Right: badges + logout */}
            <div className="flex items-center gap-2 shrink-0">
              {sub?.plan === 'trial' && sub.isActive && (
                <span className="hidden sm:inline-flex text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full">
                  Trial · {sub.daysLeft}d left
                </span>
              )}
              {sub?.isLifetime && (
                <span className="hidden sm:inline-flex text-[11px] font-bold bg-purple-50 text-purple-600 border border-purple-100 px-2.5 py-1 rounded-full">
                  ∞ Lifetime
                </span>
              )}
              <span className="hidden md:block text-xs text-gray-400 max-w-[140px] truncate">{user.email}</span>
              <button onClick={async () => { await logout(); setPage('home'); }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition border border-transparent hover:border-red-100">
                Sign out
              </button>
            </div>
          </div>

          {/* Mobile nav — scrollable row below main bar */}
          <div className="sm:hidden flex gap-1 pb-2 overflow-x-auto scrollbar-hide">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => setPage(n.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                  page === n.id ? 'bg-slate-900 text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {page === 'listings'   && <ListingPage refreshKey={refreshKey} />}
        {page === 'create'     && <CreateListingPage onSuccess={() => { setRefreshKey((k) => k + 1); setPage('listings'); }} />}
        {page === 'import'     && <ImportPage onSuccess={() => { setRefreshKey((k) => k + 1); setPage('listings'); }} />}
        {page === 'cataloging' && <CatalogingPage />}
        {page === 'admin'      && <AdminPage user={user} />}
      </main>
    </div>
  );
}

export default App;
