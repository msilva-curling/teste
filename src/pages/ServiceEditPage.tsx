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
import { Calendar } from '@/components/ui/calendar'

const serviceSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  description: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
  price: z.coerce.number().min(0, 'O preço não pode ser negativo.'),
  type: z.string().min(1, 'Selecione um tipo.'),
  duration: z.coerce
    .number()
    .int()
    .positive('A duração deve ser um número positivo.'),
})

const ServiceEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: isEditing ? 'Consultoria de Carreira (1h)' : '',
      description: isEditing
        ? 'Sessão individual para alavancar sua carreira.'
        : '',
      price: isEditing ? 350.0 : 0,
      type: isEditing ? 'Consultoria' : '',
      duration: isEditing ? 60 : 30,
    },
  })

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    console.log(data)
    toast({
      title: `Serviço ${isEditing ? 'atualizado' : 'criado'} com sucesso!`,
    })
    navigate('/servicos')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Editar Serviço' : 'Criar Novo Serviço'}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/servicos">Cancelar</Link>
            </Button>
            <Button type="submit">Salvar Serviço</Button>
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
                      <FormLabel>Nome do Serviço</FormLabel>
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
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Serviço</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Consultoria">
                            Consultoria
                          </SelectItem>
                          <SelectItem value="Mentoria">Mentoria</SelectItem>
                          <SelectItem value="Coaching">Coaching</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
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
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duração (minutos)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Disponibilidade</CardTitle>
                <CardDescription>
                  Defina seus horários disponíveis para agendamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="multiple" className="p-0" />
                <Button className="w-full mt-4">
                  Conectar com Google Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ServiceEditPage
