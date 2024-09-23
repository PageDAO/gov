import React from 'react';

function CreateProposal({ send }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create Proposal</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input type="text" id="title" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea id="description" rows="4" className="w-full p-2 border rounded"></textarea>
        </div>
        <div className="space-x-2">
          <button type="button" onClick={() => send('SUBMIT')} className="btn btn-green">Submit</button>
          <button type="button" onClick={() => send('CANCEL')} className="btn btn-red">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProposal;
