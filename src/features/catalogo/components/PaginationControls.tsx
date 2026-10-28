'use client';

import React from 'react';
import { Pagination } from '../domain/types';

interface PaginationControlsProps {
  pagination?: Pagination;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination,
  onPageChange,
}) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, total } = pagination;

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-cafe-oscuro/10"
      aria-label="Paginación del catálogo"
    >
      <span className="text-xs text-cafe-oscuro/70 font-sans">
        Mostrando página <strong className="text-cafe-oscuro">{page}</strong> de{' '}
        <strong className="text-cafe-oscuro">{totalPages}</strong> ({total} productos en total)
      </span>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-cafe-oscuro/20 rounded-xs text-cafe-oscuro disabled:opacity-30 disabled:cursor-not-allowed hover:bg-crema transition-colors"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-xs transition-colors ${
              num === page
                ? 'bg-cafe-oscuro text-blanco'
                : 'border border-cafe-oscuro/20 text-cafe-oscuro hover:bg-crema'
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-cafe-oscuro/20 rounded-xs text-cafe-oscuro disabled:opacity-30 disabled:cursor-not-allowed hover:bg-crema transition-colors"
        >
          Siguiente
        </button>
      </div>
    </nav>
  );
};
