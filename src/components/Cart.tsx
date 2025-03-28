
import React from "react";
import { X, ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { CartItem, useProductStore } from "@/services/productService";
import { Button } from "@/components/ui/button";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const cart = useProductStore((state) => state.cart);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const updateCartQuantity = useProductStore((state) => state.updateCartQuantity);
  const clearCart = useProductStore((state) => state.clearCart);
  const getTotalPrice = useProductStore((state) => state.getTotalPrice);
  
  if (!isOpen) return null;
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  return (
    <div>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      <div 
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 overflow-y-auto shadow-xl transform transition-transform duration-300"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-semibold flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Seu Carrinho
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">Seu carrinho está vazio</p>
              <Button 
                onClick={onClose}
                className="mt-4 bg-primary hover:bg-pink-dark"
              >
                Continuar comprando
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6 divide-y">
                {cart.map((item) => (
                  <CartItem 
                    key={item.product.id} 
                    item={item}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateCartQuantity}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2 text-lg font-medium">
                  <span>Subtotal:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  Impostos e frete calculados no checkout
                </p>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-secondary hover:bg-gold-dark text-secondary-foreground"
                  >
                    Finalizar Compra
                  </Button>
                  <Button 
                    onClick={clearCart}
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Limpar Carrinho
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface CartItemProps {
  item: CartItem;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  formatPrice: (price: number) => string;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  removeFromCart, 
  updateQuantity,
  formatPrice 
}) => {
  const { product, quantity } = item;
  const price = product.discountPrice || product.price;
  
  return (
    <div className="flex py-4">
      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h4 className="font-medium text-sm">{product.name}</h4>
        <p className="text-primary mt-1">{formatPrice(price)}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="px-2 py-1 text-gray-500 hover:text-primary"
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 text-sm">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="px-2 py-1 text-gray-500 hover:text-primary"
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-gray-400 hover:text-primary"
            aria-label="Remover item"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
