// governanceMachine.js
import { createMachine, assign } from 'xstate';
import { fetchProposals, fetchProposalDetails, submitVote, createProposal } from './services/api';

export const governanceMachine = createMachine({
  id: 'governance',
  initial: 'idle',
  context: {
    proposals: [],
    currentProposal: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        VIEW_PROPOSALS: 'loadingProposals',
        CREATE_PROPOSAL: 'creatingProposal',
      },
    },
    loadingProposals: {
      invoke: {
        src: 'fetchProposals',
        onDone: {
          target: 'viewingProposals',
          actions: assign({ proposals: (_, event) => event.data }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (_, event) => event.data }),
        },
      },
    },
    viewingProposals: {
      on: {
        SELECT_PROPOSAL: 'loadingProposalDetails',
        REFRESH: 'loadingProposals',
        CREATE_PROPOSAL: 'creatingProposal',
      },
    },
    loadingProposalDetails: {
      invoke: {
        src: 'fetchProposalDetails',
        onDone: {
          target: 'viewingProposalDetails',
          actions: assign({ currentProposal: (_, event) => event.data }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (_, event) => event.data }),
        },
      },
    },
    viewingProposalDetails: {
      on: {
        VOTE: 'voting',
        BACK: 'viewingProposals',
      },
    },
    voting: {
      invoke: {
        src: 'submitVote',
        onDone: 'loadingProposalDetails',
        onError: {
          target: 'error',
          actions: assign({ error: (_, event) => event.data }),
        },
      },
    },
    creatingProposal: {
      on: {
        SUBMIT: 'submittingProposal',
        CANCEL: 'idle',
      },
    },
    submittingProposal: {
      invoke: {
        src: 'createProposal',
        onDone: 'loadingProposals',
        onError: {
          target: 'error',
          actions: assign({ error: (_, event) => event.data }),
        },
      },
    },
    error: {
      on: {
        RETRY: 'idle',
      },
    },
  },
}, {
  services: {
    fetchProposals,
    fetchProposalDetails: (context, event) => fetchProposalDetails(event.proposalId),
    submitVote: (context, event) => submitVote(event.proposalId, event.vote),
    createProposal,
  },
});