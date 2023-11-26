import { useEffect, useState } from "react";
import DoctorModel from "../../../models/DoctorModel";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { Pagination } from "../../utils/Pagination";
import { ModifyDoctorAppointmentAvailability } from "./ModifyDoctorAppointmentAvailability";

export const ModifyDoctorsAppointmentAvailability = () => {
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [removeDoctor, setRemoveDoctor] = useState(false);

  useEffect(() => {
    const retrieveDoctor = async () => {
      const baseUrl: string = `${process.env.REACT_APP_API}/doctors?page=${
        currentPage - 1
      }&size=${doctorsPerPage}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Error occurred");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.doctors;

      setTotalDoctors(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

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
  }, [currentPage, removeDoctor]);

  const indexOfLastDoctor: number = currentPage * doctorsPerPage;
  const indexOfFirstDoctor: number = indexOfLastDoctor - doctorsPerPage;
  let lastItem =
    doctorsPerPage * currentPage <= totalDoctors
      ? doctorsPerPage * currentPage
      : totalDoctors;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const deregisterDoctor = () => setRemoveDoctor(!removeDoctor);

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
    <div className="container mt-5">
      {totalDoctors > 0 ? (
        <>
          <div className="mt-3">
            <h3>LIST OF DOCTORS({totalDoctors}): </h3>
          </div>
          <p>
            {indexOfFirstDoctor + 1} to {lastItem} of {totalDoctors} Doctors:
          </p>
          {doctors.map((doctor) => (
            <ModifyDoctorAppointmentAvailability
              doctor={doctor}
              key={doctor.id}
              removeDoctor={deregisterDoctor}
            />
          ))}
        </>
      ) : (
        <h5>TO CHANGE AVAILABILITY, PLEASE REGISTER DOCTOR</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
