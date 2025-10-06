import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Menu,
  PlusCircle,
  LayoutGrid,
  Package,
  BookOpen,
  Briefcase,
  BarChart2,
  Settings,
  User,
  HelpCircle,
  LogOut,
  X,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/produtos', label: 'Produtos', icon: Package },
  { href: '/cursos', label: 'Cursos', icon: BookOpen },
  { href: '/servicos', label: 'Serviços', icon: Briefcase },
  { href: '/analises', label: 'Análises', icon: BarChart2 },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const NavLinks = ({ className }: { className?: string }) => (
    <nav
      className={cn('items-center space-x-6 text-sm font-medium', className)}
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            cn(
              'transition-colors hover:text-primary',
              isActive ? 'text-primary' : 'text-muted-foreground',
              'flex items-center gap-2',
            )
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img
            src="https://img.usecurling.com/i?q=saas&color=gradient"
            alt="SaaS Lucrativo Logo"
            className="h-8 w-8"
          />
          <span className="font-bold">SaaS Lucrativo</span>
        </Link>

        <div className="hidden md:flex flex-1">
          <NavLinks className="gap-6" />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hidden sm:flex items-center gap-2 transition-transform duration-150 ease-out hover:scale-102">
                <PlusCircle className="h-5 w-5" />
                Criar Novo
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/produtos/novo">Novo Produto</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/cursos/novo">Novo Curso</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/servicos/novo">Novo Serviço</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src="https://img.usecurling.com/ppl/medium?gender=female&seed=1"
                    alt="Avatar do usuário"
                  />
                  <AvatarFallback>SL</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    sofia.davis@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/configuracoes">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Ajuda</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[320px]">
              <div className="flex justify-between items-center mb-6">
                <Link
                  to="/"
                  className="flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img
                    src="https://img.usecurling.com/i?q=saas&color=gradient"
                    alt="SaaS Lucrativo Logo"
                    className="h-8 w-8"
                  />
                  <span className="font-bold">SaaS Lucrativo</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Fechar menu</span>
                </Button>
              </div>
              <div className="flex flex-col space-y-4">
                <NavLinks className="flex-col !items-start !space-x-0 space-y-2" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
