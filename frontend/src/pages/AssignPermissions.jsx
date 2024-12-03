import { useState, useEffect } from 'react';
import { getRoles, updateRole } from '../services/roleService';

const AssignPermissions = () => {
  const [roles, setRoles] = useState([]); // Stores fetched roles
  const [permissions, setPermissions] = useState([]); // Available permissions
  const [selectedRole, setSelectedRole] = useState(null); // Currently selected role

  // Fetch roles and set them in the state
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData); // Update roles state
      } catch (error) {
        console.error('Error fetching roles:', error);
        alert('Failed to fetch roles. Please check the server.');
      }
    };

    // Dummy permissions for demonstration; replace with actual permissions fetch
    const fetchPermissions = () => {
      const permissionsList = ['read', 'write', 'delete', 'manage_roles'];
      setPermissions(permissionsList);
    };

    fetchRoles();
    fetchPermissions();
  }, []);

  // Handle permission checkbox changes
  const handlePermissionChange = (permission) => {
    if (!selectedRole) return;

    const updatedPermissions = selectedRole.permissions.includes(permission)
      ? selectedRole.permissions.filter((perm) => perm !== permission) // Remove permission
      : [...selectedRole.permissions, permission]; // Add permission

    setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
  };

  // Save the changes for the selected role
  const saveChanges = async () => {
    if (!selectedRole) {
      alert('No role selected!');
      return;
    }

    try {
      await updateRole(selectedRole._id, selectedRole);
      alert('Permissions updated successfully!');
    } catch (error) {
      console.error('Error updating permissions:', error);
      alert('Failed to update permissions. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assign Permissions</h1>

      {/* Dropdown for roles */}
      <select
        onChange={(e) =>
          setSelectedRole(roles.find((role) => role._id === e.target.value))
        }
        className="mb-4 border px-4 py-2 rounded-md w-full"
      >
        <option value="">Select Role</option>
        {roles.length > 0 ? (
          roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))
        ) : (
          <option disabled>No roles available</option>
        )}
      </select>

      {/* Permissions management */}
      {selectedRole && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Permissions for <span className="text-blue-600">{selectedRole.name}</span>
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
