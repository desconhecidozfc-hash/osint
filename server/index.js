const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mock data for MCP servers
let mcpServers = [
  {
    id: 'server-1',
    name: 'MCP Server Principal',
    url: 'https://mcp-server.example.com',
    status: 'online',
    latency: 45,
    health: 95,
    lastUpdate: new Date().toISOString(),
    logs: [
      { id: 1, level: 'info', message: 'Servidor iniciado com sucesso', timestamp: new Date().toISOString() },
      { id: 2, level: 'warning', message: 'CPU usage at 75%', timestamp: new Date().toISOString() },
      { id: 3, level: 'info', message: 'Conexão estabelecida', timestamp: new Date().toISOString() }
    ],
    config: {
      timeout: 30000,
      retries: 3,
      encryption: true,
      maxConnections: 100
    }
  }
];

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Send initial data
  socket.emit('serverStatus', mcpServers);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });

  socket.on('pingServer', (serverId) => {
    const server = mcpServers.find(s => s.id === serverId);
    if (server) {
      server.latency = Math.floor(Math.random() * 100) + 10;
      server.lastUpdate = new Date().toISOString();
      io.emit('serverStatus', mcpServers);
      socket.emit('pingResult', { serverId, latency: server.latency });
    }
  });

  socket.on('startServer', (serverId) => {
    const server = mcpServers.find(s => s.id === serverId);
    if (server) {
      server.status = 'online';
      server.health = 95;
      server.logs.unshift({
        id: Date.now(),
        level: 'info',
        message: 'Servidor iniciado via dashboard',
        timestamp: new Date().toISOString()
      });
      io.emit('serverStatus', mcpServers);
      socket.emit('operationResult', { success: true, message: 'Servidor iniciado com sucesso' });
    }
  });

  socket.on('stopServer', (serverId) => {
    const server = mcpServers.find(s => s.id === serverId);
    if (server) {
      server.status = 'offline';
      server.health = 0;
      server.logs.unshift({
        id: Date.now(),
        level: 'warning',
        message: 'Servidor parado via dashboard',
        timestamp: new Date().toISOString()
      });
      io.emit('serverStatus', mcpServers);
      socket.emit('operationResult', { success: true, message: 'Servidor parado com sucesso' });
    }
  });

  socket.on('restartServer', (serverId) => {
    const server = mcpServers.find(s => s.id === serverId);
    if (server) {
      server.status = 'restarting';
      io.emit('serverStatus', mcpServers);
      
      setTimeout(() => {
        server.status = 'online';
        server.health = 95;
        server.latency = Math.floor(Math.random() * 100) + 10;
        server.logs.unshift({
          id: Date.now(),
          level: 'info',
          message: 'Servidor reiniciado com sucesso',
          timestamp: new Date().toISOString()
        });
        io.emit('serverStatus', mcpServers);
        socket.emit('operationResult', { success: true, message: 'Servidor reiniciado com sucesso' });
      }, 2000);
    }
  });

  socket.on('sendCommand', ({ serverId, command }) => {
    const server = mcpServers.find(s => s.id === serverId);
    if (server) {
      server.logs.unshift({
        id: Date.now(),
        level: 'info',
        message: `Comando executado: ${command}`,
        timestamp: new Date().toISOString()
      });
      io.emit('serverStatus', mcpServers);
      socket.emit('commandResult', { success: true, message: `Comando "${command}" executado com sucesso` });
    }
  });
});

// API Routes
app.get('/api/mcp/status', (req, res) => {
  res.json(mcpServers);
});

app.get('/api/mcp/server/:id/status', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  res.json(server);
});

app.get('/api/mcp/server/:id/logs', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  
  const { level, startDate, endDate, search } = req.query;
  let logs = [...server.logs];

  if (level) {
    logs = logs.filter(log => log.level === level);
  }

  if (startDate && endDate) {
    logs = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return logDate >= start && logDate <= end;
    });
  }

  if (search) {
    logs = logs.filter(log => 
      log.message.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(logs);
});

app.get('/api/mcp/server/:id/config', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  res.json(server.config);
});

app.put('/api/mcp/server/:id/config', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  
  server.config = { ...server.config, ...req.body };
  res.json({ success: true, config: server.config });
});

app.post('/api/mcp/server/:id/start', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  
  server.status = 'online';
  server.health = 95;
  res.json({ success: true, message: 'Servidor iniciado com sucesso' });
});

app.post('/api/mcp/server/:id/stop', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  
  server.status = 'offline';
  server.health = 0;
  res.json({ success: true, message: 'Servidor parado com sucesso' });
});

app.post('/api/mcp/server/:id/restart', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  
  server.status = 'restarting';
  setTimeout(() => {
    server.status = 'online';
    server.health = 95;
    server.latency = Math.floor(Math.random() * 100) + 10;
  }, 2000);
  
  res.json({ success: true, message: 'Servidor reiniciando...' });
});

app.post('/api/mcp/server/:id/command', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  
  const { command } = req.body;
  server.logs.unshift({
    id: Date.now(),
    level: 'info',
    message: `Comando executado: ${command}`,
    timestamp: new Date().toISOString()
  });
  
  res.json({ success: true, message: `Comando "${command}" executado com sucesso` });
});

app.get('/api/mcp/server/:id/ping', (req, res) => {
  const server = mcpServers.find(s => s.id === req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  
  const latency = Math.floor(Math.random() * 100) + 10;
  server.latency = latency;
  res.json({ success: true, latency });
});

app.post('/api/mcp/connect', (req, res) => {
  const { url, name } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }
  
  const newServer = {
    id: `server-${Date.now()}`,
    name: name || `MCP Server ${mcpServers.length + 1}`,
    url,
    status: 'online',
    latency: Math.floor(Math.random() * 100) + 10,
    health: 95,
    lastUpdate: new Date().toISOString(),
    logs: [
      {
        id: Date.now(),
        level: 'info',
        message: 'Servidor conectado via dashboard',
        timestamp: new Date().toISOString()
      }
    ],
    config: {
      timeout: 30000,
      retries: 3,
      encryption: true,
      maxConnections: 100
    }
  };
  
  mcpServers.push(newServer);
  io.emit('serverStatus', mcpServers);
  
  res.json({ success: true, server: newServer });
});

app.delete('/api/mcp/server/:id', (req, res) => {
  const serverIndex = mcpServers.findIndex(s => s.id === req.params.id);
  if (serverIndex === -1) {
    return res.status(404).json({ error: 'Servidor não encontrado' });
  }
  
  mcpServers.splice(serverIndex, 1);
  io.emit('serverStatus', mcpServers);
  
  res.json({ success: true, message: 'Servidor removido com sucesso' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'MCP Server API',
    version: '1.0.0',
    endpoints: [
      'GET /api/mcp/status',
      'GET /api/mcp/server/:id/status',
      'GET /api/mcp/server/:id/logs',
      'GET /api/mcp/server/:id/config',
      'POST /api/mcp/server/:id/start',
      'POST /api/mcp/server/:id/stop',
      'POST /api/mcp/server/:id/restart',
      'POST /api/mcp/server/:id/command',
      'GET /api/mcp/server/:id/ping',
      'POST /api/mcp/connect',
      'DELETE /api/mcp/server/:id'
    ]
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor MCP rodando em http://localhost:${PORT}`);
  console.log('WebSocket habilitado para comunicação em tempo real');
});