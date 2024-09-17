import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import api from '../../services/api';

const Home = () => {
  const [bets, setBets] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBets();
    loadEvents();
  }, []);

  const loadBets = async () => {
    try {
      const response = await api.get('/bets');
      setBets(response.data);
    } catch (error) {
      console.error('Erro ao carregar apostas', error);
    }
  };

  const loadEvents = async () => {
    try {
      const response = await api.get('/sporting-events');
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao carregar eventos', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddBet = () => {
    navigate('/add-bet');
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Bem-vindo ao Bets69</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="bets-section">
        <h2>Suas Apostas</h2>
        {bets.length > 0 ? (
          <ul>
            {bets.map((bet) => (
              <li key={bet.id}>
                Aposta #{bet.id} - Valor: R${bet.valorApostado}, Odds: {bet.odds}, Status: {bet.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>Você não tem apostas no momento.</p>
        )}
      </div>
      <div className="events-section">
        <h2>Eventos Esportivos</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                {event.esporte}: {event.timeCasa} vs {event.timeVisitante} - {new Date(event.dataHora).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há eventos disponíveis no momento.</p>
        )}
      </div>
      <button className="add-bet-button" onClick={handleAddBet}>
        Adicionar Aposta
      </button>
    </div>
  );
};

export default Home;
