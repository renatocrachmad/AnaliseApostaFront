import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não conferem!');
      return;
    }
    try {
      await axios.post('/api/auth/register', { email, password });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro ao realizar cadastro!');
    }
  };

  return (
    <div className="register-container">
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Senha" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Confirmar Senha" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Salvar</button>
    </div>
  );
};

export default Register;
