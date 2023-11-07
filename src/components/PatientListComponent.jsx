import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPatient, deletePatient } from "../services/PatientService";

function PatientListComponent() {
  //patients <----setPatients()
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //Calling API From BackEnd to get the data of Patients
    getAllPatient().then((patient) => {
      //Inject data to patients varaible
      setPatients(patient.data);
    });
  }, []);

  const registerPatient = () => {
    navigate("/register-patient");
  };

  const updatePatient = (patientId) => {
    console.log("patientId: " + patientId);
    navigate(`/update-patient/${patientId}`);
  };

  const removePatient = (patientId) => {
    console.log("patientId: " + patientId);

    deletePatient(patientId).then((res) => {
      setPatients(
        patients.filter((patient) => patient.patientId !== patientId)
      );
    });
  };

  return (
    <div className="m-4">
      <h2 className="text-center">Patient List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={registerPatient}>
          Register Patient
        </button>
      </div>
      <br />
      <br />

      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Patient First Name</th>
              <th> Patient Last Name</th>
              <th> Patient Gender</th>
              <th> Patient Age</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId}>
                <td> {patient.firstName}</td>
                <td> {patient.lastName}</td>
                <td> {patient.gender}</td>
                <td> {patient.age}</td>

                <button
                  onClick={() => updatePatient(patient.patientId)}
                  className="btn btn-info"
                >
                  Update
                </button>
                <button
                  onClick={() => removePatient(patient.patientId)}
                  className="btn btn-danger ml-2"
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default PatientListComponent;
