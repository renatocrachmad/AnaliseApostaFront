// /src/services/eventoService.js
import api from './api';

// Obter todos os eventos esportivos
export const getEventos = async () => {
  return await api.get('/eventos');
};

// Criar um novo evento esportivo
export const createEvento = async (eventoData) => {
  return await api.post('/eventos', eventoData);
};

// Atualizar um evento esportivo existente
export const updateEvento = async (id, eventoData) => {
  return await api.put(`/eventos/${id}`, eventoData);
};

// Deletar um evento esportivo
export const deleteEvento = async (id) => {
  return await api.delete(`/eventos/${id}`);
};
