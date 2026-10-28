'use client';

import React from 'react';
import { useCart } from '../hooks/useCart';

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, closeCart, updateQty, removeFromCart, subtotal } = useCart();

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        id="cartOverlay"
        onClick={closeCart}
      />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`} id="cartDrawer">
        <div className="cart-header">
          <h3>Tu Carrito Valkia</h3>
          <button className="cart-close" id="cartClose" onClick={closeCart} aria-label="Cerrar carrito">
            &times;
          </button>
        </div>

        <div className="cart-body" id="cartBody">
          {cart.length === 0 ? (
            <p className="cart-empty">
              Tu carrito de Valkia Coffee está vacío.
              <br />
              Agrega cafés de autor o accesorios para comenzar.
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">{item.priceFmt}</div>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label="Disminuir cantidad"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, 1)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span>Subtotal</span>
            <span id="cartSubtotal">${subtotal.toLocaleString('es-CO')}</span>
          </div>
          <button
            className="btn btn-dark cart-checkout-btn"
            disabled={cart.length === 0}
            onClick={() => {
              alert('¡Gracias por comprar en Valkia Coffee! Redirigiendo a pasarela de pago segura...');
            }}
          >
            FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </>
  );
};
