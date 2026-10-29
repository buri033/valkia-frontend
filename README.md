# Valkia Coffee — Frontend en Next.js

Aplicación web moderna y responsive construida con **Next.js 14 (App Router)**, **TypeScript** y **Tailwind CSS**, migrando la identidad visual y contenido de la Entrega 1 a una arquitectura modular orientada por *features*.

---

## Enlaces del Proyecto

- **Sitio Desplegado en Vercel:** [https://valkia-coffee.vercel.app](https://valkia-coffee.vercel.app) *(Mismo dominio de la Entrega 1)*
- **API Backend Desplegada:** *(Se actualizará con la URL de Render/Railway)*
- **Repositorio Frontend:** [https://github.com/buri033/valkia-frontend](https://github.com/buri033/valkia-frontend)
- **Repositorio Backend:** [https://github.com/buri033/valkia-backend](https://github.com/buri033/valkia-backend)

---

## Arquitectura por Features

El proyecto implementa la estructura modular exigida en la asignatura:

```
app/                              # Rutas con App Router (solo componen páginas)
├── catalogo/page.tsx             # Catálogo dinámico con filtros y paginación (?page=)
├── descubre/page.tsx             # Sommelier virtual con registro en base de datos
├── nosotros/page.tsx             # Historia de la marca y proceso de 4 pasos
├── mis-interacciones/page.tsx    # Ruta protegida para historial de pedidos del usuario
├── admin/page.tsx                # Ruta protegida exclusiva para rol admin (CRUD)
├── login/page.tsx                # Inicio de sesión con redirección si ya hay sesión
├── registro/page.tsx             # Registro de usuarios nuevos
├── not-found.tsx                 # Página 404 personalizada con branding Valkia
├── layout.tsx                    # Layout raíz con AuthProvider y Google Fonts
└── globals.css                   # Tokens de diseño y estilos globales de Tailwind

src/features/
├── common/                       # Utilidades y configuración compartida
│   ├── config.ts                 # API_BASE_URL desde NEXT_PUBLIC_API_HOST
│   ├── http.ts                   # Cliente HTTP centralizado (Bearer token y manejo 401)
│   └── components/               # Navbar, Footer, Button, Input
├── auth/                         # Módulo de Autenticación
│   ├── domain/types.ts           # Modelos de User, LoginCredentials, AuthResponse
│   ├── services/auth.service.ts  # Llamadas a la API vía httpClient
│   ├── hooks/useAuth.tsx         # Hook y contexto de sesión con persistencia
│   └── components/               # LoginForm y RegisterForm
├── catalogo/                     # Módulo del Catálogo
│   ├── domain/types.ts           # Modelos de Product y Pagination
│   ├── services/product.service  # CRUD del catálogo consumiendo la API
│   ├── hooks/useProducts.ts      # Sincronización con URL (?page=) y estados de carga
│   └── components/               # ProductCard, ProductFilters, PaginationControls
└── interaccion/                  # Módulo de Interacción (Sommelier y Pedidos)
    ├── domain/types.ts           # Tipos de Interaction y CreateInteractionInput
    ├── services/interaction.serv # Endpoints de interacción
    └── hooks/useInteractions.ts  # Consultas de historial personal
```

---

## Credenciales de Prueba (Seed)

Para probar los diferentes roles y rutas protegidas en la aplicación:

| Rol | Correo Electrónico | Contraseña | Permisos y Vistas |
|---|---|---|---|
| **Administrador** | `admin@valkia.com` | `Admin123*` | Acceso a `/admin` (Crear, editar y borrar café con modal de confirmación) |
| **Usuario Normal** | `cliente@valkia.com` | `Cliente123*` | Acceso a `/mis-interacciones` y creación de recomendaciones en `/descubre` |

---

## Cómo Ejecutar en Local

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/buri033/valkia-frontend.git
cd valkia-frontend
npm install
```

### 2. Variables de Entorno
Crea un archivo `.env.local` en la raíz basado en `.env.example`:
```env
NEXT_PUBLIC_API_HOST="http://localhost:4000/api"
```

### 3. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. Compilar para Producción
```bash
npm run build
npm run start
```

---

## Decisiones Técnicas

### 1. Flujo completo de un login
1. El usuario completa el formulario en `/login` (`LoginForm.tsx`) y presiona "Ingresar".
2. Se realiza una validación en el cliente; si es correcta, el hook `useAuth` invoca `authService.login(credentials)`.
3. El servicio utiliza `httpClient` enviando `POST /api/auth/login` a la API.
4. Al recibir la respuesta exitosa con el token JWT y los datos del usuario, `useAuth` los guarda en el estado de React y los persiste en `localStorage` (`valkia_token` y `valkia_user`).
5. El usuario es redirigido a la página principal `/`. La barra de navegación detecta el cambio de estado inmediatamente: oculta el botón "Ingresar", muestra el nombre del usuario junto a un botón "Salir", y si su rol es `admin`, añade el botón "Administración".
6. Cuando el usuario navega a una ruta protegida (como `/mis-interacciones` o `/admin`), el cliente HTTP inyecta automáticamente el encabezado `Authorization: Bearer <token>` en cada petición.

### 2. ¿Dónde guardas el token en el frontend y qué riesgo tiene esa decisión?
Se guarda en `localStorage` del navegador a través de la clave `valkia_token`.
- **Riesgo:** `localStorage` es accesible mediante código JavaScript en el navegador. Si la aplicación llega a ser vulnerable a ataques de inyección **XSS (Cross-Site Scripting)**, un script malicioso podría leer el token y comprometer la sesión.
- **Alternativa y mitigación:** La alternativa más segura es usar cookies con la bandera `HttpOnly`, las cuales no pueden ser leídas por JavaScript en el cliente. En nuestra implementación actual con `localStorage`, se minimiza el riesgo asegurando que React escape automáticamente todo el contenido renderizado (evitando inyecciones en el DOM), usando variables de entorno estrictas y configurando expiración corta (24 horas) en el JWT.

### 3. ¿En qué caso tu API responde 401 y en cuál 403? (Ejemplos reales del proyecto)
- **401 Unauthorized:** Cuando no hay sesión iniciada o el token es inválido/expiró.  
  *Ejemplo real:* Un usuario sin iniciar sesión intenta consultar `/api/interaccion/mias` o enviar una recomendación sin token $\rightarrow$ La API responde **401** y el cliente HTTP de Next.js redirige automáticamente a `/login`.
- **403 Forbidden:** Cuando el usuario sí tiene una sesión válida y verificada, pero su rol no tiene permiso para esa operación.  
  *Ejemplo real:* El usuario `cliente@valkia.com` (rol `user`) intenta eliminar un café enviando `DELETE /api/catalogo/:id` con su token válido $\rightarrow$ El backend comprueba su identidad pero deniega la operación con **403 Forbidden**.

### 4. Uso de Inteligencia Artificial
- **Para qué se usó:** Para agilizar la migración de las clases de CSS nativo de la Entrega 1 a las utilidades correspondientes de Tailwind CSS, estructurar los componentes modulares de App Router y generar el diseño responsive del panel administrativo.
- **Qué se tuvo que corregir:** Se ajustó la configuración de fuentes personalizadas con `next/font/google` para `Fraunces` y `Work Sans`, se corrigió la integración de `useSearchParams` envolviendo el catálogo en un límite de `<Suspense>` para el prerenderizado estático de Next.js, y se adaptó el cliente HTTP centralizado para interceptar errores 401 de forma limpia sin alertas intrusivas.
