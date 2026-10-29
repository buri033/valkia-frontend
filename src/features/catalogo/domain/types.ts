export interface Product {
  id: string;
  name: string;
  category: string; // cafes, accesorios, suscripciones
  origin: string;
  notes: string[];
  process: string;
  intensity: number;
  price: number;
  priceFmt: string;
  accent: string;
  image: string;
  badge: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedProducts {
  pagination: Pagination;
  data: Product[];
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}
