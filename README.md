# CRM Financeiro - Sistema de Gestão de Membros com Dashboard

## Visão Geral
Sistema de CRM financeiro completo com dashboard de gastos e orçamentos em tempo real, painel administrativo para gerenciar 20 contas de membro e 1 conta de administrador.

## Funcionalidades Principais

### 🏗️ **Arquitetura Completa**
- **Frontend**: Next.js 14 com React
- **Backend**: API Routes do Next.js
- **Banco de Dados**: PostgreSQL (Vercel Postgres)
- **Estilização**: Tailwind CSS
- **Gráficos**: Recharts
- **Toasts**: React Toastify

### 👥 **Gestão de Usuários**
- **1 Conta de Administrador**: ID: ADMIN001, Email: admin@empresa.com, Senha: password
- **20 Contas de Membro**: IDs MBR001 a MBR020 com emails membro1@empresa.com a membro20@empresa.com
- **Atualização em Tempo Real**: Alterações de email e senha são refletidas instantaneamente no banco de dados

### 📊 **Dashboard Financeiro**
- **Gráficos de Barras**: Comparativo mensal de orçamento vs despesas
- **Gráficos de Linha**: Evolução de gastos ao longo do tempo
- **Gráficos de Pizza**: Distribuição de gastos por categoria
- **Cards de Resumo**: Total de membros, orçamento total, despesas totais

### 🔧 **Painel Administrativo**
- **Filtro Inteligente**: Busca por nome, email ou ID
- **Exportação de Dados**: Download em CSV das informações dos membros
- **Atualização em Lote**: Edição de múltiplos campos simultaneamente
- **Controle de Status**: Ativação e desativação de contas

## Tecnologias Utilizadas

### Frontend
- **Next.js 14**: Framework React completo
- **React 18**: Biblioteca de interface
- **Tailwind CSS**: Framework de estilização
- **Recharts**: Biblioteca de gráficos
- **React Toastify**: Sistema de notificações

### Backend
- **Next.js API Routes**: Rotas de API serverless
- **Vercel Postgres**: Banco de dados PostgreSQL
- **Node.js**: Runtime JavaScript

## Estrutura de Arquivos

```
crm-financeiro/
├── app/                    # App Router (Next.js 14)
│   ├── components/         # Componentes React
│   │   ├── AdminPanel.jsx  # Painel administrativo
│   │   ├── DashboardCharts.jsx  # Gráficos do dashboard
│   │   ├── MembersTable.jsx     # Tabela de membros
│   │   └── SummaryCards.jsx     # Cards de resumo
│   ├── globals.css         # Estilos globais
│   ├── layout.js          # Layout da aplicação
│   └── page.js            # Página principal
├── lib/                   # Bibliotecas auxiliares
│   ├── auth.js           # Funções de autenticação
│   └── db.js             # Inicialização do banco de dados
├── pages/                 # API Routes
│   └── api/
│       ├── auth.js       # Autenticação
│       ├── charts.js     # Dados para gráficos
│       ├── export.js     # Exportação de dados
│       ├── health.js     # Health check
│       └── members/      # CRUD de membros
├── package.json          # Dependências
├── next.config.js        # Configuração Next.js
├── tailwind.config.js    # Configuração Tailwind
└── README.md            # Documentação
```

## Configuração do Banco de Dados

O sistema cria automaticamente:
1. **Tabela users**: Armazena todos os usuários (admin + membros)
2. **Conta Admin**: ADMIN001 com permissões totais
3. **20 Contas Membro**: MBR001 a MBR020 com dados fictícios

### Estrutura da Tabela
```sql
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    budget DECIMAL(10,2) DEFAULT 0,
    expenses DECIMAL(10,2) DEFAULT 0,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Como Executar

### Requisitos
- Node.js 18+
- Acesso ao Vercel Postgres (para banco de dados)

### Passos

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env.local` na raiz:
   ```
   DATABASE_URL="sua-string-de-conexão-postgres"
   ```

3. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acessar a aplicação**:
   Abra [http://localhost:3000](http://localhost:3000) no navegador

5. **Credenciais de Acesso**:
   - **Admin**: admin@empresa.com / password
   - **Membro**: membro1@empresa.com / password

## Funcionalidades do Painel Administrativo

### Gestão de Membros
- **Visualização em Tabela**: Lista completa com filtros
- **Visualização em Cards**: Interface mais amigável
- **Edição Individual**: Atualização de email, senha e status
- **Exportação**: Download de todos os dados em CSV

### Dashboard Financeiro
- **Gráficos Interativos**: Visualização clara dos dados
- **Atualização em Tempo Real**: Dados sempre atualizados
- **Comparativos**: Orçamento vs Realizado vs Despesas
- **Resumo Executivo**: Visão geral dos principais indicadores

## Segurança

- **Validação de Entrada**: Todos os dados são validados
- **SQL Injection**: Prevenido com parâmetros preparados
- **Autenticação**: Sistema básico para demonstração
- **Controle de Acesso**: Separação clara entre admin e membros

## Deploy

### Vercel (Recomendado)
1. Conecte o repositório ao Vercel
2. Configure a variável `DATABASE_URL`
3. O deploy será automático

### Outros Providers
Qualquer provider que suporte Next.js 14 e PostgreSQL

## Observações Importantes

- **Senha Padrão**: Todos os membros usam a mesma senha (password) para demonstração
- **Dados Fictícios**: Os valores de orçamento e despesas são gerados aleatoriamente
- **Ambiente de Teste**: Este sistema é para fins educacionais e demonstração
- **Personalização**: Facilmente adaptável para necessidades reais

## Suporte

Para dúvidas ou suporte:
- Verifique o console do navegador para erros
- Confira a conexão com o banco de dados
- Consulte os logs do servidor

---

**⚠️ Importante**: Este é um sistema de demonstração. Para uso em produção, implemente:
- Sistema de autenticação robusto (OAuth, JWT)
- Criptografia de senhas (bcrypt)
- Validação de dados mais rigorosa
- Logs de auditoria
- Backups regulares do banco de dados