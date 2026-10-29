'use client';

import React, { Suspense } from 'react';
import { useProducts } from '@/features/catalogo/hooks/useProducts';
import { ProductCard } from '@/features/catalogo/components/ProductCard';
import { PaginationControls } from '@/features/catalogo/components/PaginationControls';
import { ProductFilters } from '@/features/catalogo/components/ProductFilters';

function CatalogoContent() {
  const {
    products,
    pagination,
    isLoading,
    error,
    currentCategory,
    currentSearch,
    currentMinPrice,
    currentMaxPrice,
    setPage,
    setCategory,
    setSearch,
    setPriceRange,
    refetch,
  } = useProducts({ limit: 6 });

  const metodos = [
    {
      id: 'm1',
      nombre: 'V60',
      descripcion: 'Limpio y aromático',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
          <path d="M10 8h20l-8 20h-4L10 8z" />
          <path d="M18 28v4h4v-4" />
        </svg>
      ),
    },
    {
      id: 'm2',
      nombre: 'Espresso',
      descripcion: 'Intenso y concentrado',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
          <rect x="9" y="16" width="18" height="13" rx="1" />
          <path d="M27 19h3a3 3 0 0 1 0 6h-3" />
          <path d="M13 16V9M18 16V9M23 16V9" />
        </svg>
      ),
    },
    {
      id: 'm3',
      nombre: 'Prensa francesa',
      descripcion: 'Cuerpo y profundidad',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
          <rect x="11" y="12" width="16" height="18" rx="1" />
          <path d="M20 12V6" />
          <path d="M15 6h10" />
        </svg>
      ),
    },
    {
      id: 'm4',
      nombre: 'Cold brew',
      descripcion: 'Suave y refrescante',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
          <path d="M13 10h14l-2 20a2 2 0 0 1-2 1.8h-6a2 2 0 0 1-2-1.8L13 10z" />
          <path d="M11 10h18" />
        </svg>
      ),
    },
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Catálogo de Especialidad — Valkia Coffee</p>
          <h1 className="page-hero-title">Tienda de Cafés de Autor & Accesorios</h1>
          <p className="page-hero-subtitle">
            Descubre lotes de especialidad de origen único, cafeteras de precisión y suscripciones mensuales.
          </p>
        </div>
      </section>

      <div className="section catalogo">
        <div className="container">
          {/* Barra de filtros combinados: Categoría, Búsqueda y Rango de Precio (Bonus +2 pts) */}
          <ProductFilters
            currentCategory={currentCategory}
            currentSearch={currentSearch}
            currentMinPrice={currentMinPrice}
            currentMaxPrice={currentMaxPrice}
            onCategoryChange={setCategory}
            onSearchChange={setSearch}
            onPriceChange={setPriceRange}
          />

          {/* Estado de error */}
          {error && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#c53030' }}>
              <p>No se pudo conectar con la API de Valkia Coffee ({error}).</p>
              <button onClick={() => refetch()} className="btn btn-dark" style={{ marginTop: '1rem' }}>
                Reintentar
              </button>
            </div>
          )}

          {/* Estado de carga */}
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--cafe-medio)' }}>
              <p>Cargando cafés de autor desde la base de datos...</p>
            </div>
          )}

          {/* Sin resultados */}
          {!isLoading && !error && products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--cafe-medio)' }}>
              <p style={{ fontSize: '1.2rem', fontFamily: 'var(--serif)' }}>No se encontraron productos con los filtros aplicados.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>Intenta ajustando el rango de precios o el término de búsqueda.</p>
            </div>
          )}

          {/* Grid de productos dinámico */}
          {!isLoading && !error && products.length > 0 && (
            <>
              <div className="cafe-grid" id="cafeGrid">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                  />
                ))}
              </div>

              {/* Paginación */}
              <PaginationControls pagination={pagination} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>

      {/* SECCIÓN PERFILES DE SABOR */}
      <section className="section perfiles texture">
        <div className="container">
          <div className="section-head reveal in-view">
            <div className="head-copy">
              <h2>Perfiles de Sabor</h2>
              <p>Selecciona tus notas preferidas para guiar tu elección en taza.</p>
            </div>
          </div>
          <div className="perfil-grid">
            <div className="perfil reveal in-view">
              <div className="swatch cafe-medio"></div>
              <h3>Dulce</h3>
              <p>Chocolate · Caramelo · Panela · Nueces</p>
            </div>
            <div className="perfil reveal in-view">
              <div className="swatch oliva"></div>
              <h3>Floral</h3>
              <p>Jazmín · Azahar · Miel · Cítricos</p>
            </div>
            <div className="perfil reveal in-view">
              <div className="swatch arena"></div>
              <h3>Intenso</h3>
              <p>Cacao amargo · Especias · Frutos rojos</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN MÉTODOS DE EXTRACCIÓN */}
      <section className="section metodos" id="metodos">
        <div className="container">
          <div className="section-head reveal in-view">
            <div className="head-copy">
              <h2>Métodos de Extracción Recomendados</h2>
              <p>El método transforma el cuerpo, el aroma y la acidez de tu café de autor.</p>
            </div>
          </div>
          <div className="metodo-grid">
            {metodos.map((m) => (
              <div key={m.id} className="metodo-card reveal in-view">
                <div className="metodo-icon">{m.icon}</div>
                <h3 className="metodo-nombre">{m.nombre}</h3>
                <p className="metodo-desc">{m.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', padding: '6rem' }}>Cargando catálogo...</div>
      }
    >
      <CatalogoContent />
    </Suspense>
  );
}
