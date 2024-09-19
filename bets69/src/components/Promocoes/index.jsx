// /src/components/Promocoes/index.jsx
import React, { useEffect, useState } from 'react';
import { getPromocoes, createPromocao, updatePromocao, deletePromocao } from '../../services/promocoesService';
import './style.css';

const Promocoes = () => {
  const [promocoes, setPromocoes] = useState([]);
  const [newPromocao, setNewPromocao] = useState({ titulo: '', descricao: '', dataInicio: '', dataFim: '' });
  const [editingPromocaoId, setEditingPromocaoId] = useState(null);

  useEffect(() => {
    loadPromocoes();
  }, []);

  const loadPromocoes = async () => {
    try {
      const response = await getPromocoes();
      setPromocoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar promoções', error);
    }
  };

  const handleCreateOrUpdatePromocao = async () => {
    try {
      if (editingPromocaoId) {
        await updatePromocao(editingPromocaoId, newPromocao);
        alert('Promoção atualizada com sucesso!');
      } else {
        await createPromocao(newPromocao);
        alert('Promoção criada com sucesso!');
      }
      setNewPromocao({ titulo: '', descricao: '', dataInicio: '', dataFim: '' });
      setEditingPromocaoId(null);
      loadPromocoes();
    } catch (error) {
      alert('Erro ao salvar promoção!');
    }
  };

  const handleEditPromocao = (promocao) => {
    setNewPromocao(promocao);
    setEditingPromocaoId(promocao.id);
  };

  const handleDeletePromocao = async (id) => {
    try {
      await deletePromocao(id);
      alert('Promoção excluída com sucesso!');
      loadPromocoes();
    } catch (error) {
      alert('Erro ao excluir promoção!');
    }
  };

  return (
    <div className="promocoes-container">
      <h2>Promoções</h2>
      <ul>
        {promocoes.map((promocao) => (
          <li key={promocao.id}>
            {promocao.titulo} - {promocao.descricao} (De: {new Date(promocao.dataInicio).toLocaleDateString()} Até: {new Date(promocao.dataFim).toLocaleDateString()})
            <button onClick={() => handleEditPromocao(promocao)}>Editar</button>
            <button onClick={() => handleDeletePromocao(promocao.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div className="new-promocao-form">
        <input
          type="text"
          placeholder="Título"
          value={newPromocao.titulo}
          onChange={(e) => setNewPromocao({ ...newPromocao, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newPromocao.descricao}
          onChange={(e) => setNewPromocao({ ...newPromocao, descricao: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data de Início"
          value={newPromocao.dataInicio}
          onChange={(e) => setNewPromocao({ ...newPromocao, dataInicio: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data de Fim"
          value={newPromocao.dataFim}
          onChange={(e) => setNewPromocao({ ...newPromocao, dataFim: e.target.value })}
        />
        <button onClick={handleCreateOrUpdatePromocao}>
          {editingPromocaoId ? 'Atualizar Promoção' : 'Adicionar Promoção'}
        </button>
      </div>
    </div>
  );
};

export default Promocoes;
