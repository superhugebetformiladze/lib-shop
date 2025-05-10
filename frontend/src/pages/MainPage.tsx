import React, { useMemo, useState, useEffect } from 'react';
import useProducts from '@hooks/Products/useProducts';
import SearchInput from '@components/Filters/SearchInput';
import CategorySelect from '@components/Filters/CategorySelect';
import OrderingSelect from '@components/Filters/OrderingSelect';
import { FetchProductParams } from '@models/FetchProductParamsModel';
import useCategories from '@hooks/Categories/useCategories';
import { addToCart, getCartItemCount, updateCartItemCount } from '@utils/cart';
import { IProduct } from '@models/ProductModel';
import { useCart } from '@context/CartContext';
import ProductCard from '@components/Product/ProductCard';

const MainPage: React.FC = () => {
  const [ordering, setOrdering] = useState<string>('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  const [cartCounts, setCartCounts] = useState<{ [productId: number]: number }>({});

  const categories = useCategories();
  const [page, setPage] = useState(1);
  const params: FetchProductParams = useMemo(() => ({
    ordering,
    search,
    category: selectedCategory,
    page,
  }), [ordering, search, selectedCategory, page]);

  const { products, count } = useProducts(params);

  const handleResetFilters = () => {
    setOrdering('');
    setSearch('');
    setSelectedCategory(undefined);
  };

  const { refresh: refreshCart } = useCart();

  useEffect(() => {
    const counts: { [key: number]: number } = {};
    products.forEach((p) => {
      counts[p.id] = getCartItemCount(p.id);
    });
    setCartCounts(counts);
  }, [products]);

  useEffect(() => {
    setPage(1); // сбрасывать при смене фильтров
  }, [ordering, search, selectedCategory]);

  const handleAdd = (product: IProduct) => {
    addToCart(product);
    refreshCart();
    setCartCounts((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const handleChangeCount = (productId: number, delta: number) => {
    updateCartItemCount(productId, delta);
    refreshCart();
    setCartCounts((prev) => {
      const newCount = (prev[productId] || 0) + delta;
      if (newCount <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: newCount };
    });
  };


  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Каталог</h1>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <SearchInput value={search} onChange={setSearch} />
        <CategorySelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          categories={categories}
        />
        <OrderingSelect value={ordering} onChange={setOrdering} />
        <button
          onClick={handleResetFilters}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Сбросить
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => {
          const count = cartCounts[product.id] || 0;

          return (
            <ProductCard
              product={product}
              count={count}
              onAdd={() => handleAdd(product)}
              onChangeCount={(delta) => handleChangeCount(product.id, delta)}
            />
          );
        })}

      </div>
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: Math.ceil(count / 8) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
