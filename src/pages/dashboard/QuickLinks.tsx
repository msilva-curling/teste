import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { PlusCircle, BarChart2 } from 'lucide-react'

export const QuickLinks = () => {
  return (
    <div
      className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
      style={{ animationDelay: '0.4s' }}
    >
      <Button asChild size="lg" className="flex-1">
        <Link to="/produtos/novo">
          <PlusCircle className="mr-2 h-5 w-5" />
          Criar Novo Produto
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="flex-1">
        <Link to="/analises">
          <BarChart2 className="mr-2 h-5 w-5" />
          Ver Análises Completas
        </Link>
      </Button>
    </div>
  )
}
