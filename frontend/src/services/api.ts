import axios from "axios";

const API_URL = "/api";

export const getItems = async () => {
  const response = await axios.get(`${API_URL}/items/`);
  return response.data;
};

// Get all pipeline instances for the user
export const getPipelines = async (token: string) => {
  const response = await axios.get(`${API_URL}/pipeline/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

// Get a specific pipeline by id
export const getPipeline = async (id: number, token: string) => {
  const response = await axios.get(`${API_URL}/pipeline/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

// Create a new pipeline
export const createPipeline = async (data: any, token: string) => {
  const response = await axios.post(`${API_URL}/pipeline/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

// Update an existing pipeline
export const updatePipeline = async (id: number, data: any, token: string) => {
  const response = await axios.patch(`${API_URL}/pipeline/${id}/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const deletePipelineData = async (id: number, token: string) => {
  const response = await axios.delete(`${API_URL}/pipeline/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const getWinroomData = async (token: string) => {
  const response = await axios.get(`${API_URL}/winroom/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const getWinroomItem = async (id: number, token: string) => {
  const response = await axios.get(`${API_URL}/winroom/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const createWinroomData = async (data: any, token: string) => {
  const response = await axios.post(`${API_URL}/winroom/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const updateWinroomData = async (
  id: number,
  data: any,
  token: string
) => {
  const response = await axios.patch(`${API_URL}/winroom/${id}/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const deleteWinroomData = async (id: number, token: string) => {
  const response = await axios.delete(`${API_URL}/winroom/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const getStakeholderData = async (token: string) => {
  const response = await axios.get(`${API_URL}/stakeholder/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const getStakeholderItem = async (id: number, token: string) => {
  const response = await axios.get(`${API_URL}/stakeholder/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const createStakeholderData = async (data: any, token: string) => {
  const response = await axios.post(`${API_URL}/stakeholder/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const updateStakeholderData = async (
  id: number,
  data: any,
  token: string
) => {
  const response = await axios.patch(`${API_URL}/stakeholder/${id}/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const deleteStakeholderData = async (id: number, token: string) => {
  const response = await axios.delete(`${API_URL}/stakeholder/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};
