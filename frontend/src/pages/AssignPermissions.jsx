import { useState, useEffect } from 'react';
import { getRoles, updateRole } from '../services/roleService';

const AssignPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesData = await getRoles();
      setRoles(rolesData);
    };
    fetchRoles();
  }, []);

  const handlePermissionChange = (permission) => {
    const updatedPermissions = selectedRole.permissions.includes(permission)
      ? selectedRole.permissions.filter((perm) => perm !== permission)
      : [...selectedRole.permissions, permission];

    setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
  };

  const saveChanges = async () => {
    await updateRole(selectedRole._id, selectedRole);
    alert('Permissions updated!');
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
  <h1 className="text-2xl font-bold mb-4">Assign Permissions</h1>
  <select
    onChange={(e) =>
      setSelectedRole(roles.find((role) => role._id === e.target.value))
    }
    className="mb-4 border px-4 py-2 rounded-md w-full"
  >
    <option>Select Role</option>
    {roles.map((role) => (
      <option key={role._id} value={role._id}>
        {role.name}
      </option>
    ))}
  </select>
  {selectedRole && (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Permissions for {selectedRole.name}
      </h2>
      <div className="space-y-2">
        {permissions.map((permission) => (
          <label key={permission} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedRole.permissions.includes(permission)}
              onChange={() => handlePermissionChange(permission)}
              className="mr-2"
            />
            {permission}
          </label>
        ))}
      </div>
      <button
        onClick={saveChanges}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  )}
</div>

  );
};

export default AssignPermissions;
