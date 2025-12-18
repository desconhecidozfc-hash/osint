import { useState } from 'react'
import { 
  Play, Square, RefreshCw, Wifi, Clock, 
  Shield, Settings, Database, AlertTriangle 
} from 'lucide-react'
import { Server as ServerType } from '../store/mcpStore'

interface ServerDetailsProps {
  server: ServerType
  onStart: () => void
  onStop: () => void
  onRestart: () => void
  onPing: () => void
}

export function ServerDetails({ server, onStart, onStop, onRestart, onPing }: ServerDetailsProps) {
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [command, setCommand] = useState('')

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'online':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: <Wifi className="w-5 h-5" /> }
      case 'offline':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: <AlertTriangle className="w-5 h-5" /> }
      case 'restarting':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: <RefreshCw className="w-5 h-5 animate-spin" /> }
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: <Clock className="w-5 h-5" /> }
    }
  }

  const statusInfo = getStatusInfo(server.status)

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Status</div>
              <div className="font-semibold text-foreground capitalize">{server.status}</div>
            </div>
            <div className={`p-2 rounded-lg ${statusInfo.bg} ${statusInfo.color}`}>
              {statusInfo.icon}
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Saúde</div>
              <div className="font-semibold text-foreground">{server.health}%</div>
            </div>
            <Shield className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Latência</div>
              <div className="font-semibold text-foreground">{server.latency}ms</div>
            </div>
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Última Atualização</div>
              <div className="font-semibold text-foreground">
                {new Date(server.lastUpdate).toLocaleTimeString()}
              </div>
            </div>
            <Database className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Controle de Operações</h4>
          <div className="space-y-3">
            {server.status === 'offline' && (
              <button
                onClick={onStart}
                className="w-full inline-flex items-center space-x-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Iniciar Servidor</span>
              </button>
            )}

            {server.status === 'online' && (
              <>
                <button
                  onClick={onRestart}
                  className="w-full inline-flex items-center space-x-3 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Reiniciar Servidor</span>
                </button>
                <button
                  onClick={onStop}
                  className="w-full inline-flex items-center space-x-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Square className="w-5 h-5" />
                  <span>Parar Servidor</span>
                </button>
              </>
            )}

            <button
              onClick={onPing}
              className="w-full inline-flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Wifi className="w-5 h-5" />
              <span>Testar Conexão</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Comandos Personalizados</h4>
          <div className="space-y-3">
            {!isCommandOpen ? (
              <button
                onClick={() => setIsCommandOpen(true)}
                className="w-full inline-flex items-center space-x-3 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Enviar Comando</span>
              </button>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Digite o comando a ser executado..."
                  className="w-full px-4 py-3 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      // Handle command execution
                      setIsCommandOpen(false)
                      setCommand('')
                    }}
                    className="flex-1 inline-flex items-center justify-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Executar</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsCommandOpen(false)
                      setCommand('')
                    }}
                    className="px-4 py-3 border-border border rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">Informações do Servidor</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted">Nome</div>
            <div className="font-semibold text-foreground">{server.name}</div>
          </div>
          <div>
            <div className="text-sm text-muted">URL</div>
            <div className="font-mono text-foreground">{server.url}</div>
          </div>
          <div>
            <div className="text-sm text-muted">ID</div>
            <div className="font-mono text-foreground text-sm">{server.id}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Status</div>
            <div className="font-semibold text-foreground capitalize">{server.status}</div>
          </div>
        </div>
      </div>
    </div>
  )
}