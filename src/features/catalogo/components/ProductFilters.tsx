'use client';

import React, { useState } from 'react';

interface ProductFiltersProps {
  currentCategory: string;
  currentSearch: string;
  currentMinPrice?: number;
  currentMaxPrice?: number;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  onPriceChange: (min?: number, max?: number) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  currentCategory,
  currentSearch,
  currentMinPrice,
  currentMaxPrice,
  onCategoryChange,
  onSearchChange,
  onPriceChange,
}) => {
  const [minInput, setMinInput] = useState(currentMinPrice ? currentMinPrice.toString() : '');
  const [maxInput, setMaxInput] = useState(currentMaxPrice ? currentMaxPrice.toString() : '');

  const categories = [
    { id: 'todos', label: 'Todos los Productos' },
    { id: 'cafes', label: 'Cafés de Autor' },
    { id: 'accesorios', label: 'Métodos & Accesorios' },
    { id: 'suscripciones', label: 'Suscripciones' },
  ];

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = minInput.trim() !== '' ? parseFloat(minInput) : undefined;
    const max = maxInput.trim() !== '' ? parseFloat(maxInput) : undefined;
    onPriceChange(min, max);
  };

  const handleClearPrice = () => {
    setMinInput('');
    setMaxInput('');
    onPriceChange(undefined, undefined);
  };

  return (
    <div className="mb-10 pb-6 border-b border-cafe-oscuro/10">
      {/* 1. Categorías de producto */}
      <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`filter-btn ${currentCategory === cat.id ? 'active' : ''}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '2px',
              border: '1px solid var(--cafe-oscuro)',
              background: currentCategory === cat.id ? 'var(--cafe-oscuro)' : 'transparent',
              color: currentCategory === cat.id ? 'var(--blanco)' : 'var(--cafe-oscuro)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 2. Filtros Combinados: Búsqueda por texto y Rango de Precio (Bonus +2 pts) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#F9F7F2] p-4 rounded border border-cafe-oscuro/15">
        {/* Buscador de texto */}
        <div className="md:col-span-6 relative">
          <label className="block text-xs font-semibold text-cafe-oscuro/70 mb-1">
            🔍 Buscar café o accesorio:
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nombre, notas (ej. Chocolate, Jazmín) o región..."
              value={currentSearch}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-cafe-oscuro/25 rounded text-cafe-oscuro placeholder-cafe-oscuro/40 focus:outline-none focus:border-oliva"
              style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.2rem', fontSize: '0.85rem' }}
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-cafe-oscuro/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ position: 'absolute', left: '0.6rem', top: '0.65rem', width: '1rem', height: '1rem', opacity: 0.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Rango de Precio */}
        <form onSubmit={handleApplyPrice} className="md:col-span-6 flex flex-wrap items-end gap-2">
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs font-semibold text-cafe-oscuro/70 mb-1">
              Precio Mín ($):
            </label>
            <input
              type="number"
              placeholder="Ej. 30000"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              className="w-full px-2 py-2 text-xs bg-white border border-cafe-oscuro/25 rounded text-cafe-oscuro"
              style={{ width: '100%', padding: '0.55rem 0.5rem', fontSize: '0.85rem' }}
            />
          </div>

          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs font-semibold text-cafe-oscuro/70 mb-1">
              Precio Máx ($):
            </label>
            <input
              type="number"
              placeholder="Ej. 80000"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              className="w-full px-2 py-2 text-xs bg-white border border-cafe-oscuro/25 rounded text-cafe-oscuro"
              style={{ width: '100%', padding: '0.55rem 0.5rem', fontSize: '0.85rem' }}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-dark"
              style={{
                padding: '0.55rem 1rem',
                fontSize: '0.8rem',
                background: 'var(--cafe-oscuro)',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '2px',
                border: 'none',
              }}
            >
              Filtrar
            </button>
            {(currentMinPrice !== undefined || currentMaxPrice !== undefined) && (
              <button
                type="button"
                onClick={handleClearPrice}
                className="btn btn-outline"
                style={{
                  padding: '0.55rem 0.75rem',
                  fontSize: '0.8rem',
                  border: '1px solid var(--cafe-oscuro)',
                  color: 'var(--cafe-oscuro)',
                  cursor: 'pointer',
                  borderRadius: '2px',
                }}
              >
                Limpiar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
