// /src/components/Aposta/index.jsx
import React, { useEffect, useState } from 'react';
import { getApostas, createAposta, updateAposta, deleteAposta } from '../../services/apostaService';
import './style.css';

const Aposta = () => {
  const [apostas, setApostas] = useState([]);
  const [newAposta, setNewAposta] = useState({ valorApostado: '', odds: '', status: '' });
  const [editAposta, setEditAposta] = useState(null); // Estado para armazenar a aposta em edição

  useEffect(() => {
    loadApostas();
  }, []);

  const loadApostas = async () => {
    try {
      const response = await getApostas();
      setApostas(response.data);
    } catch (error) {
      console.error('Erro ao carregar apostas', error);
    }
  };

  const handleCreateAposta = async () => {
    try {
      await createAposta(newAposta);
      alert('Aposta criada com sucesso!');
      setNewAposta({ valorApostado: '', odds: '', status: '' }); // Limpa o formulário
      loadApostas();
    } catch (error) {
      alert('Erro ao criar aposta!');
    }
  };

  const handleUpdateAposta = async (id) => {
    try {
      await updateAposta(id, editAposta);
      alert('Aposta atualizada com sucesso!');
      setEditAposta(null); // Sai do modo de edição
      loadApostas();
    } catch (error) {
      alert('Erro ao atualizar aposta!');
    }
  };

  const handleDeleteAposta = async (id) => {
    try {
      await deleteAposta(id);
      alert('Aposta deletada com sucesso!');
      loadApostas();
    } catch (error) {
      alert('Erro ao deletar aposta!');
    }
  };

  return (
    <div className="aposta-container">
      <h2>Apostas</h2>
      <ul>
        {apostas.map((aposta) => (
          <li key={aposta.id}>
            {editAposta && editAposta.id === aposta.id ? (
              <div>
                <input
                  type="number"
                  placeholder="Valor Apostado"
                  value={editAposta.valorApostado}
                  onChange={(e) => setEditAposta({ ...editAposta, valorApostado: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Odds"
                  value={editAposta.odds}
                  onChange={(e) => setEditAposta({ ...editAposta, odds: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Status"
                  value={editAposta.status}
                  onChange={(e) => setEditAposta({ ...editAposta, status: e.target.value })}
                />
                <button onClick={() => handleUpdateAposta(aposta.id)}>Salvar</button>
                <button onClick={() => setEditAposta(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                Aposta #{aposta.id} - Valor: R${aposta.valorApostado}, Odds: {aposta.odds}, Status: {aposta.status}
                <button onClick={() => setEditAposta(aposta)}>Editar</button>
                <button onClick={() => handleDeleteAposta(aposta.id)}>Deletar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="new-aposta-form">
        <h3>Adicionar Nova Aposta</h3>
        <input
          type="number"
          placeholder="Valor Apostado"
          value={newAposta.valorApostado}
          onChange={(e) => setNewAposta({ ...newAposta, valorApostado: e.target.value })}
        />
        <input
          type="number"
          placeholder="Odds"
          value={newAposta.odds}
          onChange={(e) => setNewAposta({ ...newAposta, odds: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={newAposta.status}
          onChange={(e) => setNewAposta({ ...newAposta, status: e.target.value })}
        />
        <button onClick={handleCreateAposta}>Adicionar Aposta</button>
      </div>
    </div>
  );
};

export default Aposta;
