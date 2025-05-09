import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '@models/ProductModel';
import AddToCartControls from '@components/Cart/AddToCartControls';

interface ProductCardProps {
  product: IProduct;
  count: number;
  onAdd: () => void;
  onChangeCount: (delta: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  count,
  onAdd,
  onChangeCount,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="p-4 group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain bg-white transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col justify-between flex-grow p-4 pt-0">
        <Link to={`/product/${product.id}`}>
          <div className="text-lg font-bold mb-2">{product.name}</div>
        </Link>

        <div className="mt-auto">
          <div className="text-gray-700 mb-2">{product.price} ₽</div>
          <AddToCartControls
            count={count}
            onAdd={onAdd}
            onChangeCount={onChangeCount}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
