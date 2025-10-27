import React, { useState, useEffect } from 'react';
import { ordersAPI, eventsAPI } from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    quantidade: 1,
    observacoes: ''
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.getAll();
      
      const data = response.data?.data || response.data || [];
      const validOrders = Array.isArray(data) ? data : [];
      
      setOrders(validOrders);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setError('Erro ao carregar pedidos. O serviço pode estar indisponível.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Usar IDs fixos que criamos
      const pedidoData = {
        clienteId: "68febd868f6619240b051f60",
        restauranteId: "68febe028f6619240b051f63",
        items: [{
          cardapioId: "68febe198f6619240b051f67",
          nome: "Hambúrguer Clássico",
          quantidade: parseInt(formData.quantidade),
          precoUnitario: 25.00,
          subtotal: 25.00 * parseInt(formData.quantidade)
        }],
        valorTotal: 25.00 * parseInt(formData.quantidade),
        taxaEntrega: 10.00,
        valorFinal: (25.00 * parseInt(formData.quantidade)) + 10.00,
        enderecoEntrega: {
          rua: "Rua das Flores",
          numero: "123",
          bairro: "Centro",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234567"
        },
        observacoes: formData.observacoes
      };

      console.log('📤 Criando pedido...');
      const response = await ordersAPI.create(pedidoData);
      const pedidoCriado = response.data.data || response.data;
      
      console.log('✅ Pedido criado:', pedidoCriado);
      
      // Criar evento automaticamente
      try {
        console.log('📤 Criando evento PEDIDO_CRIADO...');
        await eventsAPI.create({
          type: 'PEDIDO_CRIADO',
          data: {
            pedidoId: pedidoCriado._id,
            numero: pedidoCriado.numero,
            valorTotal: pedidoData.valorFinal,
            cliente: 'João Silva',
            items: pedidoData.items.map(i => `${i.nome} (${i.quantidade}x)`).join(', '),
            observacoes: formData.observacoes,
            timestamp: new Date().toISOString()
          }
        });
        console.log('✅ Evento PEDIDO_CRIADO criado com sucesso!');
      } catch (eventError) {
        console.error('⚠️ Erro ao criar evento:', eventError);
        // Não falhar se evento não for criado
      }
      
      alert('✅ Pedido criado com sucesso!\n\n📊 Vá em "Eventos" para ver o histórico!');
      setShowForm(false);
      setFormData({ quantidade: 1, observacoes: '' });
      loadOrders();
    } catch (error) {
      console.error('❌ Erro ao criar pedido:', error);
      alert('❌ Erro ao criar pedido: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ quantidade: 1, observacoes: '' });
  };

  const getStatusClass = (status) => {
    if (!status) return 'status-pending';
    const statusMap = {
      'PENDENTE': 'status-pending',
      'CONFIRMADO': 'status-processing',
      'PREPARANDO': 'status-processing',
      'PRONTO': 'status-shipped',
      'EM_ENTREGA': 'status-shipped',
      'ENTREGUE': 'status-delivered',
      'CANCELADO': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
  };

  const formatItems = (items) => {
    if (!items || !Array.isArray(items)) return 'N/A';
    return items.map(item => `${item.nome} (${item.quantidade}x)`).join(', ');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📦 Gerenciamento de Pedidos</h1>
        <p>Orders Service - MongoDB Atlas</p>
      </div>

      <div className="actions-bar">
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancelar' : '➕ Novo Pedido'}
        </button>
        <button className="btn-secondary" onClick={loadOrders}>
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
          <h2>➕ Novo Pedido</h2>
          <p style={{color: '#666', marginBottom: '1.5rem'}}>
            🍔 <strong>Hambúrguer Clássico</strong> - R$ 25,00<br/>
            👤 Cliente: João Silva<br/>
            🏪 Restaurante: Delícia<br/>
            📍 Entrega: Rua das Flores, 123 - São Paulo, SP
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Quantidade: *</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.quantidade}
                onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                required
              />
              <small style={{color: '#666'}}>
                Valor: R$ {(25 * formData.quantidade).toFixed(2)} + 
                Taxa: R$ 10,00 = 
                <strong> Total: R$ {(25 * formData.quantidade + 10).toFixed(2)}</strong>
              </small>
            </div>

            <div className="form-group">
              <label>Observações:</label>
              <textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                placeholder="Ex: Sem cebola, caprichar no molho..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-success">
                ➕ Criar Pedido
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">⏳ Carregando pedidos...</div>
      ) : (
        <div className="table-container">
          {orders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <h3>📦 Nenhum pedido encontrado</h3>
              <p>Clique em "➕ Novo Pedido" para criar seu primeiro pedido!</p>
            </div>
          ) : (
            <>
              <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <strong>Total de pedidos: {orders.length}</strong>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Número</th>
                    <th>Cliente</th>
                    <th>Items</th>
                    <th>Valor Total</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td style={{fontSize: '0.85em', color: '#666'}}>
                        {order._id.substring(0, 8)}...
                      </td>
                      <td><strong>{order.numero || 'N/A'}</strong></td>
                      <td>{order.clienteId?.nome || order.clienteId || 'N/A'}</td>
                      <td style={{maxWidth: '250px'}}>
                        {formatItems(order.items)}
                      </td>
                      <td><strong>R$ {parseFloat(order.valorFinal || 0).toFixed(2)}</strong></td>
                      <td>
                        <span className={getStatusClass(order.status)}>
                          {order.status || 'PENDENTE'}
                        </span>
                      </td>
                      <td>
                        {order.dataPedido || order.createdAt
                          ? new Date(order.dataPedido || order.createdAt).toLocaleDateString('pt-BR')
                          : 'N/A'}
                      </td>
                      <td className="actions-cell">
                        <button 
                          className="btn-edit" 
                          onClick={() => alert('Visualizar pedido: ' + order.numero)}
                          title="Visualizar"
                        >
                          👁️
                        </button>
                        <button 
                          className="btn-delete" 
                          onClick={() => {
                            if (window.confirm('Cancelar pedido ' + order.numero + '?')) {
                              alert('Funcionalidade em desenvolvimento');
                            }
                          }}
                          title="Cancelar"
                        >
                          🗑️
                        </button>
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
        <h3 style={{color: '#667eea', marginBottom: '1rem'}}>ℹ️ Sobre o Orders Service</h3>
        <p style={{marginBottom: '0.5rem'}}>
          📌 Conectado ao <strong>MongoDB Atlas</strong>
        </p>
        <p style={{marginBottom: '0.5rem'}}>
          📌 Gerencia clientes, restaurantes, cardápios e pedidos
        </p>
        <p style={{marginBottom: '0.5rem'}}>
          📌 Sistema completo de delivery
        </p>
        <p style={{color: '#28a745', fontWeight: '600'}}>
          ✅ Serviço operacional
        </p>
      </div>
    </div>
  );
};

export default Orders;