import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ShoppingCart, UserPlus, MessageSquare } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'sale',
    description: 'Nova venda do produto "Ebook de Finanças".',
    time: '5 minutos atrás',
    user: {
      name: 'Carlos Pereira',
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    },
    icon: ShoppingCart,
  },
  {
    id: 2,
    type: 'subscriber',
    description: 'Novo inscrito no curso "React do Zero".',
    time: '1 hora atrás',
    user: {
      name: 'Ana Souza',
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
    },
    icon: UserPlus,
  },
  {
    id: 3,
    type: 'comment',
    description: 'Novo comentário na aula "Hooks Avançados".',
    time: '3 horas atrás',
    user: {
      name: 'Pedro Martins',
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
    },
    icon: MessageSquare,
  },
  {
    id: 4,
    type: 'sale',
    description: 'Nova venda do serviço "Consultoria de Carreira".',
    time: 'ontem',
    user: {
      name: 'Juliana Costa',
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=4',
    },
    icon: ShoppingCart,
  },
]

export const ActivityFeed = () => {
  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage
                  src={activity.user.image}
                  alt={activity.user.name}
                />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{activity.user.name}</span>{' '}
                  {activity.description.split(' ').slice(2).join(' ')}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <activity.icon className="h-5 w-5 text-muted-foreground" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
