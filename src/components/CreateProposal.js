import React, { useState, useContext } from 'react';
import { CharmverseContext } from '../contexts/CharmverseContext';

function CreateProposal({ send }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createProposal } = useContext(CharmverseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProposal({ title, description });
      send('SUBMIT_PROPOSAL');
    } catch (error) {
      console.error('Failed to create proposal:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create Proposal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="space-x-2">
          <button type="submit" className="btn btn-green">Submit</button>
          <button type="button" onClick={() => send('CANCEL')} className="btn btn-red">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProposal;