# 🔄 BFF Service - Backend For Frontend

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.18-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**Backend For Frontend (BFF)** - Camada de agregação e proxy entre frontend e microservices.

Desenvolvido por: **[@iYoNuttxD](https://github.com/iYoNuttxD)**

---

## 🎯 Funcionalidades

✅ **Agregação de Dados** - Combina dados de múltiplos microservices  
✅ **Proxy CRUD** - Encaminha requisições para Delivery e Orders Services  
✅ **Integração com Azure Functions** - CREATE via eventos HTTP Trigger  
✅ **Health Check** - Monitora status de todos os serviços  
✅ **Error Handling** - Tratamento robusto de erros  
✅ **Logging** - Winston para rastreamento completo  
✅ **Docker** - Container pronto para deploy  

---

## 🛠️ Tecnologias

- **Node.js 18+**
- **Express.js** - Framework web
- **Axios** - Cliente HTTP para chamadas aos microservices
- **Winston** - Logging estruturado
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Docker** - Containerização

---

## 🏗️ Arquitetura

```
┌──────────────┐
│  Frontend    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ BFF Service  │ ◄─── Você está aqui
└──┬───────┬───┘
   │       │
   ▼       ▼
┌────────┐ ┌────────┐ ┌─────────────┐
│Delivery│ │ Orders │ │   Azure     │
│Service │ │Service │ │  Functions  │
│(Azure  │ │(MongoDB│ │(HTTP Trigger│
│  SQL)  │ │ Atlas) │ │   Events)   │
└────────┘ └────────┘ └─────────────┘
```

---

## 📂 Estrutura do Projeto

```
bff-service/
├── src/
│   ├── config/
│   │   └── services.js
│   ├── services/
│   │   ├── deliveryService.js
│   │   ├── ordersService.js
│   │   └── functionService.js
│   ├── controllers/
│   │   ├── aggregationController.js
│   │   ├── eventController.js
│   │   ├── deliveryController.js
│   │   └── ordersController.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── aggregation.routes.js
│   │   ├── events.routes.js
│   │   ├── delivery.routes.js
│   │   └── orders.routes.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── logger.js
│   └── app.js
├── logs/
├── .env
├── Dockerfile
├── docker-compose.yml
├── openapi.yaml
└── README.md
```

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- Docker (opcional)
- Delivery Service rodando (porta 8082)
- Orders Service rodando (porta 8081)

### 1. Clonar Repositório

```bash
git clone https://github.com/iYoNuttxD/bff-service.git
cd bff-service
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
NODE_ENV=development
PORT=3000

# Microservices
DELIVERY_SERVICE_URL=http://localhost:8082
ORDERS_SERVICE_URL=http://localhost:8081

# Azure Functions
FUNCTION_CREATE_URL=https://erp-events-functions.azurewebsites.net/api/CreateEvent
FUNCTION_GET_URL=https://erp-events-functions.azurewebsites.net/api/GetData

# Configuration
SERVICE_TIMEOUT=30000
LOG_LEVEL=info
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

Servidor disponível em: **http://localhost:3000**

### 5. Executar em Produção

```bash
npm start
```

---

## 🐳 Docker

### Build da imagem

```bash
docker build -t iyonuttxd/bff-service:latest .
```

### Executar container

```bash
docker run -p 3000:3000 --env-file .env iyonuttxd/bff-service:latest
```

### Docker Compose

```bash
docker-compose up
```

### Docker Compose com todos os serviços

```bash
docker-compose --profile full-stack up
```

---

## 📡 API Endpoints

### Health Check

```http
GET /api/health
```

Retorna o status do BFF.

---

### Agregação de Dados

#### Dashboard Agregado
```http
GET /api/dashboard
```

Retorna dados agregados de Orders Service, Delivery Service e Azure Function.

**Resposta:**
```json
{
  "success": true,
  "data": {
    "orders": {
      "total": 10,
      "pending": 3,
      "delivered": 7
    },
    "deliveries": {
      "total": 15,
      "active": 5,
      "completed": 10
    },
    "events": {
      "total": 50,
      "recent": [...]
    }
  }
}
```

#### Pedido Completo com Entrega
```http
GET /api/aggregation/pedido-completo/:pedidoId
```

Combina dados do pedido (Orders) com dados da entrega (Delivery).

#### Health Check de Todos os Serviços
```http
GET /api/aggregation/health
```

Verifica o status de BFF, Delivery Service e Orders Service.

---

### Eventos (Azure Functions)

#### Criar via Evento
```http
POST /api/events
Content-Type: application/json
```

**Body:**
```json
{
  "type": "PEDIDO_CRIADO",
  "data": {
    "pedidoId": "123",
    "clienteId": "456",
    "valor": 100.00
  }
}
```

Envia evento para Azure Function via HTTP Trigger.  
A Function persiste os dados no MongoDB Atlas.

#### Buscar Dados da Function
```http
GET /api/events
GET /api/events/:id
```

---

### Proxy - Delivery Service

#### Entregadores
```http
GET    /api/delivery/entregadores
GET    /api/delivery/entregadores/:id
POST   /api/delivery/entregadores
PUT    /api/delivery/entregadores/:id
DELETE /api/delivery/entregadores/:id
```

#### Veículos
```http
GET    /api/delivery/veiculos
GET    /api/delivery/veiculos/:id
POST   /api/delivery/veiculos
PUT    /api/delivery/veiculos/:id
DELETE /api/delivery/veiculos/:id
```

#### Aluguéis
```http
GET    /api/delivery/alugueis
GET    /api/delivery/alugueis/:id
POST   /api/delivery/alugueis
PATCH  /api/delivery/alugueis/:id/finalizar
PATCH  /api/delivery/alugueis/:id/cancelar
```

#### Entregas
```http
GET    /api/delivery/entregas
GET    /api/delivery/entregas/:id
POST   /api/delivery/entregas
PATCH  /api/delivery/entregas/:id/status
```

---

### Proxy - Orders Service

#### Clientes
```http
GET    /api/orders/clientes
GET    /api/orders/clientes/:id
POST   /api/orders/clientes
PUT    /api/orders/clientes/:id
DELETE /api/orders/clientes/:id
```

#### Restaurantes
```http
GET    /api/orders/restaurantes
GET    /api/orders/restaurantes/:id
POST   /api/orders/restaurantes
PUT    /api/orders/restaurantes/:id
DELETE /api/orders/restaurantes/:id
```

#### Cardápios
```http
GET    /api/orders/cardapios
GET    /api/orders/cardapios/:id
POST   /api/orders/cardapios
PUT    /api/orders/cardapios/:id
DELETE /api/orders/cardapios/:id
```

#### Pedidos
```http
GET    /api/orders/pedidos
GET    /api/orders/pedidos/:id
POST   /api/orders/pedidos
PATCH  /api/orders/pedidos/:id/status
PATCH  /api/orders/pedidos/:id/cancelar
```

#### Avaliações
```http
GET    /api/orders/avaliacoes
GET    /api/orders/avaliacoes/:id
POST   /api/orders/avaliacoes
PUT    /api/orders/avaliacoes/:id
DELETE /api/orders/avaliacoes/:id
```

#### Pagamentos
```http
GET    /api/orders/pagamentos
GET    /api/orders/pagamentos/:id
POST   /api/orders/pagamentos
PATCH  /api/orders/pagamentos/:id/status
PATCH  /api/orders/pagamentos/:id/processar
PATCH  /api/orders/pagamentos/:id/cancelar
```

---

## 🧪 Testar Endpoints

### Verificar Health

```bash
curl http://localhost:3000/api/health
```

### Testar Agregação

```bash
curl http://localhost:3000/api/dashboard
curl http://localhost:3000/api/aggregation/health
```

### Testar Proxy Delivery

```bash
curl http://localhost:3000/api/delivery/entregadores
```

### Testar Proxy Orders

```bash
curl http://localhost:3000/api/orders/clientes
```

### Criar Evento

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"type":"PEDIDO_CRIADO","data":{"pedidoId":"123","valor":100}}'
```

---

## 🐳 Docker Hub

### Pull da imagem

```bash
docker pull iyonuttxd/bff-service:latest
```

### Executar

```bash
docker run -p 3000:3000 \
  -e DELIVERY_SERVICE_URL=http://delivery-service:8082 \
  -e ORDERS_SERVICE_URL=http://orders-service:8081 \
  -e FUNCTION_CREATE_URL=https://erp-events-functions.azurewebsites.net/api/CreateEvent \
  -e FUNCTION_GET_URL=https://erp-events-functions.azurewebsites.net/api/GetData \
  iyonuttxd/bff-service:latest
```

---

## 🔗 Repositórios Relacionados

- **MicroFrontEnd**: https://github.com/iYoNuttxD/microfrontend-erp
- **Delivery Service**: https://github.com/iYoNuttxD/delivery-service-microservice
- **Orders Service**: https://github.com/iYoNuttxD/orders-service-microservice
- **Azure Functions**: https://github.com/iYoNuttxD/azure-functions-v4

---

## 📚 Documentação

- **OpenAPI Spec**: `openapi.yaml`
- **Swagger UI**: http://localhost:3000/api-docs (quando disponível)

---

## 🎯 Padrões Implementados

- ✅ **BFF Pattern** (Backend For Frontend)
- ✅ **API Gateway Pattern** (Proxy)
- ✅ **Aggregation Pattern** (Combinar dados)
- ✅ **Event Sourcing** (Via Azure Functions)
- ✅ **Health Check Pattern**
- ✅ **Circuit Breaker** (Timeout handling)

---

## 📄 Licença

MIT License - veja LICENSE para mais detalhes.

---

## 👤 Autor

**iYoNuttxD**

- GitHub: [@iYoNuttxD](https://github.com/iYoNuttxD)
- Repositório: https://github.com/iYoNuttxD/bff-service

---

## 📅 Versão

**v1.0.0** - 27/10/2025

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!**
