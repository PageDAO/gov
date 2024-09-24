import React, { useContext, useEffect, useState } from 'react';
import { CharmverseContext } from '../contexts/CharmverseContext';

function ProposalDetails({ send, proposalId }) {
  const { getProposalDetails } = useContext(CharmverseContext);
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProposalDetails = async (proposalId) => {
    const response = await fetch(`/api/proposals/${proposalId}`);
    return response.json();
  };
  

  useEffect(() => {
    const fetchProposalDetails = async () => {
      try {
        const details = await getProposalDetails(proposalId);
        setProposal(details);
      } catch (err) {
        setError('Failed to fetch proposal details');
      } finally {
        setLoading(false);
      }
    };

    fetchProposalDetails();
  }, [proposalId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!proposal) return <div>No proposal found</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{proposal.title}</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600">{proposal.description}</p>
        <p className="mt-4 text-gray-700">Status: {proposal.status}</p>
        <p className="text-gray-700">Votes For: {proposal.votesFor}</p>
        <p className="text-gray-700">Votes Against: {proposal.votesAgainst}</p>
      </div>
      <div className="space-x-4">
        <button onClick={() => send('VOTE')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Vote</button>
        <button onClick={() => send('BACK')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Back</button>
      </div>
    </div>
  );
}

export default ProposalDetails;