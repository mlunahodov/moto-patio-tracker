
import { Motorcycle, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  currentUser?: {
    name: string;
    role: string;
  };
}

const Header = ({ currentUser }: HeaderProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // Implementação futura: lógica de logout
    navigate("/login");
  };

  return (
    <header className="bg-black border-b border-moto/20 py-3 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Motorcycle className="text-moto h-7 w-7" />
          <h1 className="text-xl font-bold text-white">
            <span className="text-moto">Moto</span>Pátio
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-gray-300 hover:text-moto transition">
            Dashboard
          </Link>
          <Link to="/motos" className="text-gray-300 hover:text-moto transition">
            Motos
          </Link>
          <Link to="/patio" className="text-gray-300 hover:text-moto transition">
            Mapa do Pátio
          </Link>
          <Link to="/usuarios" className="text-gray-300 hover:text-moto transition">
            Usuários
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="hidden md:flex items-center">
                <div className="mr-2 text-right">
                  <p className="text-sm text-gray-300">{currentUser.name}</p>
                  <p className="text-xs text-moto">{currentUser.role}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white hover:bg-moto/20"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <Button 
              onClick={() => navigate("/login")}
              className="bg-moto hover:bg-moto-dark text-black"
            >
              Login
            </Button>
          )}
          
          {/* Menu para dispositivos móveis */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300"
            >
              <div className="w-5 flex flex-col items-end space-y-1.5">
                <span className={`h-0.5 bg-current transition-all ${isMenuOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
                <span className={`h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : 'w-3'}`} />
                <span className={`h-0.5 bg-current transition-all ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-4'}`} />
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Menu móvel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black border-b border-moto/20 py-3 px-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link to="/dashboard" className="text-gray-300 hover:text-moto py-2 transition">
              Dashboard
            </Link>
            <Link to="/motos" className="text-gray-300 hover:text-moto py-2 transition">
              Motos
            </Link>
            <Link to="/patio" className="text-gray-300 hover:text-moto py-2 transition">
              Mapa do Pátio
            </Link>
            <Link to="/usuarios" className="text-gray-300 hover:text-moto py-2 transition">
              Usuários
            </Link>
            {currentUser && (
              <Button 
                onClick={handleLogout}
                variant="ghost"
                className="justify-start px-1 py-2 text-gray-300 hover:text-moto hover:bg-transparent"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sair
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
