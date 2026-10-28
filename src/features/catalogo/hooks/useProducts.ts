'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PaginatedProducts, ProductFilters } from '../domain/types';
import { productService } from '../services/product.service';

export function useProducts(initialFilters: ProductFilters = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
  const urlCategory = searchParams.get('category') || initialFilters.category || 'todos';
  const urlSearch = searchParams.get('search') || initialFilters.search || '';

  const [productsData, setProductsData] = useState<PaginatedProducts | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts({
        page: urlPage,
        limit: initialFilters.limit || 6,
        category: urlCategory,
        search: urlSearch,
      });
      setProductsData(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [urlPage, urlCategory, urlSearch, initialFilters.limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const setCategory = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', newCategory);
    params.set('page', '1'); // Reiniciar a página 1 al filtrar
    router.push(`${pathname}?${params.toString()}`);
  };

  const setSearch = (newSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSearch) {
      params.set('search', newSearch);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    products: productsData?.data || [],
    pagination: productsData?.pagination,
    isLoading,
    error,
    currentPage: urlPage,
    currentCategory: urlCategory,
    currentSearch: urlSearch,
    setPage,
    setCategory,
    setSearch,
    refetch: fetchProducts,
  };
}
