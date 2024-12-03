import { useEffect, useState } from 'react';
import { getRoles, addRole, deleteRole } from '../services/roleService';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching roles:', error);
        alert('Failed to fetch roles. Please try again later.');
      }
    };
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    if (!roleName.trim()) {
      alert('Role name cannot be empty!');
      return;
    }
    try {
      const newRole = await addRole({ name: roleName });
      setRoles([...roles, newRole]);  // Add the new role to the state
      setRoleName('');  // Clear the input field
    } catch (error) {
      console.error('Error adding role:', error);  // Log the error
      alert('Failed to add role. Please try again.');  // Show the user-friendly error
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id);
      setRoles(roles.filter((role) => role._id !== id));
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Role List</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Enter role name"
          className="flex-grow border px-4 py-2 rounded-md"
        />
        <button
          onClick={handleAddRole}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Add Role
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {roles.map((role) => (
          <li key={role._id} className="py-2 flex justify-between items-center">
            {role.name}
            <button
              onClick={() => handleDeleteRole(role._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;
