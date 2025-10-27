# 🎨 ERP Builders - MicroFrontEnd

MicroFrontEnd em React para gerenciamento de pedidos, entregas e eventos do sistema ERP Builders.

## 🚀 Tecnologias

- **React** 18.x
- **React Router** 6.x
- **Axios** para comunicação com APIs
- **CSS Modules** para estilização

## 🏗️ Arquitetura

```
Frontend (React)
    ↓
BFF Service (Node.js)
    ↓
┌────────────────┬──────────────────┬─────────────────┐
│  Orders        │  Delivery        │  Events         │
│  MongoDB Atlas │  Azure SQL       │  Azure Functions│
└────────────────┴──────────────────┴─────────────────┘
```

## 📂 Estrutura do Projeto

```
microfrontend-erp/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Orders.js
│   │   ├── Delivery.js
│   │   └── Events.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- BFF Service rodando na porta 3000

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/iYoNuttxD/microfrontend-erp.git
cd microfrontend-erp

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Criar arquivo .env na raiz:
REACT_APP_API_URL=http://localhost:3000/api
```

### Executar em Desenvolvimento

```bash
npm start
```

Acesse: http://localhost:3001

### Build para Produção

```bash
npm run build
```

## 🎯 Funcionalidades

### 📦 Gerenciamento de Pedidos
- ✅ Listar pedidos (MongoDB Atlas)
- ✅ Criar novos pedidos
- ✅ Visualizar detalhes
- ✅ Filtrar por status

### 🚚 Gerenciamento de Entregas
- ✅ Listar entregas (Azure SQL)
- ✅ Criar novas entregas
- ✅ Atualizar status
- ✅ Rastreamento completo

### 📊 Eventos (Event Sourcing)
- ✅ Listar eventos (Azure Functions + MongoDB Atlas)
- ✅ Criar eventos manualmente
- ✅ Filtrar por tipo
- ✅ Histórico imutável completo
- ✅ Criação automática de eventos ao criar pedidos/entregas

## 🔗 Integrações

### BFF Service
- **URL:** http://localhost:3000
- **Repositório:** [bff-service](https://github.com/iYoNuttxD/bff-service)

### Orders Service
- **URL:** http://localhost:8081
- **Banco:** MongoDB Atlas
- **Repositório:** [orders-service-microservice](https://github.com/iYoNuttxD/orders-service-microservice)

### Delivery Service
- **URL:** http://localhost:8082
- **Banco:** Azure SQL Server
- **Repositório:** [delivery-service-microservice](https://github.com/iYoNuttxD/delivery-service-microservice)

### Azure Functions (Event Sourcing)
- **URL:** https://erp-events-functions.azurewebsites.net/api
- **Functions:**
  - `CreateEvent` - Criar eventos
  - `GetData` - Listar eventos
- **Banco:** MongoDB Atlas (erp-events-db)

## 📊 Event Sourcing

Todos os eventos importantes do sistema são capturados:

- `PEDIDO_CRIADO` - Quando um pedido é criado
- `PEDIDO_CONFIRMADO` - Quando um pedido é confirmado
- `PEDIDO_PREPARANDO` - Quando começa a preparação
- `PEDIDO_PRONTO` - Quando está pronto
- `PEDIDO_ENTREGUE` - Quando é entregue
- `PEDIDO_CANCELADO` - Quando é cancelado
- `ENTREGA_INICIADA` - Quando uma entrega começa
- `ENTREGA_COLETADA` - Quando é coletada
- `ENTREGA_EM_TRANSITO` - Quando está em trânsito
- `ENTREGA_CONCLUIDA` - Quando é concluída

Eventos são **imutáveis** e armazenados permanentemente no MongoDB Atlas via Azure Functions.

## 🐳 Docker

```bash
# Build
docker build -t iyonuttxd/microfrontend-erp:latest .

# Run
docker run -p 3001:80 iyonuttxd/microfrontend-erp:latest
```

## 🌐 Variáveis de Ambiente

```env
REACT_APP_API_URL=http://localhost:3000/api
```
## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**iYoNuttxD**
- GitHub: [@iYoNuttxD](https://github.com/iYoNuttxD)

## 🎓 Projeto Acadêmico

Desenvolvido como parte do curso de Engenharia de Software

**Arquitetura de Microserviços com:**
- BFF Pattern
- Event Sourcing
- Cloud Computing (Azure)
- NoSQL (MongoDB Atlas)
- SQL (Azure SQL Server)
- Serverless (Azure Functions)
