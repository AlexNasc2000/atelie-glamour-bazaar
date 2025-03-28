
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/services/productService";
import { Button } from "@/components/ui/button";

const Index = () => {
  const products = useProductStore((state) => state.products);
  const featuredProducts = products.filter((product) => product.featured);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop"
            alt="Ateliê Gleice Rios" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
            Ateliê Gleice Rios
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Moda feminina exclusiva para mulheres que valorizam elegância e qualidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              asChild
              className="bg-primary hover:bg-pink-dark text-white font-medium px-6 py-3 rounded-md"
            >
              <Link to="/products/todos">Ver Coleção</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-foreground font-medium px-6 py-3 rounded-md"
            >
              <Link to="/products/vestidos">Vestidos</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Destaques da Coleção</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça as peças mais exclusivas da nossa coleção, selecionadas especialmente para você.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            asChild
            className="bg-primary hover:bg-pink-dark text-white"
          >
            <Link to="/products/todos">Ver Toda a Coleção</Link>
          </Button>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Categorias</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nossa loja por categoria e descubra o que mais combina com você.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              title="Vestidos"
              image="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop"
              link="/products/vestidos"
            />
            <CategoryCard
              title="Blusas"
              image="https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1770&auto=format&fit=crop"
              link="/products/blusas"
            />
            <CategoryCard
              title="Acessórios"
              image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887&auto=format&fit=crop"
              link="/products/acessórios"
            />
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-accent rounded-lg p-8 text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">
            Inscreva-se em nossa newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Receba novidades, promoções exclusivas e dicas de moda diretamente em seu email.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-secondary hover:bg-gold-dark text-secondary-foreground">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, link }) => {
  return (
    <Link 
      to={link}
      className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow block h-64"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
        <h3 className="text-white text-xl font-serif font-medium">{title}</h3>
      </div>
    </Link>
  );
};

export default Index;
