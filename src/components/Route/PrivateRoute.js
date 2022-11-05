import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";

function PrivateRoute({ component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
}
PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};
export default PrivateRoute;
