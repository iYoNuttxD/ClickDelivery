const express = require('express');
const aggregationRoutes = require('./aggregation.routes');
const eventsRoutes = require('./events.routes');
const deliveryRoutes = require('./delivery.routes');
const ordersRoutes = require('./orders.routes');

const router = express.Router();

// Health Check do BFF
router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'BFF Service',
    version: '1.0.0'
  });
});

// Rotas de agregação
router.use('/aggregation', aggregationRoutes);

// Rotas de eventos (Azure Functions)
router.use('/events', eventsRoutes);

// Rotas de proxy para Delivery Service
router.use('/delivery', deliveryRoutes);

// Rotas de proxy para Orders Service
router.use('/orders', ordersRoutes);

module.exports = router;