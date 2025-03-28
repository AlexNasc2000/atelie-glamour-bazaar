
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product, Category, useProductStore } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const categories = useProductStore((state) => state.categories);
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    image: "",
    category: "vestidos" as Category,
    featured: false,
    inStock: true,
  });
  
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAdmin) {
      navigate("/admin-login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);
  
  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseSearch) ||
          product.description.toLowerCase().includes(lowercaseSearch) ||
          product.category.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, searchTerm]);
  
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin-login");
  };
  
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      image: "",
      category: "vestidos" as Category,
      featured: false,
      inStock: true,
    });
    setIsModalOpen(true);
  };
  
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice || 0,
      image: product.image,
      category: product.category,
      featured: product.featured,
      inStock: product.inStock,
    });
    setIsModalOpen(true);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "price" || name === "discountPrice") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.image || formData.price <= 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    // Se o preço de desconto for maior que o preço normal ou igual a 0, ajustamos
    const discountPrice = formData.discountPrice > 0 && formData.discountPrice < formData.price
      ? formData.discountPrice
      : undefined;
    
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        discountPrice,
      });
    } else {
      addProduct({
        ...formData,
        discountPrice,
      });
    }
    
    setIsModalOpen(false);
  };
  
  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduct(id);
    }
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold">
            <span className="text-primary">Ateliê</span>{" "}
            <span className="text-secondary">Gleice Rios</span>{" "}
            <span className="font-sans font-normal text-gray-500">Admin</span>
          </h1>
          
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-gray-300"
            >
              <a href="/" target="_blank" rel="noopener noreferrer">
                Ver Site
              </a>
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-gray-500"
            >
              <LogOut size={18} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-medium">Gerenciar Produtos</h2>
            
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
              <Button
                onClick={openAddModal}
                className="bg-primary hover:bg-pink-dark text-white"
              >
                <Plus size={18} className="mr-2" />
                Novo Produto
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-10 w-10 object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.discountPrice ? (
                          <div>
                            <span className="text-primary font-medium">
                              {formatPrice(product.discountPrice)}
                            </span>
                            <span className="ml-2 text-gray-400 text-sm line-through">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col text-sm">
                          <span 
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full w-fit ${
                              product.inStock 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.inStock ? "Em estoque" : "Fora de estoque"}
                          </span>
                          
                          {product.featured && (
                            <span className="mt-1 px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-secondary/20 text-secondary-foreground w-fit">
                              Destaque
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          onClick={() => openEditModal(product)}
                          variant="ghost"
                          className="text-primary hover:text-pink-dark mr-2"
                        >
                          <Edit size={18} />
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(product.id)}
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Nenhum produto encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)} />
            
            <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 z-10">
              <h2 className="text-2xl font-medium mb-6">
                {editingProduct ? "Editar Produto" : "Adicionar Produto"}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Nome*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                      Categoria*
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                      Preço*
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="discountPrice" className="block text-gray-700 font-medium mb-2">
                      Preço Promocional
                    </label>
                    <input
                      type="number"
                      id="discountPrice"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                      URL da Imagem*
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 text-gray-700">
                        Destaque
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="inStock"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="inStock" className="ml-2 text-gray-700">
                        Em Estoque
                      </label>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                      Descrição*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-pink-dark text-white"
                  >
                    {editingProduct ? "Atualizar" : "Adicionar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
