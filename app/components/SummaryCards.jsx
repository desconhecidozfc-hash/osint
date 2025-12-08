export function SummaryCards({ members }) {
  const totalBudget = members.reduce((sum, member) => sum + member.budget, 0)
  const totalExpenses = members.reduce((sum, member) => sum + member.expenses, 0)
  const activeMembers = members.filter(m => m.status === 'active').length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-sm text-gray-500 mb-2">Total de Membros</h4>
        <p className="text-3xl font-bold">{members.length}</p>
        <p className="text-xs text-gray-400 mt-2">Ativos no sistema</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">Ativos</span>
          <span className="text-sm font-semibold">{activeMembers}</span>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-sm text-gray-500 mb-2">Orçamento Total</h4>
        <p className="text-3xl font-bold">R$ {totalBudget.toLocaleString()}</p>
        <p className="text-xs text-gray-400 mt-2">Anual previsto</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">Médio por membro</span>
          <span className="text-sm font-semibold">R$ {(totalBudget / members.length).toLocaleString()}</span>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-sm text-gray-500 mb-2">Despesas Totais</h4>
        <p className="text-3xl font-bold">R$ {totalExpenses.toLocaleString()}</p>
        <p className="text-xs text-gray-400 mt-2">Gastos realizados</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">Médio por membro</span>
          <span className="text-sm font-semibold">R$ {(totalExpenses / members.length).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}