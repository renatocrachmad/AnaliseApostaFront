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
    </Routes>
  </Router>
);
