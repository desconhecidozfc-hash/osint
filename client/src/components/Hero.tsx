import { ArrowRight, Shield, Zap, RefreshCw, Database, Settings } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Gerencie seus servidores MCP de forma simples e eficiente
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Conecte-se a servidores MCP, monitore status em tempo real, controle operações e visualize logs detalhados. 
              Tudo em um único dashboard intuitivo com atualizações instantâneas.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center space-x-3 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                <span>Conectar Servidor</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all">
                <span>Ver Documentação</span>
              </button>
            </div>
          </div>

          <div className="slide-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Conexão Ativa</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/70">URL do Servidor</div>
                  <div className="font-mono text-white">https://mcp-server.example.com</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/70">Status</div>
                  <div className="text-white">Online - Pronto para operação</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm text-white/70">Latência</div>
                  <div className="text-white">45ms</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm">Segurança</div>
                    <div className="text-xs text-white/70">TLS 1.3</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <Zap className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm">Velocidade</div>
                    <div className="text-xs text-white/70">45ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </section>
  )
}