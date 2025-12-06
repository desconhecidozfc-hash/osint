import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Curriculo from './components/Curriculo'
import Instrutor from './components/Instrutor'
import Depoimentos from './components/Depoimentos'
import Preco from './components/Preco'
import Matricula from './components/Matricula'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Hero />
        <Sobre />
        <Curriculo />
        <Instrutor />
        <Depoimentos />
        <Preco />
        <Matricula />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App