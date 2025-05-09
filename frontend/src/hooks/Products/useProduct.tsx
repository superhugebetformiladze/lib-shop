import { useEffect, useState } from 'react';
import { fetchProductById } from '@api/Products/fetchProductById';
import { IProduct } from '@models/ProductModel';

const useProduct = (productId: number) => {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error(`Error fetching product info for ID ${productId}:`, error);
      }
    };

    fetchProductInfo();
  }, [productId]);

  return product;
};

export default useProduct;
