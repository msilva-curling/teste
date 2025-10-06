import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const mockServices = [
  {
    id: 1,
    name: 'Consultoria de Carreira (1h)',
    price: 350.0,
    status: 'Ativo',
    type: 'Consultoria',
    description: 'Sessão individual para alavancar sua carreira profissional.',
  },
  {
    id: 2,
    name: 'Mentoria de UI/UX (Pacote 4 sessões)',
    price: 1200.0,
    status: 'Ativo',
    type: 'Mentoria',
    description: 'Acompanhamento para aprimorar suas habilidades em design.',
  },
  {
    id: 3,
    name: 'Coaching de Produtividade',
    price: 250.0,
    status: 'Inativo',
    type: 'Coaching',
    description: 'Sessão para otimizar sua rotina e alcançar seus objetivos.',
  },
]

const ServicesPage = () => {
  const [services, setServices] = useState(mockServices)

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Meus Serviços</h1>
        <Button asChild>
          <Link to="/servicos/novo">
            <PlusCircle className="mr-2 h-5 w-5" />
            Criar Novo Serviço
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consultoria">Consultoria</SelectItem>
            <SelectItem value="mentoria">Mentoria</SelectItem>
            <SelectItem value="coaching">Coaching</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {services.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mt-2 -mr-2"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/servicos/${service.id}/editar`}
                          className="flex items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/loja/sofia/servico/${service.id}`}
                          target="_blank"
                          className="flex items-center"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </Link>
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-destructive focus:text-destructive flex items-center"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Você tem certeza?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa ação não pode ser desfeita. Isso excluirá
                              permanentemente o serviço.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(service.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <Badge
                  variant={
                    service.status === 'Ativo' ? 'success' : 'destructive'
                  }
                  className="capitalize bg-success text-success-foreground"
                >
                  {service.status}
                </Badge>
              </CardContent>
              <CardFooter>
                <p className="text-xl font-semibold text-primary">
                  R$ {service.price.toFixed(2).replace('.', ',')}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">Nenhum serviço encontrado</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Ofereça sua expertise criando seu primeiro serviço.
          </p>
          <Button asChild>
            <Link to="/servicos/novo">
              <PlusCircle className="mr-2 h-5 w-5" />
              Criar Serviço
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ServicesPage
