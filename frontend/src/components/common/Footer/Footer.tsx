import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-16">
            <div className="container mx-auto p-2 lg:p-4">
                <div className="flex flex-col items-center text-center gap-8 md:flex-row md:justify-center md:items-start md:text-left">

                    <div className="md:w-1/3">
                        <h2 className="text-2xl font-bold mb-2">Book Shop</h2>
                        <p className="text-gray-400">Ваш любимый книжный магазин онлайн.</p>
                    </div>

                    <div className="md:w-1/3">
                        <h3 className="text-lg font-semibold mb-3">Навигация</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-green-400">Главная</Link></li>
                            <li><Link to="/catalog" className="hover:text-green-400">Каталог</Link></li>
                            <li><Link to="/cart" className="hover:text-green-400">Корзина</Link></li>
                        </ul>
                    </div>

                    <div className="md:w-1/3">
                        <h3 className="text-lg font-semibold mb-3">Контакты</h3>
                        <div className="space-y-2 text-gray-400 text-sm">
                            <div>+7 (900) 123-45-67</div>
                            <div>support@bookshop.ru</div>
                            <div>г. Москва, ул. Книжная, д. 1</div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Book Shop. Все права защищены.
            </div>
        </footer>
    );
};

export default Footer;
