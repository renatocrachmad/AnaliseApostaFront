import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo ao Bets69</h1>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Cadastrar-se</button>
    </div>
  );
};

export default App;
