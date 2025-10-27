const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ========================================
// MIDDLEWARES
// ========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de log (se existir)
const logger = require('./utils/logger');
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Error handler middleware
const errorHandler = require('./middlewares/errorHandler');

// ========================================
// IMPORTAR ROTAS
// ========================================
const ordersRoutes = require('./routes/orders.routes');
const deliveryRoutes = require('./routes/delivery.routes');
const eventsRoutes = require('./routes/events.routes');
const aggregationRoutes = require('./routes/aggregation.routes');

// ========================================
// REGISTRAR ROTAS
// ========================================
app.use('/api/orders', ordersRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/aggregation', aggregationRoutes);

// ========================================
// ROTA DE HEALTH CHECK
// ========================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BFF Service is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      orders: process.env.ORDERS_SERVICE_URL || 'not configured',
      delivery: process.env.DELIVERY_SERVICE_URL || 'not configured',
      azureFunctions: {
        createEvent: process.env.AZURE_FUNCTION_CREATE_EVENT || 'not configured',
        getData: process.env.AZURE_FUNCTION_GET_DATA || 'not configured'
      }
    }
  });
});

// ========================================
// ROTA RAIZ
// ========================================
app.get('/', (req, res) => {
  res.json({
    message: 'BFF Service - ERP Builders',
    version: '1.0.0',
    author: '@iYoNuttxD',
    documentation: '/api-docs',
    endpoints: {
      orders: '/api/orders',
      delivery: '/api/delivery',
      events: '/api/events',
      aggregation: '/api/aggregation',
      health: '/health'
    }
  });
});

// ========================================
// ERROR HANDLER (deve ser o último)
// ========================================
app.use(errorHandler);

// ========================================
// INICIAR SERVIDOR
// ========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   🚀 BFF SERVICE RODANDO               ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║   📡 Porta: ${PORT}                       ║`);
  console.log(`║   🌍 http://localhost:${PORT}             ║`);
  console.log('╠════════════════════════════════════════╣');
  console.log('║   📋 Endpoints Disponíveis:            ║');
  console.log('║   • GET  /                             ║');
  console.log('║   • GET  /health                       ║');
  console.log('║   • *    /api/orders                   ║');
  console.log('║   • *    /api/delivery                 ║');
  console.log('║   • *    /api/events                   ║');
  console.log('║   • *    /api/aggregation              ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log('🔗 Azure Functions:');
  console.log(`   • CreateEvent: ${process.env.AZURE_FUNCTION_CREATE_EVENT || '❌ Não configurado'}`);
  console.log(`   • GetData: ${process.env.AZURE_FUNCTION_GET_DATA || '❌ Não configurado'}`);
});

module.exports = app;