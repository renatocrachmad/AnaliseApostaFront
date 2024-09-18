import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-header">
          <h1>Bem-vindo ao Bets69</h1>
        </div>
        <div className="app-buttons">
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="register-button"
            onClick={() => navigate("/register")}
          >
                        Cadastrar-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

