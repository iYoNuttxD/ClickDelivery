import axios from 'axios';

// URL do BFF
const API_BASE_URL = process.env.REACT_APP_BFF_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========================================
// ORDERS SERVICE (via BFF)
// ========================================

export const ordersAPI = {
  // PEDIDOS
  getAll: () => api.get('/orders/pedidos'),
  getById: (id) => api.get(`/orders/pedidos/${id}`),
  create: (data) => api.post('/orders/pedidos', data),
  updateStatus: (id, status) => api.patch(`/orders/pedidos/${id}/status`, { status }),
  cancel: (id) => api.patch(`/orders/pedidos/${id}/cancelar`),
  
  // CLIENTES
  getClientes: () => api.get('/orders/clientes'),
  createCliente: (data) => api.post('/orders/clientes', data),
  
  // RESTAURANTES
  getRestaurantes: () => api.get('/orders/restaurantes'),
  createRestaurante: (data) => api.post('/orders/restaurantes', data),
};

// ========================================
// DELIVERY SERVICE (via BFF)
// ========================================

export const deliveryAPI = {
  // ENTREGAS
  getAll: () => api.get('/delivery/entregas'),
  getById: (id) => api.get(`/delivery/entregas/${id}`),
  
  // Criar entrega usando entregador/aluguel existentes
  create: (data) => {
    const payload = {
      pedidoId: data.pedidoId,
      entregadorId: 1, // Usar entregador fixo (ID 1)
      aluguelId: 3,    // Usar aluguel fixo (ID 3)
      enderecoColeta: data.enderecoColeta,
      enderecoEntrega: data.enderecoEntrega,
      taxaEntrega: parseFloat(data.taxaEntrega)
    };
    return api.post('/delivery/entregas', payload);
  },
  
  updateStatus: (id, status) => api.patch(`/delivery/entregas/${id}/status`, { status }),
  
  // ENTREGADORES
  getEntregadores: () => api.get('/delivery/entregadores'),
  createEntregador: (data) => api.post('/delivery/entregadores', data),
  
  // VEÍCULOS
  getVeiculos: () => api.get('/delivery/veiculos'),
  createVeiculo: (data) => api.post('/delivery/veiculos', data),
};

// ========================================
// EVENTS (Azure Functions via BFF)
// ========================================

export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
};

// ========================================
// HEALTH CHECK
// ========================================

export const healthAPI = {
  check: () => axios.get(`${API_BASE_URL.replace('/api', '')}/health`),
};

export default api;