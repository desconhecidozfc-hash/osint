'use client'

export function AdminPanel({ onExport, onRefresh, onFilterChange, filter }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Painel Administrativo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar Membros</label>
          <input 
            type="text" 
            placeholder="Buscar por nome, email ou ID..."
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div className="flex items-end space-x-2">
          <button 
            onClick={onExport}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors w-full"
          >
            Exportar Dados
          </button>
        </div>
        <div className="flex items-end space-x-2">
          <button 
            onClick={onRefresh}
            className="bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md transition-colors w-full"
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  )
}