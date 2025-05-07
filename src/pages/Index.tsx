
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Index = () => {
  const navigate = useNavigate();
  
  // Mock do usuário logado para demonstração
  const [currentUser] = useState({
    name: "Usuário Demo",
    role: "Administrador"
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header currentUser={currentUser} />
      
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold">
            <span className="text-moto">Moto</span>Pátio
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Sistema de gerenciamento para pátio de motos
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div onClick={() => navigate("/motos")} 
                className="bg-black/90 border border-moto/50 p-6 rounded-lg cursor-pointer hover:border-moto transition-colors">
              <h2 className="text-2xl font-semibold mb-2 text-white">Gerenciar Motos</h2>
              <p className="text-gray-400">Cadastre, visualize e edite informações das motos no sistema</p>
            </div>
            
            <div onClick={() => navigate("/patio")} 
                className="bg-black/90 border border-moto/50 p-6 rounded-lg cursor-pointer hover:border-moto transition-colors">
              <h2 className="text-2xl font-semibold mb-2 text-white">Mapa do Pátio</h2>
              <p className="text-gray-400">Visualize a disposição das motos no pátio e gerencie vagas</p>
            </div>
            
            <div onClick={() => navigate("/dashboard")} 
                className="bg-black/90 border border-moto/50 p-6 rounded-lg cursor-pointer hover:border-moto transition-colors">
              <h2 className="text-2xl font-semibold mb-2 text-white">Dashboard</h2>
              <p className="text-gray-400">Visualize estatísticas e informações gerais do sistema</p>
            </div>
            
            <div onClick={() => navigate("/usuarios")} 
                className="bg-black/90 border border-moto/50 p-6 rounded-lg cursor-pointer hover:border-moto transition-colors">
              <h2 className="text-2xl font-semibold mb-2 text-white">Usuários</h2>
              <p className="text-gray-400">Gerencie os usuários com acesso ao sistema</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-moto/20 mt-10 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MotoPátio. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
