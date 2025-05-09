import { useEffect, useState } from 'react';
import { fetchProducts } from '@api/Products/fetchProducts';

const useProducts = (params?: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts(params);
        setProducts(productsData);
      } catch (error) {
        console.error('Error setting products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return { products, loading };
};

export default useProducts;
