
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Motorcycle, Users, MapPin, Activity } from "lucide-react";
import ParkingLayout from "@/components/ParkingLayout";

// Usuário atual mockado
const currentUser = {
  name: "Admin",
  role: "Administrador"
};

// Estatísticas para o dashboard
const stats = [
  {
    title: "Total de Motos",
    value: "37",
    change: "+5%",
    icon: <Motorcycle className="h-5 w-5" />
  },
  {
    title: "Usuários Ativos",
    value: "12",
    change: "+2",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Ocupação Atual",
    value: "68%",
    change: "+12%",
    icon: <MapPin className="h-5 w-5" />
  },
  {
    title: "Atividade Diária",
    value: "24",
    change: "+8",
    icon: <Activity className="h-5 w-5" />
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header currentUser={currentUser} />
      
      <main className="container py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral do sistema de gerenciamento do pátio de motos.
            </p>
          </div>
        </div>
        
        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-muted">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="bg-moto/10 p-2 rounded-full text-moto">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-moto mt-1">{stat.change} desde ontem</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="visao-geral" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:max-w-3xl">
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="patio">Mapa do Pátio</TabsTrigger>
            <TabsTrigger value="atividade">Atividade Recente</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visao-geral" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card border-muted">
                <CardHeader>
                  <CardTitle>Motos por Status</CardTitle>
                  <CardDescription>
                    Distribuição atual de motos no pátio
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* Um gráfico simples com dados mockados */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">No pátio</span>
                        <span className="text-sm font-medium">37</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded overflow-hidden">
                        <div className="h-full bg-moto" style={{ width: "74%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Liberadas hoje</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded overflow-hidden">
                        <div className="h-full bg-moto" style={{ width: "24%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Apreendidas</span>
                        <span className="text-sm font-medium">8</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded overflow-hidden">
                        <div className="h-full bg-moto" style={{ width: "16%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-muted">
                <CardHeader>
                  <CardTitle>Entradas por Dia</CardTitle>
                  <CardDescription>
                    Últimos 7 dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[120px] items-end gap-2">
                    {[40, 25, 55, 32, 80, 45, 65].map((height, i) => (
                      <div
                        key={i}
                        className="bg-moto/20 hover:bg-moto transition-colors rounded-sm w-full"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Seg</span>
                    <span>Ter</span>
                    <span>Qua</span>
                    <span>Qui</span>
                    <span>Sex</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-muted col-span-full md:col-span-1">
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Acesse funcionalidades principais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-muted hover:bg-moto/20 rounded-md text-center transition-colors">
                      <Motorcycle className="mx-auto h-6 w-6 mb-2 text-moto" />
                      <span className="text-sm font-medium">Nova Moto</span>
                    </button>
                    <button className="p-4 bg-muted hover:bg-moto/20 rounded-md text-center transition-colors">
                      <Users className="mx-auto h-6 w-6 mb-2 text-moto" />
                      <span className="text-sm font-medium">Usuários</span>
                    </button>
                    <button className="p-4 bg-muted hover:bg-moto/20 rounded-md text-center transition-colors">
                      <MapPin className="mx-auto h-6 w-6 mb-2 text-moto" />
                      <span className="text-sm font-medium">Ver Pátio</span>
                    </button>
                    <button className="p-4 bg-muted hover:bg-moto/20 rounded-md text-center transition-colors">
                      <Activity className="mx-auto h-6 w-6 mb-2 text-moto" />
                      <span className="text-sm font-medium">Relatórios</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="patio" className="mt-6">
            <Card className="bg-card border-muted">
              <CardHeader>
                <CardTitle>Mapa do Pátio</CardTitle>
                <CardDescription>
                  Visualização atual da ocupação do pátio de motos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ParkingLayout />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="atividade" className="mt-6">
            <Card className="bg-card border-muted">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Últimas ações realizadas no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      user: "Admin",
                      action: "cadastrou a moto",
                      target: "Honda CG 160",
                      time: "há 2 minutos"
                    },
                    {
                      user: "João Silva",
                      action: "liberou a moto",
                      target: "XRE 300",
                      time: "há 45 minutos"
                    },
                    {
                      user: "Maria Santos",
                      action: "atualizou os dados da moto",
                      target: "Z900",
                      time: "há 1 hora"
                    },
                    {
                      user: "Admin",
                      action: "cadastrou um novo usuário",
                      target: "Pedro Almeida",
                      time: "há 3 horas"
                    },
                    {
                      user: "Admin",
                      action: "gerou um relatório de",
                      target: "motos no pátio",
                      time: "há 5 horas"
                    }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="bg-moto/10 p-2 rounded-full text-moto">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="text-moto">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
