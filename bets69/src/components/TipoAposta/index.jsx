// /src/components/TipoAposta/index.jsx
import React, { useEffect, useState } from 'react';
import { getTiposAposta, createTipoAposta, updateTipoAposta, deleteTipoAposta } from '../../services/tipoApostaService';
import './style.css';

const TipoAposta = () => {
  const [tiposAposta, setTiposAposta] = useState([]);
  const [newTipoAposta, setNewTipoAposta] = useState({ descricao: '' });
  const [editingTipoApostaId, setEditingTipoApostaId] = useState(null);

  useEffect(() => {
    loadTiposAposta();
  }, []);

  const loadTiposAposta = async () => {
    try {
      const response = await getTiposAposta();
      setTiposAposta(response.data);
    } catch (error) {
      console.error('Erro ao carregar tipos de aposta', error);
    }
  };

  const handleCreateOrUpdateTipoAposta = async () => {
    try {
      if (editingTipoApostaId) {
        await updateTipoAposta(editingTipoApostaId, newTipoAposta);
        alert('Tipo de Aposta atualizado com sucesso!');
      } else {
        await createTipoAposta(newTipoAposta);
        alert('Tipo de Aposta criado com sucesso!');
      }
      setNewTipoAposta({ descricao: '' });
      setEditingTipoApostaId(null);
      loadTiposAposta();
    } catch (error) {
      alert('Erro ao salvar tipo de aposta!');
    }
  };

  const handleEditTipoAposta = (tipoAposta) => {
    setNewTipoAposta(tipoAposta);
    setEditingTipoApostaId(tipoAposta.id);
  };

  const handleDeleteTipoAposta = async (id) => {
    try {
      await deleteTipoAposta(id);
      alert('Tipo de Aposta excluído com sucesso!');
      loadTiposAposta();
    } catch (error) {
      alert('Erro ao excluir tipo de aposta!');
    }
  };

  return (
    <div className="tipo-aposta-container">
      <h2>Tipos de Aposta</h2>
      <ul>
        {tiposAposta.map((tipoAposta) => (
          <li key={tipoAposta.id}>
            {tipoAposta.descricao}
            <button onClick={() => handleEditTipoAposta(tipoAposta)}>Editar</button>
            <button onClick={() => handleDeleteTipoAposta(tipoAposta.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div className="new-tipo-aposta-form">
        <input
          type="text"
          placeholder="Descrição"
          value={newTipoAposta.descricao}
          onChange={(e) => setNewTipoAposta({ ...newTipoAposta, descricao: e.target.value })}
        />
        <button onClick={handleCreateOrUpdateTipoAposta}>
          {editingTipoApostaId ? 'Atualizar Tipo de Aposta' : 'Adicionar Tipo de Aposta'}
        </button>
      </div>
    </div>
  );
};

export default TipoAposta;
