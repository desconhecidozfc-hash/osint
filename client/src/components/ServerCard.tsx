import { useState } from 'react'
import { 
  Play, Square, RefreshCw, Wifi, WifiOff, 
  ExternalLink, MoreHorizontal, Clock, Database 
} from 'lucide-react'
import { Server as ServerType } from '../store/mcpStore'

interface ServerCardProps {
  server: ServerType
  isSelected: boolean
  onSelect: () => void
  onStart: () => void
  onStop: () => void
  onRestart: () => void
  onPing: () => void
}

export function ServerCard({ server, isSelected, onSelect, onStart, onStop, onRestart, onPing }: ServerCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100'
      case 'offline': return 'text-red-600 bg-red-100'
      case 'restarting': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4" />
      case 'offline': return <WifiOff className="w-4 h-4" />
      case 'restarting': return <RefreshCw className="w-4 h-4 animate-spin" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div 
      className={`p-4 rounded-xl border-border border hover:shadow-md transition-all cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{server.name}</h4>
            <p className="text-xs text-muted font-mono">{server.url}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
            {getStatusIcon(server.status)}
            <span className="capitalize">{server.status}</span>
          </span>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted">
          <span className="inline-flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{server.latency}ms</span>
          </span>
          <span className="inline-flex items-center space-x-1">
            <Wifi className="w-4 h-4" />
            <span>{server.health}%</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {server.status === 'offline' && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onStart()
              }}
              className="inline-flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Iniciar</span>
            </button>
          )}
          
          {server.status === 'online' && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRestart()
                }}
                className="inline-flex items-center space-x-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onStop()
                }}
                className="inline-flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Square className="w-4 h-4" />
                <span>Parar</span>
              </button>
            </>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation()
              onPing()
            }}
            className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Wifi className="w-4 h-4" />
            <span>Ping</span>
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm text-muted">Conectar</span>
          </div>
        </div>
      )}
    </div>
  )
}