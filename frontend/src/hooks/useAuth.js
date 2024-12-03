import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => !!localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return { isLoggedIn, logout };
};

export default useAuth;
