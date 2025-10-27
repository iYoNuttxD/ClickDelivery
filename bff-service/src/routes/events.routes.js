const express = require('express');
const router = express.Router();
const axios = require('axios');

// URLs das Azure Functions
const CREATE_EVENT_URL = process.env.AZURE_FUNCTION_CREATE_EVENT;
const GET_DATA_URL = process.env.AZURE_FUNCTION_GET_DATA;

/**
 * POST /api/events - Criar novo evento
 */
router.post('/', async (req, res) => {
  try {
    console.log('📤 BFF: Enviando evento para Azure Function...');
    
    const response = await axios.post(CREATE_EVENT_URL, {
      type: req.body.type,
      data: req.body.data
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ BFF: Evento criado com sucesso');
    res.status(201).json(response.data);
    
  } catch (error) {
    console.error('❌ BFF: Erro ao criar evento:', error.message);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar evento',
      details: error.response?.data || error.message
    });
  }
});

/**
 * GET /api/events - Listar eventos com filtros e paginação
 */
router.get('/', async (req, res) => {
  try {
    console.log('📤 BFF: Buscando eventos da Azure Function...');
    
    // Construir query params
    const params = {};
    if (req.query.type) params.type = req.query.type;
    if (req.query.limit) params.limit = req.query.limit;
    if (req.query.skip) params.skip = req.query.skip;

    const response = await axios.get(GET_DATA_URL, { params });

    console.log(`✅ BFF: ${response.data.data?.length || 0} eventos encontrados`);
    res.json(response.data);
    
  } catch (error) {
    console.error('❌ BFF: Erro ao buscar eventos:', error.message);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar eventos',
      details: error.response?.data || error.message
    });
  }
});

/**
 * GET /api/events/:id - Buscar evento específico por ID
 */
router.get('/:id', async (req, res) => {
  try {
    console.log(`📤 BFF: Buscando evento ${req.params.id}...`);
    
    const response = await axios.get(`${GET_DATA_URL}/${req.params.id}`);

    console.log('✅ BFF: Evento encontrado');
    res.json(response.data);
    
  } catch (error) {
    console.error('❌ BFF: Erro ao buscar evento:', error.message);
    
    if (error.response?.status === 404) {
      res.status(404).json({
        success: false,
        error: 'Evento não encontrado'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar evento',
        details: error.response?.data || error.message
      });
    }
  }
});

module.exports = router;