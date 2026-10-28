import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/features/auth/hooks/useAuth';
import { CartProvider } from '@/features/common/hooks/useCart';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';
import { CartDrawer } from '@/features/common/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Valkia Coffee — Cafés de Autor, Seleccionados para Ti',
  description:
    'Valkia Coffee — Tienda de café de especialidad. Curaduría de cafés de autor de los mejores orígenes, métodos de extracción y suscripciones.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Work+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
