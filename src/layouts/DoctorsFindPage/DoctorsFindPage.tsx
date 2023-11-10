import { useEffect, useState } from "react";
import DoctorModel from "../../models/DoctorModel";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { DoctorFind } from "./components/DoctorFind";

export const DoctorsFindPage = () => {
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const retrieveDoctor = async () => {
      const baseUrl: string = "http://localhost:8080/shcms/doctors";
      const url: string = `${baseUrl}?page=0&size=5`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error occurred");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.doctors;
      const loadedDoctors: DoctorModel[] = [];

      for (const key in responseData) {
        loadedDoctors.push({
          id: responseData[key].id,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          role: responseData[key].role,
          appointments: responseData[key].appointments,
          appointmentsAvailable: responseData[key].appointmentsAvailable,
          dept: responseData[key].dept,
          img: responseData[key].img,
        });
      }

      setDoctors(loadedDoctors);
      setIsLoading(false);
    };

    retrieveDoctor().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Department
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dept 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dept 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dept 3
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dept 4
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Number of results: (22)</h5>
          </div>
          <p>1 to 5 of 22 items:</p>
          {doctors.map((doctor) => (
            <DoctorFind doctor={doctor} key={doctor.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
