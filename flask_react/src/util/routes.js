import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import authService from "../services/auth.service";

/*
Wrapper with for routes only accessed by unauthenticated users
*/

function UnauthenticatedRoutesWrapper() {
  const user = authService.getCurrentUser();
  return user ? <Navigate to="/" /> : <Outlet />;
}

/*
Wrapper with for routes only accessed by authenticated users
*/

function ProtectedRoutesWrapper() {
  const user = authService.getCurrentUser();
  return !user ? <Navigate to="/login" /> : <Outlet />;
}

/*
Wrapper for route that redirects to either authPath or unAuthPath depending on whether user is authenticated
*/

function DynamicRedirect({ unAuthPath, authPath }) {
  const user = authService.getCurrentUser();
  return user ? <Navigate to={authPath} /> : <Navigate to={unAuthPath} />;
}

export {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
};
