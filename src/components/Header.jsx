import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-osint-white shadow-sm' : 'bg-osint-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-osint-black">OSINT</span>
                <span className="text-2xl font-light text-osint-gray">Master</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['sobre', 'curriculo', 'instrutor', 'depoimentos', 'preco'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-700 hover:text-osint-black transition-colors font-medium"
                >
                  {section === 'preco' ? 'Preço' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection('matricula')}
                className="bg-osint-black text-osint-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-semibold"
              >
                Matricule-se Agora
              </button>
            </div>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bg-osint-white shadow-lg z-50 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {['sobre', 'curriculo', 'instrutor', 'depoimentos', 'preco'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left text-gray-700 hover:text-osint-black transition-colors py-2"
                >
                  {section === 'preco' ? 'Preço' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('matricula')}
                className="w-full bg-osint-black text-osint-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-semibold"
              >
                Matricule-se Agora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header