import { useState, useEffect } from 'react';
import { getRoles, addRole, deleteRole } from '../services/roleService';

const RoleList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    // Mock fetching users
    const fetchedUsers = [
      { id: 1, username: 'Ashok', role: 'Viewer' },
      { id: 2, username: 'John', role: 'Editor' },
    ];
    setUsers(fetchedUsers);

    // Fetch roles from the service
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles(); // Get roles from the service
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching roles:', error);
        alert('Failed to fetch roles. Please try again later.');
      }
    };
    fetchRoles();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
  };

  const handleDeleteUser = (userId) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    if (!newUser.trim()) {
      alert('Username cannot be empty!');
      return;
    }
    setUsers([...users, { id: Date.now(), username: newUser, role: 'Viewer' }]);
    setNewUser(''); // Clear the input field
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(roleId); // Delete role via the service
      setRoles(roles.filter((role) => role._id !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role. Please try again.');
    }
  };

  const handleAddRole = async () => {
    if (!newRole.trim()) {
      alert('Role name cannot be empty!');
      return;
    }
    try {
      const addedRole = await addRole({ name: newRole });
      setRoles([...roles, addedRole]);
      setNewRole(''); // Clear the input field
    } catch (error) {
      console.error('Error adding role:', error);
      alert('Failed to add role. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
      {/* User List */}
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter new username"
          className="flex-grow border px-4 py-2 rounded-md"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Username</th>
            <th className="border px-4 py-2 text-left">Role</th>
            {/* <th className="border px-4 py-2 text-left">Assign Role</th> */}
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.role}</td>
              {/* <td className="border px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border rounded-md px-2 py-1"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </td> */}
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Role List */}
      {/* <h2 className="text-2xl font-bold mb-4">Role List</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Enter new role"
          className="flex-grow border px-4 py-2 rounded-md"
        />
        <button
          onClick={handleAddRole}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add Role
        </button>
      </div> */}
      <ul className="divide-y divide-gray-200">
        {roles.map((role) => (
          <li key={role._id} className="py-2 flex justify-between items-center">
            {role.name}
            <button
              onClick={() => handleDeleteRole(role._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete Role
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;
