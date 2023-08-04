// src/components/PrivateRoute.tsx
import React, { Fragment } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.rootReducer.auth.isAuthenticated
  );
  const location = useLocation();
  return (
    <Fragment>
      {isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </Fragment>
  );
};

export default PrivateRoute;
