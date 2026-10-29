'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { productService } from '@/features/catalogo/services/product.service';
import { interactionService } from '@/features/interaccion/services/interaction.service';
import { Product } from '@/features/catalogo/domain/types';

export default function DescubrePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [preferencia, setPreferencia] = useState('Sorpréndanme');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const [nombreError, setNombreError] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNombre(user.name);
      setCorreo(user.email);
    }

    productService
      .getProducts({ category: 'cafes', limit: 8 })
      .then((res) => {
        setProducts(res.data);
        if (res.data.length > 0) {
          setSelectedProductId(res.data[0].id);
        }
      })
      .catch((e) => console.error('Error cargando cafés para sommelier:', e));
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (nombre.trim().length < 3) {
      setNombreError('El nombre debe tener al menos 3 caracteres');
      valid = false;
    } else {
      setNombreError('');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setCorreoError('Ingresa un correo electrónico válido');
      valid = false;
    } else {
      setCorreoError('');
    }

    if (!valid) return;

    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const prodId = selectedProductId || (products.length > 0 ? products[0].id : '');
      await interactionService.createInteraction({
        productId: prodId,
        preference: preferencia,
        notes: `Solicitud de recomendación para ${nombre} (${correo})`,
      });
      setIsSuccess(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al registrar recomendación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Sommelier Virtual · Recomendador Valkia Coffee</p>
          <h1 className="page-hero-title">Encuentra tu café de autor ideal.</h1>
          <p className="page-hero-subtitle">
            Responde un par de preguntas sobre tus gustos y el método que utilizas para darte nuestra recomendación personalizada.
          </p>
        </div>
      </section>

      <section className="section cta-final texture" id="contacto">
        <div className="container cta-wrap">
          <div className="cta-copy">
            <h2>Descubre tu perfil de cata</h2>
            <p>
              Nuestros expertos catadores clasificarán tus preferencias y te sugerirán el lote fresco que mejor combine con tus mañanas.
            </p>
            {!user && (
              <p style={{ marginTop: '1rem', color: '#B79A73', fontSize: '0.9rem' }}>
                * Nota: Para guardar la recomendación en tu cuenta y verla en &ldquo;Mis Pedidos&rdquo;, inicia sesión.
              </p>
            )}
          </div>

          <div>
            {isSuccess ? (
              <div className="form-success in-view" style={{ display: 'block' }}>
                <strong>¡Excelente, {nombre}!</strong>
                <p>
                  Tu sommelier Valkia Coffee ha guardado tus respuestas en la base de datos. Te hemos asignado tu recomendación y el cupón <strong>SOMMELIER10</strong> con un 10% de descuento.
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <Link href="/mis-interacciones" className="btn btn-dark">
                    VER EN MIS PEDIDOS
                  </Link>
                  <button onClick={() => setIsSuccess(false)} className="btn btn-outline" style={{ color: 'var(--cafe-oscuro)', borderColor: 'var(--cafe-oscuro)' }}>
                    Hacer otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form className="finder" id="finderForm" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="nombre">Nombre completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  {nombreError && <span className="field-error" style={{ display: 'block' }}>{nombreError}</span>}
                </div>

                <div className="field">
                  <label htmlFor="correo">Correo electrónico *</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder="tu@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  {correoError && <span className="field-error" style={{ display: 'block' }}>{correoError}</span>}
                </div>

                <div className="field">
                  <label>¿Qué perfil de notas disfrutas más?</label>
                  <div className="pref-options">
                    {[
                      { id: 'pref-dulce', val: 'Dulce (Chocolate y Caramelo)', label: 'Dulce & Chocolate' },
                      { id: 'pref-floral', val: 'Floral (Cítrico y Frutal)', label: 'Floral & Cítrico' },
                      { id: 'pref-intenso', val: 'Intenso (Especiado y Cacao)', label: 'Intenso & Especiado' },
                      { id: 'pref-nose', val: 'Sorpréndanme', label: 'Sorpréndanme' },
                    ].map((item) => (
                      <React.Fragment key={item.id}>
                        <input
                          type="radio"
                          id={item.id}
                          name="preferencia"
                          value={item.val}
                          checked={preferencia === item.val}
                          onChange={(e) => setPreferencia(e.target.value)}
                        />
                        <label htmlFor={item.id}>{item.label}</label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'GUARDANDO RECOMENDACIÓN...' : 'OBTENER MI RECOMENDACIÓN'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
