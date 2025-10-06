import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const gainsData = [
  { month: 'Jan', Ganhos: 4000 },
  { month: 'Fev', Ganhos: 3000 },
  { month: 'Mar', Ganhos: 5000 },
  { month: 'Abr', Ganhos: 4500 },
  { month: 'Mai', Ganhos: 6000 },
  { month: 'Jun', Ganhos: 5500 },
]
const salesData = [
  { month: 'Jan', Vendas: 24 },
  { month: 'Fev', Vendas: 18 },
  { month: 'Mar', Vendas: 32 },
  { month: 'Abr', Vendas: 27 },
  { month: 'Mai', Vendas: 42 },
  { month: 'Jun', Vendas: 35 },
]
const topProducts = [
  { name: 'React do Zero ao Avançado', sales: 120, revenue: 'R$ 59.640,00' },
  { name: 'Ebook de Finanças Pessoais', sales: 85, revenue: 'R$ 4.241,50' },
  { name: 'Consultoria de Carreira', sales: 40, revenue: 'R$ 14.000,00' },
]

const chartConfig = {
  Ganhos: { label: 'Ganhos', color: 'hsl(var(--chart-1))' },
  Vendas: { label: 'Vendas', color: 'hsl(var(--chart-2))' },
}

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Análises</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Dados (CSV)
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ganhos por Período</CardTitle>
            <CardDescription>
              Visão geral dos seus ganhos mensais.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={gainsData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="Ganhos" fill="var(--color-Ganhos)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Volume de Vendas</CardTitle>
            <CardDescription>
              Número de unidades vendidas por mês.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <LineChart data={salesData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="Vendas"
                  stroke="var(--color-Vendas)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtos Mais Populares</CardTitle>
          <CardDescription>
            Seus produtos com melhor desempenho.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-center">Vendas</TableHead>
                <TableHead className="text-right">Receita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-center">{product.sales}</TableCell>
                  <TableCell className="text-right">
                    {product.revenue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsPage
