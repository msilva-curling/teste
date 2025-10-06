import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  Book,
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

const mockCourses = [
  {
    id: 1,
    name: 'React do Zero ao Avançado',
    price: 497.0,
    status: 'Publicado',
    category: 'Desenvolvimento',
    image: 'https://img.usecurling.com/p/400/300?q=react%20course',
    lessons: 56,
    students: 1204,
  },
  {
    id: 2,
    name: 'Design de Interfaces com Figma',
    price: 297.0,
    status: 'Rascunho',
    category: 'Design',
    image: 'https://img.usecurling.com/p/400/300?q=figma%20course',
    lessons: 34,
    students: 876,
  },
  {
    id: 3,
    name: 'Fotografia para Iniciantes',
    price: 197.0,
    status: 'Publicado',
    category: 'Fotografia',
    image: 'https://img.usecurling.com/p/400/300?q=photography%20course',
    lessons: 25,
    students: 2345,
  },
]

const CoursesPage = () => {
  const [courses, setCourses] = useState(mockCourses)

  const handleDelete = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Meus Cursos Online
        </h1>
        <Button asChild>
          <Link to="/cursos/novo">
            <PlusCircle className="mr-2 h-5 w-5" />
            Criar Novo Curso
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
          </SelectContent>
        </Select>
      </div>

      {courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col"
            >
              <CardHeader className="p-0 relative">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-background/70 hover:bg-background"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/cursos/${course.id}/editar`}
                          className="flex items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/loja/sofia/curso/${course.id}`}
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
                              permanentemente o curso e todos os seus dados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(course.id)}
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
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <CardTitle className="text-lg mb-2 truncate">
                  {course.name}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1.5">
                    <Book className="h-4 w-4" /> {course.lessons} aulas
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> {course.students} alunos
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <p className="text-xl font-semibold text-primary">
                  R$ {course.price.toFixed(2).replace('.', ',')}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">Nenhum curso encontrado</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Compartilhe seu conhecimento criando seu primeiro curso.
          </p>
          <Button asChild>
            <Link to="/cursos/novo">
              <PlusCircle className="mr-2 h-5 w-5" />
              Criar Curso
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default CoursesPage
