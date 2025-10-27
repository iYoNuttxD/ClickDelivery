const axios = require('axios');
const config = require('../config/services');
const logger = require('../utils/logger');

class OrdersService {
  constructor() {
    this.client = axios.create({
      baseURL: config.ordersService.baseURL,
      timeout: config.ordersService.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Interceptor para logging
    this.client.interceptors.request.use(
      (config) => {
        logger.info('Request para Orders Service', {
          method: config.method,
          url: config.url
        });
        return config;
      },
      (error) => {
        logger.error('Erro no request para Orders Service', { error: error.message });
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        logger.info('Response do Orders Service', {
          status: response.status,
          url: response.config.url
        });
        return response;
      },
      (error) => {
        logger.error('Erro no response do Orders Service', {
          status: error.response?.status,
          message: error.message
        });
        return Promise.reject(error);
      }
    );
  }

  // Health Check
  async checkHealth() {
    const response = await this.client.get(config.ordersService.endpoints.health);
    return response.data;
  }

  // Dashboard
  async getDashboard() {
    const response = await this.client.get(config.ordersService.endpoints.dashboard);
    return response.data;
  }

  // Clientes
  async getClientes(params = {}) {
    const response = await this.client.get(config.ordersService.endpoints.clientes, { params });
    return response.data;
  }

  async getClienteById(id) {
    const response = await this.client.get(`${config.ordersService.endpoints.clientes}/${id}`);
    return response.data;
  }

  async createCliente(data) {
    const response = await this.client.post(config.ordersService.endpoints.clientes, data);
    return response.data;
  }

  async updateCliente(id, data) {
    const response = await this.client.put(`${config.ordersService.endpoints.clientes}/${id}`, data);
    return response.data;
  }

  async deleteCliente(id) {
    const response = await this.client.delete(`${config.ordersService.endpoints.clientes}/${id}`);
    return response.data;
  }

  // Restaurantes
  async getRestaurantes(params = {}) {
    const response = await this.client.get(config.ordersService.endpoints.restaurantes, { params });
    return response.data;
  }

  async getRestauranteById(id) {
    const response = await this.client.get(`${config.ordersService.endpoints.restaurantes}/${id}`);
    return response.data;
  }

  async createRestaurante(data) {
    const response = await this.client.post(config.ordersService.endpoints.restaurantes, data);
    return response.data;
  }

  async updateRestaurante(id, data) {
    const response = await this.client.put(`${config.ordersService.endpoints.restaurantes}/${id}`, data);
    return response.data;
  }

  async deleteRestaurante(id) {
    const response = await this.client.delete(`${config.ordersService.endpoints.restaurantes}/${id}`);
    return response.data;
  }

  // Cardápios
  async getCardapios(params = {}) {
    const response = await this.client.get(config.ordersService.endpoints.cardapios, { params });
    return response.data;
  }

  async getCardapioById(id) {
    const response = await this.client.get(`${config.ordersService.endpoints.cardapios}/${id}`);
    return response.data;
  }

  async createCardapio(data) {
    const response = await this.client.post(config.ordersService.endpoints.cardapios, data);
    return response.data;
  }

  async updateCardapio(id, data) {
    const response = await this.client.put(`${config.ordersService.endpoints.cardapios}/${id}`, data);
    return response.data;
  }

  async deleteCardapio(id) {
    const response = await this.client.delete(`${config.ordersService.endpoints.cardapios}/${id}`);
    return response.data;
  }

  // Pedidos
  async getPedidos(params = {}) {
    const response = await this.client.get(config.ordersService.endpoints.pedidos, { params });
    return response.data;
  }

  async getPedidoById(id) {
    const response = await this.client.get(`${config.ordersService.endpoints.pedidos}/${id}`);
    return response.data;
  }

  async createPedido(data) {
    const response = await this.client.post(config.ordersService.endpoints.pedidos, data);
    return response.data;
  }

  async updatePedidoStatus(id, data) {
    const response = await this.client.patch(`${config.ordersService.endpoints.pedidos}/${id}/status`, data);
    return response.data;
  }

  async cancelarPedido(id) {
    const response = await this.client.patch(`${config.ordersService.endpoints.pedidos}/${id}/cancelar`);
    return response.data;
  }

  // Avaliações
  async getAvaliacoes(params = {}) {
    const response = await this.client.get(config.ordersService.endpoints.avaliacoes, { params });
    return response.data;
  }

  async getAvaliacaoById(id) {
    const response = await this.client.get(`${config.ordersService.endpoints.avaliacoes}/${id}`);
    return response.data;
  }

  async createAvaliacao(data) {
    const response = await this.client.post(config.ordersService.endpoints.avaliacoes, data);
    return response.data;
  }

  async updateAvaliacao(id, data) {
    const response = await this.client.put(`${config.ordersService.endpoints.avaliacoes}/${id}`, data);
    return response.data;
  }

  async deleteAvaliacao(id) {
    const response = await this.client.delete(`${config.ordersService.endpoints.avaliacoes}/${id}`);
    return response.data;
  }

  // Pagamentos
  async getPagamentos(params = {}) {
    const response = await this.client.get(config.ordersService.endpoints.pagamentos, { params });
    return response.data;
  }

  async getPagamentoById(id) {
    const response = await this.client.get(`${config.ordersService.endpoints.pagamentos}/${id}`);
    return response.data;
  }

  async createPagamento(data) {
    const response = await this.client.post(config.ordersService.endpoints.pagamentos, data);
    return response.data;
  }

  async updatePagamentoStatus(id, data) {
    const response = await this.client.patch(`${config.ordersService.endpoints.pagamentos}/${id}/status`, data);
    return response.data;
  }

  async processarPagamento(id) {
    const response = await this.client.patch(`${config.ordersService.endpoints.pagamentos}/${id}/processar`);
    return response.data;
  }

  async cancelarPagamento(id) {
    const response = await this.client.patch(`${config.ordersService.endpoints.pagamentos}/${id}/cancelar`);
    return response.data;
  }
}

module.exports = new OrdersService();