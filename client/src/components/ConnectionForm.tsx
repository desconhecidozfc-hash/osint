import { useState } from 'react'
import { Plus, Server, Globe, AlertCircle } from 'lucide-react'

interface ConnectionFormProps {
  onConnect: (url: string, name?: string) => void
}

export function ConnectionForm({ onConnect }: ConnectionFormProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!url) {
      setError('Por favor, insira a URL do servidor MCP')
      return
    }

    setIsLoading(true)
    try {
      onConnect(url, name || undefined)
      setIsFormOpen(false)
      setUrl('')
      setName('')
    } catch (err) {
      setError('Erro ao conectar ao servidor. Verifique a URL e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl shadow-lg border-border border p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Conectar Novo Servidor MCP</h2>
              <p className="text-muted">Adicione um novo servidor para começar a monitorar e gerenciar</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="md:hidden inline-flex items-center space-x-2 px-4 py-2 primary rounded-lg hover:primary-hover transition-colors"
          >
            <Plus />
            <span>{isFormOpen ? 'Fechar' : 'Conectar'}</span>
          </button>
        </div>

        <div className={`space-y-6 ${isFormOpen ? 'block' : 'hidden md:block'}`}>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                URL do Servidor MCP
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://mcp-server.example.com"
                className="w-full px-4 py-3 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-muted mt-2">Insira a URL completa do seu servidor MCP</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                Nome do Servidor
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Servidor Principal"
                className="w-full px-4 py-3 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-muted mt-2">Nome descritivo para identificar o servidor</p>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center space-x-3 px-6 py-3 primary rounded-lg hover:primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Server className="w-5 h-5" />
                <span>{isLoading ? 'Conectando...' : 'Conectar Servidor'}</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="flex items-center space-x-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-muted">Status da Conexão</div>
              <div className="font-semibold text-foreground">Aguardando conexão</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-muted">Servidores Conectados</div>
              <div className="font-semibold text-foreground">0</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-muted">Última Atualização</div>
              <div className="font-semibold text-foreground">Nunca</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}