// /src/components/TransacaoFinanceira/index.jsx
import React, { useEffect, useState } from 'react';
import {
  getTransacoesFinanceiras,
  createTransacaoFinanceira,
  updateTransacaoFinanceira,
  deleteTransacaoFinanceira
} from '../../services/transacaoFinanceiraService';
import './style.css';

const TransacaoFinanceira = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [newTransacao, setNewTransacao] = useState({ valor: '', tipo: '', status: '' });
  const [editingTransacaoId, setEditingTransacaoId] = useState(null);

  useEffect(() => {
    loadTransacoesFinanceiras();
  }, []);

  const loadTransacoesFinanceiras = async () => {
    try {
      const response = await getTransacoesFinanceiras();
      setTransacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar transações financeiras', error);
    }
  };

  const handleCreateOrUpdateTransacao = async () => {
    try {
      if (editingTransacaoId) {
        await updateTransacaoFinanceira(editingTransacaoId, newTransacao);
        alert('Transação Financeira atualizada com sucesso!');
      } else {
        await createTransacaoFinanceira(newTransacao);
        alert('Transação Financeira criada com sucesso!');
      }
      setNewTransacao({ valor: '', tipo: '', status: '' });
      setEditingTransacaoId(null);
      loadTransacoesFinanceiras();
    } catch (error) {
      alert('Erro ao salvar transação financeira!');
    }
  };

  const handleEditTransacao = (transacao) => {
    setNewTransacao(transacao);
    setEditingTransacaoId(transacao.id);
  };

  const handleDeleteTransacao = async (id) => {
    try {
      await deleteTransacaoFinanceira(id);
      alert('Transação Financeira excluída com sucesso!');
      loadTransacoesFinanceiras();
    } catch (error) {
      alert('Erro ao excluir transação financeira!');
    }
  };

  return (
    <div className="transacao-container">
      <h2>Transações Financeiras</h2>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            Transação #{transacao.id} - Valor: R${transacao.valor}, Tipo: {transacao.tipo}, Status: {transacao.status}
            <button onClick={() => handleEditTransacao(transacao)}>Editar</button>
            <button onClick={() => handleDeleteTransacao(transacao.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div className="new-transacao-form">
        <input
          type="number"
          placeholder="Valor"
          value={newTransacao.valor}
          onChange={(e) => setNewTransacao({ ...newTransacao, valor: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo"
          value={newTransacao.tipo}
          onChange={(e) => setNewTransacao({ ...newTransacao, tipo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={newTransacao.status}
          onChange={(e) => setNewTransacao({ ...newTransacao, status: e.target.value })}
        />
        <button onClick={handleCreateOrUpdateTransacao}>
          {editingTransacaoId ? 'Atualizar Transação' : 'Adicionar Transação'}
        </button>
      </div>
    </div>
  );
};

export default TransacaoFinanceira;
