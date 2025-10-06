import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'

const insights = [
  {
    id: 1,
    text: "Seu curso 'React do Zero' está performando bem, considere criar um módulo avançado!",
    action: { text: 'Editar Curso', link: '/cursos/1/editar' },
  },
  {
    id: 2,
    text: "Seu produto 'Ebook de Finanças' tem poucas visualizações, tente otimizar a descrição.",
    action: { text: 'Otimizar Produto', link: '/produtos/1/editar' },
  },
]

export const Insights = () => {
  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Insights e Recomendações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {insights.map((insight) => (
            <li key={insight.id} className="p-3 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                {insight.text}
              </p>
              <Button asChild variant="link" size="sm" className="p-0 h-auto">
                <Link to={insight.action.link}>{insight.action.text}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
