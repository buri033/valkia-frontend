'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { HttpError } from '../../common/http';

export const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'El nombre completo debe tener al menos 2 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de correo no válido';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await register({ name, email, password });
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.status === 409) {
          setErrors({ email: err.message });
        } else {
          setErrors({ general: err.message });
        }
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
        <label htmlFor="regName">Nombre Completo *</label>
        <input
          id="regName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre completo"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="regEmail">Correo Electrónico *</label>
        <input
          id="regEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="regPass">Contraseña (mínimo 6 caracteres) *</label>
        <input
          id="regPass"
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
        {loading ? 'REGISTRANDO...' : 'REGISTRARME EN VALKIA'}
      </button>

      <div style={{ textAlign: 'center', fontSize: '0.92rem', paddingTop: '1rem', borderTop: '1px solid rgba(36,26,20,0.1)' }}>
        ¿Ya tienes una cuenta registrada?{' '}
        <Link href="/login" className="link-quiet">
          Inicia sesión
        </Link>
      </div>
    </form>
  );
};
