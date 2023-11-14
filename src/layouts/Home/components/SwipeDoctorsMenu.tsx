import { FetchSingleDoctor } from "./FetchSingleDoctor";
import { useEffect, useState } from "react";
import DoctorModel from "../../../models/DoctorModel";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { Link } from "react-router-dom";

export const SwipeDoctorsMenu = () => {
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const retrieveDoctors = async () => {
      const baseUrl: string = "http://localhost:8080/shcms/doctors";
      const url: string = `${baseUrl}?page=0&size=9`;
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

    retrieveDoctors().catch((error: any) => {
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
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Best General Surgeon</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
                d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {doctors.slice(0, 3).map((doctor) => (
                <FetchSingleDoctor doctor={doctor} key={doctor.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {doctors.slice(3, 6).map((doctor) => (
                <FetchSingleDoctor doctor={doctor} key={doctor.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="carousel-item active">
              <div className="row d-flex justify-content-center align-items-center">
                {doctors.slice(6, 9).map((doctor) => (
                  <FetchSingleDoctor doctor={doctor} key={doctor.id} />
                ))}
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <FetchSingleDoctor doctor={doctors[0]} key={doctors[0].id} />
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <Link className="btn btn-outline-secondary btn-lg" to="/find-doctors">
          Find More
        </Link>
      </div>
    </div>
  );
};
