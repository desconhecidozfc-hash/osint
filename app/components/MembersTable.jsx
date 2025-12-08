'use client'

export function MembersTable({ members, loading, onUpdateMember }) {
  const COLORS = ['#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af']

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Gerenciamento de Membros</h2>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-gray-600">Carregando membros...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Nome</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Último Login</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-2 text-sm text-gray-600">{member.id}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700">
                          {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">Orçamento: R$ {member.budget.toLocaleString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-sm">
                    <input 
                      type="email"
                      defaultValue={member.email}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-600">{member.lastLogin}</td>
                  <td className="py-4 px-2">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          const email = document.querySelector(`input[type="email"]`)
                          onUpdateMember(member.id, { email: email.value })
                        }}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Atualizar
                      </button>
                      <button 
                        onClick={() => onUpdateMember(member.id, { resetPassword: true })}
                        className="bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Reset Senha
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Member Cards View */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.slice(0, 6).map((member, index) => (
          <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-600">ID: {member.id}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                member.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {member.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input 
                  type="email" 
                  defaultValue={member.email}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Nova Senha</label>
                <input 
                  type="password" 
                  placeholder="******"
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    const email = document.querySelector(`input[type="email"]`)
                    const password = document.querySelector(`input[type="password"]`)
                    onUpdateMember(member.id, { 
                      email: email.value,
                      password: password.value || undefined
                    })
                  }}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm transition-colors w-full"
                >
                  Atualizar
                </button>
                <button 
                  onClick={() => onUpdateMember(member.id, { resetPassword: true })}
                  className="bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1 rounded text-sm transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Orçamento:</span>
                <span className="font-bold">R$ {member.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Último Login:</span>
                <span>{member.lastLogin}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}