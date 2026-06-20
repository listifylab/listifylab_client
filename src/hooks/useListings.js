import { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export const useListings = (refreshKey = 0, search = '', page = 1, limit = 50) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page, limit });
      if (search) params.set('search', search);
      const res = await apiFetch(`/products?${params}`);
      setProducts(res.data.products || []);
      setPagination(res.data.pagination || null);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [refreshKey, search, page]);

  return { products, pagination, loading, error, refetch: fetchProducts };
};

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch('/products', { method: 'POST', body: JSON.stringify(payload) });
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
};
