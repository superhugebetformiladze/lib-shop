import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '@models/ProductModel';
import AddToCartControls from '@components/Cart/AddToCartControls';

interface ProductCardProps {
  product: IProduct;
  count?: number;
  onAdd?: () => void;
  onChangeCount?: (delta: number) => void;
  readonly?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  count = 0,
  onAdd,
  onChangeCount,
  readonly = false,
}) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-md h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="p-4 group block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain bg-white transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col justify-between flex-grow p-4 pt-0">
        <Link to={`/product/${product.id}`} className="block mb-2">
          <div className="text-lg font-bold text-center">{product.name}</div>
        </Link>

        <div className="mt-auto">
          <div className="text-gray-700 text-lg text-center mb-2">{product.price} ₽</div>

          {!readonly && onAdd && onChangeCount && (
            <AddToCartControls
              count={count}
              onAdd={onAdd}
              onChangeCount={onChangeCount}
              fullWidth
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
