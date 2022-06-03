import {Navigate} from "react-router-dom";
import * as React from "react";
import useJwt from "../../Jwt"

export function RequireJwt({ children }) {
  const { jwt } = useJwt();

  return jwt !== null
      ? children
      : <Navigate to="Login" replace />;
}