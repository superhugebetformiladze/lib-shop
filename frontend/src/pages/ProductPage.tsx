import React, { useEffect, useState } from 'react';
import ProductInfo from '@components/Product/ProductInfo';
import { useParams } from 'react-router-dom';
import useProduct from '@hooks/Products/useProduct';
import { addToCart, getCartItemCount, updateCartItemCount } from '@utils/cart';
import { useCart } from '@context/CartContext';

const ProductPage: React.FC = () => {
    const { productId } = useParams(); // Получаем productId из URL
    const product = useProduct(Number(productId));
    const { refresh: refreshCart } = useCart();

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (product) {
            const currentCount = getCartItemCount(product.id);
            setCount(currentCount);
        }
    }, [product]);

    const handleAdd = () => {
        if (!product) return;
        addToCart(product);
        refreshCart();
        setCount(prev => prev + 1);
    };

    const handleChangeCount = (delta: number) => {
        if (!product) return;
        updateCartItemCount(product.id, delta);
        refreshCart();
        setCount(prev => {
            const newCount = prev + delta;
            return newCount < 0 ? 0 : newCount;
        });
    };

    return (
        <div className="container mx-auto mt-8">

            {product && (
                <>
                    <ProductInfo
                        product={product}
                        count={count}
                        onAdd={handleAdd}
                        onChangeCount={handleChangeCount}
                    />
                </>
            )}
        </div>
    );
};

export default ProductPage;
