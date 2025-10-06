import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="payment">Pagamento</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="brand">Marca</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil Público</CardTitle>
              <CardDescription>
                Informações exibidas na sua loja.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://img.usecurling.com/ppl/large?gender=female&seed=1" />
                  <AvatarFallback>SL</AvatarFallback>
                </Avatar>
                <Button variant="outline">Alterar Foto</Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" defaultValue="Sofia Davis" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="sofia.davis@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Especialista em design e produtividade, ajudando criadores a alcançarem seu potencial."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL da Loja</Label>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground p-2 bg-secondary rounded-l-md border border-r-0">
                    saaslucrativo.com/loja/
                  </span>
                  <Input
                    id="url"
                    defaultValue="sofia-davis"
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos</CardTitle>
              <CardDescription>
                Conecte sua conta para receber pagamentos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Stripe</h3>
                  <p className="text-sm text-muted-foreground">Conectado</p>
                </div>
                <Button variant="destructive">Desconectar</Button>
              </div>
              <Button>Conectar com PayPal</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Gerencie como você recebe notificações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="sales-notifications">Novas Vendas</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber email para cada nova venda.
                  </p>
                </div>
                <Switch id="sales-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="messages-notifications">
                    Novas Mensagens
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receber email para novas mensagens de clientes.
                  </p>
                </div>
                <Switch id="messages-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Marca da Loja</CardTitle>
              <CardDescription>
                Personalize a aparência da sua loja pública.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Cor Primária</Label>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary border" />
                  <Input type="color" defaultValue="#007BFF" className="w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logotipo</Label>
                <Input type="file" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage
