// /src/services/carteiraService.js
import api from './api';

// Obter todas as carteiras
export const getCarteiras = async () => {
  return await api.get('/carteiras');
};

// Criar uma nova carteira
export const createCarteira = async (carteiraData) => {
  return await api.post('/carteiras', carteiraData);
};

// Atualizar uma carteira existente
export const updateCarteira = async (id, carteiraData) => {
  return await api.put(`/carteiras/${id}`, carteiraData);
};

// Deletar uma carteira
export const deleteCarteira = async (id) => {
  return await api.delete(`/carteiras/${id}`);
};
