const express = require('express');
const aggregationController = require('../controllers/aggregationController');

const router = express.Router();

// Dashboard com dados agregados
router.get('/dashboard', aggregationController.getDashboard);

// Pedido completo com entrega
router.get('/pedido-completo/:pedidoId', aggregationController.getPedidoCompleto);

// Dados completos (microservices + function)
router.get('/dados-completos', aggregationController.getDadosCompletos);

// Health check de todos os serviços
router.get('/health', aggregationController.checkAllHealth);

module.exports = router;