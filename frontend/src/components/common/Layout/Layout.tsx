import React from 'react';
import Header from '../Header/Header';

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-2 lg:p-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;
