
import { create } from 'zustand';
import { toast } from "sonner";

export type Category = 'vestidos' | 'saias' | 'blusas' | 'calças' | 'acessórios' | 'todos';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: Category;
  featured: boolean;
  inStock: boolean;
  createdAt: Date;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type ProductState = {
  products: Product[];
  cart: CartItem[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, productData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

// Produtos de exemplo
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Vestido Floral Verão',
    description: 'Vestido leve e florido perfeito para o verão.',
    price: 259.90,
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1974&auto=format&fit=crop',
    category: 'vestidos',
    featured: true,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Blusa de Seda',
    description: 'Blusa elegante de seda para ocasiões especiais.',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1770&auto=format&fit=crop',
    category: 'blusas',
    featured: false,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Saia Midi Plissada',
    description: 'Saia midi plissada em tecido leve e confortável.',
    price: 179.90,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1964&auto=format&fit=crop',
    category: 'saias',
    featured: true,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Calça de Alfaiataria',
    description: 'Calça de alfaiataria de alta qualidade para um visual elegante.',
    price: 229.90,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1974&auto=format&fit=crop',
    category: 'calças',
    featured: false,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'Colar Dourado',
    description: 'Colar dourado com pedras delicadas para complementar seu look.',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887&auto=format&fit=crop',
    category: 'acessórios',
    featured: true,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: '6',
    name: 'Vestido de Festa',
    description: 'Vestido elegante para festas e eventos especiais.',
    price: 359.90,
    discountPrice: 299.90,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop',
    category: 'vestidos',
    featured: true,
    inStock: true,
    createdAt: new Date(),
  },
];

export const useProductStore = create<ProductState>((set, get) => ({
  products: sampleProducts,
  cart: [],
  categories: ['todos', 'vestidos', 'saias', 'blusas', 'calças', 'acessórios'],
  
  addProduct: (productData) => {
    const newProduct = {
      ...productData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    set((state) => ({
      products: [...state.products, newProduct],
    }));
    toast.success("Produto adicionado com sucesso!");
  },
  
  updateProduct: (id, productData) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...productData } : product
      ),
    }));
    toast.success("Produto atualizado com sucesso!");
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
    toast.success("Produto removido com sucesso!");
  },
  
  addToCart: (product, quantity) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );
      
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return { cart: [...state.cart, { product, quantity }] };
    });
    
    toast.success("Produto adicionado ao carrinho!");
  },
  
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }));
    toast.info("Produto removido do carrinho");
  },
  
  updateCartQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ cart: [] });
    toast.info("Carrinho esvaziado");
  },
  
  getTotalPrice: () => {
    return get().cart.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  },
  
  getTotalItems: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },
}));
