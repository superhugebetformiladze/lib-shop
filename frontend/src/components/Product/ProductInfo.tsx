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
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 w-full">
      <div className="flex items-center justify-center lg:items-start lg:justify-start">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain"
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
