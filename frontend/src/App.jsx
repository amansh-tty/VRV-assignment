import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import RoleList from './pages/RoleList';
import AssignPermissions from './pages/AssignPermissions';
import AuthProvider, { useAuth } from './components/AuthContext'; // Correct import for AuthProvider

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/" />; // Redirect to login page if not authenticated
};

const App = () => {
  return (
    <AuthProvider> {/* Wrap your app with AuthProvider */}
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
