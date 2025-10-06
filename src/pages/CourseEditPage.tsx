import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { UploadCloud, PlusCircle, GripVertical, Trash2 } from 'lucide-react'

const courseSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  description: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
  price: z.coerce.number().min(0, 'O preço não pode ser negativo.'),
  modules: z.array(
    z.object({
      title: z.string().min(1, 'O título do módulo é obrigatório.'),
      lessons: z.array(
        z.object({
          title: z.string().min(1, 'O título da aula é obrigatório.'),
        }),
      ),
    }),
  ),
})

const CourseEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: isEditing ? 'React do Zero ao Avançado' : '',
      description: isEditing
        ? 'Aprenda a construir aplicações web modernas.'
        : '',
      price: isEditing ? 497.0 : 0,
      modules: isEditing
        ? [
            {
              title: 'Introdução',
              lessons: [
                { title: 'Bem-vindo ao curso' },
                { title: 'Configurando o ambiente' },
              ],
            },
          ]
        : [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'modules',
  })

  const onSubmit = (data: z.infer<typeof courseSchema>) => {
    console.log(data)
    toast({
      title: `Curso ${isEditing ? 'atualizado' : 'criado'} com sucesso!`,
    })
    navigate('/cursos')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Editar Curso' : 'Criar Novo Curso'}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/cursos">Cancelar</Link>
            </Button>
            <Button type="submit">Salvar Curso</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Curso</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Estrutura do Curso</CardTitle>
                <CardDescription>Adicione módulos e aulas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border rounded-lg space-y-4 bg-secondary/50"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                      <FormField
                        control={form.control}
                        name={`modules.${index}.title`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Título do Módulo"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    {/* Lesson management would go here */}
                    <Button variant="outline" size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Aula
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append({ title: '', lessons: [] })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Módulo
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preço e Mídia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel>Imagem de Capa</FormLabel>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10">
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-2 text-sm text-gray-600">
                        Arraste ou{' '}
                        <span className="text-primary font-semibold">
                          procure
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CourseEditPage
