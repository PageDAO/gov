import React from 'react';

function ProposalDetails({ send }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Proposal Details</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Proposal Title</h3>
        <p className="text-gray-600">Proposal description goes here...</p>
      </div>
      <div className="space-x-4">
        <button onClick={() => send('VOTE')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Vote</button>
        <button onClick={() => send('BACK')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Back</button>
      </div>
    </div>
  );
}
export default ProposalDetails;
