'use client'

export function DashboardCharts() {
  const monthlyData = [
    { month: 'Jan', budget: 45000, actual: 42000, expenses: 38000 },
    { month: 'Fev', budget: 48000, actual: 46000, expenses: 41000 },
    { month: 'Mar', budget: 52000, actual: 55000, expenses: 48000 },
    { month: 'Abr', budget: 50000, actual: 47000, expenses: 42000 },
    { month: 'Mai', budget: 55000, actual: 58000, expenses: 52000 },
    { month: 'Jun', budget: 60000, actual: 62000, expenses: 55000 },
  ]

  const categoryData = [
    { name: 'Marketing', value: 25 },
    { name: 'TI', value: 20 },
    { name: 'RH', value: 15 },
    { name: 'Financeiro', value: 18 },
    { name: 'Operações', value: 22 },
  ]

  const COLORS = ['#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af']

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard de Gastos e Orçamentos</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expenses Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Gastos Mensais</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#1f2937" name="Orçamento" />
                <Bar dataKey="actual" fill="#6b7280" name="Realizado" />
                <Bar dataKey="expenses" fill="#9ca3af" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget vs Actual Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Comparativo Orçamento vs Real</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="budget" stroke="#1f2937" strokeWidth={2} dot={{ fill: '#1f2937' }} />
                <Line type="monotone" dataKey="actual" stroke="#6b7280" strokeWidth={2} dot={{ fill: '#6b7280' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 lg:col-span-2">
          <h3 className="font-bold text-lg mb-4">Distribuição por Categoria</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}