const API_BASE_URL = process.env.REACT_APP_CHARMVERSE_API_URL;
const API_KEY = process.env.REACT_APP_CHARMVERSE_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

export const fetchProposals = async () => {
  const response = await fetch(`${API_BASE_URL}/proposals`, { headers });
  if (!response.ok) throw new Error('Failed to fetch proposals');
  return response.json();
};

export const fetchProposalDetails = async (proposalId) => {
  const response = await fetch(`${API_BASE_URL}/proposals/${proposalId}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch proposal details');
  return response.json();
};

export const submitVote = async (proposalId, vote) => {
  const response = await fetch(`${API_BASE_URL}/proposals/${proposalId}/vote`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ vote }),
  });
  if (!response.ok) throw new Error('Failed to submit vote');
  return response.json();
};

export const createProposal = async (proposalData) => {
  const response = await fetch(`${API_BASE_URL}/proposals`, {
    method: 'POST',
    headers,
    body: JSON.stringify(proposalData),
  });
  if (!response.ok) throw new Error('Failed to create proposal');
  return response.json();
};
