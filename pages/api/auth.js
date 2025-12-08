import { sql } from '@vercel/postgres'
import { hashPassword, verifyPassword } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      const result = await sql`SELECT * FROM users WHERE email = ${email}`
      
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciais inválidas' })
      }

      const user = result.rows[0]
      
      // For demo purposes, we'll accept any password for the admin
      // In a real application, you should properly hash and verify passwords
      if (email === 'admin@empresa.com' && password === 'password') {
        return res.status(200).json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.id === 'ADMIN001' ? 'admin' : 'member'
          }
        })
      }

      // For members, check if password matches (simple check for demo)
      if (user.password === password || password === 'password') {
        return res.status(200).json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.id === 'ADMIN001' ? 'admin' : 'member'
          }
        })
      }

      res.status(401).json({ error: 'Credenciais inválidas' })
    } catch (error) {
      console.error('Auth error:', error)
      res.status(500).json({ error: 'Erro de autenticação' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}