const express = require('express');
const deliveryController = require('../controllers/deliveryController');

const router = express.Router();

// ==================== ENTREGADORES ====================
router.get('/entregadores', deliveryController.getEntregadores);
router.get('/entregadores/:id', deliveryController.getEntregadorById);
router.post('/entregadores', deliveryController.createEntregador);
router.put('/entregadores/:id', deliveryController.updateEntregador);
router.delete('/entregadores/:id', deliveryController.deleteEntregador);

// ==================== VEÍCULOS ====================
router.get('/veiculos', deliveryController.getVeiculos);
router.get('/veiculos/:id', deliveryController.getVeiculoById);
router.post('/veiculos', deliveryController.createVeiculo);
router.put('/veiculos/:id', deliveryController.updateVeiculo);
router.delete('/veiculos/:id', deliveryController.deleteVeiculo);

// ==================== ALUGUÉIS ====================
router.get('/alugueis', deliveryController.getAlugueis);
router.get('/alugueis/:id', deliveryController.getAluguelById);
router.post('/alugueis', deliveryController.createAluguel);
router.patch('/alugueis/:id/finalizar', deliveryController.finalizarAluguel);
router.patch('/alugueis/:id/cancelar', deliveryController.cancelarAluguel);

// ==================== ENTREGAS ====================
router.get('/entregas', deliveryController.getEntregas);
router.get('/entregas/:id', deliveryController.getEntregaById);
router.post('/entregas', deliveryController.createEntrega);
router.patch('/entregas/:id/status', deliveryController.updateEntregaStatus);

module.exports = router;