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

const mockProducts = [
  {
    id: 1,
    name: 'Ebook de Finanças Pessoais',
    price: 49.9,
    status: 'Publicado',
    category: 'Ebooks',
    image: 'https://img.usecurling.com/p/400/300?q=finance%20book',
  },
  {
    id: 2,
    name: 'Pack de Presets para Lightroom',
    price: 89.9,
    status: 'Rascunho',
    category: 'Design',
    image: 'https://img.usecurling.com/p/400/300?q=photo%20presets',
  },
  {
    id: 3,
    name: 'Template Notion para Projetos',
    price: 29.9,
    status: 'Publicado',
    category: 'Produtividade',
    image: 'https://img.usecurling.com/p/400/300?q=notion%20template',
  },
  {
    id: 4,
    name: 'Kit de UI para Figma',
    price: 129.9,
    status: 'Arquivado',
    category: 'Design',
    image: 'https://img.usecurling.com/p/400/300?q=ui%20kit',
  },
]

const ProductsPage = () => {
  const [products, setProducts] = useState(mockProducts)

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Meus Produtos Digitais
        </h1>
        <Button asChild>
          <Link to="/produtos/novo">
            <PlusCircle className="mr-2 h-5 w-5" />
            Criar Novo Produto
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
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="publicado">Publicado</SelectItem>
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="arquivado">Arquivado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <Badge
                    variant={
                      product.status === 'Publicado'
                        ? 'default'
                        : product.status === 'Rascunho'
                          ? 'secondary'
                          : 'destructive'
                    }
                    className="capitalize bg-success text-success-foreground"
                  >
                    {product.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/produtos/${product.id}/editar`}
                          className="flex items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/loja/sofia/${product.id}`}
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
                              permanentemente o produto.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(product.id)}
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
                <CardTitle className="text-lg mt-2 truncate">
                  {product.name}
                </CardTitle>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <p className="text-xl font-semibold text-primary">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Comece a vender criando seu primeiro produto digital.
          </p>
          <Button asChild>
            <Link to="/produtos/novo">
              <PlusCircle className="mr-2 h-5 w-5" />
              Criar Produto
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductsPage
