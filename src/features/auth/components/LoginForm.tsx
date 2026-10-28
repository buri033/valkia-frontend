'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { HttpError } from '../../common/http';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de correo no válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await login({ email, password });
    } catch (err) {
      if (err instanceof HttpError) {
        setErrors({ general: err.message });
      } else {
        setErrors({ general: 'Error al conectar con el servidor' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="finder" onSubmit={handleSubmit} noValidate>
      {errors.general && (
        <div style={{ padding: '0.8rem 1rem', background: '#ffebee', color: '#c62828', fontSize: '0.88rem', borderRadius: '2px' }}>
          {errors.general}
        </div>
      )}

      <div className="field">
        <label htmlFor="loginEmail">Correo Electrónico *</label>
        <input
          id="loginEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="loginPassword">Contraseña *</label>
        <input
          id="loginPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={loading}
      >
        {loading ? 'INGRESANDO...' : 'INGRESAR A MI CUENTA'}
      </button>

      <div style={{ textAlign: 'center', fontSize: '0.92rem', paddingTop: '1rem', borderTop: '1px solid rgba(36,26,20,0.1)' }}>
        ¿Aún no tienes cuenta?{' '}
        <Link href="/registro" className="link-quiet">
          Regístrate aquí
        </Link>
      </div>
    </form>
  );
};
