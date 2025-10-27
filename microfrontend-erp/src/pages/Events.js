import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';
import './Orders.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('');
  const [formData, setFormData] = useState({
    type: 'PEDIDO_CRIADO',
    data: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async (type = '') => {
    try {
      setLoading(true);
      const params = type ? { type } : {};
      const response = await eventsAPI.getAll(params);
      setEvents(response.data.data || response.data || []);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      alert('Erro ao carregar eventos: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Parse do JSON
      let parsedData;
      try {
        parsedData = JSON.parse(formData.data);
      } catch (parseError) {
        alert('Erro: O campo "Dados" deve ser um JSON válido');
        return;
      }

      const eventData = {
        type: formData.type,
        data: parsedData
      };

      await eventsAPI.create(eventData);
      alert('Evento criado com sucesso!');

      setShowForm(false);
      setFormData({
        type: 'PEDIDO_CRIADO',
        data: ''
      });
      loadEvents(filter);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      alert('Erro ao criar evento: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    loadEvents(newFilter);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      type: 'PEDIDO_CRIADO',
      data: ''
    });
  };

  const fillExample = () => {
    const examples = {
      'PEDIDO_CRIADO': JSON.stringify({
        pedidoId: 'PED' + Date.now(),
        clienteId: 'CLI123',
        valor: 250.00,
        items: ['Notebook', 'Mouse']
      }, null, 2),
      'PEDIDO_ATUALIZADO': JSON.stringify({
        pedidoId: 'PED123456',
        status: 'PROCESSANDO',
        updatedBy: 'Sistema'
      }, null, 2),
      'ENTREGA_INICIADA': JSON.stringify({
        entregaId: 'ENT' + Date.now(),
        pedidoId: 'PED123456',
        motoristaId: 'MOT789',
        status: 'EM_TRANSITO'
      }, null, 2),
      'ENTREGA_CONCLUIDA': JSON.stringify({
        entregaId: 'ENT123456',
        pedidoId: 'PED123456',
        dataEntrega: new Date().toISOString(),
        assinatura: 'Cliente Silva'
      }, null, 2)
    };

    setFormData({
      ...formData,
      data: examples[formData.type] || '{}'
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📊 Gerenciamento de Eventos</h1>
        <p>Azure Functions - Event Sourcing</p>
      </div>

      <div className="actions-bar">
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancelar' : '➕ Novo Evento'}
        </button>
        <button className="btn-secondary" onClick={() => loadEvents(filter)}>
          🔄 Atualizar
        </button>
        <select 
          className="filter-select" 
          value={filter} 
          onChange={handleFilterChange}
          style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            border: '2px solid #e9ecef',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          <option value="">🔍 Todos os Tipos</option>
          <option value="PEDIDO_CRIADO">📦 Pedido Criado</option>
          <option value="PEDIDO_ATUALIZADO">📝 Pedido Atualizado</option>
          <option value="ENTREGA_INICIADA">🚚 Entrega Iniciada</option>
          <option value="ENTREGA_CONCLUIDA">✅ Entrega Concluída</option>
        </select>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>➕ Novo Evento</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tipo de Evento:</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="PEDIDO_CRIADO">📦 Pedido Criado</option>
                <option value="PEDIDO_ATUALIZADO">📝 Pedido Atualizado</option>
                <option value="PEDIDO_CANCELADO">❌ Pedido Cancelado</option>
                <option value="ENTREGA_INICIADA">🚚 Entrega Iniciada</option>
                <option value="ENTREGA_CONCLUIDA">✅ Entrega Concluída</option>
                <option value="ENTREGA_FALHOU">⚠️ Entrega Falhou</option>
              </select>
            </div>

            <div className="form-group">
              <label>Dados do Evento (JSON):</label>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={fillExample}
                style={{marginBottom: '0.5rem'}}
              >
                💡 Preencher Exemplo
              </button>
              <textarea
                value={formData.data}
                onChange={(e) => setFormData({...formData, data: e.target.value})}
                required
                placeholder='{"pedidoId": "PED123", "clienteId": "CLI456", "valor": 100.00}'
                rows="10"
                style={{fontFamily: 'monospace', fontSize: '0.9rem'}}
              />
              <small style={{color: '#6c757d'}}>
                ⚠️ Deve ser um JSON válido
              </small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-success">
                ➕ Criar Evento
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Carregando eventos...</div>
      ) : (
        <div className="table-container">
          <div style={{marginBottom: '1rem', textAlign: 'right'}}>
            <strong>Total: {events.length} eventos</strong>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Dados</th>
                <th>Source</th>
                <th>Processado</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center'}}>
                    Nenhum evento encontrado
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event._id || event.id}>
                    <td>{(event._id || event.id)?.substring(0, 8)}...</td>
                    <td>
                      <span className={`status status-${event.type.toLowerCase().replace(/_/g, '-')}`}>
                        {event.type}
                      </span>
                    </td>
                    <td>
                      <details>
                        <summary style={{cursor: 'pointer', color: '#667eea'}}>
                          Ver dados
                        </summary>
                        <pre style={{
                          background: '#f8f9fa',
                          padding: '1rem',
                          borderRadius: '5px',
                          overflow: 'auto',
                          fontSize: '0.85rem',
                          marginTop: '0.5rem'
                        }}>
                          {JSON.stringify(event.data, null, 2)}
                        </pre>
                      </details>
                    </td>
                    <td>
                      <span className="status status-processing">
                        {event.source || 'BFF'}
                      </span>
                    </td>
                    <td>
                      {event.processed ? '✅ Sim' : '⏳ Não'}
                    </td>
                    <td>
                      {event.timestamp 
                        ? new Date(event.timestamp).toLocaleString('pt-BR')
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="info-box" style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        background: 'white',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{color: '#667eea', marginBottom: '1rem'}}>ℹ️ Sobre Eventos</h3>
        <p style={{marginBottom: '0.5rem'}}>
          📌 Eventos são processados pela <strong>Azure Function CreateEvent</strong> e persistidos no <strong>MongoDB Atlas</strong>.
        </p>
        <p style={{marginBottom: '0.5rem'}}>
          📌 Use eventos para rastrear todas as ações importantes no sistema.
        </p>
        <p>
          📌 Eventos são <strong>imutáveis</strong> e servem como histórico completo das operações.
        </p>
      </div>
    </div>
  );
};

export default Events;