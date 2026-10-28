'use client';

import React from 'react';

interface ProductFiltersProps {
  currentCategory: string;
  currentSearch: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  currentCategory,
  currentSearch,
  onCategoryChange,
  onSearchChange,
}) => {
  const categories = [
    { id: 'todos', label: 'Todos los Productos' },
    { id: 'cafes', label: 'Cafés de Autor' },
    { id: 'accesorios', label: 'Métodos & Accesorios' },
    { id: 'suscripciones', label: 'Suscripciones' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-cafe-oscuro/10">
      {/* Botones de categoría */}
      <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all duration-200 ${
              currentCategory === cat.id
                ? 'bg-cafe-oscuro text-blanco shadow-sm'
                : 'bg-crema/60 text-cafe-oscuro hover:bg-crema'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Buscador de texto (Bonus +2 pts) */}
      <div className="w-full md:w-72">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por origen, nota o nombre..."
            value={currentSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-cafe-oscuro/20 rounded-xs text-cafe-oscuro placeholder-cafe-oscuro/40 focus:outline-none focus:border-oliva"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-cafe-oscuro/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
