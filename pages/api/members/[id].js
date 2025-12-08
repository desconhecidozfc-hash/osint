import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const result = await sql`SELECT * FROM users WHERE id = ${id}`
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Membro não encontrado' })
      }
      
      const member = result.rows[0]
      
      res.status(200).json({
        id: member.id,
        name: member.name,
        email: member.email,
        status: member.status,
        budget: parseFloat(member.budget),
        expenses: parseFloat(member.expenses),
        lastLogin: member.last_login
      })
    } catch (error) {
      console.error('Error fetching member:', error)
      res.status(500).json({ error: 'Erro ao buscar membro' })
    }
  } else if (req.method === 'PUT') {
    try {
      const updates = req.body
      const fields = []
      const values = []
      let paramCount = 1

      if (updates.email) {
        fields.push(`email = $${paramCount++}`)
        values.push(updates.email)
      }
      
      if (updates.password) {
        fields.push(`password = $${paramCount++}`)
        values.push(updates.password)
      }
      
      if (updates.status) {
        fields.push(`status = $${paramCount++}`)
        values.push(updates.status)
      }
      
      if (updates.budget !== undefined) {
        fields.push(`budget = $${paramCount++}`)
        values.push(updates.budget)
      }
      
      if (updates.expenses !== undefined) {
        fields.push(`expenses = $${paramCount++}`)
        values.push(updates.expenses)
      }

      if (updates.resetPassword) {
        fields.push(`password = $${paramCount++}`)
        values.push('$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi') // password: password
      }

      fields.push(`updated_at = $${paramCount++}`)
      values.push(new Date())

      const result = await sql`
        UPDATE users 
        SET ${sql.unnest(fields, ', ')}
        WHERE id = $${paramCount++}
        RETURNING *
      `

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Membro não encontrado' })
      }

      const member = result.rows[0]
      
      res.status(200).json({
        id: member.id,
        name: member.name,
        email: member.email,
        status: member.status,
        budget: parseFloat(member.budget),
        expenses: parseFloat(member.expenses),
        lastLogin: member.last_login
      })
    } catch (error) {
      console.error('Error updating member:', error)
      res.status(500).json({ error: 'Erro ao atualizar membro' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await sql`DELETE FROM users WHERE id = ${id} RETURNING *`
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Membro não encontrado' })
      }
      
      res.status(200).json({ message: 'Membro deletado com sucesso' })
    } catch (error) {
      console.error('Error deleting member:', error)
      res.status(500).json({ error: 'Erro ao deletar membro' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}