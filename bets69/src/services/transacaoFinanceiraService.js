// /src/services/transacaoFinanceiraService.js
import api from './api';

export const getTransacoesFinanceiras = async () => {
  return await api.get('/transacoes-financeiras');
};

export const createTransacaoFinanceira = async (transacaoData) => {
  return await api.post('/transacoes-financeiras', transacaoData);
};

export const updateTransacaoFinanceira = async (id, transacaoData) => {
  return await api.put(`/transacoes-financeiras/${id}`, transacaoData);
};

export const deleteTransacaoFinanceira = async (id) => {
  return await api.delete(`/transacoes-financeiras/${id}`);
};
