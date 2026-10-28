'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem' }}>
        Verificando sesión...
      </div>
    );
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Acceso Seguro · Valkia Coffee</p>
          <h1 className="page-hero-title">Iniciar Sesión</h1>
          <p className="page-hero-subtitle">
            Accede a tu cuenta para gestionar tus recomendaciones, pedidos y panel de café de especialidad.
          </p>
        </div>
      </section>

      <div className="section" style={{ padding: '3.5rem 1.5rem 6rem' }}>
        <div className="container" style={{ maxWidth: '480px', margin: '0 auto' }}>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
