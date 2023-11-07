import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../services/PatientService";

function PatientRegistrationComponent() {
  //React hook which will be used to render the page
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
  });

  const navigate = useNavigate();

  const changeFirstNameHandler = (event) => {
    setPatient({ ...patient, firstName: event.target.value });
  };

  const changeLastNameHandler = (event) => {
    setPatient({ ...patient, lastName: event.target.value });
  };

  const changeGenderHandler = (event) => {
    setPatient({ ...patient, gender: event.target.value });
  };

  const changeAgeHandler = (event) => {
    setPatient({ ...patient, age: event.target.value });
  };

  const registerOrUpdatePatient = (event) => {
    //Display the output values on the console to check whether it is coming or not
    event.preventDefault();
    console.log("patient => " + JSON.stringify(patient));

    //Actual code which will call the services from backend and re-direct to main page
    registerPatient(patient).then((res) => {
      navigate("/patient-lists"); // Use navigate
    });
  };

  const close = () => {
    navigate("/patient-lists");
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Register Patient</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={patient.firstName}
                    onChange={changeFirstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={patient.lastName}
                    onChange={changeLastNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Gender: </label>
                  <input
                    placeholder="Gender"
                    name="gender"
                    className="form-control"
                    value={patient.gender}
                    onChange={changeGenderHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Age: </label>
                  <input
                    placeholder="Age"
                    name="age"
                    className="form-control"
                    value={patient.age}
                    onChange={changeAgeHandler}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={registerOrUpdatePatient}
                >
                  Register
                </button>
                <button
                  className="btn btn-danger"
                  onClick={close}
                  style={{ marginLeft: "10px" }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientRegistrationComponent;
