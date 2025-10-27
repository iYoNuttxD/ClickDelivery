const axios = require('axios');

const AZURE_FUNCTION_CREATE_EVENT = process.env.AZURE_FUNCTION_CREATE_EVENT;
const AZURE_FUNCTION_GET_DATA = process.env.AZURE_FUNCTION_GET_DATA;

/**
 * Criar evento via Azure Function
 */
exports.createEvent = async ({ type, data }) => {
  try {
    console.log('📤 EventService: Enviando evento para Azure Function...');
    
    const response = await axios.post(AZURE_FUNCTION_CREATE_EVENT, 
      { type, data },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    console.log('✅ EventService: Evento criado com sucesso');
    return response.data;
    
  } catch (error) {
    console.error('❌ EventService: Erro ao criar evento:', error.message);
    throw new Error(`Erro ao criar evento: ${error.response?.data?.error || error.message}`);
  }
};

/**
 * Buscar eventos via Azure Function
 */
exports.getAllEvents = async ({ type, limit, skip }) => {
  try {
    console.log('📤 EventService: Buscando eventos da Azure Function...');
    
    const params = {};
    if (type) params.type = type;
    if (limit) params.limit = limit;
    if (skip) params.skip = skip;

    const response = await axios.get(AZURE_FUNCTION_GET_DATA, {
      params,
      timeout: 10000
    });

    console.log(`✅ EventService: ${response.data.data?.length || 0} eventos encontrados`);
    return response.data;
    
  } catch (error) {
    console.error('❌ EventService: Erro ao buscar eventos:', error.message);
    throw new Error(`Erro ao buscar eventos: ${error.response?.data?.error || error.message}`);
  }
};

/**
 * Buscar evento por ID via Azure Function
 */
exports.getEventById = async (id) => {
  try {
    console.log(`📤 EventService: Buscando evento ${id}...`);
    
    const response = await axios.get(`${AZURE_FUNCTION_GET_DATA}/${id}`, {
      timeout: 10000
    });

    console.log('✅ EventService: Evento encontrado');
    return response.data;
    
  } catch (error) {
    console.error('❌ EventService: Erro ao buscar evento:', error.message);
    
    if (error.response?.status === 404) {
      return {
        success: false,
        error: 'Evento não encontrado'
      };
    }
    
    throw new Error(`Erro ao buscar evento: ${error.response?.data?.error || error.message}`);
  }
};