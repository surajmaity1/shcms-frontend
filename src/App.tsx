import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavBarFooter/Navbar";
import { Footer } from "./layouts/NavBarFooter/Footer";
import { HomePage } from "./layouts/Home/HomePage";
import { DoctorsFindPage } from "./layouts/DoctorsFindPage/DoctorsFindPage";
import { Redirect, Route, Switch } from "react-router-dom";
import { DoctorInfoPage } from "./layouts/DoctorInfoPage/DoctorInfoPage";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
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
          <Route path="/info-doctor/:bookId">
            <DoctorInfoPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
