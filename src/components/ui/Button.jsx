/**
 * Botón primario con gradiente y soporte para estado loading.
 * Props: loading, icon, children, ...buttonProps nativos
 */
const Button = ({ loading = false, icon, children, className = '', ...rest }) => {
  return (
    <button
      disabled={loading}
      className={[
        'w-full py-3.5 rounded-lg font-headline font-bold text-[var(--color-on-primary)]',
        'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-fixed)]',
        'shadow-sm hover:opacity-90 active:scale-[0.98]',
        'transition-all duration-200',
        'flex items-center justify-center gap-2',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
        className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {children}
          {icon && (
            <span className="material-symbols-outlined text-[1.1rem]">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
