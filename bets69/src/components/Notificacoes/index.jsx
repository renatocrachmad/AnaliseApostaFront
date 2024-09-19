// /src/components/Notificacoes/index.jsx
import React, { useEffect, useState } from 'react';
import { getNotificacoes, createNotificacao, updateNotificacao, deleteNotificacao } from '../../services/notificacoesService';
import './style.css';

const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [newNotificacao, setNewNotificacao] = useState({ titulo: '', mensagem: '', data: '' });
  const [editingNotificacaoId, setEditingNotificacaoId] = useState(null);

  useEffect(() => {
    loadNotificacoes();
  }, []);

  const loadNotificacoes = async () => {
    try {
      const response = await getNotificacoes();
      setNotificacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar notificações', error);
    }
  };

  const handleCreateOrUpdateNotificacao = async () => {
    try {
      if (editingNotificacaoId) {
        await updateNotificacao(editingNotificacaoId, newNotificacao);
        alert('Notificação atualizada com sucesso!');
      } else {
        await createNotificacao(newNotificacao);
        alert('Notificação criada com sucesso!');
      }
      setNewNotificacao({ titulo: '', mensagem: '', data: '' });
      setEditingNotificacaoId(null);
      loadNotificacoes();
    } catch (error) {
      alert('Erro ao salvar notificação!');
    }
  };

  const handleEditNotificacao = (notificacao) => {
    setNewNotificacao(notificacao);
    setEditingNotificacaoId(notificacao.id);
  };

  const handleDeleteNotificacao = async (id) => {
    try {
      await deleteNotificacao(id);
      alert('Notificação excluída com sucesso!');
      loadNotificacoes();
    } catch (error) {
      alert('Erro ao excluir notificação!');
    }
  };

  return (
    <div className="notificacoes-container">
      <h2>Notificações</h2>
      <ul>
        {notificacoes.map((notificacao) => (
          <li key={notificacao.id}>
            {notificacao.titulo} - {notificacao.mensagem} - {new Date(notificacao.data).toLocaleDateString()}
            <button onClick={() => handleEditNotificacao(notificacao)}>Editar</button>
            <button onClick={() => handleDeleteNotificacao(notificacao.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div className="new-notificacao-form">
        <input
          type="text"
          placeholder="Título"
          value={newNotificacao.titulo}
          onChange={(e) => setNewNotificacao({ ...newNotificacao, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mensagem"
          value={newNotificacao.mensagem}
          onChange={(e) => setNewNotificacao({ ...newNotificacao, mensagem: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data"
          value={newNotificacao.data}
          onChange={(e) => setNewNotificacao({ ...newNotificacao, data: e.target.value })}
        />
        <button onClick={handleCreateOrUpdateNotificacao}>
          {editingNotificacaoId ? 'Atualizar Notificação' : 'Adicionar Notificação'}
        </button>
      </div>
    </div>
  );
};

export default Notificacoes;
