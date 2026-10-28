'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const featuredSlides = [
  {
    name: 'Caturra Huila',
    origen: 'Huila, Colombia · 1.800 msnm',
    badge: 'Edición de Autor',
    desc: 'Perfil clásico colombiano de tueste medio. Taza redonda con dulzor acaramelado y final prolongado a cacao fino.',
    notas: ['Chocolate', 'Caramelo', 'Frutos rojos'],
    proceso: 'Lavado',
    intensidad: 3,
    precioFmt: '$38.000',
    accent: '#6B4A35',
    image: '/assets/images/products/bolsa-caturra.png',
  },
  {
    name: 'Geisha Nariño',
    origen: 'Nariño, Colombia · 1.950 msnm',
    badge: 'Lote Exclusivo',
    desc: 'Gran expresividad floral y elegancia. Notas brillantes a jazmín silvestre y acidez sedosa a lima madura.',
    notas: ['Jazmín', 'Citrus', 'Miel de Azahar'],
    proceso: 'Honey Anaeróbico',
    intensidad: 2,
    precioFmt: '$48.000',
    accent: '#68705A',
    image: '/assets/images/products/bolsa-wush-wush.png',
  },
  {
    name: 'SL28 Sierra Nevada',
    origen: 'Santa Marta, Colombia · 1.700 msnm',
    badge: 'Selección Sommelier',
    desc: 'Varietal keniana adaptada al microclima de la Sierra Nevada. Carácter cítrico refinado y final herbal fresco.',
    notas: ['Mandarina', 'Té Verde', 'Cuerpo Cremoso'],
    proceso: 'Lavado Especial',
    intensidad: 2,
    precioFmt: '$45.000',
    accent: '#B79A73',
    image: '/assets/images/products/bolsa-sl28.png',
  },
  {
    name: 'Borbón Rosado Quindío',
    origen: 'Genoa, Quindío · 1.850 msnm',
    badge: 'Favorito del Tostador',
    desc: 'Fermentación natural prolongada. Notas complejas a frutos silvestres maduros y cuerpo licoroso inolvidable.',
    notas: ['Frutos Rojos', 'Cerezo', 'Vino Especiado'],
    proceso: 'Natural 72h',
    intensidad: 4,
    precioFmt: '$42.000',
    accent: '#A9694F',
    image: '/assets/images/products/bolsa-borbon.png',
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx: number) => {
    let nextIdx = idx;
    if (nextIdx < 0) nextIdx = featuredSlides.length - 1;
    if (nextIdx >= featuredSlides.length) nextIdx = 0;
    setCurrentIndex(nextIdx);
  };

  const renderIntensityDots = (intensidad: number) => {
    return (
      <div className="intensity">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`dot ${i <= intensidad ? 'filled' : ''}`}></span>
        ))}
      </div>
    );
  };

  return (
    <main>
      {/* HERO SECTION ORIGINAL */}
      <section className="hero">
        <div className="hero-bg">
          <svg
            className="hero-mark"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMax slice"
            fill="none"
            stroke="#FAF9F6"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M -50 520 L 220 260 L 380 420 L 620 160 L 820 400 L 1000 260 L 1260 520"
              opacity="0.16"
            />
            <path
              d="M -50 600 L 260 380 L 440 520 L 700 300 L 900 500 L 1260 340"
              opacity="0.10"
            />
            <path
              d="M -80 660 Q 600 590 1280 660"
              opacity="0.22"
              strokeWidth="2"
            />
            <path
              d="M -80 700 Q 600 640 1280 700"
              opacity="0.14"
              strokeWidth="2"
            />
            <path
              d="M -80 740 Q 600 690 1280 740"
              opacity="0.08"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Valkia Coffee · Specialty Coffee Market</p>
          <h1 className="hero-title">Cafés de autor, seleccionados para ti.</h1>
          <p className="hero-text">
            Curaduría de lotes de especialidad de micro-cultivadores independientes. Lotes únicos en
            tostión artesanal fresca directo a tu hogar.
          </p>
          <div className="hero-ctas">
            <Link href="/catalogo" className="btn btn-primary">
              EXPLORAR CAFÉS
            </Link>
            <Link href="/descubre" className="link-quiet">
              Hacer Test de Sabor
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN FILOSOFÍA */}
      <section className="filosofia">
        <div className="filosofia-grid">
          <div className="filosofia-photo">
            <img src="/assets/images/gallery/finca.jpg" alt="Finca de café de autor Valkia Coffee" />
          </div>
          <div className="filosofia-copy">
            <div className="rule"></div>
            <h2>Cada grano tiene su propio autor.</h2>
            <p>
              En Valkia Coffee seleccionamos los granos más expresivos de pequeños caficultores de Huila, Nariño, Sierra
              Nevada y Quindío. Trabajamos con procesos Lavados, Honey y Naturales para ofrecerte tazas inolvidables.
            </p>
            <div className="manifiesto-cta">
              <Link href="/nosotros" className="btn btn-dark">
                NUESTRO MANIFIESTO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CIFRAS CLAVE CON TEXTURA */}
      <div className="cifras texture">
        <div className="container cifras-grid">
          <div className="cifra">
            <div className="cifra-num">100%</div>
            <p className="cifra-label">Cafés de especialidad con puntaje Q-Grader superior a 85+</p>
          </div>
          <div className="cifra">
            <div className="cifra-num">4</div>
            <p className="cifra-label">Regiones de Colombia cuidadosamente seleccionadas</p>
          </div>
          <div className="cifra">
            <div className="cifra-num">Fresh</div>
            <p className="cifra-label">Tostado semanal en lotes pequeños para máxima frescura</p>
          </div>
          <div className="cifra">
            <div className="cifra-num">Directo</div>
            <p className="cifra-label">Trato directo con pequeños caficultores independientes</p>
          </div>
        </div>
      </div>

      {/* CARRUSEL DESTACADO - ESTRUCTURA Y CLASES IDÉNTICAS AL SCRIPT ORIGINAL */}
      <section className="section coffee-slider-section texture">
        <div className="container">
          <div className="section-head reveal in-view">
            <div className="head-copy">
              <h2>Colección de Cafés de Autor</h2>
              <p>Conoce a fondo nuestras varietales exclusivas, sus notas de cata y perfiles de origen.</p>
            </div>
          </div>

          <div className="featured-slider-container" id="featuredSliderContainer">
            <div className="featured-slider-track" id="featuredSliderTrack">
              {featuredSlides.map((c, index) => (
                <div
                  key={c.name}
                  className={`slider-slide ${index === currentIndex ? 'active' : ''}`}
                >
                  <div className="slide-grid">
                    <div className="slide-photo-col" style={{ background: `${c.accent}15` }}>
                      {c.badge && <span className="slide-badge">{c.badge}</span>}
                      <img src={c.image} alt={`${c.name} - Valkia Coffee`} loading="lazy" />
                    </div>
                    <div className="slide-info-col">
                      <span className="slide-origin">{c.origen}</span>
                      <h3 className="slide-title">{c.name}</h3>
                      <div className="slide-notes-list">
                        {c.notas.map((n) => (
                          <span key={n} className="slide-note-pill">
                            {n}
                          </span>
                        ))}
                      </div>
                      <p className="slide-desc">{c.desc}</p>
                      <div className="slide-specs">
                        <div className="spec-item">
                          <span className="spec-label">Proceso</span>
                          <span className="spec-val">{c.proceso}</span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-label">Intensidad</span>
                          {renderIntensityDots(c.intensidad)}
                        </div>
                      </div>
                      <div className="slide-actions">
                        <Link href="/catalogo" className="btn btn-dark">
                          VER EN LA TIENDA &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Flechas manuales originales */}
            <button
              className="slider-arrow prev"
              id="sliderPrev"
              onClick={() => goToSlide(currentIndex - 1)}
              aria-label="Café anterior"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="slider-arrow next"
              id="sliderNext"
              onClick={() => goToSlide(currentIndex + 1)}
              aria-label="Siguiente café"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Puntos indicativos originales */}
            <div className="slider-dots" id="sliderDots">
              {featuredSlides.map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Ir al café ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
