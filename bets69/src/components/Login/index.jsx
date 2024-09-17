import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (remember) localStorage.setItem('email', email);
        navigate('/home');
      }
    } catch (error) {
      alert('Login failed!');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = () => {
    setRemember(!remember);
    if (!remember) localStorage.removeItem('email');
  };

  return (
    <div className="login-container">
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type={showPassword ? 'text' : 'password'} 
        placeholder="Senha" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={togglePasswordVisibility}>Visualizar Senha</button>
      <label>
        <input 
          type="checkbox" 
          checked={remember} 
          onChange={handleRememberMe} 
        />
        Gravar Senha
      </label>
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={() => navigate('/register')}>Cadastrar-se</button>
    </div>
  );
};

export default Login;
