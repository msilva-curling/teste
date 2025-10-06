import { useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const mockCreator = {
  username: 'sofia-davis',
  name: 'Sofia Davis',
  bio: 'Especialista em design e produtividade, ajudando criadores a alcançarem seu potencial máximo através de ferramentas e conhecimento prático.',
  avatar: 'https://img.usecurling.com/ppl/large?gender=female&seed=1',
}

const mockProducts = [
  {
    id: 1,
    name: 'Ebook de Finanças Pessoais',
    price: 49.9,
    image: 'https://img.usecurling.com/p/400/300?q=finance%20book',
  },
  {
    id: 3,
    name: 'Template Notion para Projetos',
    price: 29.9,
    image: 'https://img.usecurling.com/p/400/300?q=notion%20template',
  },
]
const mockCourses = [
  {
    id: 1,
    name: 'React do Zero ao Avançado',
    price: 497.0,
    image: 'https://img.usecurling.com/p/400/300?q=react%20course',
  },
  {
    id: 3,
    name: 'Fotografia para Iniciantes',
    price: 197.0,
    image: 'https://img.usecurling.com/p/400/300?q=photography%20course',
  },
]
const mockServices = [
  {
    id: 1,
    name: 'Consultoria de Carreira (1h)',
    price: 350.0,
    image: 'https://img.usecurling.com/p/400/300?q=career%20consulting',
  },
  {
    id: 2,
    name: 'Mentoria de UI/UX (Pacote 4 sessões)',
    price: 1200.0,
    image: 'https://img.usecurling.com/p/400/300?q=ui%20ux%20mentoring',
  },
]

const StorePage = () => {
  const { username } = useParams()

  return (
    <div className="space-y-8">
      <header className="bg-card p-8 rounded-lg text-center flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={mockCreator.avatar} alt={mockCreator.name} />
          <AvatarFallback>{mockCreator.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">{mockCreator.name}</h1>
        <p className="text-muted-foreground max-w-2xl mt-2">
          {mockCreator.bio}
        </p>
      </header>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {mockProducts.map((p) => (
              <Card key={p.id} className="overflow-hidden group">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <CardHeader>
                  <CardTitle className="truncate">{p.name}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">
                    R$ {p.price.toFixed(2).replace('.', ',')}
                  </span>
                  <Button>Comprar Agora</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {mockCourses.map((c) => (
              <Card key={c.id} className="overflow-hidden group">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <CardHeader>
                  <CardTitle className="truncate">{c.name}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">
                    R$ {c.price.toFixed(2).replace('.', ',')}
                  </span>
                  <Button>Inscrever-se</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="services">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {mockServices.map((s) => (
              <Card key={s.id} className="overflow-hidden group">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <CardHeader>
                  <CardTitle className="truncate">{s.name}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">
                    R$ {s.price.toFixed(2).replace('.', ',')}
                  </span>
                  <Button>Agendar Agora</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StorePage
