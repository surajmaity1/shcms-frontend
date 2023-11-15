import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import OktaSignInWidget from "./OktaSignInWidget";
import { LoadingSpinner } from "../layouts/utils/LoadingSpinner";

const LogInWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("Sign in error: ", err);
  };

  if (!authState) {
    return <LoadingSpinner />;
  }

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LogInWidget;
