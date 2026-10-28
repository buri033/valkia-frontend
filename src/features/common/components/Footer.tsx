import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="texture">
      <div className="container footer-top">
        <div className="footer-brand">
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
          <p>
            Cafés de autor, seleccionados para ti. Curaduría de cafés de especialidad, accesorios y suscripciones directo a tu hogar.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" width="20" height="20" stroke="currentColor" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" width="20" height="20" stroke="currentColor" fill="none">
                <path d="M4 20l1.3-4A8 8 0 1 1 9 19l-5 1z" />
                <path d="M8.5 9.5c0 3 2.5 5.5 5.5 5.5" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Navegación</h3>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/catalogo">Tienda</Link></li>
            <li><Link href="/nosotros">Sobre Valkia</Link></li>
            <li><Link href="/descubre">Sommelier de Café</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Tiendas & Showrooms</h3>
          <ul>
            <li>Bogotá — Cra. 77 # 99-30, Chapinero</li>
            <li>Medellín — Cl. 10B # 36-88, El Poblado</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Atención al Cliente</h3>
          <ul>
            <li><a href="mailto:hola@valkiacoffee.com">hola@valkiacoffee.com</a></li>
            <li><a href="#">WhatsApp — +57 300 888 9900</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-fine">© 2026 Valkia Coffee — Cafés de Autor</p>
        <div className="footer-legal">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
        </div>
      </div>
    </footer>
  );
};
