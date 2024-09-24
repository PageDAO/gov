import { createMachine, assign } from 'xstate';
import { useApi } from './services/api';

export const createGovernanceMachine = () => {
  const { fetchProposals, fetchProposalDetails, submitVote, createProposal } = useApi();

  return createMachine({
    id: 'governance',
    initial: 'idle',
    context: {
      proposals: [],
      selectedProposal: null,
      error: null,
    },
    states: {
      idle: {
        on: {
          VIEW_PROPOSALS: 'viewingProposals',
          CREATE_PROPOSAL: 'creatingProposal',
        },
      },
      viewingProposals: {
        invoke: {
          src: 'fetchProposals',
          onDone: {
            target: 'viewingProposals',
            actions: assign({ proposals: (_, event) => event.data }),
          },
          onError: {
            target: 'viewingProposals',
            actions: assign({ error: (_, event) => event.data }),
          },
        },
        on: {
          SELECT_PROPOSAL: 'viewingProposalDetails',
          BACK: 'idle',
        },
      },
      viewingProposalDetails: {
        invoke: {
          src: 'fetchProposalDetails',
          onDone: {
            target: 'viewingProposalDetails',
            actions: assign({ selectedProposal: (_, event) => event.data }),
          },
          onError: {
            target: 'viewingProposalDetails',
            actions: assign({ error: (_, event) => event.data }),
          },
        },
        on: {
          VOTE: 'voting',
          BACK: 'viewingProposals',
        },
      },
      voting: {
        invoke: {
          src: 'submitVote',
          onDone: 'viewingProposalDetails',
          onError: {
            target: 'voting',
            actions: assign({ error: (_, event) => event.data }),
          },
        },
        on: {
          CANCEL: 'viewingProposalDetails',
        },
      },
      creatingProposal: {
        invoke: {
          src: 'createProposal',
          onDone: 'idle',
          onError: {
            target: 'creatingProposal',
            actions: assign({ error: (_, event) => event.data }),
          },
        },
        on: {
          CANCEL: 'idle',
        },
      },
    },
  }, {
    services: {
      fetchProposals,
      fetchProposalDetails: (context, event) => fetchProposalDetails(event.proposalId),
      submitVote: (context, event) => submitVote(event.proposalId, event.vote),
      createProposal: (context, event) => createProposal(event.proposalData),
    },
  });
};
