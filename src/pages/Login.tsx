import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login com timeout
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao sistema MotoPátio!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro no login",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de registro com timeout
    setTimeout(() => {
      setIsLoading(false);
      if (name && email && password) {
        toast({
          title: "Cadastro realizado com sucesso",
          description: "Você já pode fazer login no sistema!",
        });
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast({
          title: "Erro no cadastro",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="bg-moto/10 p-3 rounded-full">
            <Bike className="h-10 w-10 text-moto" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="text-moto">Moto</span>Pátio
          </h1>
          <p className="text-muted-foreground">
            Sistema de gerenciamento de pátio de motos
          </p>
        </div>

        <div className="border border-muted bg-card rounded-lg p-6 shadow-lg shadow-black/10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted border-muted-foreground/20 focus:border-moto"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <a 
                      href="#" 
                      className="text-xs text-moto hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-muted border-muted-foreground/20 focus:border-moto"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-moto hover:bg-moto-dark text-black"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-muted border-muted-foreground/20 focus:border-moto"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">E-mail</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted border-muted-foreground/20 focus:border-moto"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-muted border-muted-foreground/20 focus:border-moto"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-moto hover:bg-moto-dark text-black"
                  disabled={isLoading}
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MotoPátio. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
