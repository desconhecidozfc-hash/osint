import { motion } from 'framer-motion'

function Preco() {
  const planos = [
    {
      nome: 'Básico',
      preco: 'R$ 1.297',
      descricao: 'Acesso completo ao módulo básico',
      recursos: [
        '20 horas de aulas',
        'Materiais de apoio',
        'Certificado digital',
        'Suporte via fórum'
      ],
      destaque: false
    },
    {
      nome: 'Completo',
      preco: 'R$ 2.497',
      descricao: 'Acesso completo a todos os módulos',
      recursos: [
        '50 horas de aulas',
        'Módulo avançado incluso',
        'Certificado reconhecido',
        'Suporte prioritário',
        'Comunidade exclusiva',
        'Mentoria semanal'
      ],
      destaque: true
    },
    {
      nome: 'Premium',
      preco: 'R$ 3.997',
      descricao: 'Acesso total + mentorias individuais',
      recursos: [
        'Todo o conteúdo do plano completo',
        '4 sessões de mentoria individual',
        'Feedback personalizado',
        'Acompanhamento de carreira',
        'Networking com profissionais'
      ],
      destaque: false
    }
  ]

  return (
    <section id="preco" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-osint-black mb-4">
            Escolha seu plano de estudo
          </h2>
          <p className="text-lg text-gray-600">Investimento que gera retorno imediato na sua carreira</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planos.map((plano, index) => (
            <motion.div
              key={plano.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-osint-white p-8 rounded-lg shadow-lg text-center ${
                plano.destaque ? 'border-2 border-osint-black transform hover:scale-105 transition-transform duration-300' : ''
              }`}
            >
              {plano.destaque && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-osint-black text-osint-white px-3 py-1 rounded-full inline-block mb-4"
                >
                  Mais Escolhido
                </motion.div>
              )}
              <h3 className="text-2xl font-bold text-osint-black mb-4">{plano.nome}</h3>
              <div className="text-4xl font-bold text-osint-black mb-4">{plano.preco}</div>
              <p className="text-gray-600 mb-6">{plano.descricao}</p>
              <ul className="text-left space-y-3 mb-8 text-gray-700">
                {plano.recursos.map((recurso, idx) => (
                  <li key={idx}><strong>•</strong> {recurso}</li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                  plano.destaque 
                    ? 'bg-osint-black text-osint-white hover:bg-gray-800' 
                    : 'bg-gray-100 text-osint-black hover:bg-gray-200'
                }`}
              >
                Quero este plano
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600">Todos os planos incluem garantia de 7 dias ou seu dinheiro de volta</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Preco