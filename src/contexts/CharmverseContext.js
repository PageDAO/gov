import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchProposals, createProposal, updateProposal } from '../services/charmverseApi';

const CharmverseContext = createContext();

export const CharmverseProvider = ({ children }) => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshProposals = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProposals = await fetchProposals();
      setProposals(fetchedProposals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProposal = async (proposalData) => {
    setLoading(true);
    setError(null);
    try {
      const newProposal = await createProposal(proposalData);
      setProposals([...proposals, newProposal]);
      return newProposal;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProposalById = async (id, updateData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProposal = await updateProposal(id, updateData);
      setProposals(proposals.map(p => p.id === id ? updatedProposal : p));
      return updatedProposal;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProposals();
  }, []);

  return (
    <CharmverseContext.Provider value={{
      proposals,
      loading,
      error,
      refreshProposals,
      addProposal,
      updateProposalById
    }}>
      {children}
    </CharmverseContext.Provider>
  );
};

export const useCharmverse = () => useContext(CharmverseContext);
