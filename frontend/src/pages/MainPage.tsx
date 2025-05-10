import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '@hooks/Products/useProducts';
import { FetchProductParams } from '@models/FetchProductParamsModel';
import ProductCard from '@components/Product/ProductCard';

const MainPage: React.FC = () => {
  const [ordering] = useState('');
  const [search] = useState('');
  const [selectedCategory] = useState<number | undefined>(undefined);
  const [page] = useState(1);

  const params: FetchProductParams = useMemo(() => ({
    ordering,
    search,
    category: selectedCategory,
    page,
  }), [ordering, search, selectedCategory, page]);

  const { products } = useProducts(params);

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center flex items-center justify-center relative rounded-xl overflow-hidden mb-8"
        style={{ backgroundImage: "url('/static/images/main-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-5xl font-bold mb-4">Добро пожаловать в наш книжный магазин</h1>
          <p className="text-lg max-w-xl mx-auto">
            У нас вы найдёте лучшие товары по отличным ценам. Начните покупки прямо сейчас!
          </p>
        </div>
      </div>

      <div className="container mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6">Популярные товары</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              readonly
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/catalog">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-medium transition duration-300">
              Перейти в каталог
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainPage;
