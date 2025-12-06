import { motion } from 'framer-motion'

function Depoimentos() {
  const depoimentos = [
    {
      nome: 'João Pedro',
      cargo: 'Jornalista Investigativo',
      avatar: 'JP',
      texto: 'O curso me proporcionou ferramentas essenciais para minhas investigações jornalísticas. As técnicas aprendidas me permitiram descobrir histórias que jamais teria encontrado.',
      estrelas: 5
    },
    {
      nome: 'Marina Rocha',
      cargo: 'Analista de Segurança',
      avatar: 'MR',
      texto: 'Como analista de segurança, preciso estar sempre um passo à frente. Este curso me deu conhecimentos avançados que aplico diariamente na proteção de minhas empresas.',
      estrelas: 5
    },
    {
      nome: 'Carlos Ferreira',
      cargo: 'Empreendedor',
      avatar: 'CF',
      texto: 'Investi no curso para melhorar a segurança do meu negócio e acabou sendo um divisor de águas. Hoje consigo identificar ameaças antes que elas se concretizem.',
      estrelas: 5
    }
  ]

  return (
    <section id="depoimentos" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-osint-black mb-4">
            O que nossos alunos dizem
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((depoimento, index) => (
            <motion.div
              key={depoimento.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-osint-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-osint-black rounded-full flex items-center justify-center text-osint-white font-bold mr-4">
                  {depoimento.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-osint-black">{depoimento.nome}</h4>
                  <p className="text-gray-600 text-sm">{depoimento.cargo}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{depoimento.texto}</p>
              <div className="flex text-yellow-400">
                {'★'.repeat(depoimento.estrelas)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Depoimentos