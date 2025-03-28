import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Instagram, Menu, X } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { useProductStore } from "@/services/productService";

interface NavbarProps {
  openCart: () => void;
  totalItems: number;
}

const Navbar: React.FC<NavbarProps> = ({ openCart, totalItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const categories = useProductStore((state) => state.categories);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navBackground = isScrolled
    ? "bg-white shadow-md"
    : location.pathname === "/"
    ? "bg-white shadow-md""
    : "bg-white shadow-md"";
  
  const textColor = isScrolled
    ? "text-foreground"
    : location.pathname === "/"
    ? "text-secondary-foreground"
    : "text-secondary-foreground";
  
  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${navBackground}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <h1 className={`text-2xl font-serif font-bold ${textColor}`}>
              <span className="text-primary">Ateliê</span>{" "}
              <span className="text-secondary">Gleice Rios</span>
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`${textColor} hover:text-primary transition-colors text-sm uppercase font-medium`}
            >
              Início
            </Link>
            <Link
              to="/products/todos"
              className={`${textColor} hover:text-primary transition-colors text-sm uppercase font-medium`}
            >
              Coleção
            </Link>
            {categories.slice(1).map((category) => (
              <Link
                key={category}
                to={`/products/${category}`}
                className={`${textColor} hover:text-primary transition-colors text-sm uppercase font-medium`}
              >
                {category}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <SocialLinks className={textColor} />
            
            <button
              onClick={openCart}
              className={`relative ${textColor} hover:text-primary transition-colors`}
              aria-label="Carrinho"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${textColor} hover:text-primary transition-colors`}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors text-sm uppercase font-medium"
              >
                Início
              </Link>
              <Link
                to="/products/todos"
                className="text-foreground hover:text-primary transition-colors text-sm uppercase font-medium"
              >
                Coleção
              </Link>
              {categories.slice(1).map((category) => (
                <Link
                  key={category}
                  to={`/products/${category}`}
                  className="text-foreground hover:text-primary transition-colors text-sm uppercase font-medium"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
