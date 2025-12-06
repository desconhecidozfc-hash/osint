import { motion } from 'framer-motion'

function FAQ() {
  const perguntas = [
    {
      pergunta: 'Preciso ter conhecimentos prévios em TI?',
      resposta: 'Não! Nosso curso foi desenvolvido para atender desde iniciantes até profissionais experientes. O conteúdo é progressivo e todas as ferramentas são explicadas passo a passo.'
    },
    {
      pergunta: 'O curso é 100% online?',
      resposta: 'Sim, todo o conteúdo está disponível na plataforma online. Você pode assistir quando e onde quiser, pelo computador, tablet ou smartphone.'
    },
    {
      pergunta: 'Existe validade para o certificado?',
      resposta: 'O certificado tem validade vitalícia e é reconhecido nacionalmente. Ele comprova sua capacitação em técnicas avançadas de OSINT.'
    },
    {
      pergunta: 'Posso solicitar reembolso?',
      resposta: 'Sim, oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu investimento.'
    },
    {
      pergunta: 'Como funciona o suporte?',
      resposta: 'O suporte é feito através de fórum exclusivo para alunos, onde você pode tirar dúvidas e interagir com outros participantes. Nos planos completo e premium, o suporte é prioritário.'
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-osint-black mb-4">
            Perguntas Frequentes
          </h2>
        </motion.div>
        
        <div className="space-y-6">
          {perguntas.map((item, index) => (
            <motion.div
              key={item.pergunta}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-osint-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-osint-black mb-3">{item.pergunta}</h3>
              <p className="text-gray-700">{item.resposta}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ