
import api from './api';

export const getJogos = async () => {
  return await api.get('/jogos');
};

export const createJogo = async (jogoData) => {
  return await api.post('/jogos', jogoData);
};

export const updateJogo = async (id, jogoData) => {
  return await api.put(`/jogos/${id}`, jogoData);
};

export const deleteJogo = async (id) => {
  return await api.delete(`/jogos/${id}`);
};
