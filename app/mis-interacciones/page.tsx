'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useInteractions } from '@/features/interaccion/hooks/useInteractions';

export default function MisInteraccionesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { interactions, isLoading: interactionsLoading, error } = useInteractions();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || (!user && !error)) {
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
          <p className="page-hero-eyebrow">Mi Cuenta · Valkia Coffee</p>
          <h1 className="page-hero-title">Mis Pedidos & Recomendaciones</h1>
          <p className="page-hero-subtitle">
            Hola, <strong>{user?.name}</strong>. Consulta el historial de café recomendado por nuestro sommelier y solicitudes de compra.
          </p>
        </div>
      </section>

      <div className="section">
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          {interactionsLoading && (
            <p style={{ textAlign: 'center', padding: '3rem' }}>Cargando tus solicitudes...</p>
          )}

          {error && (
            <div style={{ padding: '1rem', background: '#ffebee', color: '#c62828', borderRadius: '4px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {!interactionsLoading && !error && interactions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--crema)', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', marginBottom: '0.8rem' }}>
                Aún no tienes recomendaciones registradas
              </h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                Visita el Sommelier de Café para que clasifiquemos tu perfil de cata ideal.
              </p>
              <Link href="/descubre" className="btn btn-dark">
                Ir al Sommelier
              </Link>
            </div>
          )}

          {!interactionsLoading && !error && interactions.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              {interactions.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--blanco)',
                    border: '1px solid rgba(36,26,20,0.12)',
                    padding: '1.5rem',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                  }}
                >
                  {item.product?.image && (
                    <div style={{ width: '80px', height: '80px', background: 'var(--crema)', padding: '0.5rem', flexShrink: 0, borderRadius: '2px' }}>
                      <img
                        src={item.product.image.startsWith('/') ? item.product.image : `/${item.product.image}`}
                        alt={item.product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  )}

                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--oliva)', fontWeight: 600 }}>
                      {new Date(item.createdAt).toLocaleDateString('es-CO', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', margin: '0.2rem 0' }}>
                      {item.product?.name || 'Café Especial Valkia'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', margin: '0.2rem 0', opacity: 0.85 }}>
                      <strong>Perfil de Notas:</strong> {item.preference}
                    </p>
                    {item.notes && (
                      <p style={{ fontSize: '0.82rem', fontStyle: 'italic', background: 'var(--crema)', padding: '0.4rem 0.8rem', borderRadius: '2px', marginTop: '0.4rem' }}>
                        &ldquo;{item.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
