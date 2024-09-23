import React from 'react';

function VotingForm({ send }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Cast Your Vote</h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" name="vote" value="for" className="form-radio text-blue-600" />
            <span>For</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="vote" value="against" className="form-radio text-blue-600" />
            <span>Against</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="vote" value="abstain" className="form-radio text-blue-600" />
            <span>Abstain</span>
          </label>
        </div>
        <div className="space-x-4">
          <button type="button" onClick={() => send('CONFIRM_VOTE')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Confirm Vote</button>
          <button type="button" onClick={() => send('CANCEL')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
export default VotingForm;
