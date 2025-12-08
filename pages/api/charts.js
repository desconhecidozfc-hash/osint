import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Monthly data
      const monthlyResult = await sql`
        SELECT 
          EXTRACT(MONTH FROM created_at) as month,
          SUM(budget) as total_budget,
          SUM(expenses) as total_expenses
        FROM users 
        WHERE id != 'ADMIN001'
        GROUP BY EXTRACT(MONTH FROM created_at)
        ORDER BY month
        LIMIT 6
      `

      const monthlyData = monthlyResult.rows.map(row => ({
        month: new Date(2024, row.month - 1, 1).toLocaleString('pt-BR', { month: 'short' }),
        budget: parseFloat(row.total_budget || 0),
        expenses: parseFloat(row.total_expenses || 0),
        actual: parseFloat(row.total_budget || 0) * 0.9 // Demo calculation
      }))

      // Category distribution
      const categories = [
        { name: 'Marketing', value: 25 },
        { name: 'TI', value: 20 },
        { name: 'RH', value: 15 },
        { name: 'Financeiro', value: 18 },
        { name: 'Operações', value: 22 }
      ]

      res.status(200).json({
        monthlyData,
        categoryData: categories
      })
    } catch (error) {
      console.error('Error fetching chart data:', error)
      res.status(500).json({ error: 'Erro ao buscar dados do gráfico' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}