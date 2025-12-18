import { useState, useEffect } from 'react'
import { ServerCard } from './ServerCard'
import { ServerDetails } from './ServerDetails'
import { LogViewer } from './LogViewer'
import { SettingsPanel } from './SettingsPanel'
import { Plus, RefreshCw, Filter, Search } from 'lucide-react'
import { Server as ServerType } from '../store/mcpStore'

interface DashboardProps {
  servers: ServerType[]
  onStartServer: (serverId: string) => void
  onStopServer: (serverId: string) => void
  onRestartServer: (serverId: string) => void
  onSendCommand: (serverId: string, command: string) => void
  onPingServer: (serverId: string) => void
}

export function Dashboard({
  servers,
  onStartServer,
  onStopServer,
  onRestartServer,
  onSendCommand,
  onPingServer
}: DashboardProps) {
  const [selectedServer, setSelectedServer] = useState<ServerType | null>(null)
  const [activeTab, setActiveTab] = useState<'status' | 'logs' | 'settings'>('status')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (servers.length > 0 && !selectedServer) {
      setSelectedServer(servers[0])
    }
  }, [servers])

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'online' && server.status === 'online') ||
                         (statusFilter === 'offline' && server.status === 'offline')
    return matchesSearch && matchesStatus
  })

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard de Servidores</h2>
          <p className="text-muted">Gerencie e monitore seus servidores MCP em tempo real</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            className={`inline-flex items-center space-x-2 px-4 py-2 border-border border rounded-lg hover:bg-gray-50 transition-colors ${
              refreshing ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border-border border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Servidores</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar servidores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredServers.map(server => (
                <ServerCard
                  key={server.id}
                  server={server}
                  isSelected={selectedServer?.id === server.id}
                  onSelect={() => setSelectedServer(server)}
                  onStart={() => onStartServer(server.id)}
                  onStop={() => onStopServer(server.id)}
                  onRestart={() => onRestartServer(server.id)}
                  onPing={() => onPingServer(server.id)}
                />
              ))}
            </div>

            {filteredServers.length === 0 && (
              <div className="text-center py-8 text-muted">
                Nenhum servidor encontrado
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border-border border overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedServer ? selectedServer.name : 'Selecione um servidor'}
                </h3>
                <p className="text-sm text-muted">
                  {selectedServer ? selectedServer.url : 'Escolha um servidor para visualizar os detalhes'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('status')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'status' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Status
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'logs' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Logs
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Configurações
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedServer && activeTab === 'status' && (
                <ServerDetails
                  server={selectedServer}
                  onStart={() => onStartServer(selectedServer.id)}
                  onStop={() => onStopServer(selectedServer.id)}
                  onRestart={() => onRestartServer(selectedServer.id)}
                  onPing={() => onPingServer(selectedServer.id)}
                />
              )}

              {selectedServer && activeTab === 'logs' && (
                <LogViewer server={selectedServer} onSendCommand={onSendCommand} />
              )}

              {selectedServer && activeTab === 'settings' && (
                <SettingsPanel server={selectedServer} />
              )}

              {!selectedServer && (
                <div className="text-center py-12 text-muted">
                  Selecione um servidor para visualizar os detalhes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}