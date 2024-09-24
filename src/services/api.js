import { useDynamicContext } from '@dynamic-labs/sdk-react';

const API_BASE_URL = process.env.REACT_APP_CHARMVERSE_API_URL;
const API_KEY = process.env.REACT_APP_CHARMVERSE_API_KEY;

const getHeaders = (userAddress) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`,
  'X-User-Address': userAddress || '',
});

const handleResponse = async (response) => {
  if (!response.ok) throw new Error(`API call failed: ${response.statusText}`);
  return response.json();
};

export const useApi = () => {
  const { user } = useDynamicContext();

  const fetchProposals = async () => {
    const response = await fetch(`${API_BASE_URL}/proposals`, { 
      headers: getHeaders(user?.address) 
    });
    return handleResponse(response);
  };

  const fetchProposalDetails = async (proposalId) => {
    const response = await fetch(`${API_BASE_URL}/proposals/${proposalId}`, { 
      headers: getHeaders(user?.address) 
    });
    return handleResponse(response);
  };

  const submitVote = async (proposalId, vote) => {
    const response = await fetch(`${API_BASE_URL}/proposals/${proposalId}/vote`, {
      method: 'POST',
      headers: getHeaders(user?.address),
      body: JSON.stringify({ vote }),
    });
    return handleResponse(response);
  };

  const createProposal = async (proposalData) => {
    const response = await fetch(`${API_BASE_URL}/proposals`, {
      method: 'POST',
      headers: getHeaders(user?.address),
      body: JSON.stringify(proposalData),
    });
    return handleResponse(response);
  };

  return {
    fetchProposals,
    fetchProposalDetails,
    submitVote,
    createProposal,
  };
};

export default useApi;