import { create } from 'zustand'

interface Log {
  id: number
  level: 'info' | 'warning' | 'error'
  message: string
  timestamp: string
}

interface Config {
  timeout: number
  retries: number
  encryption: boolean
  maxConnections: number
}

interface Server {
  id: string
  name: string
  url: string
  status: 'online' | 'offline' | 'restarting'
  latency: number
  health: number
  lastUpdate: string
  logs: Log[]
  config: Config
}

interface McpStore {
  servers: Server[]
  setServers: (servers: Server[]) => void
  addLog: (serverId: string, log: Log) => void
  updateServer: (serverId: string, updates: Partial<Server>) => void
}

export const useMcpStore = create<McpStore>((set) => ({
  servers: [],
  setServers: (servers) => set({ servers }),
  addLog: (serverId, log) =>
    set((state) => ({
      servers: state.servers.map((server) =>
        server.id === serverId
          ? { ...server, logs: [log, ...server.logs] }
          : server
      ),
    })),
  updateServer: (serverId, updates) =>
    set((state) => ({
      servers: state.servers.map((server) =>
        server.id === serverId ? { ...server, ...updates } : server
      ),
    })),
}))