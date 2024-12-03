// UserList.jsx
import { useState, useEffect } from 'react';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(['Admin', 'Editor', 'Viewer']);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchedUsers = [
      { id: 1, username: 'Ashok', role: 'Viewer' },
      { id: 2, username: 'John', role: 'Editor' },
    ];
    setUsers(fetchedUsers);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    console.log(`Updated user ${userId}'s role to ${newRole}`);
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">User List</h2>
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2 text-left">Username</th>
          <th className="border px-4 py-2 text-left">Role</th>
          <th className="border px-4 py-2 text-left">Assign Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">{user.role}</td>
            <td className="border px-4 py-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border rounded-md px-2 py-1"
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleRoleChange(user.id, selectedRole)}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Assign Role
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default UserList;
