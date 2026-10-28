import { API_BASE_URL } from './config';

export interface HttpResponse<T> {
  data: T;
  status: number;
}

export class HttpError extends Error {
  public status: number;
  public data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export async function httpClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const headers = new Headers(options.headers || {});

  // Adjuntar automáticamente el token si existe en localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('valkia_token');
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Establecer Content-Type JSON si no se definió y no es FormData
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Manejo centralizado del 401 (Sesión inválida o expirada)
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('valkia_token');
      localStorage.removeItem('valkia_user');
      // Redirigir a login solo si no está ya en la pantalla de login o registro
      if (
        !window.location.pathname.includes('/login') &&
        !window.location.pathname.includes('/registro')
      ) {
        window.location.href = '/login';
      }
    }
  }

  // Parsear respuesta
  let data: unknown;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMessage =
      (data as { error?: string })?.error ||
      (typeof data === 'string' ? data : 'Error en la petición');
    throw new HttpError(errorMessage, response.status, data);
  }

  return data as T;
}
