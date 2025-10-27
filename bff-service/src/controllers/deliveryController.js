const deliveryService = require('../services/deliveryService');

class DeliveryController {
  // ==================== ENTREGADORES ====================
  async getEntregadores(req, res, next) {
    try {
      const data = await deliveryService.getEntregadores(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getEntregadorById(req, res, next) {
    try {
      const data = await deliveryService.getEntregadorById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createEntregador(req, res, next) {
    try {
      const data = await deliveryService.createEntregador(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateEntregador(req, res, next) {
    try {
      const data = await deliveryService.updateEntregador(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteEntregador(req, res, next) {
    try {
      await deliveryService.deleteEntregador(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // ==================== VEÍCULOS ====================
  async getVeiculos(req, res, next) {
    try {
      const data = await deliveryService.getVeiculos(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getVeiculoById(req, res, next) {
    try {
      const data = await deliveryService.getVeiculoById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createVeiculo(req, res, next) {
    try {
      const data = await deliveryService.createVeiculo(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateVeiculo(req, res, next) {
    try {
      const data = await deliveryService.updateVeiculo(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteVeiculo(req, res, next) {
    try {
      await deliveryService.deleteVeiculo(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // ==================== ALUGUÉIS ====================
  async getAlugueis(req, res, next) {
    try {
      const data = await deliveryService.getAlugueis(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAluguelById(req, res, next) {
    try {
      const data = await deliveryService.getAluguelById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createAluguel(req, res, next) {
    try {
      const data = await deliveryService.createAluguel(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async finalizarAluguel(req, res, next) {
    try {
      const data = await deliveryService.finalizarAluguel(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async cancelarAluguel(req, res, next) {
    try {
      const data = await deliveryService.cancelarAluguel(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // ==================== ENTREGAS ====================
  async getEntregas(req, res, next) {
    try {
      const data = await deliveryService.getEntregas(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getEntregaById(req, res, next) {
    try {
      const data = await deliveryService.getEntregaById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createEntrega(req, res, next) {
    try {
      const data = await deliveryService.createEntrega(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateEntregaStatus(req, res, next) {
    try {
      const data = await deliveryService.updateEntregaStatus(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DeliveryController();