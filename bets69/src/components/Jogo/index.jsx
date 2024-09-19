// /src/components/Jogo/index.jsx
import React, { useEffect, useState } from 'react';
import { getJogos, createJogo, updateJogo, deleteJogo } from '../../services/jogoService';
import './style.css';

const Jogo = () => {
  const [jogos, setJogos] = useState([]);
  const [newJogo, setNewJogo] = useState({ nome: '', descricao: '', data: '' });
  const [editingJogoId, setEditingJogoId] = useState(null);

  useEffect(() => {
    loadJogos();
  }, []);

  const loadJogos = async () => {
    try {
      const response = await getJogos();
      setJogos(response.data);
    } catch (error) {
      console.error('Erro ao carregar jogos', error);
    }
  };

  const handleCreateOrUpdateJogo = async () => {
    try {
      if (editingJogoId) {
        await updateJogo(editingJogoId, newJogo);
        alert('Jogo atualizado com sucesso!');
      } else {
        await createJogo(newJogo);
        alert('Jogo criado com sucesso!');
      }
      setNewJogo({ nome: '', descricao: '', data: '' });
      setEditingJogoId(null);
      loadJogos();
    } catch (error) {
      alert('Erro ao salvar jogo!');
    }
  };

  const handleEditJogo = (jogo) => {
    setNewJogo(jogo);
    setEditingJogoId(jogo.id);
  };

  const handleDeleteJogo = async (id) => {
    try {
      await deleteJogo(id);
      alert('Jogo excluído com sucesso!');
      loadJogos();
    } catch (error) {
      alert('Erro ao excluir jogo!');
    }
  };

  return (
    <div className="jogo-container">
      <h2>Jogos</h2>
      <ul>
        {jogos.map((jogo) => (
          <li key={jogo.id}>
            {jogo.nome} - {jogo.descricao} - {new Date(jogo.data).toLocaleDateString()}
            <button onClick={() => handleEditJogo(jogo)}>Editar</button>
            <button onClick={() => handleDeleteJogo(jogo.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div className="new-jogo-form">
        <input
          type="text"
          placeholder="Nome"
          value={newJogo.nome}
          onChange={(e) => setNewJogo({ ...newJogo, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newJogo.descricao}
          onChange={(e) => setNewJogo({ ...newJogo, descricao: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data"
          value={newJogo.data}
          onChange={(e) => setNewJogo({ ...newJogo, data: e.target.value })}
        />
        <button onClick={handleCreateOrUpdateJogo}>
          {editingJogoId ? 'Atualizar Jogo' : 'Adicionar Jogo'}
        </button>
      </div>
    </div>
  );
};

export default Jogo;
