import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import RegisterDoctor from "../../../models/RegisterDoctor";

export const RegisterNewDoctor = () => {
  const { authState } = useOktaAuth();

  // New Doctor
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [appointments, setAppointments] = useState(0);
  const [dept, setDept] = useState("Department");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Displays
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  function departmentField(value: string) {
    setDept(value);
  }

  async function base64ConversionForImages(e: any) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error", error);
    };
  }

  async function registerNewDoctor() {
    const url = `${process.env.REACT_APP_API}/admin/secure/register/doctor`;
    if (
      authState?.isAuthenticated &&
      firstName !== "" &&
      lastName !== "" &&
      dept !== "Department" &&
      role !== "" &&
      appointments >= 0
    ) {
      const doctor: RegisterDoctor = new RegisterDoctor(
        firstName,
        lastName,
        role,
        appointments,
        dept
      );
      doctor.img = selectedImage;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      };

      const registerNewDoctorResponse = await fetch(url, requestOptions);
      if (!registerNewDoctorResponse.ok) {
        throw new Error("Error Occurred");
      }
      setFirstName("");
      setLastName("");
      setRole("");
      setAppointments(0);
      setDept("Department");
      setSelectedImage(null);
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Doctor Registered
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          FILL ALL DETAILS
        </div>
      )}
      <div className="card">
        <div className="card-header">REGISTER DOCTOR</div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Department</label>
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {dept}
                </button>
                <ul
                  id="registerNewDoctorId"
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      onClick={() => departmentField("pharmacist")}
                      className="dropdown-item"
                    >
                      Pharmacist
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => departmentField("neurologist")}
                      className="dropdown-item"
                    >
                      Neurologist
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => departmentField("surgeon")}
                      className="dropdown-item"
                    >
                      Surgeon
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => departmentField("oncologist")}
                      className="dropdown-item"
                    >
                      Oncologist
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Role</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setRole(e.target.value)}
                value={role}
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Appointments</label>
              <input
                type="number"
                className="form-control"
                name="Appointments"
                required
                onChange={(e) => setAppointments(Number(e.target.value))}
                value={appointments}
              />
            </div>
            <input type="file" onChange={(e) => base64ConversionForImages(e)} />
            <div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={registerNewDoctor}
              >
                REGISTER DOCTOR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
