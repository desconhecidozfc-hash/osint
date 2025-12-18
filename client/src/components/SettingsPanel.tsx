import { useState } from 'react'
import { Save, RefreshCw, Trash2, Key, Shield, Database, Wifi } from 'lucide-react'
import { Server as ServerType } from '../store/mcpStore'

interface SettingsPanelProps {
  server: ServerType
}

export function SettingsPanel({ server }: SettingsPanelProps) {
  const [config, setConfig] = useState(server.config)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const resetToDefault = () => {
    setConfig({
      timeout: 30000,
      retries: 3,
      encryption: true,
      maxConnections: 100
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-6 h-6 text-blue-600" />
            <h4 className="font-semibold text-foreground">Configurações de Conexão</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Timeout (ms)</label>
              <input
                type="number"
                value={config.timeout}
                onChange={(e) => setConfig({ ...config, timeout: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-muted mt-1">Tempo máximo de espera para conexões</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">Tentativas de Conexão</label>
              <input
                type="number"
                value={config.retries}
                onChange={(e) => setConfig({ ...config, retries: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-muted mt-1">Número máximo de tentativas de reconexão</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Criptografia TLS</div>
                <div className="text-sm text-muted">Habilitar criptografia para conexões seguras</div>
              </div>
              <button
                onClick={() => setConfig({ ...config, encryption: !config.encryption })}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  config.encryption ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {config.encryption ? 'Ativado' : 'Desativado'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">Máximo de Conexões</label>
              <input
                type="number"
                value={config.maxConnections}
                onChange={(e) => setConfig({ ...config, maxConnections: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-muted mt-1">Número máximo de conexões simultâneas</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h4 className="font-semibold text-foreground">Segurança</h4>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-foreground">Autenticação JWT</div>
                  <div className="text-sm text-muted">Token de autenticação configurado</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-foreground">Conexão Segura</div>
                  <div className="text-sm text-muted">TLS 1.3 ativado</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-foreground">Auditoria de Acesso</div>
                  <div className="text-sm text-muted">Registros de auditoria ativados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={resetToDefault}
          className="inline-flex items-center space-x-2 px-4 py-2 border-border border rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Redefinir Padrões</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            className="inline-flex items-center space-x-2 px-4 py-2 border-border border rounded-lg hover:bg-gray-200 transition-colors text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remover Servidor</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{isSaving ? 'Salvando...' : 'Salvar Configurações'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}