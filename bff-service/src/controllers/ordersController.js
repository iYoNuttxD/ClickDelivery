const ordersService = require('../services/ordersService');

class OrdersController {
  // ==================== CLIENTES ====================
  async getClientes(req, res, next) {
    try {
      const data = await ordersService.getClientes(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getClienteById(req, res, next) {
    try {
      const data = await ordersService.getClienteById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createCliente(req, res, next) {
    try {
      const data = await ordersService.createCliente(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateCliente(req, res, next) {
    try {
      const data = await ordersService.updateCliente(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteCliente(req, res, next) {
    try {
      await ordersService.deleteCliente(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // ==================== RESTAURANTES ====================
  async getRestaurantes(req, res, next) {
    try {
      const data = await ordersService.getRestaurantes(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getRestauranteById(req, res, next) {
    try {
      const data = await ordersService.getRestauranteById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createRestaurante(req, res, next) {
    try {
      const data = await ordersService.createRestaurante(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateRestaurante(req, res, next) {
    try {
      const data = await ordersService.updateRestaurante(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteRestaurante(req, res, next) {
    try {
      await ordersService.deleteRestaurante(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // ==================== CARDÁPIOS ====================
  async getCardapios(req, res, next) {
    try {
      const data = await ordersService.getCardapios(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCardapioById(req, res, next) {
    try {
      const data = await ordersService.getCardapioById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createCardapio(req, res, next) {
    try {
      const data = await ordersService.createCardapio(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateCardapio(req, res, next) {
    try {
      const data = await ordersService.updateCardapio(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteCardapio(req, res, next) {
    try {
      await ordersService.deleteCardapio(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // ==================== PEDIDOS ====================
  async getPedidos(req, res, next) {
    try {
      const data = await ordersService.getPedidos(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getPedidoById(req, res, next) {
    try {
      const data = await ordersService.getPedidoById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createPedido(req, res, next) {
    try {
      const data = await ordersService.createPedido(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updatePedidoStatus(req, res, next) {
    try {
      const data = await ordersService.updatePedidoStatus(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async cancelarPedido(req, res, next) {
    try {
      const data = await ordersService.cancelarPedido(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // ==================== AVALIAÇÕES ====================
  async getAvaliacoes(req, res, next) {
    try {
      const data = await ordersService.getAvaliacoes(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAvaliacaoById(req, res, next) {
    try {
      const data = await ordersService.getAvaliacaoById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createAvaliacao(req, res, next) {
    try {
      const data = await ordersService.createAvaliacao(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateAvaliacao(req, res, next) {
    try {
      const data = await ordersService.updateAvaliacao(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteAvaliacao(req, res, next) {
    try {
      await ordersService.deleteAvaliacao(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // ==================== PAGAMENTOS ====================
  async getPagamentos(req, res, next) {
    try {
      const data = await ordersService.getPagamentos(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getPagamentoById(req, res, next) {
    try {
      const data = await ordersService.getPagamentoById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createPagamento(req, res, next) {
    try {
      const data = await ordersService.createPagamento(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updatePagamentoStatus(req, res, next) {
    try {
      const data = await ordersService.updatePagamentoStatus(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async processarPagamento(req, res, next) {
    try {
      const data = await ordersService.processarPagamento(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async cancelarPagamento(req, res, next) {
    try {
      const data = await ordersService.cancelarPagamento(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrdersController();