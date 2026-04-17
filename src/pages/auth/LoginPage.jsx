import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '@/components/layouts/AuthLayout';
import AppLogo from '@/components/common/AppLogo';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import useLoginForm from '@/hooks/useLoginForm';
import { useAuth } from '@/context/AuthContext';

// Tenant por defecto — en producción podría venir de subdominio o config
const DEFAULT_TENANT = import.meta.env.VITE_DEFAULT_TENANT || 'acme-corp';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { values, errors, showPassword, handleChange, togglePassword, validate } = useLoginForm();
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError('');
    try {
      await login(values.email, values.password, DEFAULT_TENANT);
      navigate('/dashboard');
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <AuthLayout>
      {/* Card */}
      <main className="relative rounded-xl overflow-hidden p-8 md:p-10"
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          boxShadow: '0 20px 40px rgba(16,55,69,0.07)',
        }}>

        {/* Accent blob */}
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full -mr-16 -mt-16 blur-[64px] pointer-events-none"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-tertiary-container) 30%, transparent)' }} />

        <div className="relative z-10">
          <AppLogo subtitle="Sign In" />

          {/* Error global */}
          {submitError && <div className="mb-5"><Alert type="error" message={submitError} /></div>}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            <InputField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              icon="mail"
              placeholder="name@company.com"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              error={errors.email}
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password"
                  className="text-[0.7rem] uppercase tracking-[0.05em] font-semibold"
                  style={{ color: 'var(--color-on-surface-variant)' }}>
                  Password
                </label>
                <a href="#"
                  className="text-[0.72rem] font-semibold transition-colors"
                  style={{ color: 'var(--color-primary)' }}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[1.1rem] pointer-events-none"
                  style={{ color: 'var(--color-outline)' }}>
                  lock
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className={[
                    'w-full pl-11 pr-12 py-3 rounded-lg',
                    'border border-transparent',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:bg-[var(--color-surface-bright)]',
                    'transition-all duration-200',
                    errors.password ? 'ring-2 ring-[var(--color-error)]/50' : '',
                  ].join(' ')}
                  style={{
                    backgroundColor: 'var(--color-surface-container-low)',
                    color: 'var(--color-on-surface)',
                  }}
                />
                <button type="button" onClick={togglePassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-outline)' }}>
                  <span className="material-symbols-outlined text-[1.1rem]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="text-[0.72rem] ml-1" style={{ color: 'var(--color-error)' }}>
                  {errors.password}
                </p>
              )}
            </div>

            <Button type="submit" loading={loading} icon="arrow_forward">
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-7 flex items-center">
            <div className="flex-grow h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--color-outline-variant) 40%, transparent)' }} />
            <span className="px-4 text-[0.65rem] uppercase tracking-widest font-medium"
              style={{ color: 'var(--color-on-surface-variant)' }}>
              Or continue with
            </span>
            <div className="flex-grow h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--color-outline-variant) 40%, transparent)' }} />
          </div>

          {/* Google button */}
          <button type="button"
            className="flex items-center justify-center gap-3 w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 border"
            style={{
              backgroundColor: 'var(--color-surface-container-low)',
              color: 'var(--color-on-secondary-container)',
              borderColor: 'transparent',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-container)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
          >
            {/* Google SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
        </div>
      </main>
    </AuthLayout>
  );
};

export default LoginPage;
