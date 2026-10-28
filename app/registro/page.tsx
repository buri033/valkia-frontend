'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegistroPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
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
          <p className="page-hero-eyebrow">Comunidad Valkia · Specialty Coffee</p>
          <h1 className="page-hero-title">Crear Cuenta</h1>
          <p className="page-hero-subtitle">
            Regístrate para recibir recomendaciones del sommelier, guardar tus pedidos y descubrir lotes únicos.
          </p>
        </div>
      </section>

      <div className="section" style={{ padding: '3.5rem 1.5rem 6rem' }}>
        <div className="container" style={{ maxWidth: '480px', margin: '0 auto' }}>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
