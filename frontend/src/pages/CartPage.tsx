import React, { useEffect, useState } from 'react';
import { getCart, saveCart } from '@utils/cart';
import { IProduct } from '@models/ProductModel';
import { useCart } from "@context/CartContext";

interface CartItem extends IProduct {
    count: number;
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { refresh: refreshCart } = useCart();

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const items = getCart();
        setCartItems(items);
    }, []);

    const handleCountChange = (productId: number, delta: number) => {
        const updated = [...cartItems];
        const index = updated.findIndex((item) => item.id === productId);

        if (index !== -1) {
            updated[index].count += delta;
            if (updated[index].count <= 0) {
                updated.splice(index, 1);
            }
            saveCart(updated);
            setCartItems(updated);
            refreshCart();
        }
    };

    const handleRemove = (productId: number) => {
        const updated = cartItems.filter(item => item.id !== productId);
        saveCart(updated);
        setCartItems(updated);
        refreshCart();
    };

    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            alert('Геолокация не поддерживается вашим браузером');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    const apiKey = process.env.REACT_APP_YANDEX_API_KEY || '';
                    const response = await fetch(
                        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${longitude},${latitude}`
                    );
                    const data = await response.json();

                    const geoObject =
                        data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

                    const components =
                        geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components || [];

                    const getComponent = (kind: string) =>
                        components.find((c: any) => c.kind === kind)?.name || '';

                    const country = getComponent('country');
                    const city = getComponent('locality') || getComponent('province');

                    setCountry(country);
                    setCity(city);
                } catch (err) {
                    console.error('Ошибка геокодирования:', err);
                }
            },
            (err) => {
                alert('Ошибка получения геопозиции: ' + err.message);
            }
        );
    };



    const handleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Оформление заказа', {
            items: cartItems,
            country,
            city
        });
        alert('Заказ отправлен!');
        localStorage.removeItem('cart');
        setCartItems([]);
        refreshCart();
        setCountry('');
        setCity('');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Корзина</h1>

            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    <ul className="mb-6 space-y-4">
                        {cartItems.map(item => (
                            <li key={item.id} className="border p-4 rounded shadow flex justify-between items-center">
                                <div>
                                    <h2 className="font-bold">{item.name}</h2>
                                    <p>Цена: {item.price} ₽</p>
                                    <div className="flex gap-2 mt-2 items-center">
                                        <button onClick={() => handleCountChange(item.id, -1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                                        <span>{item.count}</span>
                                        <button onClick={() => handleCountChange(item.id, 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                                        <button onClick={() => handleRemove(item.id)} className="ml-4 px-3 py-1 bg-red-500 text-white rounded">Удалить</button>
                                    </div>
                                </div>
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={handleOrderSubmit} className="border p-4 rounded shadow space-y-4">
                        <h2 className="text-xl font-semibold">Оформление заказа</h2>

                        <div className="flex gap-2">
                            <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Страна" />
                            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" />
                            <button type="button" onClick={handleGeolocation} className="bg-blue-500 text-white px-4 rounded">
                                Определить
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                        >
                            Отправить заказ
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CartPage;
