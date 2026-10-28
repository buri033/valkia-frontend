'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { productService } from '@/features/catalogo/services/product.service';
import { Product } from '@/features/catalogo/domain/types';

export default function AdminPage() {
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);

  // Formulario
  const [formData, setFormData] = useState({
    name: '',
    category: 'cafes',
    origin: '',
    process: 'Lavado',
    price: 38000,
    accent: '#6B4A35',
    image: '/assets/images/products/bolsa-caturra.png',
    badge: 'Edición Especial',
    description: '',
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isAdmin, authLoading, router]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productService.getProducts({ limit: 50 });
      setProducts(res.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin, loadProducts]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'cafes',
      origin: 'Huila, Colombia · 1.800 msnm',
      process: 'Lavado',
      price: 40000,
      accent: '#6B4A35',
      image: '/assets/images/products/bolsa-caturra.png',
      badge: 'Lote de Autor',
      description: 'Café de especialidad colombiano con notas a caramelo y chocolate.',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      origin: p.origin,
      process: p.process,
      price: p.price,
      accent: p.accent,
      image: p.image,
      badge: p.badge,
      description: p.description,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, {
          ...formData,
          price: Number(formData.price),
        });
      } else {
        await productService.createProduct({
          ...formData,
          price: Number(formData.price),
          notes: ['Frutas', 'Chocolate'],
        });
      }
      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al guardar producto');
    }
  };

  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      await productService.deleteProduct(deleteCandidate.id);
      setDeleteCandidate(null);
      loadProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem' }}>
        Verificando credenciales de administrador...
      </div>
    );
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Panel de Administración · Valkia Coffee</p>
          <h1 className="page-hero-title">Gestión del Catálogo</h1>
          <p className="page-hero-subtitle">
            Crea, actualiza o elimina lotes y productos del catálogo general.
          </p>
        </div>
      </section>

      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem' }}>Inventario de Productos</h2>
            <button onClick={handleOpenCreate} className="btn btn-dark">
              + AÑADIR PRODUCTO
            </button>
          </div>

          {loading && <p style={{ textAlign: 'center', padding: '3rem' }}>Cargando catálogo...</p>}
          {error && <p style={{ color: '#c53030', textAlign: 'center' }}>{error}</p>}

          {!loading && (
            <div style={{ overflowX: 'auto', background: 'var(--blanco)', border: '1px solid rgba(36,26,20,0.12)', borderRadius: '4px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--crema)', borderBottom: '1px solid rgba(36,26,20,0.1)' }}>
                    <th style={{ padding: '1rem' }}>Producto</th>
                    <th style={{ padding: '1rem' }}>Categoría</th>
                    <th style={{ padding: '1rem' }}>Origen</th>
                    <th style={{ padding: '1rem' }}>Precio</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(36,26,20,0.06)' }}>
                      <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{ width: '44px', height: '44px', background: 'var(--crema)', padding: '0.2rem', borderRadius: '2px' }}>
                          <img
                            src={p.image.startsWith('/') ? p.image : `/${p.image}`}
                            alt={p.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        <div>
                          <strong>{p.name}</strong>
                          <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7 }}>{p.badge}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.78rem', fontWeight: 600, color: 'var(--oliva)' }}>
                        {p.category}
                      </td>
                      <td style={{ padding: '1rem', opacity: 0.85 }}>{p.origin}</td>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>
                        {p.priceFmt || `$${p.price.toLocaleString('es-CO')}`}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="link-quiet"
                          style={{ marginRight: '1rem', cursor: 'pointer' }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(p)}
                          className="link-quiet"
                          style={{ color: '#c53030', cursor: 'pointer' }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL CREAR / EDITAR */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="finder" style={{ maxWidth: '540px', width: '100%', maxHeight: '90vh', overflowY: 'auto', background: 'var(--blanco)' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
              {editingProduct ? 'Editar Producto' : 'Nuevo Café / Producto'}
            </h3>

            <form onSubmit={handleSave}>
              <div className="field">
                <label>Nombre del Producto *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="field">
                  <label>Categoría *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.85rem', background: 'var(--blanco)', border: '1px solid rgba(36,26,20,0.2)' }}
                  >
                    <option value="cafes">Cafés</option>
                    <option value="accesorios">Accesorios</option>
                    <option value="suscripciones">Suscripciones</option>
                  </select>
                </div>

                <div className="field">
                  <label>Precio ($ COP) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label>Origen / Altura *</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  required
                />
              </div>

              <div className="field">
                <label>Descripción *</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', background: 'var(--blanco)', border: '1px solid rgba(36,26,20,0.2)' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline" style={{ color: 'var(--cafe-oscuro)', borderColor: 'var(--cafe-oscuro)' }}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-dark">
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN ANTES DE ELIMINAR (BONUS +1) */}
      {deleteCandidate && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'var(--blanco)', maxWidth: '420px', width: '100%', padding: '2rem', textAlign: 'center', borderRadius: '4px', border: '1px solid rgba(197,48,48,0.3)' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: '#c53030', marginBottom: '0.8rem' }}>
              ¿Eliminar Producto?
            </h3>
            <p style={{ fontSize: '0.92rem', marginBottom: '1.5rem', opacity: 0.85 }}>
              Estás a punto de borrar permanentemente &ldquo;<strong>{deleteCandidate.name}</strong>&rdquo;. Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => setDeleteCandidate(null)} className="btn btn-outline" style={{ color: 'var(--cafe-oscuro)', borderColor: 'var(--cafe-oscuro)' }}>
                Cancelar
              </button>
              <button onClick={confirmDelete} className="btn" style={{ background: '#c53030', color: '#fff' }}>
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
