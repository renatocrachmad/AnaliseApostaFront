// /src/services/apostaService.js
import api from './api';

// Função para obter todas as apostas
export const getApostas = async () => {
  return await api.get('/apostas');
};

// Função para criar uma nova aposta
export const createAposta = async (apostaData) => {
  return await api.post('/apostas', apostaData);
};

// Função para atualizar uma aposta existente
export const updateAposta = async (id, updatedData) => {
  return await api.put(`/apostas/${id}`, updatedData);
};

// Função para deletar uma aposta pelo ID
export const deleteAposta = async (id) => {
  return await api.delete(`/apostas/${id}`);
};
