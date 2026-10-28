'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../auth/hooks/useAuth';
import { useCart } from '../hooks/useCart';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();
  const { openCart, totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('valkia_theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('valkia_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('valkia_theme', 'light');
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header id="siteHeader">
        <Link href="/" className="logo">
          <svg
            viewBox="0 0 48 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 20 L16 6 L23 15 L30 4 L44 20" />
            <path d="M2 24 Q24 19 46 24" opacity="0.55" />
            <path d="M2 28.5 Q24 25 46 28.5" opacity="0.3" />
          </svg>
          VALKIA COFFEE
        </Link>

        <nav className="primary-nav">
          <Link href="/" className={isActive('/') ? 'active' : ''}>
            Inicio
          </Link>
          <Link href="/catalogo" className={isActive('/catalogo') ? 'active' : ''}>
            Tienda
          </Link>
          <Link href="/nosotros" className={isActive('/nosotros') ? 'active' : ''}>
            Sobre Valkia
          </Link>
          <Link href="/descubre" className={isActive('/descubre') ? 'active' : ''}>
            Sommelier / Recomendador
          </Link>

          {user && (
            <Link
              href="/mis-interacciones"
              className={isActive('/mis-interacciones') ? 'active' : ''}
            >
              Mis Pedidos
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin"
              className={isActive('/admin') ? 'active' : ''}
              style={{ color: '#A9694F', fontWeight: 600 }}
            >
              Administración
            </Link>
          )}
        </nav>

        <div className="header-actions">
          {/* Theme toggle exacto de Valkia Coffee */}
          <button
            className="theme-toggle-btn"
            id="themeToggle"
            onClick={toggleDarkMode}
            aria-label="Cambiar modo oscuro/claro"
          >
            <svg
              className="sun-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg
              className="moon-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          {/* Botón Carrito interactivo que abre el drawer */}
          <button
            type="button"
            className="cart-trigger"
            onClick={openCart}
            aria-label="Ver carrito"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Carrito</span>
            <span className="cart-badge" id="cartBadge">
              {totalCount}
            </span>
          </button>

          {/* Estado de sesión en header */}
          {user ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {user.name.split(' ')[0]} ({user.role})
              </span>
              <button
                onClick={logout}
                className="link-quiet"
                style={{ fontSize: '0.8rem', cursor: 'pointer', color: '#c53030' }}
              >
                Salir
              </button>
            </div>
          ) : (
            <Link href="/login" className="link-quiet" style={{ fontSize: '0.85rem' }}>
              Ingresar
            </Link>
          )}

          <Link href="/catalogo" className="btn btn-header">
            COMPRAR AHORA
          </Link>

          <button
            className="menu-toggle"
            id="menuToggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Menú mobile */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} id="mobileNav">
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className={isActive('/') ? 'active' : ''}>
          Inicio
        </Link>
        <Link href="/catalogo" onClick={() => setMobileMenuOpen(false)} className={isActive('/catalogo') ? 'active' : ''}>
          Tienda
        </Link>
        <Link href="/nosotros" onClick={() => setMobileMenuOpen(false)} className={isActive('/nosotros') ? 'active' : ''}>
          Sobre Valkia
        </Link>
        <Link href="/descubre" onClick={() => setMobileMenuOpen(false)} className={isActive('/descubre') ? 'active' : ''}>
          Sommelier / Recomendador
        </Link>
        {user && (
          <Link href="/mis-interacciones" onClick={() => setMobileMenuOpen(false)}>
            Mis Pedidos
          </Link>
        )}
        {isAdmin && (
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
            Panel de Administración
          </Link>
        )}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            openCart();
          }}
          className="btn btn-primary"
          style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
        >
          VER CARRITO ({totalCount})
        </button>
      </nav>
    </>
  );
};
