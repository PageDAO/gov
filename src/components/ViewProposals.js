import React from 'react';

function ViewProposals({ proposals, loading, error, send }) {
  if (loading) return <div>Loading proposals...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">View Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals available.</p>
      ) : (
        <ul className="space-y-4">
          {proposals.map((proposal) => (
            <li key={proposal.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
              <button
                onClick={() => send('SELECT_PROPOSAL', { proposalId: proposal.id })}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                {proposal.title}
              </button>
              <p className="text-gray-600 mt-2">Status: {proposal.status}</p>
              <p className="text-gray-600">Voting ends: {proposal.votingEnds}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => send('BACK')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Back</button>
    </div>
  );
}

export default ViewProposals;