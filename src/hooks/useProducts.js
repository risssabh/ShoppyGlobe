import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch products list from API using useEffect.
 * Handles loading and error states. Also returns a refetch function.
 */
export default function useProducts() {
  const [data, setData] = useState([]);        // products array
  const [loading, setLoading] = useState(true); // boolean
  const [error, setError] = useState(null);     // error message or null

  const fetchProducts = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://dummyjson.com/products', { signal });
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      const json = await res.json();
      setData(Array.isArray(json.products) ? json.products : []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Unknown error while fetching products');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    // cleanup aborts on unmount
    return () => controller.abort();
  }, []);

  const refetch = () => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  };

  return { data, loading, error, refetch };
}
