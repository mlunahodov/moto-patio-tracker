
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecione para a página de login quando o aplicativo iniciar
    navigate("/login");
  }, [navigate]);

  return null; // Esta página apenas redireciona, então não precisa renderizar nada
};

export default Index;
