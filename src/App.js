import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { CharmverseProvider } from './contexts/CharmverseContext';
import PrivateRoute from './components/PrivateRoute';
import CommunityActionsWidget from './components/Governance/CommunityActionsWidget';
import CreativeTeams from './components/CreativeTeams';
import ReadingClubs from './components/ReadingClubs';
import Governance from './components/Governance';
import DevelopmentTeams from './components/DevelopmentTeams';
import Login from './components/Auth/Login';

function App() {
  return (
    <CharmverseProvider>
      <Router>
        <div className="container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={CommunityActionsWidget} />
            <PrivateRoute path="/creative-teams" component={CreativeTeams} />
            <PrivateRoute path="/reading-clubs" component={ReadingClubs} />
            <PrivateRoute path="/governance" component={Governance} />
            <PrivateRoute path="/development-teams" component={DevelopmentTeams} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </CharmverseProvider>
  );
}

export default App;