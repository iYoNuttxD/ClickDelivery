const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Erro capturado no BFF:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  // Erro de serviço externo (Axios)
  if (err.isAxiosError) {
    const status = err.response?.status || 503;
    const message = err.response?.data?.error?.message || err.message || 'Erro ao comunicar com serviço externo';
    
    return res.status(status).json({
      success: false,
      error: {
        message,
        service: err.config?.baseURL,
        statusCode: status
      }
    });
  }

  // Erro customizado com statusCode
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;