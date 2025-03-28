
import React from "react";
import { Link } from "react-router-dom";
import { Product, useProductStore } from "@/services/productService";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useProductStore((state) => state.addToCart);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative pb-[125%] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {product.discountPrice && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
            Oferta
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-serif font-medium text-lg mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          {product.discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-primary font-medium">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-gray-400 text-sm line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-primary font-medium">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">
            {product.category}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="text-primary hover:text-white hover:bg-primary p-2 rounded-full transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
