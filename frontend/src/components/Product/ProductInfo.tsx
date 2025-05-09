import React from 'react';
import { IProduct } from '@models/ProductModel';
import AddToCartControls from '@components/Cart/AddToCartControls';


interface ProductInfoProps {
  product: IProduct;
  count: number;
  onAdd: () => void;
  onChangeCount: (delta: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, count, onAdd, onChangeCount }) => {
  return (
    <div className="product-info container flex flex-col lg:flex-row gap-16 mx-auto py-8 lg:px-28">
      <div className="flex items-center justify-center lg:items-start lg:justify-start flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-[20rem] lg:h-[60vh] object-contain"
        />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="text-2xl font-semibold mb-4">{product.name}</div>
        <div className="text-2xl font-normal mb-8">{product.price}</div>

        <AddToCartControls
          count={count}
          onAdd={onAdd}
          onChangeCount={onChangeCount}
          className="mb-4"
        />

        <div className="text-xl font-normal mb-4">{product.description}</div>
      </div>
    </div>
  );
};

export default ProductInfo;
