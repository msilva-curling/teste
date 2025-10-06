import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { UploadCloud } from 'lucide-react'

const productSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  description: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
  price: z.coerce.number().min(0, 'O preço não pode ser negativo.'),
  category: z.string().min(1, 'Selecione uma categoria.'),
  status: z.enum(['Rascunho', 'Publicado']),
})

const ProductEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: isEditing ? 'Ebook de Finanças Pessoais' : '',
      description: isEditing
        ? 'Um guia completo para organizar suas finanças.'
        : '',
      price: isEditing ? 49.9 : 0,
      category: isEditing ? 'Ebooks' : '',
      status: 'Rascunho',
    },
  })

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    console.log(data)
    toast({
      title: `Produto ${isEditing ? 'atualizado' : 'criado'} com sucesso!`,
      description: `O produto "${data.name}" foi salvo.`,
    })
    navigate('/produtos')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditing ? 'Editar Produto' : 'Criar Novo Produto'}
            </h1>
            <p className="text-muted-foreground">
              Preencha os detalhes abaixo.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/produtos">Cancelar</Link>
            </Button>
            <Button type="submit">Salvar e Publicar</Button>
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
                      <FormLabel>Nome do Produto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ebook de Receitas" {...field} />
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
                        <Textarea
                          placeholder="Descreva seu produto em detalhes..."
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mídia</CardTitle>
                <CardDescription>
                  Faça upload da imagem de capa e dos arquivos do produto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <FormLabel>Imagem de Capa</FormLabel>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-4 text-sm leading-6 text-gray-600">
                        Arraste e solte ou{' '}
                        <span className="text-primary font-semibold">
                          procure um arquivo
                        </span>
                      </p>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF até 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <FormLabel>Arquivos do Produto</FormLabel>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-4 text-sm leading-6 text-gray-600">
                        Arraste e solte ou{' '}
                        <span className="text-primary font-semibold">
                          procure um arquivo
                        </span>
                      </p>
                      <p className="text-xs leading-5 text-gray-600">
                        PDF, ZIP, MP3, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preço e Publicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="49,90"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ebooks">Ebooks</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Produtividade">
                            Produtividade
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Rascunho">Rascunho</SelectItem>
                          <SelectItem value="Publicado">Publicado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ProductEditPage
