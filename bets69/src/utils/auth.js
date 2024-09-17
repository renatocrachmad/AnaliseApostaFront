// Função para obter o token JWT do localStorage
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Função para salvar o token JWT no localStorage
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Função para remover o token JWT do localStorage (Logout)
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  // Função para verificar se o usuário está autenticado
  export const isAuthenticated = () => {
    return !!getToken(); // Retorna true se o token existir
  };
  