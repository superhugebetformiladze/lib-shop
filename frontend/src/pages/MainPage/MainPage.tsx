import React from 'react';
import useProducts from '@hooks/Products/useProducts';

const MainPage: React.FC = () => {
  const products = useProducts();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Продукты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id}>
            <h2 className="font-bold">{product.name}</h2>
            <p>Категория: {product.category.name}</p>
            <p>Цена: {product.price} руб.</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
