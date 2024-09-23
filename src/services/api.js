const API_BASE_URL = 'https://api.charmverse.io'; // Replace with actual Charmverse API URL

export const fetchProposals = async () => {
  // Placeholder for fetching proposals from Charmverse
  // Replace with actual API call when ready
  const response = await fetch(`${API_BASE_URL}/proposals`);
  if (!response.ok) throw new Error('Failed to fetch proposals');
  return response.json();
};

export const submitVote = async (proposalId, vote) => {
  // Placeholder for submitting a vote to Charmverse
  // Replace with actual API call when ready
  const response = await fetch(`${API_BASE_URL}/proposals/${proposalId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vote }),
  });
  if (!response.ok) throw new Error('Failed to submit vote');
  return response.json();
};

// Add more API functions as needed
