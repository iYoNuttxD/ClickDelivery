import React, { useState, useEffect } from 'react';
import { deliveryAPI, eventsAPI } from '../services/api';
import './Orders.css';

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pedidoId: '',
    enderecoColeta: '',
    enderecoEntrega: '',
    taxaEntrega: ''
  });

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await deliveryAPI.getAll();
      
      const data = response.data?.data || response.data || [];
      const validDeliveries = Array.isArray(data) ? data : [];
      
      setDeliveries(validDeliveries);
    } catch (error) {
      console.error('Erro ao carregar entregas:', error);
      setError('Erro ao carregar entregas. O serviço pode estar indisponível.');
      setDeliveries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('📤 Criando entrega...');
      const response = await deliveryAPI.create({
        pedidoId: formData.pedidoId,
        enderecoColeta: formData.enderecoColeta,
        enderecoEntrega: formData.enderecoEntrega,
        taxaEntrega: formData.taxaEntrega
      });
      
      const entregaCriada = response.data.data || response.data;
      console.log('✅ Entrega criada:', entregaCriada);
      
      // Criar evento automaticamente
      try {
        console.log('📤 Criando evento ENTREGA_INICIADA...');
        await eventsAPI.create({
          type: 'ENTREGA_INICIADA',
          data: {
            entregaId: entregaCriada.Id || entregaCriada.id,
            pedidoId: formData.pedidoId,
            enderecoColeta: formData.enderecoColeta,
            enderecoEntrega: formData.enderecoEntrega,
            taxaEntrega: parseFloat(formData.taxaEntrega),
            timestamp: new Date().toISOString()
          }
        });
        console.log('✅ Evento ENTREGA_INICIADA criado com sucesso!');
      } catch (eventError) {
        console.error('⚠️ Erro ao criar evento:', eventError);
      }
      
      alert('✅ Entrega criada com sucesso!\n\n📊 Vá em "Eventos" para ver o histórico!');
      setShowForm(false);
      setFormData({
        pedidoId: '',
        enderecoColeta: '',
        enderecoEntrega: '',
        taxaEntrega: ''
      });
      loadDeliveries();
    } catch (error) {
      console.error('❌ Erro ao criar entrega:', error);
      alert('❌ Erro ao criar entrega: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      pedidoId: '',
      enderecoColeta: '',
      enderecoEntrega: '',
      taxaEntrega: ''
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      'PENDENTE': 'Pendente',
      'EM_COLETA': 'Em Coleta',
      'COLETADO': 'Coletado',
      'EM_TRANSITO': 'Em Trânsito',
      'ENTREGUE': 'Entregue',
      'CANCELADO': 'Cancelado'
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    if (!status) return 'status-pending';
    const statusMap = {
      'PENDENTE': 'status-pending',
      'EM_COLETA': 'status-processing',
      'COLETADO': 'status-processing',
      'EM_TRANSITO': 'status-shipped',
      'ENTREGUE': 'status-delivered',
      'CANCELADO': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🚚 Gerenciamento de Entregas</h1>
        <p>Delivery Service - Azure SQL Server</p>
      </div>

      <div className="actions-bar">
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancelar' : '➕ Nova Entrega'}
        </button>
        <button className="btn-secondary" onClick={loadDeliveries}>
          🔄 Atualizar
        </button>
      </div>

      {error && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 2rem',
          padding: '1rem',
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          color: '#856404'
        }}>
          ⚠️ {error}
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <h2>➕ Nova Entrega</h2>
          <p style={{color: '#666', marginBottom: '1.5rem'}}>
            💡 Usando entregador e veículo padrão do sistema
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>ID do Pedido: *</label>
              <input
                type="text"
                value={formData.pedidoId}
                onChange={(e) => setFormData({...formData, pedidoId: e.target.value})}
                required
                placeholder="PED000004"
              />
              <small style={{color: '#666'}}>Ex: PED000001, PED000002...</small>
            </div>

            <div className="form-group">
              <label>Endereço de Coleta: *</label>
              <textarea
                value={formData.enderecoColeta}
                onChange={(e) => setFormData({...formData, enderecoColeta: e.target.value})}
                required
                placeholder="Restaurante ABC - Av. Paulista, 1000 - São Paulo, SP"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Endereço de Entrega: *</label>
              <textarea
                value={formData.enderecoEntrega}
                onChange={(e) => setFormData({...formData, enderecoEntrega: e.target.value})}
                required
                placeholder="Rua das Flores, 123 - Bairro Centro - São Paulo, SP"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Taxa de Entrega (R$): *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.taxaEntrega}
                onChange={(e) => setFormData({...formData, taxaEntrega: e.target.value})}
                required
                placeholder="15.00"
              />
              <small style={{color: '#666'}}>Valor em reais (ex: 15.00)</small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-success">
                ➕ Criar Entrega
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">⏳ Carregando entregas...</div>
      ) : (
        <div className="table-container">
          {deliveries.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <h3>📦 Nenhuma entrega encontrada</h3>
              <p>Clique em "➕ Nova Entrega" para criar sua primeira entrega!</p>
            </div>
          ) : (
            <>
              <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <strong>Total de entregas: {deliveries.length}</strong>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Pedido</th>
                    <th>Entregador</th>
                    <th>Coleta</th>
                    <th>Entrega</th>
                    <th>Taxa</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery) => (
                    <tr key={delivery.Id || delivery.id}>
                      <td><strong>#{delivery.Id || delivery.id}</strong></td>
                      <td>{delivery.PedidoId || delivery.pedidoId || 'N/A'}</td>
                      <td>ID: {delivery.EntregadorId || delivery.entregadorId || 'N/A'}</td>
                      <td style={{maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={delivery.EnderecoColeta || delivery.enderecoColeta}>
                        {delivery.EnderecoColeta || delivery.enderecoColeta || 'N/A'}
                      </td>
                      <td style={{maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={delivery.EnderecoEntrega || delivery.enderecoEntrega}>
                        {delivery.EnderecoEntrega || delivery.enderecoEntrega || 'N/A'}
                      </td>
                      <td><strong>R$ {parseFloat(delivery.TaxaEntrega || delivery.taxaEntrega || 0).toFixed(2)}</strong></td>
                      <td>
                        <span className={getStatusClass(delivery.Status || delivery.status)}>
                          {getStatusLabel(delivery.Status || delivery.status)}
                        </span>
                      </td>
                      <td>
                        {(delivery.CreatedAt || delivery.dataCriacao)
                          ? new Date(delivery.CreatedAt || delivery.dataCriacao).toLocaleDateString('pt-BR')
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
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
        <h3 style={{color: '#667eea', marginBottom: '1rem'}}>ℹ️ Sobre o Delivery Service</h3>
        <p style={{marginBottom: '0.5rem'}}>
          📌 Conectado ao <strong>Azure SQL Server</strong> (erp-delivery-sql-server)
        </p>
        <p style={{marginBottom: '0.5rem'}}>
          📌 Gerencia entregas com entregadores, veículos e aluguéis
        </p>
        <p style={{marginBottom: '0.5rem'}}>
          📌 Usa entregador padrão (ID: 1) e aluguel (ID: 3)
        </p>
        <p style={{color: '#28a745', fontWeight: '600'}}>
          ✅ Serviço operacional
        </p>
      </div>
    </div>
  );
};

export default Delivery;