import { sql } from '@vercel/postgres'

export async function initializeDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        budget DECIMAL(10,2) DEFAULT 0,
        expenses DECIMAL(10,2) DEFAULT 0,
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create admin user if not exists
    const adminExists = await sql`
      SELECT COUNT(*) as count FROM users WHERE id = 'ADMIN001'
    `
    
    if (parseInt(adminExists.rows[0].count) === 0) {
      await sql`
        INSERT INTO users (id, name, email, password, status, budget, expenses)
        VALUES (
          'ADMIN001', 
          'Administrador', 
          'admin@empresa.com', 
          '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
          'active', 
          0, 
          0
        )
      `
    }

    // Create 20 member users if not exists
    for (let i = 1; i <= 20; i++) {
      const memberId = `MBR${i.toString().padStart(3, '0')}`
      const memberExists = await sql`
        SELECT COUNT(*) as count FROM users WHERE id = ${memberId}
      `
      
      if (parseInt(memberExists.rows[0].count) === 0) {
        const budget = Math.floor(Math.random() * 100000) + 50000
        const expenses = budget - Math.floor(Math.random() * 20000)
        
        await sql`
          INSERT INTO users (id, name, email, password, status, budget, expenses)
          VALUES (
            ${memberId},
            ${`Membro ${i.toString().padStart(2, '0')}`},
            ${`membro${i}@empresa.com`},
            ${'$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'}, -- password: password
            'active',
            ${budget},
            ${expenses}
          )
        `
      }
    }

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}