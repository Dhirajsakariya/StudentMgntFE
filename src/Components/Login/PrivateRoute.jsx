import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('loggedInRole') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/Login" />
      )
    }
  />
);

export default PrivateRoute;
