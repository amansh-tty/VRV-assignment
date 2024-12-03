import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import useAuth to manage user state and logout

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user info and logout function

  return (
    <nav className="bg-blue-800 text-white fixed top-0 w-full shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navbar Heading */}
          <h1 className="text-2xl font-bold">RBAC System</h1>

          {/* Navigation Links */}
          <div className="flex space-x-6 items-center">
            {user ? (
              <>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? "underline font-semibold" : ""
                    }`
                  }
                >
                  User List
                </NavLink>
                <NavLink
                  to="/roles"
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? "underline font-semibold" : ""
                    }`
                  }
                >
                  Role List
                </NavLink>
                <NavLink
                  to="/assign-permissions"
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? "underline font-semibold" : ""
                    }`
                  }
                >
                  Assign Permissions
                </NavLink>
                <button
                  onClick={logout}
                  className="hover:underline bg-red-600 px-4 py-1 rounded-md hover:bg-red-700 transition text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? "underline font-semibold" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? "underline font-semibold" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Welcome Message */}
          {user && <span className="text-sm font-medium">Welcome, {user.username}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
