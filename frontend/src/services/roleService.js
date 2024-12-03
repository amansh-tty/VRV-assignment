import api from './api';

export const getRoles = async () => {
  const response = await api.get('/roles');
  return response.data;
};

export const addRole = async (role) => {
  const response = await api.post('/roles', role);
  return response.data;
};

export const updateRole = async (id, role) => {
  const response = await api.put(`/roles/${id}`, role);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await api.delete(`/roles/${id}`);
  return response.data;
};
