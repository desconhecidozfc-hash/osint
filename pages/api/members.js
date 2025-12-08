import { sql } from '@vercel/postgres'
import { initializeDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  await initializeDatabase()

  if (req.method === 'GET') {
    try {
      const result = await sql`SELECT * FROM users WHERE id != 'ADMIN001' ORDER BY name`
      const members = result.rows.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        status: row.status,
        budget: parseFloat(row.budget),
        expenses: parseFloat(row.expenses),
        lastLogin: row.last_login
      }))
      
      res.status(200).json(members)
    } catch (error) {
      console.error('Error fetching members:', error)
      res.status(500).json({ error: 'Erro ao buscar membros' })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, password, budget } = req.body
      
      const id = `MBR${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
      
      const result = await sql`
        INSERT INTO users (id, name, email, password, status, budget, expenses)
        VALUES (${id}, ${name}, ${email}, ${password}, 'active', ${budget || 0}, 0)
        RETURNING *
      `
      
      const member = result.rows[0]
      
      res.status(201).json({
        id: member.id,
        name: member.name,
        email: member.email,
        status: member.status,
        budget: parseFloat(member.budget),
        expenses: parseFloat(member.expenses),
        lastLogin: member.last_login
      })
    } catch (error) {
      console.error('Error creating member:', error)
      res.status(500).json({ error: 'Erro ao criar membro' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}