const axios = require('axios');
const config = require('../config/services');
const logger = require('../utils/logger');

class FunctionService {
  constructor() {
    this.createClient = axios.create({
      timeout: config.azureFunctions.createFunction.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.getClient = axios.create({
      timeout: config.azureFunctions.getFunction.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Interceptors para logging
    [this.createClient, this.getClient].forEach(client => {
      client.interceptors.request.use(
        (config) => {
          logger.info('Request para Azure Function', {
            method: config.method,
            url: config.url
          });
          return config;
        },
        (error) => {
          logger.error('Erro no request para Azure Function', { error: error.message });
          return Promise.reject(error);
        }
      );

      client.interceptors.response.use(
        (response) => {
          logger.info('Response da Azure Function', {
            status: response.status,
            url: response.config.url
          });
          return response;
        },
        (error) => {
          logger.error('Erro no response da Azure Function', {
            status: error.response?.status,
            message: error.message
          });
          return Promise.reject(error);
        }
      );
    });
  }

  /**
   * Criar dados via evento (HTTP Trigger)
   * A function recebe o evento e persiste no banco
   */
  async createViaEvent(data) {
    if (!config.azureFunctions.createFunction.url) {
      throw new Error('URL da Azure Function CREATE não configurada');
    }

    logger.info('Enviando evento para Azure Function CREATE', { data });

    const response = await this.createClient.post(
      config.azureFunctions.createFunction.url,
      data
    );

    return response.data;
  }

  /**
   * Buscar dados da function (HTTP Trigger)
   */
  async getData(params = {}) {
    if (!config.azureFunctions.getFunction.url) {
      throw new Error('URL da Azure Function GET não configurada');
    }

    logger.info('Buscando dados da Azure Function GET', { params });

    const response = await this.getClient.get(
      config.azureFunctions.getFunction.url,
      { params }
    );

    return response.data;
  }

  /**
   * Buscar dados específicos por ID
   */
  async getDataById(id) {
    if (!config.azureFunctions.getFunction.url) {
      throw new Error('URL da Azure Function GET não configurada');
    }

    logger.info('Buscando dados por ID da Azure Function', { id });

    const response = await this.getClient.get(
      `${config.azureFunctions.getFunction.url}/${id}`
    );

    return response.data;
  }
}

module.exports = new FunctionService();