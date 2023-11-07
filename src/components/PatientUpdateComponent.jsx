import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatient, updatePatient } from "../services/PatientService";

function PatientUpdateComponent() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  //React hook which will be used to render the page
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
  });

  useEffect(() => {
    const retrievePatient = async () => {
      try {
        //Calling the Backend api to load the data to the page based on id value
        const response = await getPatient(patientId);
        const patientInfo = response.data;
        setPatient({
          patientId: patientId,
          firstName: patientInfo.firstName,
          lastName: patientInfo.lastName,
          gender: patientInfo.gender,
          age: patientInfo.age,
        });
      } catch (error) {
        console.error(error);
      }
    };

    retrievePatient();
  }, [patientId]);

  const updatePatientInfo = async (e) => {
    e.preventDefault();
    console.log(patient);

    //Calling API to send the data to BackEnd to perform update operation
    await updatePatient(patient, patientId);
    navigate("/patient-lists");
  };

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

  const close = () => {
    navigate("/patient-lists");
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Update Patient</h3>
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

                <button className="btn btn-success" onClick={updatePatientInfo}>
                  Update
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

export default PatientUpdateComponent;
