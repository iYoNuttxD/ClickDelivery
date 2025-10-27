const express = require('express');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

// ==================== CLIENTES ====================
router.get('/clientes', ordersController.getClientes);
router.get('/clientes/:id', ordersController.getClienteById);
router.post('/clientes', ordersController.createCliente);
router.put('/clientes/:id', ordersController.updateCliente);
router.delete('/clientes/:id', ordersController.deleteCliente);

// ==================== RESTAURANTES ====================
router.get('/restaurantes', ordersController.getRestaurantes);
router.get('/restaurantes/:id', ordersController.getRestauranteById);
router.post('/restaurantes', ordersController.createRestaurante);
router.put('/restaurantes/:id', ordersController.updateRestaurante);
router.delete('/restaurantes/:id', ordersController.deleteRestaurante);

// ==================== CARDÁPIOS ====================
router.get('/cardapios', ordersController.getCardapios);
router.get('/cardapios/:id', ordersController.getCardapioById);
router.post('/cardapios', ordersController.createCardapio);
router.put('/cardapios/:id', ordersController.updateCardapio);
router.delete('/cardapios/:id', ordersController.deleteCardapio);

// ==================== PEDIDOS ====================
router.get('/pedidos', ordersController.getPedidos);
router.get('/pedidos/:id', ordersController.getPedidoById);
router.post('/pedidos', ordersController.createPedido);
router.patch('/pedidos/:id/status', ordersController.updatePedidoStatus);
router.patch('/pedidos/:id/cancelar', ordersController.cancelarPedido);

// ==================== AVALIAÇÕES ====================
router.get('/avaliacoes', ordersController.getAvaliacoes);
router.get('/avaliacoes/:id', ordersController.getAvaliacaoById);
router.post('/avaliacoes', ordersController.createAvaliacao);
router.put('/avaliacoes/:id', ordersController.updateAvaliacao);
router.delete('/avaliacoes/:id', ordersController.deleteAvaliacao);

// ==================== PAGAMENTOS ====================
router.get('/pagamentos', ordersController.getPagamentos);
router.get('/pagamentos/:id', ordersController.getPagamentoById);
router.post('/pagamentos', ordersController.createPagamento);
router.patch('/pagamentos/:id/status', ordersController.updatePagamentoStatus);
router.patch('/pagamentos/:id/processar', ordersController.processarPagamento);
router.patch('/pagamentos/:id/cancelar', ordersController.cancelarPagamento);

module.exports = router;