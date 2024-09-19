// /src/services/tipoApostaService.js
import api from './api';

export const getTiposAposta = async () => {
  return await api.get('/tipos-aposta');
};

export const createTipoAposta = async (tipoApostaData) => {
  return await api.post('/tipos-aposta', tipoApostaData);
};

export const updateTipoAposta = async (id, tipoApostaData) => {
  return await api.put(`/tipos-aposta/${id}`, tipoApostaData);
};

export const deleteTipoAposta = async (id) => {
  return await api.delete(`/tipos-aposta/${id}`);
};
