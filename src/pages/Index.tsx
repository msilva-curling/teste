import { Onboarding } from './dashboard/Onboarding'
import { EarningsOverview } from './dashboard/EarningsOverview'
import { ActivityFeed } from './dashboard/ActivityFeed'
import { Insights } from './dashboard/Insights'
import { QuickLinks } from './dashboard/QuickLinks'

const Index = () => {
  const isNewUser = true // Simulação de novo usuário

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo de volta, Sofia!</p>
        </div>
      </div>

      {isNewUser && <Onboarding />}

      <EarningsOverview />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-1">
          <Insights />
        </div>
      </div>

      <QuickLinks />
    </div>
  )
}

export default Index
