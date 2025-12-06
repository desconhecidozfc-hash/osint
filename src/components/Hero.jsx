import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Hero() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2025-10-15T00:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const diff = targetDate - now
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setCountdown({ days, hours, minutes, seconds })
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-gradient-to-br from-osint-black to-osint-gray text-osint-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Torne-se um Especialista em
              <span className="text-osint-white"> Inteligência de Fontes Abertas</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Aprenda as técnicas mais avançadas de investigação digital utilizadas por 
              agentes de segurança, jornalistas investigativos e profissionais de inteligência.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {['100% Online', '+50 Horas de Conteúdo', 'Certificado Reconhecido'].map((badge, index) => (
                <span key={badge} className="bg-osint-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                  {badge}
                </span>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('matricula')}
                className="bg-osint-white text-osint-black px-8 py-3 rounded-md text-lg font-bold hover:bg-gray-200 transition-colors text-center"
              >
                Garanta sua vaga agora
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('curriculo')}
                className="border-2 border-osint-white text-osint-white px-8 py-3 rounded-md text-lg font-bold hover:bg-osint-white hover:text-osint-black transition-colors text-center"
              >
                Conheça o curso
              </motion.button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-gray-300 mt-6 text-sm"
            >
              +1.000 alunos formados • Garantia de 7 dias • Suporte vitalício
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-osint-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              {[
                { title: 'Técnicas Avançadas', desc: 'Métodos profissionais de coleta e análise' },
                { title: 'Ferramentas Exclusivas', desc: 'Acesso a softwares e recursos premium' },
                { title: 'Casos Reais', desc: 'Estudos de caso e simulações práticas' },
                { title: 'Networking', desc: 'Comunidade de profissionais' }
              ].map((item, index) => (
                <div key={item.title} className="bg-black bg-opacity-30 p-4 rounded-lg">
                  <h3 className="font-bold text-osint-white">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.desc}</p>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-black bg-opacity-40 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-4">Próxima turma:</h3>
              <p className="text-2xl font-bold text-osint-white">15 de Outubro</p>
              <p className="text-gray-300 mt-2">Vagas limitadas - Inscrições encerradas em:</p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex gap-4 mt-4"
              >
                {[
                  { label: 'Dias', value: countdown.days },
                  { label: 'Horas', value: countdown.hours },
                  { label: 'Minutos', value: countdown.minutes },
                  { label: 'Segundos', value: countdown.seconds }
                ].map((item) => (
                  <div key={item.label} className="bg-osint-black px-4 py-2 rounded text-center flex-1">
                    <div className="text-2xl font-bold">{String(item.value).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-200">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero