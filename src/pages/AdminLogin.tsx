
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Credenciais simples para demonstração
  const adminCredentials = {
    username: "admin",
    password: "admin123"
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      localStorage.setItem("adminAuthenticated", "true");
      toast.success("Login realizado com sucesso!");
      navigate("/admin");
    } else {
      toast.error("Credenciais inválidas. Tente novamente.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold mb-2">
              <span className="text-primary">Ateliê</span>{" "}
              <span className="text-secondary">Gleice Rios</span>
            </h1>
            <h2 className="text-xl font-medium">Área Administrativa</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-pink-dark text-white"
            >
              Entrar
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-primary hover:text-pink-dark text-sm"
            >
              Voltar para o site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
