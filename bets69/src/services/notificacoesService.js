// /src/services/notificacoesService.js
import api from './api';

export const getNotificacoes = async () => {
  return await api.get('/notificacoes');
};

export const createNotificacao = async (notificacaoData) => {
  return await api.post('/notificacoes', notificacaoData);
};

export const updateNotificacao = async (id, notificacaoData) => {
  return await api.put(`/notificacoes/${id}`, notificacaoData);
};

export const deleteNotificacao = async (id) => {
  return await api.delete(`/notificacoes/${id}`);
};
