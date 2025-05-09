import { IProduct } from '@models/ProductModel';

export const getCart = (): any[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const saveCart = (cart: any[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product: IProduct) => {
    const cart = getCart();
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
        cart[index].count += 1;
    } else {
        cart.push({ ...product, count: 1 });
    }
    saveCart(cart);
};

export const updateCartItemCount = (productId: number, delta: number) => {
    const cart = getCart();
    const index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
        cart[index].count += delta;
        if (cart[index].count <= 0) {
            cart.splice(index, 1); // удаляем товар, если count <= 0
        }
        saveCart(cart);
    }
};

export const getCartItemCount = (productId: number): number => {
    const cart = getCart();
    const item = cart.find((item) => item.id === productId);
    return item ? item.count : 0;
};

export const getTotalCartCount = (): number => {
    const cart = getCart();
    return cart.reduce((total: number, item: any) => total + item.count, 0);
  };