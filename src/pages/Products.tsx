
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Product, Category, useProductStore } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Products = () => {
  const { category = "todos" } = useParams<{ category: Category }>();
  const allProducts = useProductStore((state) => state.products);
  const categories = useProductStore((state) => state.categories);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Filter by category
    if (category !== "todos") {
      filtered = filtered.filter((product) => product.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseSearch) ||
          product.description.toLowerCase().includes(lowercaseSearch) ||
          product.category.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Sort products
    switch (sortOption) {
      case "newest":
        filtered = filtered.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-low-high":
        filtered = filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        filtered = filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
  }, [allProducts, category, searchTerm, sortOption]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <Layout>
      {/* Page header */}
      <div className="pt-24 pb-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-semibold text-center">
            {category === "todos" ? "Nossa Coleção" : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </h1>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="inline-flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                className={
                  category === cat
                    ? "bg-primary hover:bg-pink-dark text-white"
                    : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                }
                asChild
              >
                <a href={`/products/${cat}`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </a>
              </Button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label="Buscar"
              >
                <Search size={18} />
              </button>
            </form>
            
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="py-2 px-4 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="newest">Mais recentes</option>
              <option value="price-low-high">Preço: Menor para Maior</option>
              <option value="price-high-low">Preço: Maior para Menor</option>
            </select>
          </div>
        </div>
        
        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500">
              Tente usar termos de busca diferentes ou remover os filtros aplicados.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
