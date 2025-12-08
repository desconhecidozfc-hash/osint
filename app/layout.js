import './globals.css'

export const metadata = {
  title: 'CRM Financeiro - Dashboard',
  description: 'Sistema de CRM com dashboard de gastos e orçamentos em tempo real',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  )
}