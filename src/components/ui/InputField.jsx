/**
 * Input con ícono de Material Symbols a la izquierda.
 * Props: icon, label, error, ...inputProps nativos
 */
const InputField = ({ icon, label, error, id, ...rest }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-[0.7rem] uppercase tracking-[0.05em] font-semibold text-[var(--color-on-surface-variant)] ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-outline)] text-[1.1rem] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={[
            'w-full py-3 bg-[var(--color-surface-container-low)] rounded-lg',
            'text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)]',
            'border border-transparent',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:bg-[var(--color-surface-bright)]',
            'transition-all duration-200',
            icon ? 'pl-11 pr-4' : 'px-4',
            error ? 'ring-2 ring-[var(--color-error)]/50' : '',
          ].join(' ')}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-[0.72rem] text-[var(--color-error)] ml-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
