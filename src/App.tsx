import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavBarFooter/Navbar";
import { Footer } from "./layouts/NavBarFooter/Footer";
import { HomePage } from "./layouts/Home/HomePage";
import { DoctorsFindPage } from "./layouts/DoctorsFindPage/DoctorsFindPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { DoctorInfoPage } from "./layouts/DoctorInfoPage/DoctorInfoPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import LogInWidget from "./Auth/LogInWidget";
import { AllReviews } from "./layouts/DoctorInfoPage/AllReviewPage/AllReviews";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    history.push("/login");
  };

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/find-doctors">
              <DoctorsFindPage />
            </Route>
            <Route path="/all-reviews/:bookId">
              <AllReviews />
            </Route>
            <Route path="/info-doctor/:bookId">
              <DoctorInfoPage />
            </Route>
            <Route
              path="/login"
              render={() => <LogInWidget config={oktaConfig} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};
