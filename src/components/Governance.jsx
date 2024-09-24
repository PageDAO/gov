import React, { useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { createGovernanceMachine } from '../governanceMachine';
import CreateProposal from './CreateProposal';
import ProposalDetails from './ProposalDetails';
import VotingForm from './VotingForm';

const Governance = () => {
  const [state, send] = useMachine(createGovernanceMachine());
  const [activeTab, setActiveTab] = useState('overview');
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await fetch('/api/proposals');
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  const renderContent = () => {
    switch (state.value) {
      case 'creatingProposal':
        return <CreateProposal send={send} />;
      case 'viewingProposalDetails':
        return <ProposalDetails send={send} />;
      case 'voting':
        return <VotingForm send={send} />;
      default:
        return (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-2">What is Governance?</h2>
                  <p>Governance is the process by which we, as a community, make decisions about the future of PageDAO. It allows all members to have a say in important matters such as budget allocation, new initiatives, and changes to our rules.</p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
                  <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Propose:</strong> Any member can create a proposal for a change or new initiative.</li>
                    <li><strong>Discuss:</strong> The community discusses the proposal, asking questions and suggesting improvements.</li>
                    <li><strong>Vote:</strong> After discussion, members vote on whether to accept or reject the proposal.</li>
                    <li><strong>Implement:</strong> If a proposal passes, it's implemented by the community.</li>
                  </ol>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-2">Your Voting Power</h2>
                  <p>Your voting power is determined by the amount of $PAGE tokens you have staked. The more tokens you stake, the more influence you have in the voting process.</p>
                </section>
              </div>
            )}
            {activeTab === 'proposals' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Active Proposals</h2>
                <ul className="space-y-4">
                  {proposals.map((proposal) => (
                    <li key={proposal.id} className="border rounded-lg p-4">
                      <h3 className="text-xl font-medium">{proposal.title}</h3>
                      <p className="text-gray-600">Status: {proposal.status}</p>
                      <p className="text-gray-600">Voting ends: {proposal.votingEnds}</p>
                      <button
                        onClick={() => send('SELECT_PROPOSAL', { proposalId: proposal.id })}
                        className="text-blue-500 hover:underline"
                      >
                        View Details and Vote
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => send('CREATE_PROPOSAL')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Create New Proposal
                  </button>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Governance</h1>
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'proposals' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('proposals')}
          >
            Proposals
          </button>
        </nav>
      </div>
      {renderContent()}
    </div>
  );
};

export default Governance;
