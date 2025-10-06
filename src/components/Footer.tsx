import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center items-center text-sm text-muted-foreground">
          <Link
            to="#"
            className="hover:text-primary transition-colors duration-200 mx-2"
          >
            Termos de Serviço
          </Link>
          <span className="mx-2">|</span>
          <Link
            to="#"
            className="hover:text-primary transition-colors duration-200 mx-2"
          >
            Política de Privacidade
          </Link>
          <span className="mx-2">|</span>
          <Link
            to="#"
            className="hover:text-primary transition-colors duration-200 mx-2"
          >
            Suporte
          </Link>
        </div>
      </div>
    </footer>
  )
}
