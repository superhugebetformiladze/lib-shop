import React, { useEffect, useState } from 'react';
import useOrders from '@hooks/Orders/useOrders';

const OrdersPage: React.FC = () => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const { orders, loading } = useOrders(userToken || '');

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        setUserToken(token);
    }, []);

    if (!userToken) {
        return <p className="text-center mt-10 text-gray-600">Нет токена пользователя.</p>;
    }

    if (loading) {
        return <p className="text-center mt-10 text-gray-600">Загрузка заказов...</p>;
    }

    if (orders.length === 0) {
        return <p className="text-center mt-10 text-gray-600">У вас пока нет заказов.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Мои заказы</h1>
            <div className="space-y-6">
                {orders.map((order, index) => (
                    <div key={index} className="bg-white rounded-xl shadow p-4 border border-gray-200">
                        <div className="mb-2">
                            <span className="font-semibold">Страна:</span> {order.country}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Город:</span> {order.city}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Заказчик:</span> {order.name}
                        </div>
                        <div className="mt-4">
                            <h2 className="font-semibold mb-2">Товары:</h2>
                            <ul className="space-y-1">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-700">
                                        {item.product.name} — <span className="font-medium">{item.quantity} шт.</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
