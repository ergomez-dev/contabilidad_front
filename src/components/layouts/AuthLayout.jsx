/**
 * Layout compartido para todas las páginas de autenticación (Login, Register, etc.)
 * Incluye el fondo degradado y los elementos decorativos.
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="bg-login-gradient min-h-screen flex flex-col items-center justify-center p-4"
      style={{ fontFamily: 'var(--font-body)' }}>

      {/* Blob decorativo top-left */}
      <div className="fixed top-0 left-0 -mt-20 -ml-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-tertiary) 5%, transparent)' }} />

      {/* Blob decorativo bottom-right */}
      <div className="fixed bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)' }} />

      <div className="w-full max-w-md relative z-10">
        {children}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-2xl mt-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-3 px-4"
        style={{ color: 'var(--color-on-surface-variant)', opacity: 0.6, fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        <p>© {new Date().getFullYear()} The Ethereal Ledger. All rights reserved.</p>
        <nav className="flex gap-5">
          {['Security', 'Privacy Policy', 'Terms of Service'].map((link) => (
            <a key={link} href="#"
              className="underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--color-on-surface-variant)' }}>
              {link}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default AuthLayout;
