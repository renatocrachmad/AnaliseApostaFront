import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Aposta from './components/Aposta';
import './index.css';
import Carteira from './components/Carteira';
import EventoEsportivo from './components/EventoEsportivo';
import Jogo from './components/Jogo';
import Notificacoes from './components/Notificacoes';
import Promocoes from './components/Promocoes';
import TipoAposta from './components/TipoAposta';
import TransacaoFinanceira from './components/TransacaoFinanceira';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/apostas" element={<Aposta />} />
      <Route path="/carteira" element={<Carteira />} />
      <Route path="/eventoEsportivo" element={<EventoEsportivo />} />
      <Route path="/jogo" element={<Jogo />} />
      <Route path="/notificacoes" element={<Notificacoes />} />
      <Route path="/promocoes" element={<Promocoes />} />
      <Route path="/tipoAposta" element={<TipoAposta />} />
      <Route path="/transacaoFinanceira" element={<TransacaoFinanceira />} />
    </Routes>
  </Router>
);