// useProducts.ts

import { useEffect, useState } from 'react';
import { fetchProducts, ProductListResponse } from '@api/Products/fetchProducts';

const useProducts = (params?: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: ProductListResponse = await fetchProducts(params);
        setProducts(data.results);
        setCount(data.count);
      } catch (error) {
        console.error('Error setting products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return { products, count, loading };
};

export default useProducts;
