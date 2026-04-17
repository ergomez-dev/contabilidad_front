import { useState } from 'react';

/**
 * Hook de validación y estado para el formulario de login.
 */
const useLoginForm = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.email.trim()) {
      newErrors.email = 'El email es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Ingresa un email válido.';
    }
    if (!values.password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (values.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    showPassword,
    handleChange,
    togglePassword: () => setShowPassword((v) => !v),
    validate,
  };
};

export default useLoginForm;
