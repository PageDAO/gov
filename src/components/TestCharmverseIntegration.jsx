import React from 'react';
import { useCharmverse } from '../contexts/CharmverseContext';

const TestCharmverseIntegration = () => {
  const { proposals, loading, error, refreshProposals } = useCharmverse();

  if (loading) return <div>Loading proposals...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Charmverse Proposals</h2>
      <button 
        onClick={refreshProposals}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Proposals
      </button>
      <ul className="space-y-2">
        {proposals.map(proposal => (
          <li key={proposal.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-xl font-semibold">{proposal.title}</h3>
            <p className="text-gray-600">{proposal.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestCharmverseIntegration;
