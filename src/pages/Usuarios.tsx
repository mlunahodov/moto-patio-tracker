
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Search, MoreVertical, Edit, Trash, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Usuário atual mockado
const currentUser = {
  name: "Admin",
  role: "Administrador"
};

// Tipos
interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  permissao: "admin" | "operador" | "visualizador";
  ultimoAcesso: string;
  status: "ativo" | "inativo";
}

// Usuários mockados
const mockUsuarios: Usuario[] = [
  {
    id: "1",
    nome: "Admin",
    email: "admin@motopatio.com",
    cargo: "Gerente de Sistema",
    permissao: "admin",
    ultimoAcesso: "2025-05-07T10:30:00",
    status: "ativo"
  },
  {
    id: "2",
    nome: "João Silva",
    email: "joao@motopatio.com",
    cargo: "Supervisor",
    permissao: "operador",
    ultimoAcesso: "2025-05-06T14:15:00",
    status: "ativo"
  },
  {
    id: "3",
    nome: "Maria Santos",
    email: "maria@motopatio.com",
    cargo: "Operadora",
    permissao: "operador",
    ultimoAcesso: "2025-05-05T09:45:00",
    status: "ativo"
  },
  {
    id: "4",
    nome: "Pedro Almeida",
    email: "pedro@motopatio.com",
    cargo: "Segurança",
    permissao: "visualizador",
    ultimoAcesso: "2025-05-04T16:30:00",
    status: "ativo"
  },
  {
    id: "5",
    nome: "Ana Pereira",
    email: "ana@motopatio.com",
    cargo: "Auxiliar Administrativo",
    permissao: "visualizador",
    ultimoAcesso: "2025-04-30T11:20:00",
    status: "inativo"
  }
];

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [permissao, setPermissao] = useState<"admin" | "operador" | "visualizador">("visualizador");
  
  const { toast } = useToast();

  const filteredUsuarios = usuarios.filter((usuario) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      usuario.nome.toLowerCase().includes(searchLower) ||
      usuario.email.toLowerCase().includes(searchLower) ||
      usuario.cargo.toLowerCase().includes(searchLower)
    );
  });

  const resetForm = () => {
    setNome("");
    setEmail("");
    setCargo("");
    setPermissao("visualizador");
  };

  const handleNewUsuario = () => {
    setSelectedUsuario(null);
    resetForm();
    setIsFormOpen(true);
  };

  const handleEditUsuario = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setCargo(usuario.cargo);
    setPermissao(usuario.permissao);
    setIsFormOpen(true);
  };

  const handleDeleteUsuario = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUsuario) {
      setUsuarios(usuarios.filter((u) => u.id !== selectedUsuario.id));
      toast({
        title: "Usuário removido",
        description: `${selectedUsuario.nome} foi removido com sucesso.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedUsuario(null);
    }
  };

  const handleSubmitUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!nome || !email || !cargo || !permissao) {
      toast({
        title: "Erro no formulário",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedUsuario) {
      // Editar usuário existente
      setUsuarios(
        usuarios.map((u) =>
          u.id === selectedUsuario.id
            ? {
                ...u,
                nome,
                email,
                cargo,
                permissao,
              }
            : u
        )
      );
      
      toast({
        title: "Usuário atualizado",
        description: `${nome} foi atualizado com sucesso.`,
      });
    } else {
      // Adicionar novo usuário
      const newUsuario: Usuario = {
        id: `${usuarios.length + 1}`,
        nome,
        email,
        cargo,
        permissao,
        ultimoAcesso: new Date().toISOString(),
        status: "ativo",
      };
      
      setUsuarios([...usuarios, newUsuario]);
      toast({
        title: "Usuário criado",
        description: `${nome} foi adicionado com sucesso.`,
      });
    }
    
    setIsFormOpen(false);
    resetForm();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPermissionLabel = (permissao: string) => {
    switch (permissao) {
      case "admin":
        return "Administrador";
      case "operador":
        return "Operador";
      case "visualizador":
        return "Visualizador";
      default:
        return permissao;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentUser={currentUser} />
      
      <main className="container py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
            <p className="text-muted-foreground">
              Gerencie os usuários com acesso ao sistema.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar usuários..."
                className="pl-8 bg-muted border-muted-foreground/20 focus:border-moto w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              className="bg-moto hover:bg-moto-dark text-black"
              onClick={handleNewUsuario}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </div>
        </div>
        
        <Card className="bg-card border-muted">
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
            <CardDescription>
              Gerenciamento de usuários e permissões de acesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-muted">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-muted bg-muted/50">
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Nome</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">E-mail</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Cargo</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Permissão</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Último Acesso</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Status</th>
                      <th className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsuarios.length > 0 ? (
                      filteredUsuarios.map((usuario) => (
                        <tr key={usuario.id} className="border-b border-muted last:border-0">
                          <td className="p-4 text-sm font-medium">{usuario.nome}</td>
                          <td className="p-4 text-sm">{usuario.email}</td>
                          <td className="p-4 text-sm">{usuario.cargo}</td>
                          <td className="p-4 text-sm">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                usuario.permissao === "admin"
                                  ? "bg-moto/80 text-black"
                                  : usuario.permissao === "operador"
                                  ? "bg-blue-500 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {getPermissionLabel(usuario.permissao)}
                            </span>
                          </td>
                          <td className="p-4 text-sm">{formatDate(usuario.ultimoAcesso)}</td>
                          <td className="p-4 text-sm">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                usuario.status === "ativo"
                                  ? "bg-moto/20 text-moto"
                                  : "bg-destructive/20 text-destructive"
                              }`}
                            >
                              {usuario.status === "ativo" ? "Ativo" : "Inativo"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-card">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleEditUsuario(usuario)}
                                  className="cursor-pointer"
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Editar</span>
                                </DropdownMenuItem>
                                {usuario.id !== "1" && ( // Não permitir excluir o admin principal
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteUsuario(usuario)}
                                    className="cursor-pointer text-destructive focus:text-destructive"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Excluir</span>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          Nenhum usuário encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Modal de Formulário */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-card border-moto/20">
          <DialogHeader>
            <DialogTitle className="text-moto">
              {selectedUsuario ? 'Editar Usuário' : 'Novo Usuário'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitUsuario} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-muted border-muted-foreground/20 focus:border-moto"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted border-muted-foreground/20 focus:border-moto"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  placeholder="Cargo do usuário"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="bg-muted border-muted-foreground/20 focus:border-moto"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permissao">Permissão</Label>
                <Select 
                  value={permissao} 
                  onValueChange={(value) => setPermissao(value as "admin" | "operador" | "visualizador")}
                >
                  <SelectTrigger className="bg-muted border-muted-foreground/20 focus:border-moto">
                    <SelectValue placeholder="Selecione a permissão" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="operador">Operador</SelectItem>
                    <SelectItem value="visualizador">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsFormOpen(false)}
                className="border-moto/30 hover:bg-moto/10 text-muted-foreground"
              >
                Cancelar
              </Button>
              
              <Button 
                type="submit"
                className="bg-moto hover:bg-moto-dark text-black"
              >
                {selectedUsuario ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-card border-destructive/20">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Tem certeza que deseja excluir o usuário {selectedUsuario?.nome}? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-muted-foreground/20"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Usuarios;
