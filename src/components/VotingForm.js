import React, { useState, useContext } from 'react';
import { CharmverseContext } from '../contexts/CharmverseContext';

function VotingForm({ send, proposalId }) {
  const [vote, setVote] = useState('');
  const { castVote } = useContext(CharmverseContext);

  const handleVote = async () => {
    try {
      await castVote(proposalId, vote);
      send('CONFIRM_VOTE');
    } catch (error) {
      console.error('Failed to cast vote:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Cast Your Vote</h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="vote"
              value="for"
              checked={vote === 'for'}
              onChange={() => setVote('for')}
              className="form-radio text-blue-600"
            />
            <span>For</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="vote"
              value="against"
              checked={vote === 'against'}
              onChange={() => setVote('against')}
              className="form-radio text-blue-600"
            />
            <span>Against</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="vote"
              value="abstain"
              checked={vote === 'abstain'}
              onChange={() => setVote('abstain')}
              className="form-radio text-blue-600"
            />
            <span>Abstain</span>
          </label>
        </div>
        <div className="space-x-4">
          <button type="button" onClick={handleVote} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Confirm Vote</button>
          <button type="button" onClick={() => send('CANCEL')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default VotingForm;