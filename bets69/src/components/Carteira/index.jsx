// /src/components/Carteira/index.jsx
import React, { useEffect, useState } from 'react';
import { getCarteiras, createCarteira, updateCarteira, deleteCarteira } from '../../services/carteiraService';
import './style.css';

const Carteira = () => {
  const [carteiras, setCarteiras] = useState([]);
  const [newCarteira, setNewCarteira] = useState({ saldo: '', descricao: '' });
  const [editCarteira, setEditCarteira] = useState(null); // Estado para armazenar a carteira em edição

  useEffect(() => {
    loadCarteiras();
  }, []);

  const loadCarteiras = async () => {
    try {
      const response = await getCarteiras();
      setCarteiras(response.data);
    } catch (error) {
      console.error('Erro ao carregar carteiras', error);
    }
  };

  const handleCreateCarteira = async () => {
    try {
      await createCarteira(newCarteira);
      alert('Carteira criada com sucesso!');
      setNewCarteira({ saldo: '', descricao: '' }); // Limpa o formulário
      loadCarteiras();
    } catch (error) {
      alert('Erro ao criar carteira!');
    }
  };

  const handleUpdateCarteira = async (id) => {
    try {
      await updateCarteira(id, editCarteira);
      alert('Carteira atualizada com sucesso!');
      setEditCarteira(null); // Sai do modo de edição
      loadCarteiras();
    } catch (error) {
      alert('Erro ao atualizar carteira!');
    }
  };

  const handleDeleteCarteira = async (id) => {
    try {
      await deleteCarteira(id);
      alert('Carteira deletada com sucesso!');
      loadCarteiras();
    } catch (error) {
      alert('Erro ao deletar carteira!');
    }
  };

  return (
    <div className="carteira-container">
      <h2>Carteiras</h2>
      <ul>
        {carteiras.map((carteira) => (
          <li key={carteira.id}>
            {editCarteira && editCarteira.id === carteira.id ? (
              <div>
                <input
                  type="number"
                  placeholder="Saldo"
                  value={editCarteira.saldo}
                  onChange={(e) => setEditCarteira({ ...editCarteira, saldo: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={editCarteira.descricao}
                  onChange={(e) => setEditCarteira({ ...editCarteira, descricao: e.target.value })}
                />
                <button onClick={() => handleUpdateCarteira(carteira.id)}>Salvar</button>
                <button onClick={() => setEditCarteira(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                Carteira #{carteira.id} - Saldo: R${carteira.saldo}, Descrição: {carteira.descricao}
                <button onClick={() => setEditCarteira(carteira)}>Editar</button>
                <button onClick={() => handleDeleteCarteira(carteira.id)}>Deletar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="new-carteira-form">
        <h3>Adicionar Nova Carteira</h3>
        <input
          type="number"
          placeholder="Saldo"
          value={newCarteira.saldo}
          onChange={(e) => setNewCarteira({ ...newCarteira, saldo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newCarteira.descricao}
          onChange={(e) => setNewCarteira({ ...newCarteira, descricao: e.target.value })}
        />
        <button onClick={handleCreateCarteira}>Adicionar Carteira</button>
      </div>
    </div>
  );
};

export default Carteira;
