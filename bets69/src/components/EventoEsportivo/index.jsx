// /src/components/EventoEsportivo/index.jsx
import React, { useEffect, useState } from 'react';
import { getEventos, createEvento, updateEvento, deleteEvento } from '../../services/eventoService';
import './style.css';

const EventoEsportivo = () => {
  const [eventos, setEventos] = useState([]);
  const [newEvento, setNewEvento] = useState({ nome: '', data: '', descricao: '' });
  const [editEvento, setEditEvento] = useState(null); // Estado para armazenar o evento em edição

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      const response = await getEventos();
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao carregar eventos', error);
    }
  };

  const handleCreateEvento = async () => {
    try {
      await createEvento(newEvento);
      alert('Evento criado com sucesso!');
      setNewEvento({ nome: '', data: '', descricao: '' }); // Limpa o formulário
      loadEventos();
    } catch (error) {
      alert('Erro ao criar evento!');
    }
  };

  const handleUpdateEvento = async (id) => {
    try {
      await updateEvento(id, editEvento);
      alert('Evento atualizado com sucesso!');
      setEditEvento(null); // Sai do modo de edição
      loadEventos();
    } catch (error) {
      alert('Erro ao atualizar evento!');
    }
  };

  const handleDeleteEvento = async (id) => {
    try {
      await deleteEvento(id);
      alert('Evento deletado com sucesso!');
      loadEventos();
    } catch (error) {
      alert('Erro ao deletar evento!');
    }
  };

  return (
    <div className="evento-container">
      <h2>Eventos Esportivos</h2>
      <ul>
        {eventos.map((evento) => (
          <li key={evento.id}>
            {editEvento && editEvento.id === evento.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={editEvento.nome}
                  onChange={(e) => setEditEvento({ ...editEvento, nome: e.target.value })}
                />
                <input
                  type="datetime-local"
                  placeholder="Data"
                  value={editEvento.data}
                  onChange={(e) => setEditEvento({ ...editEvento, data: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={editEvento.descricao}
                  onChange={(e) => setEditEvento({ ...editEvento, descricao: e.target.value })}
                />
                <button onClick={() => handleUpdateEvento(evento.id)}>Salvar</button>
                <button onClick={() => setEditEvento(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                Evento #{evento.id} - Nome: {evento.nome}, Data: {evento.data}, Descrição: {evento.descricao}
                <button onClick={() => setEditEvento(evento)}>Editar</button>
                <button onClick={() => handleDeleteEvento(evento.id)}>Deletar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="new-evento-form">
        <h3>Adicionar Novo Evento</h3>
        <input
          type="text"
          placeholder="Nome"
          value={newEvento.nome}
          onChange={(e) => setNewEvento({ ...newEvento, nome: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Data"
          value={newEvento.data}
          onChange={(e) => setNewEvento({ ...newEvento, data: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newEvento.descricao}
          onChange={(e) => setNewEvento({ ...newEvento, descricao: e.target.value })}
        />
        <button onClick={handleCreateEvento}>Adicionar Evento</button>
      </div>
    </div>
  );
};

export default EventoEsportivo;
