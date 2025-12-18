import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useMcpStore } from './store/mcpStore'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ConnectionForm } from './components/ConnectionForm'
import { Dashboard } from './components/Dashboard'
import { Footer } from './components/Footer'

function App() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { servers, setServers, addLog } = useMcpStore()

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO')
    })

    newSocket.on('serverStatus', (data) => {
      setServers(data)
    })

    newSocket.on('pingResult', (data) => {
      console.log('Ping result:', data)
    })

    newSocket.on('operationResult', (data) => {
      console.log('Operation result:', data)
    })

    newSocket.on('commandResult', (data) => {
      console.log('Command result:', data)
    })

    return () => {
      newSocket.close()
    }
  }, [setServers])

  const handleConnectServer = async (url: string, name?: string) => {
    try {
      const response = await fetch('/api/mcp/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, name }),
      })

      const data = await response.json()
      
      if (data.success) {
        socket?.emit('serverStatus', [...servers, data.server])
      }
    } catch (error) {
      console.error('Erro ao conectar servidor:', error)
    }
  }

  const handleStartServer = (serverId: string) => {
    fetch(`/api/mcp/server/${serverId}/start`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          socket?.emit('serverStatus', servers)
        }
      })
  }

  const handleStopServer = (serverId: string) => {
    fetch(`/api/mcp/server/${serverId}/stop`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          socket?.emit('serverStatus', servers)
        }
      })
  }

  const handleRestartServer = (serverId: string) => {
    fetch(`/api/mcp/server/${serverId}/restart`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          socket?.emit('serverStatus', servers)
        }
      })
  }

  const handleSendCommand = (serverId: string, command: string) => {
    fetch(`/api/mcp/server/${serverId}/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          socket?.emit('serverStatus', servers)
        }
      })
  }

  const handlePingServer = (serverId: string) => {
    socket?.emit('pingServer', serverId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ConnectionForm onConnect={handleConnectServer} />
        <Dashboard 
          servers={servers}
          onStartServer={handleStartServer}
          onStopServer={handleStopServer}
          onRestartServer={handleRestartServer}
          onSendCommand={handleSendCommand}
          onPingServer={handlePingServer}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App