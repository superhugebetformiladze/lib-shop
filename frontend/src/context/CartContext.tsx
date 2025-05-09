import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTotalCartCount } from '@utils/cart';

interface CartContextType {
    count: number;
    refresh: () => void;
}

const CartContext = createContext<CartContextType>({
    count: 0,
    refresh: () => { },
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [count, setCount] = useState(0);

    const refresh = () => {
        setCount(getTotalCartCount());
    };

    useEffect(() => {
        refresh();
        window.addEventListener('storage', refresh);
        return () => window.removeEventListener('storage', refresh);
    }, []);

    return (
        <CartContext.Provider value={{ count, refresh }}>
            {children}
        </CartContext.Provider>
    );
};
