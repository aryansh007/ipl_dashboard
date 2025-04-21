import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 pb-16 md:pb-0">{children}</main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default MainLayout;