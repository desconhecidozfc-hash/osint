import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  try {
    // Test database connection
    const result = await sql`SELECT 1 as test`
    
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      timestamp: new Date().toISOString()
    })
  }
}