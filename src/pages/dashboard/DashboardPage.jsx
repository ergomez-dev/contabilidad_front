import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-on-background)' }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-fixed))' }}>
        <span className="material-symbols-outlined text-2xl"
          style={{ color: 'var(--color-on-primary)', fontVariationSettings: "'FILL' 1" }}>
          account_balance_wallet
        </span>
      </div>
      <h1 style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: '1.5rem' }}>
        The Ethereal Ledger
      </h1>
      <p style={{ color: 'var(--color-on-surface-variant)' }}>
        Bienvenido, <strong>{user?.first_name || user?.email}</strong>
      </p>
      <button onClick={handleLogout}
        className="mt-4 px-6 py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
        style={{ backgroundColor: 'var(--color-error-container)', color: 'var(--color-on-error-container)' }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default DashboardPage;
