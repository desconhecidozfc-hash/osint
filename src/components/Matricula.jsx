import { useState } from 'react'
import { motion } from 'framer-motion'

function Matricula() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    plano: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Formulário enviado com sucesso!')
  }

  return (
    <section id="matricula" className="bg-osint-black text-osint-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Pronto para iniciar sua jornada no OSINT?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl mb-8 text-gray-200"
        >
          Vagas limitadas para a próxima turma. Garanta já sua vaga e comece a transformar sua carreira.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-osint-white bg-opacity-10 p-8 rounded-xl mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">Oferta Especial de Lançamento</h3>
          <p className="text-gray-200 mb-4">Aproveite 20% de desconto + 3 meses de suporte premium gratuito</p>
          <div className="text-3xl font-bold">R$ 1.997</div>
          <p className="text-sm text-gray-300 mt-2">de R$ 2.497 por tempo limitado</p>
        </motion.div>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-4 bg-osint-white bg-opacity-10 p-8 rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-md bg-osint-white bg-opacity-20 text-osint-white placeholder-gray-200 border border-osint-white border-opacity-30 focus:outline-none focus:border-osint-white focus:ring-2 focus:ring-osint-white focus:ring-opacity-50"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Seu melhor e-mail"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-md bg-osint-white bg-opacity-20 text-osint-white placeholder-gray-200 border border-osint-white border-opacity-30 focus:outline-none focus:border-osint-white focus:ring-2 focus:ring-osint-white focus:ring-opacity-50"
              required
            />
          </div>
          <input
            type="tel"
            name="telefone"
            placeholder="Seu WhatsApp (com DDD)"
            value={formData.telefone}
            onChange={handleInputChange}
            className="px-4 py-3 rounded-md bg-osint-white bg-opacity-20 text-osint-white placeholder-gray-200 border border-osint-white border-opacity-30 w-full focus:outline-none focus:border-osint-white focus:ring-2 focus:ring-osint-white focus:ring-opacity-50"
            required
          />
          <select
            name="plano"
            value={formData.plano}
            onChange={handleInputChange}
            className="px-4 py-3 rounded-md bg-osint-white bg-opacity-20 text-osint-white border border-osint-white border-opacity-30 w-full focus:outline-none focus:border-osint-white focus:ring-2 focus:ring-osint-white focus:ring-opacity-50"
            required
          >
            <option value="">Escolha seu plano</option>
            <option value="basico">Básico - R$ 1.297</option>
            <option value="completo">Completo - R$ 2.497</option>
            <option value="premium">Premium - R$ 3.997</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-osint-white text-osint-black px-8 py-4 rounded-md text-lg font-bold hover:bg-gray-200 transition-colors w-full"
          >
            Garantir Minha Vaga com Desconto
          </motion.button>
          
          <p className="text-sm text-gray-300">
            Pagamento seguro • Garantia de 7 dias • Acesso imediato após confirmação
          </p>
        </motion.form>
      </div>
    </section>
  )
}

export default Matricula