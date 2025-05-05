import { useEffect, useState } from 'react';
import { fetchProducts } from '@api/Products/fetchProducts';

const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error setting products:', error);
      }
    };

    fetchData();
  }, []);

  return products;
};

export default useProducts;
