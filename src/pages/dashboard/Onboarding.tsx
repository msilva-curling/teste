import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { id: 'profile', title: 'Complete seu perfil', completed: true },
  { id: 'payment', title: 'Conecte sua conta de pagamento', completed: true },
  {
    id: 'product',
    title: 'Crie seu primeiro produto/curso/serviço',
    completed: false,
  },
]

export const Onboarding = () => {
  const [completedSteps, setCompletedSteps] = useState(
    steps.filter((s) => s.completed).length,
  )
  const progress = (completedSteps / steps.length) * 100

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>Vamos começar!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Siga os passos abaixo para configurar sua conta.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <Progress value={progress} className="w-full" />
          <span className="text-sm font-medium text-muted-foreground">
            {completedSteps}/{steps.length}
          </span>
        </div>
        <ul className="space-y-4">
          {steps.map((step) => (
            <li key={step.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span
                  className={cn({
                    'line-through text-muted-foreground': step.completed,
                  })}
                >
                  {step.title}
                </span>
              </div>
              {!step.completed && <Button size="sm">Começar</Button>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
