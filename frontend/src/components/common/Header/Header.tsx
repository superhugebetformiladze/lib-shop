import React, { forwardRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useCart } from "@context/CartContext";

const Header = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const [navbar, setNavbar] = useState(false);
  const { count: cartCount } = useCart();

  const closeNavbar = () => {
    setNavbar(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navElement = document.getElementById("navbar");
      if (navElement && !navElement.contains(event.target as Node)) {
        closeNavbar();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav id="navbar" ref={ref} {...props} className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="justify-between container px-2 lg:px-4 mx-auto md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to={'/'}>
              <h2 className="text-2xl font-bold hover:text-green-600 transition duration-300">Book shop</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-xl outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
              }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-green-600 transition duration-300">
                <Link to={'/catalog'} onClick={closeNavbar}>Каталог</Link>
              </li>
              <li className="relative text-gray-600 hover:text-green-600 transition duration-300">
                <Link to={'/cart'} onClick={closeNavbar} className="relative inline-block">
                  Корзина
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-xl px-2 py-0.5">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="text-gray-600 hover:text-green-600 transition duration-300">
                <Link to={'/orders'} onClick={closeNavbar}>Заказы</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Header;
