import { useState } from 'react'
import { Menu, X, Globe, Wifi, WifiOff } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(true)

  return (
    <header className="bg-white shadow-sm border-border border-b fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MCP</span>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">MCP Dashboard</div>
              <div className="text-xs text-muted">Multi-Channel Protocol Manager</div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-muted hover:text-primary transition-colors">
              Servidores
            </a>
            <a href="#" className="text-muted hover:text-primary transition-colors">
              Logs
            </a>
            <a href="#" className="text-muted hover:text-primary transition-colors">
              Configurações
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
            </div>
            
            <button className="hidden md:inline-flex items-center space-x-2 px-4 py-2 primary rounded-lg hover:primary-hover transition-colors">
              <Globe className="w-4 h-4" />
              <span>Conectar Servidor</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-4">
              <a href="#" className="block text-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#" className="block text-muted hover:text-primary transition-colors">
                Servidores
              </a>
              <a href="#" className="block text-muted hover:text-primary transition-colors">
                Logs
              </a>
              <a href="#" className="block text-muted hover:text-primary transition-colors">
                Configurações
              </a>
              <button className="w-full text-left inline-flex items-center space-x-2 px-4 py-2 primary rounded-lg hover:primary-hover transition-colors">
                <Globe className="w-4 h-4" />
                <span>Conectar Servidor</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}