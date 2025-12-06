import { motion } from 'framer-motion'

function Curriculo() {
  const moduloBasico = [
    'Introdução ao OSINT: Conceitos, ética e aplicações',
    'Buscas no Google: Operadores avançados e técnicas exclusivas',
    'Redes Sociais: Facebook, Twitter, Instagram e LinkedIn',
    'Imagens e Vídeos: Busca reversa e análise de metadados',
    'Geolocalização: Ferramentas e técnicas de mapeamento'
  ]

  const moduloAvancado = [
    'Deep Web: Acesso seguro e busca de informações',
    'Dark Web: Navegação segura e fontes confiáveis',
    'Ferramentas Especializadas: Maltego, Recon-ng e outras',
    'Automação: Python para OSINT e scripts avançados',
    'Relatórios de Inteligência: Metodologia e técnicas'
  ]

  return (
    <section id="curriculo" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-osint-black mb-4">
            Estrutura do Curso
          </h2>
          <p className="text-lg text-gray-600">
            +50 horas de conteúdo prático e atualizado com as últimas técnicas do mercado
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-osint-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-osint-black mb-4">Módulo Básico</h3>
            <ul className="space-y-3">
              {moduloBasico.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-osint-black mr-3">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-osint-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-osint-black mb-4">Módulo Avançado</h3>
            <ul className="space-y-3">
              {moduloAvancado.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-osint-black mr-3">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Curriculo