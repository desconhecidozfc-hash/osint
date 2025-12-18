import { useState, useEffect } from 'react'
import { Send, Search, Filter, Download, Clock, Info, AlertTriangle, X } from 'lucide-react'
import { Server as ServerType } from '../store/mcpStore'

interface LogViewerProps {
  server: ServerType
  onSendCommand: (serverId: string, command: string) => void
}

export function LogViewer({ server, onSendCommand }: LogViewerProps) {
  const [logs, setLogs] = useState(server.logs)
  const [command, setCommand] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all')

  useEffect(() => {
    setLogs(server.logs)
  }, [server.logs])

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-blue-600 bg-blue-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case 'info': return <Info className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'error': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleSendCommand = () => {
    if (command.trim()) {
      onSendCommand(server.id, command)
      setCommand('')
    }
  }

  const exportLogs = () => {
    const data = filteredLogs.map(log => ({
      timestamp: log.timestamp,
      level: log.level,
      message: log.message
    }))
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `logs-${server.name}-${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Enviar Comando</h4>
          <div className="flex space-x-3">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Digite um comando para executar no servidor..."
              className="flex-1 px-4 py-3 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSendCommand()}
            />
            <button
              onClick={handleSendCommand}
              className="inline-flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>Enviar</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Filtros</h4>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as any)}
              className="px-3 py-2 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os níveis</option>
              <option value="info">Info</option>
              <option value="warning">Aviso</option>
              <option value="error">Erro</option>
            </select>
            <button
              onClick={exportLogs}
              className="inline-flex items-center space-x-2 px-4 py-2 border-border border rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border-border border">
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Logs do Servidor</h4>
            <div className="text-sm text-muted">
              {filteredLogs.length} logs encontrados
            </div>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-muted">
              Nenhum log encontrado com os filtros aplicados
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="px-6 py-4 border-b border-border hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                      {getLogLevelIcon(log.level)}
                      <span className="capitalize">{log.level}</span>
                    </span>
                    <span className="text-sm text-muted">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <button className="text-muted hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 text-foreground">
                  {log.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}