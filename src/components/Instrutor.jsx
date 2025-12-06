import { motion } from 'framer-motion'

function Instrutor() {
  const diferencias = [
    'Atualizações mensais de conteúdo',
    'Acesso vitalício às aulas',
    'Comunidade exclusiva de alunos',
    'Mentoria semanal ao vivo'
  ]

  return (
    <section id="instrutor" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-osint-black mb-4">
            Sobre o Instrutor
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-osint-white p-8 rounded-lg shadow-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Instrutor" 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-2xl font-bold text-osint-black mb-2">Alex Silva</h3>
            <p className="text-gray-600 mb-4">Especialista em Segurança da Informação e OSINT</p>
            <div className="space-y-2 text-gray-700">
              <p><strong>•</strong> +10 anos de experiência em segurança cibernética</p>
              <p><strong>•</strong> Ex-agente de inteligência</p>
              <p><strong>•</strong> Consultor sênior em segurança para grandes corporações</p>
              <p><strong>•</strong> Palestrante internacional em conferências de segurança</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 mb-6"
            >
              Alex Silva é referência nacional em inteligência de fontes abertas e segurança cibernética. 
              Com uma trajetória marcada por investigações complexas e consultorias de alto nível, 
              Alex traz para o curso uma visão prática e atualizada das necessidades do mercado.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-700 mb-6"
            >
              Seu método de ensino combina teoria consistente com prática intensiva, garantindo que 
              os alunos saiam do curso com habilidades reais e aplicáveis imediatamente no mercado de trabalho.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-osint-black bg-opacity-10 p-6 rounded-lg"
            >
              <h4 className="font-bold text-osint-black mb-3">Diferenciais do curso:</h4>
              <ul className="space-y-2 text-gray-700">
                {diferencias.map((item, index) => (
                  <li key={item}><strong>•</strong> {item}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Instrutor