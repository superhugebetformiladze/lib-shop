import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, saveCart } from '@utils/cart';
import { IProduct } from '@models/ProductModel';
import { useCart } from "@context/CartContext";
import { createOrder } from '@api/Orders/createOrder';
import { getUserToken, saveUserToken } from '@utils/UserToken';
import { OrderModel } from '@models/OrderModel';
import InputMask from 'react-input-mask';

interface CartItem extends IProduct {
    count: number;
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { refresh: refreshCart } = useCart();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const items = getCart();
        setCartItems(items);

        handleGeolocation();
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


    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: name.trim() === '',
            country: country.trim() === '',
            city: city.trim() === '',
            phone: phone.replace(/[^0-9]/g, '').length !== 11,
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const localToken = getUserToken();
        const cleanedPhone = phone.replace(/\D/g, '');

        const payload: OrderModel = {
            user_token: localToken,
            country,
            city,
            name,
            phone: cleanedPhone,
            items: cartItems.map(item => ({
                product: item.id,
                quantity: item.count,
            })),
        };

        try {
            const response = await createOrder(payload);
            const returnedToken = response.user_token;

            if (returnedToken && returnedToken !== localToken) {
                saveUserToken(returnedToken);
            }

            alert('Заказ успешно отправлен!');
            localStorage.removeItem('cart');
            setCartItems([]);
            refreshCart();
            setName('');
            setCountry('');
            setCity('');
        } catch (error) {
            console.error('Ошибка отправки заказа:', error);
            alert('Ошибка при отправке заказа');
        }
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
                            <li key={item.id} className="border p-4 rounded-xl shadow flex justify-between items-center">
                                <div>
                                    <Link to={`/product/${item.id}`}>
                                        <h2 className="font-bold hover:text-green-600">{item.name}</h2>
                                    </Link>
                                    <p>Цена: {item.price} ₽</p>
                                    <div className="flex gap-2 mt-2 items-center flex-col sm:flex-row w-fit">
                                        <div className='flex gap-2 items-center'>
                                            <button onClick={() => handleCountChange(item.id, -1)} className="px-3 py-1 bg-gray-200 rounded-xl">-</button>
                                            <span>{item.count}</span>
                                            <button onClick={() => handleCountChange(item.id, 1)} className="px-3 py-1 bg-gray-200 rounded-xl">+</button>
                                        </div>
                                        <button onClick={() => handleRemove(item.id)} className="px-3 py-1 bg-red-500 text-white rounded-xl w-full">Удалить</button>
                                    </div>
                                </div>
                                <Link to={`/product/${item.id}`}>
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl hover:opacity-80 transition" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={handleOrderSubmit} className="border p-6 rounded-xl shadow space-y-4 bg-white">
                        <h2 className="text-xl font-semibold">Оформление заказа</h2>

                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Имя</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ваше имя"
                                className={`border px-4 py-2 rounded-xl ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Телефон</label>
                            <InputMask
                                mask="+7 (999) 999-99-99"
                                value={phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            >
                                {(inputProps: any) => (
                                    <input
                                        {...inputProps}
                                        placeholder="+7 (___) ___-__-__"
                                        className={`border px-4 py-2 rounded-xl ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                )}
                            </InputMask>
                            {errors.phone && (
                                <span className="text-red-500 text-sm mt-1">Введите корректный номер</span>
                            )}
                        </div>


                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Страна</label>
                            <input
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Страна"
                                className={`border px-4 py-2 rounded-xl ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Город</label>
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Город"
                                className={`border px-4 py-2 rounded-xl ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl"
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
