import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Heading */}
    <div className="text-center py-6">
      <h1 className="text-4xl font-bold text-blue-800">RBAC System</h1>
    </div>
  
    {/* Navbar Links */}
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <ul className="flex space-x-8 text-lg">
          {user ? (
            <>
              <li>
                <Link
                  to="/users"
                  className="hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
                >
                  User List
                </Link>
              </li>
              <li>
                <Link
                  to="/roles"
                  className="hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
                >
                  Role List
                </Link>
              </li>
              <li>
                <Link
                  to="/assign-permissions"
                  className="hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
                >
                  Assign Permissions
                </Link>
              </li>
              <li className="text-sm font-medium">Welcome, {user.username}</li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  
    {/* Dynamic Content Area */}
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="p-6 border rounded-lg bg-white shadow-lg">
        {/* Components rendered dynamically */}
      </div>
    </div>
  </div>
  
  );
};

export default Navbar;
