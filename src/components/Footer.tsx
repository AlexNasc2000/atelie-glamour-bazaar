
import React from "react";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">
              <span className="text-primary">Ateliê</span>{" "}
              <span className="text-secondary">Gleice Rios</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Moda feminina exclusiva para mulheres que valorizam elegância e qualidade.
            </p>
            <SocialLinks className="text-gray-600" />
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/products/todos" className="text-gray-600 hover:text-primary transition-colors">
                  Coleção
                </Link>
              </li>
              <li>
                <Link to="/products/vestidos" className="text-gray-600 hover:text-primary transition-colors">
                  Vestidos
                </Link>
              </li>
              <li>
                <Link to="/products/acessórios" className="text-gray-600 hover:text-primary transition-colors">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contato</h4>
            <p className="text-gray-600 mb-2">Email: contato@ateliegleicerios.com.br</p>
            <p className="text-gray-600 mb-2">WhatsApp: (00) 00000-0000</p>
            <p className="text-gray-600">Horário: Seg-Sex, 9h às 18h</p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ateliê Gleice Rios. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
