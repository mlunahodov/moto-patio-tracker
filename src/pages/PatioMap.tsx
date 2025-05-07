
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ParkingLayout from "@/components/ParkingLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Motorcycle } from "lucide-react";

// Usuário atual mockado
const currentUser = {
  name: "Admin",
  role: "Administrador"
};

const PatioMap = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header currentUser={currentUser} />
      
      <main className="container py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mapa do Pátio</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie as vagas do pátio de motos.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Button 
              className="bg-moto hover:bg-moto-dark text-black"
              onClick={() => window.location.href = "/motos/new"}
            >
              <Motorcycle className="mr-2 h-4 w-4" />
              Nova Moto
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6">
          <Card className="bg-card border-muted">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                  <CardTitle>Visão do Pátio</CardTitle>
                  <CardDescription>
                    Visualização completa das vagas disponíveis e ocupadas
                  </CardDescription>
                </div>
                
                <Tabs defaultValue="all" className="mt-4 md:mt-0">
                  <TabsList>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="occupied">Ocupadas</TabsTrigger>
                    <TabsTrigger value="available">Disponíveis</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ParkingLayout />
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-muted">
              <CardHeader>
                <CardTitle>Estatísticas do Pátio</CardTitle>
                <CardDescription>
                  Resumo da ocupação atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-md text-center">
                    <h3 className="text-3xl font-bold text-moto">68%</h3>
                    <p className="text-xs text-muted-foreground mt-1">Taxa de Ocupação</p>
                  </div>
                  <div className="p-4 bg-muted rounded-md text-center">
                    <h3 className="text-3xl font-bold text-moto">17</h3>
                    <p className="text-xs text-muted-foreground mt-1">Vagas Disponíveis</p>
                  </div>
                  <div className="p-4 bg-muted rounded-md text-center">
                    <h3 className="text-3xl font-bold text-moto">37</h3>
                    <p className="text-xs text-muted-foreground mt-1">Motos no Pátio</p>
                  </div>
                  <div className="p-4 bg-muted rounded-md text-center">
                    <h3 className="text-3xl font-bold text-moto">8</h3>
                    <p className="text-xs text-muted-foreground mt-1">Entradas Hoje</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-muted">
              <CardHeader>
                <CardTitle>Alertas</CardTitle>
                <CardDescription>
                  Notificações importantes sobre o pátio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-md">
                    <h4 className="font-medium text-yellow-400">Pátio quase cheio</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      O pátio está com mais de 65% de ocupação. Considere reorganizar as vagas.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-moto/20 bg-moto/10 rounded-md">
                    <h4 className="font-medium text-moto">Manutenção agendada</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manutenção do sistema programada para amanhã às 22h.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-blue-500/20 bg-blue-500/10 rounded-md">
                    <h4 className="font-medium text-blue-400">Novo usuário</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Um novo operador foi adicionado ao sistema.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatioMap;
