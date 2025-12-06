import { motion } from 'framer-motion'

function Sobre() {
  const features = [
    {
      number: '1',
      title: 'Fundamentos de OSINT',
      description: 'Entenda os princípios básicos da inteligência de fontes abertas, sua importância e aplicações práticas no mundo moderno.'
    },
    {
      number: '2',
      title: 'Buscas Avançadas',
      description: 'Domine técnicas de busca avançada em motores de busca, redes sociais e bancos de dados públicos.'
    },
    {
      number: '3',
      title: 'Análise de Redes Sociais',
      description: 'Aprenda a extrair informações valiosas de plataformas sociais e a mapear conexões entre usuários.'
    },
    {
      number: '4',
      title: 'Geolocalização',
      description: 'Descubra como obter e analisar dados de geolocalização para investigações e análise de proximidade.'
    },
    {
      number: '5',
      title: 'Dark Web',
      description: 'Explore os fundamentos da Deep Web e Dark Web de forma segura e ética.'
    },
    {
      number: '6',
      title: 'Relatórios Técnicos',
      description: 'Desenvolva habilidades para criar relatórios de inteligência claros, objetivos e impactantes.'
    }
  ]

  return (
    <section id="sobre" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-osint-black mb-4">
            O que você vai aprender
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nosso curso abrange desde os fundamentos até as técnicas mais avançadas de OSINT, 
            preparando você para enfrentar os desafios reais do mundo da inteligência e investigação digital.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-osint-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-osint-black text-osint-white rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold">{feature.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sobre