'use client'

import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { MembersTable } from './components/MembersTable'
import { DashboardCharts } from './components/DashboardCharts'
import { SummaryCards } from './components/SummaryCards'
import { AdminPanel } from './components/AdminPanel'

export default function Home() {
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [])

  useEffect(() => {
    if (members.length > 0) {
      const filtered = members.filter(member =>
        member.name.toLowerCase().includes(filter.toLowerCase()) ||
        member.email.toLowerCase().includes(filter.toLowerCase()) ||
        member.id.toLowerCase().includes(filter.toLowerCase())
      )
      setFilteredMembers(filtered)
    }
  }, [filter, members])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/members')
      const data = await response.json()
      setMembers(data)
      setFilteredMembers(data)
    } catch (error) {
      toast.error('Erro ao carregar membros')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateMember = async (memberId, updates) => {
    try {
      const response = await fetch(`/api/members/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Membro atualizado com sucesso!')
        fetchMembers()
      } else {
        toast.error(result.error || 'Erro ao atualizar membro')
      }
    } catch (error) {
      toast.error('Erro ao atualizar membro')
      console.error(error)
    }
  }

  const handleExportData = async () => {
    try {
      const response = await fetch('/api/export')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'dados_membros.csv'
      a.click()
      window.URL.revokeObjectURL(url)
      toast.success('Dados exportados com sucesso!')
    } catch (error) {
      toast.error('Erro ao exportar dados')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      {/* Header */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              <h1 className="text-2xl font-bold">CRM Financeiro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Olá, Admin</span>
              <button 
                onClick={() => toast.info('Sistema pronto para logout')}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Panel */}
        <AdminPanel 
          onExport={handleExportData}
          onRefresh={fetchMembers}
          onFilterChange={setFilter}
          filter={filter}
        />

        {/* Members Table */}
        <MembersTable 
          members={filteredMembers}
          loading={loading}
          onUpdateMember={handleUpdateMember}
        />

        {/* Dashboard Charts */}
        <DashboardCharts />

        {/* Summary Cards */}
        <SummaryCards members={members} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm">© 2024 CRM Financeiro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}