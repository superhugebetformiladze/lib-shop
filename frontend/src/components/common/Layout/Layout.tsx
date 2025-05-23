import React, { useRef, useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      if (headerRef.current) {
        setOffset(headerRef.current.offsetHeight);
      }
    };

    updateOffset(); // первый запуск

    const observer = new ResizeObserver(updateOffset);
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header ref={headerRef} />
      <div style={{ paddingTop: offset + 16 }} className="flex-1 container mx-auto p-2 lg:p-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
