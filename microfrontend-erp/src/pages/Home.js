import React, { useState, useEffect } from 'react';
import { healthAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealth();
  }, []);

  const loadHealth = async () => {
    try {
      const response = await healthAPI.check();
      setHealth(response.data);
    } catch (error) {
      console.error('Erro ao buscar health:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🏢 ERP Builders</h1>
        <p className="subtitle">Sistema de Gestão de Pedidos e Entregas</p>
        <p className="description">
          Microserviços integrados com BFF e Azure Functions
        </p>
      </div>

      <div className="cards-container">
        <div className="card">
          <div className="card-icon">📦</div>
          <h3>Orders Service</h3>
          <p>Gerenciamento de pedidos com MongoDB Atlas</p>
          <a href="/orders" className="card-button">Acessar</a>
        </div>

        <div className="card">
          <div className="card-icon">🚚</div>
          <h3>Delivery Service</h3>
          <p>Controle de entregas com Azure SQL</p>
          <a href="/delivery" className="card-button">Acessar</a>
        </div>

        <div className="card">
          <div className="card-icon">📊</div>
          <h3>Eventos</h3>
          <p>Eventos processados via Azure Functions</p>
          <a href="/events" className="card-button">Acessar</a>
        </div>
      </div>

      {!loading && health && (
        <div className="health-section">
          <h2>🔍 Status dos Serviços</h2>
          <div className="health-card">
            <div className="health-item">
              <span className="health-label">Status BFF:</span>
              <span className="health-status success">✅ {health.status}</span>
            </div>
            <div className="health-item">
              <span className="health-label">Orders Service:</span>
              <span className="health-status">{health.services?.orders || 'N/A'}</span>
            </div>
            <div className="health-item">
              <span className="health-label">Delivery Service:</span>
              <span className="health-status">{health.services?.delivery || 'N/A'}</span>
            </div>
            <div className="health-item">
              <span className="health-label">Azure Functions:</span>
              <span className="health-status">
                {health.services?.azureFunctions?.createEvent ? '✅ Ativo' : '❌ Inativo'}
              </span>
            </div>
            <div className="health-item">
              <span className="health-label">Timestamp:</span>
              <span className="health-status">{new Date(health.timestamp).toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Desenvolvido por <strong>@iYoNuttxD</strong> e equipe</p>
        <p>Arquitetura de Microserviços - 2025</p>
      </footer>
    </div>
  );
};

export default Home;