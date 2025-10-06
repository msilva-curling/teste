/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import ProductsPage from './pages/ProductsPage'
import ProductEditPage from './pages/ProductEditPage'
import CoursesPage from './pages/CoursesPage'
import CourseEditPage from './pages/CourseEditPage'
import ServicesPage from './pages/ServicesPage'
import ServiceEditPage from './pages/ServiceEditPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import StorePage from './pages/StorePage'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/produtos/novo" element={<ProductEditPage />} />
          <Route path="/produtos/:id/editar" element={<ProductEditPage />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/cursos/novo" element={<CourseEditPage />} />
          <Route path="/cursos/:id/editar" element={<CourseEditPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/servicos/novo" element={<ServiceEditPage />} />
          <Route path="/servicos/:id/editar" element={<ServiceEditPage />} />
          <Route path="/analises" element={<AnalyticsPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="/loja/:username" element={<StorePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
