import React from 'react';

function ViewProposals({ send }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">View Proposals</h2>
      <ul className="space-y-4">
        <li className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
          <button onClick={() => send('SELECT_PROPOSAL')} className="text-blue-600 hover:text-blue-800 font-semibold">
            Proposal 1
          </button>
        </li>
        <li className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
          <button onClick={() => send('SELECT_PROPOSAL')} className="text-blue-600 hover:text-blue-800 font-semibold">
            Proposal 2
          </button>
        </li>
      </ul>
      <button onClick={() => send('BACK')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Back</button>
    </div>
  );
}
export default ViewProposals;
