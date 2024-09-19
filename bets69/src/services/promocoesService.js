// /src/services/promocoesService.js
import api from './api';

export const getPromocoes = async () => {
  return await api.get('/promocoes');
};

export const createPromocao = async (promocaoData) => {
  return await api.post('/promocoes', promocaoData);
};

export const updatePromocao = async (id, promocaoData) => {
  return await api.put(`/promocoes/${id}`, promocaoData);
};

export const deletePromocao = async (id) => {
  return await api.delete(`/promocoes/${id}`);
};
