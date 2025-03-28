
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cart from "./Cart";
import { useProductStore } from "@/services/productService";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const totalItems = useProductStore((state) => state.getTotalItems());

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar openCart={() => setIsCartOpen(true)} totalItems={totalItems} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Layout;
