const eventService = require('../services/eventService');

/**
 * Criar novo evento
 */
exports.createEvent = async (req, res, next) => {
  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios: type, data'
      });
    }

    const result = await eventService.createEvent({ type, data });
    
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Listar todos os eventos
 */
exports.getAllEvents = async (req, res, next) => {
  try {
    const { type, limit, skip } = req.query;
    
    const result = await eventService.getAllEvents({ type, limit, skip });
    
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Buscar evento por ID
 */
exports.getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await eventService.getEventById(id);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.json(result);
  } catch (error) {
    next(error);
  }
};