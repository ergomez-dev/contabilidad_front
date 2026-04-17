/**
 * Alerta de error o éxito con ícono.
 * Props: type ('error'|'success'), message
 */
const Alert = ({ type = 'error', message }) => {
  if (!message) return null;

  const styles = {
    error: {
      wrapper: 'bg-[var(--color-error-container)]/20 border border-[var(--color-error)]/30 text-[var(--color-error-dim)]',
      icon: 'error',
    },
    success: {
      wrapper: 'bg-[var(--color-tertiary-container)]/40 border border-[var(--color-tertiary)]/30 text-[var(--color-on-tertiary-container)]',
      icon: 'check_circle',
    },
  };

  const s = styles[type];

  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm ${s.wrapper}`}>
      <span className="material-symbols-outlined text-base shrink-0"
        style={{ fontVariationSettings: "'FILL' 1" }}>
        {s.icon}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
