import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      alert('Login failed!');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <input 
        type="text" 
        placeholder="Nome de Usuário" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type={showPassword ? 'text' : 'password'} 
        placeholder="Senha" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={togglePasswordVisibility}>Visualizar Senha</button>
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={() => navigate('/register')}>Cadastrar-se</button>
    </div>
  );
};

export default Login;
