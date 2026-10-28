'use client';

import React from 'react';
import { Product } from '../domain/types';
import { useCart } from '@/features/common/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const renderIntensity = (intensidad: number) => {
    if (intensidad === 0) return null;
    return (
      <div className="intensity">
        <span className="label">Intensidad</span>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`dot ${i <= intensidad ? 'filled' : ''}`}></span>
        ))}
      </div>
    );
  };

  return (
    <article className="cafe-card in-view">
      {product.badge && <span className="tag-badge">{product.badge}</span>}
      <div className="cafe-photo" style={{ background: `${product.accent || '#6B4A35'}18` }}>
        <img
          src={product.image.startsWith('/') ? product.image : `/${product.image}`}
          alt={`${product.name} - Valkia Coffee`}
          loading="lazy"
        />
      </div>
      <p className="cafe-origin">{product.origin}</p>
      <h3 className="cafe-name">{product.name}</h3>
      <p className="cafe-notes">
        {Array.isArray(product.notes) ? product.notes.join(' · ') : product.notes}
      </p>
      <div className="cafe-meta">
        {renderIntensity(product.intensity)}
        <span className="cafe-price">{product.priceFmt || `$${product.price.toLocaleString('es-CO')}`}</span>
      </div>
      <button
        className="btn-add-cart"
        onClick={() => addToCart(product)}
        type="button"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        AÑADIR AL CARRITO
      </button>
    </article>
  );
};
