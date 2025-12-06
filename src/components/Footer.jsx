import { motion } from 'framer-motion'

function Footer() {
  return (
    <footer className="bg-osint-black text-osint-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-osint-white mb-4">OSINT</h3>
            <h3 className="text-2xl font-light mb-4">Master</h3>
            <p className="text-gray-300">
              Formando especialistas em inteligência de fontes abertas desde 2024. 
              Seu caminho mais rápido para se tornar um profissional de OSINT.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Cursos</h4>
            <ul className="space-y-2 text-gray-300">
              {['OSINT Básico', 'OSINT Avançado', 'Cursos Corporativos', 'Treinamentos In Company'].map((curso) => (
                <li key={curso}>
                  <motion.a
                    whileHover={{ x: 5, color: '#e5e7eb' }}
                    href="#" 
                    className="hover:text-osint-white transition-colors"
                  >
                    {curso}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-300">
              {['Sobre Nós', 'Blog', 'Carreira', 'Contato'].map((item) => (
                <li key={item}>
                  <motion.a
                    whileHover={{ x: 5, color: '#e5e7eb' }}
                    href="#" 
                    className="hover:text-osint-white transition-colors"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-300">
              <p>📧 contato@osintmaster.com</p>
              <p>📱 (11) 99999-9999</p>
              <p>📍 São Paulo - SP</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex space-x-4 mt-6"
            >
              {['Facebook', 'LinkedIn', 'YouTube'].map((social) => (
                <motion.a
                  key={social}
                  whileHover={{ scale: 1.1, color: '#e5e7eb' }}
                  href="#" 
                  className="text-gray-300 hover:text-osint-white transition-colors"
                >
                  {social}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300"
        >
          <p>&copy; 2025 OSINT Master. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer