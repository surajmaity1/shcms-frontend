import "./App.css";
import PatientListComponent from "./components/PatientListComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientRegistrationComponent from "./components/PatientRegistrationComponent";
import PatientUpdateComponent from "./components/PatientUpdateComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<PatientListComponent />} />
            <Route path="/patient-lists" element={<PatientListComponent />} />
            <Route
              path="/register-patient"
              element={<PatientRegistrationComponent />}
            />
            <Route
              path="/update-patient/:patientId"
              element={<PatientUpdateComponent />}
            />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
