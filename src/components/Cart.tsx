import React from "react";
import { X } from "lucide-react";
import type { CartItem } from "@/services/productService";
import { useProductStore } from "@/services/productService";
import { Button } from "./ui/button";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const cart = useProductStore((state) => state.cart);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const clearCart = useProductStore((state) => state.clearCart);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
          <div className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-shrink-0 overflow-hidden bg-gray-50 px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                    Carrinho de Compras
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={onClose}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Fechar painel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200 overflow-y-scroll px-4 py-6 sm:px-6">
                <div className="space-y-6">
                  {cart.length > 0 ? (
                    cart.map((item: CartItem) => (
                      <div key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={`/product/${item.id}`}>{item.name}</a>
                              </h3>
                              <p className="ml-4">R$ {item.price.toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qtd {item.quantity}</p>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-primary hover:text-pink-dark"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Seu carrinho está vazio.</p>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>R$ {calculateTotal()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Frete calculado na finalização da compra.</p>
                    <div className="mt-6">
                      <Button className="w-full">Finalizar Compra</Button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        ou <button type="button" className="font-medium text-primary hover:text-pink-dark" onClick={onClose}>
                          Continue Comprando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <button
                        type="button"
                        className="font-medium text-red-500 hover:text-red-700"
                        onClick={() => clearCart()}
                      >
                        Limpar Carrinho
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
