
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useProductStore } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const addToCart = useProductStore((state) => state.addToCart);
  
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">Produto não encontrado</h2>
          <p className="text-gray-600 mb-8">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Button 
            onClick={() => navigate("/products/todos")}
            className="bg-primary hover:bg-pink-dark text-white"
          >
            Ver todos os produtos
          </Button>
        </div>
      </Layout>
    );
  }
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const price = product.discountPrice || product.price;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-serif font-semibold mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="uppercase text-sm text-gray-500">
                {product.category}
              </span>
              {product.discountPrice && (
                <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                  Oferta
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl text-primary font-medium">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="text-gray-400 text-lg line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl text-primary font-medium">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Quantidade</h3>
              <div className="flex items-center border rounded-md w-fit">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2 text-gray-500 hover:text-primary"
                  aria-label="Diminuir quantidade"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2 text-gray-500 hover:text-primary"
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="bg-primary hover:bg-pink-dark text-white flex-1"
              >
                Adicionar ao Carrinho
              </Button>
              <Button
                onClick={() => navigate("/products/todos")}
                variant="outline"
                className="border-gray-300"
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
