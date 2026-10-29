import React from 'react';

export default function NosotrosPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Manifiesto & Curaduría · Valkia Coffee</p>
          <h1 className="page-hero-title">Cafés de autor, seleccionados para ti.</h1>
          <p className="page-hero-subtitle">
            Somos un mercado independiente dedicado a descubrir, evaluar y llevar directamente a tu hogar los lotes de café más singulares y expresivos.
          </p>
        </div>
      </section>

      <section className="filosofia">
        <div className="filosofia-grid">
          <div className="filosofia-photo">
            <img src="/assets/images/gallery/finca.jpg" alt="Origen del café de autor Valkia Coffee" />
          </div>
          <div className="filosofia-copy">
            <div className="rule"></div>
            <h2>Conectamos el origen con tu paladar.</h2>
            <p>
              Detrás de cada paquete de café Valkia hay un caficultor apasionado y un tostador experto. Evaluamos la trazabilidad, el puntaje de cata en taza (+85 pts) y el impacto social antes de integrar cualquier lote a nuestro catálogo.
            </p>
          </div>
        </div>
      </section>

      <div className="cifras texture">
        <div className="container cifras-grid">
          <div className="cifra">
            <div className="cifra-num">100%</div>
            <p className="cifra-label">Comercio directo garantizando precios justos a los caficultores</p>
          </div>
          <div className="cifra">
            <div className="cifra-num">+85</div>
            <p className="cifra-label">Puntaje mínimo en escala SCAA para todos nuestros lotes</p>
          </div>
          <div className="cifra">
            <div className="cifra-num">Artesanal</div>
            <p className="cifra-label">Tostión en pequeños lotes para cuidar la complejidad aromática</p>
          </div>
          <div className="cifra">
            <div className="cifra-num">Eco-pack</div>
            <p className="cifra-label">Empaques con válvula desgasificadora y materiales reciclables</p>
          </div>
        </div>
      </div>

      <div className="section voces">
        <div className="voces-grid">
          <div className="voces-photo">
            <img src="/assets/images/gallery/rosa-elena.jpg" alt="Caficultora aliada Valkia Coffee" />
          </div>
          <div className="voces-copy reveal in-view">
            <blockquote>
              &ldquo;Trabajar con Valkia Coffee nos permite mostrarle al mundo el fruto de meses de trabajo en la montaña, recibiendo una compensación justa por la calidad de nuestro grano.&rdquo;
            </blockquote>
            <p className="voces-name">Rosa Elena Martínez — Caficultora de Café de Autor Aliado</p>
          </div>
        </div>
      </div>

      <section className="section historia">
        <div className="container">
          <div className="section-head reveal in-view">
            <div className="head-copy">
              <span className="section-head-eyebrow">Garantía de Calidad</span>
              <h2>El Criterio de Selección Valkia</h2>
              <p>Garantizamos excelencia en cada etapa del camino.</p>
            </div>
          </div>
          <div className="historia-wrap">
            <div className="historia-photo">
              <img src="/assets/images/gallery/tostadora-cafe.webp" alt="Tostión de café de autor en Valkia Coffee" />
            </div>
            <div className="pasos">
              <div className="paso reveal in-view">
                <span className="paso-num">01</span>
                <div>
                  <h3>Catación en Finca</h3>
                  <p>Probamos muestras directamente en el origen para asegurar perfiles aromáticos excepcionales.</p>
                </div>
              </div>
              <div className="paso reveal in-view">
                <span className="paso-num">02</span>
                <div>
                  <h3>Curaduría de Procesos</h3>
                  <p>Elegimos variedades con fermentaciones controladas (Lavado, Honey, Anaeróbico y Natural).</p>
                </div>
              </div>
              <div className="paso reveal in-view">
                <span className="paso-num">03</span>
                <div>
                  <h3>Perfil de Tostión</h3>
                  <p>Tostamos según las curvas ideales para realzar la acidez noble o el cuerpo según la variedad.</p>
                </div>
              </div>
              <div className="paso reveal in-view">
                <span className="paso-num">04</span>
                <div>
                  <h3>Entrega Fresca</h3>
                  <p>Despachamos tu pedido en días de tostión reciente para garantizar una experiencia en taza perfecta.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
