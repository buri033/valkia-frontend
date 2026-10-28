import { httpClient } from '../../common/http';
import { PaginatedProducts, Product, ProductFilters } from '../domain/types';

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<PaginatedProducts> {
    const params = new URLSearchParams();
    if (filters.page) params.set('page', filters.page.toString());
    if (filters.limit) params.set('limit', filters.limit.toString());
    if (filters.category && filters.category !== 'todos') params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);

    const queryString = params.toString();
    const endpoint = `/catalogo${queryString ? `?${queryString}` : ''}`;
    return httpClient<PaginatedProducts>(endpoint);
  },

  async getProductById(id: string): Promise<Product> {
    return httpClient<Product>(`/catalogo/${id}`);
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    return httpClient<Product>('/catalogo', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    return httpClient<Product>(`/catalogo/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  async deleteProduct(id: string): Promise<{ message: string }> {
    return httpClient<{ message: string }>(`/catalogo/${id}`, {
      method: 'DELETE',
    });
  },
};
