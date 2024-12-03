import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import RoleList from './pages/RoleList';
import AssignPermissions from './pages/AssignPermissions';
import AuthProvider, { useAuth } from './components/AuthContext';  

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/" />;  
};

const App = () => {
  return (
    <AuthProvider>  
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<ProtectedRoute element={<UserList />} />} />
          <Route path="/roles" element={<ProtectedRoute element={<RoleList />} />} />
          <Route path="/assign-permissions" element={<ProtectedRoute element={<AssignPermissions />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
