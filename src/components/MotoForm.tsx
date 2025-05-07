
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MotoInfo } from "./ParkingSpot";

interface MotoFormProps {
  existingMoto?: MotoInfo;
  onSubmit: (moto: Omit<MotoInfo, "id" | "dataEntrada">) => void;
  onCancel?: () => void;
}

const MotoForm = ({ existingMoto, onSubmit, onCancel }: MotoFormProps) => {
  const [placa, setPlaca] = useState(existingMoto?.placa || "");
  const [modelo, setModelo] = useState(existingMoto?.modelo || "");
  const [cor, setCor] = useState(existingMoto?.cor || "");
  const [proprietario, setProprietario] = useState(existingMoto?.proprietario || "");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!placa || !modelo || !cor || !proprietario) {
      toast({
        title: "Erro no formulário",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({
      placa,
      modelo,
      cor,
      proprietario
    });
    
    toast({
      title: "Sucesso!",
      description: existingMoto 
        ? "Moto atualizada com sucesso" 
        : "Moto cadastrada com sucesso",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="placa">Placa</Label>
          <Input
            id="placa"
            placeholder="ABC1234"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            className="bg-muted border-muted-foreground/20 focus:border-moto"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="modelo">Modelo</Label>
          <Input
            id="modelo"
            placeholder="Honda CB 500"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="bg-muted border-muted-foreground/20 focus:border-moto"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cor">Cor</Label>
          <Select value={cor} onValueChange={setCor}>
            <SelectTrigger className="bg-muted border-muted-foreground/20 focus:border-moto">
              <SelectValue placeholder="Selecione a cor" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="Preta">Preta</SelectItem>
              <SelectItem value="Branca">Branca</SelectItem>
              <SelectItem value="Vermelha">Vermelha</SelectItem>
              <SelectItem value="Azul">Azul</SelectItem>
              <SelectItem value="Prata">Prata</SelectItem>
              <SelectItem value="Verde">Verde</SelectItem>
              <SelectItem value="Amarela">Amarela</SelectItem>
              <SelectItem value="Laranja">Laranja</SelectItem>
              <SelectItem value="Roxa">Roxa</SelectItem>
              <SelectItem value="Marrom">Marrom</SelectItem>
              <SelectItem value="Cinza">Cinza</SelectItem>
              <SelectItem value="Outra">Outra</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="proprietario">Proprietário</Label>
          <Input
            id="proprietario"
            placeholder="Nome do proprietário"
            value={proprietario}
            onChange={(e) => setProprietario(e.target.value)}
            className="bg-muted border-muted-foreground/20 focus:border-moto"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="border-moto/30 hover:bg-moto/10 text-muted-foreground"
          >
            Cancelar
          </Button>
        )}
        
        <Button 
          type="submit"
          className="bg-moto hover:bg-moto-dark text-black"
        >
          {existingMoto ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
};

export default MotoForm;
