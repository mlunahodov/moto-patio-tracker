
import { useState } from "react";
import { Bike } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface MotoInfo {
  id: string;
  placa: string;
  modelo: string;
  cor: string;
  proprietario: string;
  dataEntrada: string;
}

interface ParkingSpotProps {
  id: string;
  row: number;
  number: number;
  motoInfo?: MotoInfo | null;
  isSelected?: boolean;
  onClick?: (id: string) => void;
}

const ParkingSpot = ({ 
  id, 
  row, 
  number, 
  motoInfo, 
  isSelected = false,
  onClick 
}: ParkingSpotProps) => {
  const isOccupied = !!motoInfo;
  
  const handleClick = () => {
    if (onClick) onClick(id);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleClick}
            className={cn(
              "parking-spot w-14 h-14 rounded-md border flex items-center justify-center",
              isOccupied ? "occupied" : "bg-muted border-muted-foreground/20",
              isSelected && "selected"
            )}
          >
            {isOccupied ? (
              <Bike className="w-6 h-6" />
            ) : (
              <span className="text-xs text-muted-foreground">{row}{number}</span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          {isOccupied ? (
            <div className="text-xs">
              <p className="font-bold">{motoInfo.placa}</p>
              <p>{motoInfo.modelo} - {motoInfo.cor}</p>
              <p>Proprietário: {motoInfo.proprietario}</p>
            </div>
          ) : (
            <p className="text-xs">Vaga {row}{number} - Disponível</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ParkingSpot;
