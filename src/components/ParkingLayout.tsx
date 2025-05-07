
import { useState } from "react";
import ParkingSpot, { MotoInfo } from "./ParkingSpot";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Dados de exemplo
const sampleMotos: MotoInfo[] = [
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
  }
];

const ParkingLayout = () => {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [occupiedSpots, setOccupiedSpots] = useState<{[key: string]: MotoInfo}>(
    // Convertendo a array de exemplo em um objeto indexado pelo ID
    sampleMotos.reduce((acc, moto) => {
      acc[moto.id] = moto;
      return acc;
    }, {} as {[key: string]: MotoInfo})
  );
  
  const { toast } = useToast();
  
  const handleSpotClick = (id: string) => {
    setSelectedSpot(id);
    
    if (occupiedSpots[id]) {
      toast({
        title: "Vaga ocupada",
        description: `Moto ${occupiedSpots[id].placa} - ${occupiedSpots[id].modelo}`,
        duration: 3000
      });
    } else {
      toast({
        title: "Vaga disponível",
        description: `Vaga ${id} selecionada`,
        duration: 3000
      });
    }
  };
  
  // Definindo as variáveis que estavam indefinidas
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const columns = 5;
  
  // Gerar layout de estacionamento
  const generateParkingGrid = () => {
    return (
      <div className="grid gap-8 mb-8">
        {rows.map((row) => (
          <div key={row} className="flex justify-center space-x-4">
            {[...Array(columns)].map((_, colIndex) => {
              const spotId = `${row}${colIndex + 1}`;
              return (
                <ParkingSpot
                  key={spotId}
                  id={spotId}
                  row={row.charCodeAt(0) - 64}
                  number={colIndex + 1}
                  motoInfo={occupiedSpots[spotId] || null}
                  isSelected={selectedSpot === spotId}
                  onClick={handleSpotClick}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center p-4 rounded-md bg-muted">
        <div className="w-full max-w-md mx-auto p-2 mb-6 bg-black rounded-t-xl border-x border-t border-moto/30">
          <p className="text-moto text-sm font-medium">ENTRADA</p>
        </div>
        
        {generateParkingGrid()}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            <div className="w-4 h-4 rounded-full bg-moto"></div>
            <span className="text-xs text-muted-foreground">Ocupado</span>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="w-4 h-4 rounded-full bg-muted border border-muted-foreground/20"></div>
            <span className="text-xs text-muted-foreground">Disponível</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-moto/50 text-moto hover:bg-moto/10">
                Detalhes do Pátio
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-moto/20">
              <DialogHeader>
                <DialogTitle className="text-moto">Informações do Pátio</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-md">
                  <p className="text-2xl font-bold text-moto">
                    {Object.keys(occupiedSpots).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Vagas Ocupadas</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-md">
                  <p className="text-2xl font-bold text-moto">
                    {rows.length * columns - Object.keys(occupiedSpots).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Vagas Disponíveis</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-md">
                  <p className="text-2xl font-bold text-moto">25</p>
                  <p className="text-xs text-muted-foreground">Total de Vagas</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-md">
                  <p className="text-2xl font-bold text-moto">
                    {Math.round((Object.keys(occupiedSpots).length / (rows.length * columns)) * 100)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Ocupação</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ParkingLayout;
