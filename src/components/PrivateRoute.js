import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCharmverse } from '../contexts/CharmverseContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useCharmverse();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
