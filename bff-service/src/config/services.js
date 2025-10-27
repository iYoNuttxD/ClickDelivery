require('dotenv').config();

module.exports = {
  deliveryService: {
    baseURL: process.env.DELIVERY_SERVICE_URL || 'http://localhost:3001',
    timeout: parseInt(process.env.SERVICE_TIMEOUT) || 30000,
    endpoints: {
      entregadores: '/api/v1/entregadores',
      veiculos: '/api/v1/veiculos',
      alugueis: '/api/v1/alugueis',
      entregas: '/api/v1/entregas',
      health: '/api/v1/health'
    }
  },
  
  ordersService: {
    baseURL: process.env.ORDERS_SERVICE_URL || 'http://localhost:3002',
    timeout: parseInt(process.env.SERVICE_TIMEOUT) || 30000,
    endpoints: {
      clientes: '/api/v1/clientes',
      restaurantes: '/api/v1/restaurantes',
      cardapios: '/api/v1/cardapios',
      pedidos: '/api/v1/pedidos',
      avaliacoes: '/api/v1/avaliacoes',
      pagamentos: '/api/v1/pagamentos',
      health: '/api/v1/health',
      dashboard: '/api/v1/pedidos/dashboard'
    }
  },
  
  azureFunctions: {
    createFunction: {
      url: process.env.FUNCTION_CREATE_URL,
      timeout: parseInt(process.env.SERVICE_TIMEOUT) || 30000
    },
    getFunction: {
      url: process.env.FUNCTION_GET_URL,
      timeout: parseInt(process.env.SERVICE_TIMEOUT) || 30000
    }
  }
};