const API_BASE_URL = process.env.REACT_APP_CHARMVERSE_API_URL;
const API_KEY = process.env.REACT_APP_CHARMVERSE_API_KEY;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  return handleResponse(response);
};

export const fetchProposals = async () => {
  return apiRequest('/api/proposals');
};

export const createProposal = async (proposalData) => {
  return apiRequest('/api/proposals', {
    method: 'POST',
    body: JSON.stringify(proposalData)
  });
};

export const updateProposal = async (id, updateData) => {
  return apiRequest(`/api/proposals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData)
  });
};
