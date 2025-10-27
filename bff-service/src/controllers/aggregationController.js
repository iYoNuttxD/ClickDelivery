const deliveryService = require('../services/deliveryService');
const ordersService = require('../services/ordersService');
const functionService = require('../services/functionService');
const logger = require('../utils/logger');

class AggregationController {
  /**
   * Dashboard com dados agregados de Orders + Delivery + Function
   * GET /api/v1/aggregation/dashboard
   */
  async getDashboard(req, res, next) {
    try {
      logger.info('Buscando dados agregados do dashboard');

      // Buscar dados em paralelo dos 3 serviços
      const [ordersData, deliveryData, functionData] = await Promise.allSettled([
        ordersService.getDashboard(),
        deliveryService.checkHealth(), // ou outro endpoint com estatísticas
        functionService.getData()
      ]);

      // Processar resultados
      const dashboard = {
        success: true,
        timestamp: new Date().toISOString(),
        data: {
          orders: ordersData.status === 'fulfilled' ? ordersData.value.data : null,
          delivery: deliveryData.status === 'fulfilled' ? deliveryData.value : null,
          function: functionData.status === 'fulfilled' ? functionData.value : null
        },
        errors: {
          orders: ordersData.status === 'rejected' ? ordersData.reason.message : null,
          delivery: deliveryData.status === 'rejected' ? deliveryData.reason.message : null,
          function: functionData.status === 'rejected' ? functionData.reason.message : null
        }
      };

      res.json(dashboard);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Buscar pedido completo com dados de entrega
   * GET /api/v1/aggregation/pedido-completo/:pedidoId
   */
  async getPedidoCompleto(req, res, next) {
    try {
      const { pedidoId } = req.params;
      logger.info('Buscando pedido completo com entrega', { pedidoId });

      // Buscar pedido
      const pedido = await ordersService.getPedidoById(pedidoId);

      // Buscar entregas relacionadas ao pedido
      const entregas = await deliveryService.getEntregas({ pedidoId });

      res.json({
        success: true,
        data: {
          pedido: pedido.data,
          entregas: entregas.data || []
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Buscar dados agregados de microservice + function
   * GET /api/v1/aggregation/dados-completos
   */
  async getDadosCompletos(req, res, next) {
    try {
      logger.info('Buscando dados completos de microservices + function');

      // Buscar dados em paralelo
      const [pedidos, entregas, functionData] = await Promise.allSettled([
        ordersService.getPedidos(),
        deliveryService.getEntregas(),
        functionService.getData()
      ]);

      res.json({
        success: true,
        data: {
          pedidos: pedidos.status === 'fulfilled' ? pedidos.value.data : [],
          entregas: entregas.status === 'fulfilled' ? entregas.value.data : [],
          functionData: functionData.status === 'fulfilled' ? functionData.value : null
        },
        errors: {
          pedidos: pedidos.status === 'rejected' ? pedidos.reason.message : null,
          entregas: entregas.status === 'rejected' ? entregas.reason.message : null,
          functionData: functionData.status === 'rejected' ? functionData.reason.message : null
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Health check de todos os serviços
   * GET /api/v1/aggregation/health
   */
  async checkAllHealth(req, res, next) {
    try {
      logger.info('Verificando saúde de todos os serviços');

      const [ordersHealth, deliveryHealth] = await Promise.allSettled([
        ordersService.checkHealth(),
        deliveryService.checkHealth()
      ]);

      res.json({
        success: true,
        services: {
          bff: {
            status: 'UP',
            timestamp: new Date().toISOString()
          },
          orders: {
            status: ordersHealth.status === 'fulfilled' ? 'UP' : 'DOWN',
            data: ordersHealth.status === 'fulfilled' ? ordersHealth.value : null,
            error: ordersHealth.status === 'rejected' ? ordersHealth.reason.message : null
          },
          delivery: {
            status: deliveryHealth.status === 'fulfilled' ? 'UP' : 'DOWN',
            data: deliveryHealth.status === 'fulfilled' ? deliveryHealth.value : null,
            error: deliveryHealth.status === 'rejected' ? deliveryHealth.reason.message : null
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AggregationController();