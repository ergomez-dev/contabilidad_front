/**
 * Identidad visual de la app: ícono + nombre + subtítulo.
 * Props: subtitle (string, opcional)
 */
const AppLogo = ({ subtitle = 'Sign In' }) => {
  return (
    <header className="flex flex-col items-center mb-8">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-fixed))' }}>
        <span className="material-symbols-outlined text-2xl"
          style={{ color: 'var(--color-on-primary)', fontVariationSettings: "'FILL' 1" }}>
          account_balance_wallet
        </span>
      </div>
      <h1 className="font-headline font-extrabold text-xl tracking-tight"
        style={{ color: 'var(--color-on-surface)', fontFamily: 'var(--font-headline)' }}>
        The Ethereal Ledger
      </h1>
      {subtitle && (
        <p className="font-medium mt-1 text-sm"
          style={{ color: 'var(--color-on-surface-variant)' }}>
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default AppLogo;
