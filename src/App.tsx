import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavBarFooter/Navbar";
import { Footer } from "./layouts/NavBarFooter/Footer";
import { HomePage } from "./layouts/Home/HomePage";
import { DoctorsFindPage } from "./layouts/DoctorsFindPage/DoctorsFindPage";

export const App = () => {
  return (
    <div className="App">
      <Navbar />
      {/* <HomePage /> */}
      <DoctorsFindPage />
      <Footer />
    </div>
  );
};
