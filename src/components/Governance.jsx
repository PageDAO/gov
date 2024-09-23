import React, { useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { governanceMachine } from '../governanceMachine';
import CreateProposal from './CreateProposal';
import ProposalDetails from './ProposalDetails';
import VotingForm from './VotingForm';

const Governance = () => {
  const [state, send] = useMachine(governanceMachine);
  const [activeTab, setActiveTab] = useState('overview');
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    setProposals([
      { id: 1, title: 'Increase Book Publishing Budget', status: 'Active', votingEnds: '3 days' },
      { id: 2, title: 'New Community Event Series', status: 'Active', votingEnds: '5 days' },
      { id: 3, title: 'Update DAO Constitution', status: 'Passed', votingEnds: 'Ended' },
    ]);
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
                {/* Existing overview content */}
              </div>
            )}
            {activeTab === 'proposals' && (
              <div>
                {/* Existing proposals content */}
              </div>
            )}
            {activeTab === 'voting' && (
              <div>
                {/* Existing voting content */}
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
          {/* Existing navigation buttons */}
        </nav>
      </div>
      {renderContent()}
    </div>
  );
};

export default Governance;
