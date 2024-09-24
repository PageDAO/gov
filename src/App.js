import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CommunityActionsWidget from './components/Governance/CommunityActionsWidget.jsx';
import CreativeTeams from './components/CreativeTeams.jsx';
import ReadingClubs from './components/ReadingClubs.jsx';
import Governance from './components/Governance.jsx';
import DevelopmentTeams from './components/DevelopmentTeams.jsx';
import { CharmverseProvider } from './contexts/CharmverseContext';
import TestCharmverseIntegration from './components/TestCharmverseIntegration';
function App() {
  return (
    <CharmverseProvider>
      <Router>
        <div className="container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" component={CommunityActionsWidget} />
            <Route path="/creative-teams" component={CreativeTeams} />
            <Route path="/reading-clubs" component={ReadingClubs} />
            <Route path="/governance" component={Governance} />
            <Route path="/development-teams" component={DevelopmentTeams} />
            <Route path="/test-charmverse" component={TestCharmverseIntegration} />

          </Switch>
        </div>
      </Router>
    </CharmverseProvider>
  );
}
export default App;