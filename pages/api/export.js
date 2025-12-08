import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await sql`
        SELECT id, name, email, status, budget, expenses, last_login 
        FROM users 
        WHERE id != 'ADMIN001' 
        ORDER BY name
      `
      
      const members = result.rows
      
      // Create CSV content
      const headers = ['ID', 'Nome', 'Email', 'Status', 'Orçamento', 'Despesas', 'Último Login']
      const csvContent = [
        headers.join(','),
        ...members.map(member => [
          member.id,
          `"${member.name}"`,
          member.email,
          member.status,
          member.budget,
          member.expenses,
          member.last_login
        ].join(','))
      ].join('\n')

      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=dados_membros.csv')
      res.status(200).send(csvContent)
    } catch (error) {
      console.error('Error exporting data:', error)
      res.status(500).json({ error: 'Erro ao exportar dados' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}