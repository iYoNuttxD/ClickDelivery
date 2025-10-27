const axios = require('axios');
const config = require('../config/services');
const logger = require('../utils/logger');

class DeliveryService {
  constructor() {
    this.client = axios.create({
      baseURL: config.deliveryService.baseURL,
      timeout: config.deliveryService.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Interceptor para logging
    this.client.interceptors.request.use(
      (config) => {
        logger.info('Request para Delivery Service', {
          method: config.method,
          url: config.url
        });
        return config;
      },
      (error) => {
        logger.error('Erro no request para Delivery Service', { error: error.message });
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        logger.info('Response do Delivery Service', {
          status: response.status,
          url: response.config.url
        });
        return response;
      },
      (error) => {
        logger.error('Erro no response do Delivery Service', {
          status: error.response?.status,
          message: error.message
        });
        return Promise.reject(error);
      }
    );
  }

  // Health Check
  async checkHealth() {
    const response = await this.client.get(config.deliveryService.endpoints.health);
    return response.data;
  }

  // Entregadores
  async getEntregadores(params = {}) {
    const response = await this.client.get(config.deliveryService.endpoints.entregadores, { params });
    return response.data;
  }

  async getEntregadorById(id) {
    const response = await this.client.get(`${config.deliveryService.endpoints.entregadores}/${id}`);
    return response.data;
  }

  async createEntregador(data) {
    const response = await this.client.post(config.deliveryService.endpoints.entregadores, data);
    return response.data;
  }

  async updateEntregador(id, data) {
    const response = await this.client.put(`${config.deliveryService.endpoints.entregadores}/${id}`, data);
    return response.data;
  }

  async deleteEntregador(id) {
    const response = await this.client.delete(`${config.deliveryService.endpoints.entregadores}/${id}`);
    return response.data;
  }

  // Veículos
  async getVeiculos(params = {}) {
    const response = await this.client.get(config.deliveryService.endpoints.veiculos, { params });
    return response.data;
  }

  async getVeiculoById(id) {
    const response = await this.client.get(`${config.deliveryService.endpoints.veiculos}/${id}`);
    return response.data;
  }

  async createVeiculo(data) {
    const response = await this.client.post(config.deliveryService.endpoints.veiculos, data);
    return response.data;
  }

  async updateVeiculo(id, data) {
    const response = await this.client.put(`${config.deliveryService.endpoints.veiculos}/${id}`, data);
    return response.data;
  }

  async deleteVeiculo(id) {
    const response = await this.client.delete(`${config.deliveryService.endpoints.veiculos}/${id}`);
    return response.data;
  }

  // Aluguéis
  async getAlugueis(params = {}) {
    const response = await this.client.get(config.deliveryService.endpoints.alugueis, { params });
    return response.data;
  }

  async getAluguelById(id) {
    const response = await this.client.get(`${config.deliveryService.endpoints.alugueis}/${id}`);
    return response.data;
  }

  async createAluguel(data) {
    const response = await this.client.post(config.deliveryService.endpoints.alugueis, data);
    return response.data;
  }

  async finalizarAluguel(id, data) {
    const response = await this.client.patch(`${config.deliveryService.endpoints.alugueis}/${id}/finalizar`, data);
    return response.data;
  }

  async cancelarAluguel(id) {
    const response = await this.client.patch(`${config.deliveryService.endpoints.alugueis}/${id}/cancelar`);
    return response.data;
  }

  // Entregas
  async getEntregas(params = {}) {
    const response = await this.client.get(config.deliveryService.endpoints.entregas, { params });
    return response.data;
  }

  async getEntregaById(id) {
    const response = await this.client.get(`${config.deliveryService.endpoints.entregas}/${id}`);
    return response.data;
  }

  async createEntrega(data) {
    const response = await this.client.post(config.deliveryService.endpoints.entregas, data);
    return response.data;
  }

  async updateEntregaStatus(id, data) {
    const response = await this.client.patch(`${config.deliveryService.endpoints.entregas}/${id}/status`, data);
    return response.data;
  }
}

module.exports = new DeliveryService();