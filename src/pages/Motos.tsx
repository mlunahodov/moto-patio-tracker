import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Bike, Search, MoreVertical, Edit, Trash } from "lucide-react";
import { MotoInfo } from "@/components/ParkingSpot";
import MotoForm from "@/components/MotoForm";
import { useToast } from "@/components/ui/use-toast";

// Usuário atual mockado
const currentUser = {
  name: "Admin",
  role: "Administrador"
};

// Lista de motos mockada
const mockMotos: MotoInfo[] = [
  {
    id: "A1",
    placa: "ABC1234",
    modelo: "Honda CB 500",
    cor: "Vermelha",
    proprietario: "João Silva",
    dataEntrada: "2025-05-07T10:30:00"
  },
  {
    id: "B3",
    placa: "XYZ5678",
    modelo: "Yamaha MT-07",
    cor: "Preta",
    proprietario: "Maria Santos",
    dataEntrada: "2025-05-07T11:45:00"
  },
  {
    id: "C2",
    placa: "DEF9012",
    modelo: "Kawasaki Z900",
    cor: "Verde",
    proprietario: "Pedro Almeida",
    dataEntrada: "2025-05-07T14:15:00"
  },
  {
    id: "D5",
    placa: "GHI3456",
    modelo: "Suzuki GSX-R 750",
    cor: "Azul",
    proprietario: "Ana Pereira",
    dataEntrada: "2025-05-07T15:20:00"
  },
  {
    id: "E4",
    placa: "JKL7890",
    modelo: "BMW S1000RR",
    cor: "Branca",
    proprietario: "Carlos Mendes",
    dataEntrada: "2025-05-07T16:10:00"
  }
];

const Motos = () => {
  const [motos, setMotos] = useState<MotoInfo[]>(mockMotos);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMoto, setSelectedMoto] = useState<MotoInfo | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredMotos = motos.filter((moto) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      moto.placa.toLowerCase().includes(searchLower) ||
      moto.modelo.toLowerCase().includes(searchLower) ||
      moto.proprietario.toLowerCase().includes(searchLower)
    );
  });

  const handleNewMoto = () => {
    setSelectedMoto(null);
    setIsFormOpen(true);
  };

  const handleEditMoto = (moto: MotoInfo) => {
    setSelectedMoto(moto);
    setIsFormOpen(true);
  };

  const handleDeleteMoto = (moto: MotoInfo) => {
    setSelectedMoto(moto);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMoto) {
      setMotos(motos.filter((m) => m.id !== selectedMoto.id));
      toast({
        title: "Moto removida",
        description: `A moto ${selectedMoto.placa} foi removida com sucesso.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedMoto(null);
    }
  };

  const handleSubmitMoto = (motoData: Omit<MotoInfo, "id" | "dataEntrada">) => {
    if (selectedMoto) {
      // Editar moto existente
      setMotos(
        motos.map((m) =>
          m.id === selectedMoto.id
            ? {
                ...m,
                ...motoData,
              }
            : m
        )
      );
    } else {
      // Adicionar nova moto
      const newMoto: MotoInfo = {
        id: `X${motos.length + 1}`,
        ...motoData,
        dataEntrada: new Date().toISOString(),
      };
      setMotos([...motos, newMoto]);
    }
    setIsFormOpen(false);
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

  return (
    <div className="min-h-screen bg-background">
      <Header currentUser={currentUser} />
      
      <main className="container py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Motos</h1>
            <p className="text-muted-foreground">
              Gerencie as motos registradas no sistema.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar motos..."
                className="pl-8 bg-muted border-muted-foreground/20 focus:border-moto w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              className="bg-moto hover:bg-moto-dark text-black"
              onClick={handleNewMoto}
            >
              <Bike className="mr-2 h-4 w-4" />
              Nova Moto
            </Button>
          </div>
        </div>
        
        <Card className="bg-card border-muted">
          <CardHeader>
            <CardTitle>Registro de Motos</CardTitle>
            <CardDescription>
              Lista completa das motos cadastradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-muted">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-muted bg-muted/50">
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Placa</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Modelo</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Cor</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Proprietário</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Data Entrada</th>
                      <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Vaga</th>
                      <th className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMotos.length > 0 ? (
                      filteredMotos.map((moto) => (
                        <tr key={moto.id} className="border-b border-muted last:border-0">
                          <td className="p-4 text-sm">{moto.placa}</td>
                          <td className="p-4 text-sm">{moto.modelo}</td>
                          <td className="p-4 text-sm">
                            <span className="flex items-center">
                              <span 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ 
                                  backgroundColor: 
                                    moto.cor.toLowerCase() === "preta" ? "#000" :
                                    moto.cor.toLowerCase() === "branca" ? "#fff" :
                                    moto.cor.toLowerCase() === "vermelha" ? "#ef4444" :
                                    moto.cor.toLowerCase() === "azul" ? "#3b82f6" :
                                    moto.cor.toLowerCase() === "verde" ? "#22c55e" :
                                    "#d1d5db"
                                }}
                              ></span>
                              {moto.cor}
                            </span>
                          </td>
                          <td className="p-4 text-sm">{moto.proprietario}</td>
                          <td className="p-4 text-sm">{formatDate(moto.dataEntrada)}</td>
                          <td className="p-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-moto text-black font-medium">{moto.id}</span>
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
                                  onClick={() => handleEditMoto(moto)}
                                  className="cursor-pointer"
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Editar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteMoto(moto)}
                                  className="cursor-pointer text-destructive focus:text-destructive"
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Excluir</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          Nenhuma moto encontrada.
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
              {selectedMoto ? 'Editar Moto' : 'Cadastrar Nova Moto'}
            </DialogTitle>
          </DialogHeader>
          <MotoForm
            existingMoto={selectedMoto || undefined}
            onSubmit={handleSubmitMoto}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-card border-destructive/20">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Tem certeza que deseja excluir a moto {selectedMoto?.placa}? Esta ação não pode ser desfeita.
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

export default Motos;
