import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppointmentHistoryModel from "../../../models/AppointmentHistoryModel";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { Pagination } from "../../utils/Pagination";

export const AppointmentHistoryPage = () => {
  const { authState } = useOktaAuth();
  const [isLoadingAppointmentHistory, setIsLoadingAppointmentHistory] =
    useState(true);
  const [httpError, setHttpError] = useState(null);

  // Histories
  const [appointmentHistories, setAppointmentHistories] = useState<
    AppointmentHistoryModel[]
  >([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const retrieveUserAppointmentHistory = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${
          process.env.REACT_APP_API
        }/appointmentHistories/search/findDoctorsByUserEmail?userEmail=${
          authState.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=5`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const appointmentHistoryResponse = await fetch(url, requestOptions);
        if (!appointmentHistoryResponse.ok) {
          throw new Error("Error occurred");
        }
        const appointmentHistoryResponseJson =
          await appointmentHistoryResponse.json();

        console.log(appointmentHistoryResponseJson);
        setAppointmentHistories(
          appointmentHistoryResponseJson._embedded.appointmentHistories
        );
        setTotalPages(appointmentHistoryResponseJson.page.totalPages);
      }
      setIsLoadingAppointmentHistory(false);
    };
    retrieveUserAppointmentHistory().catch((error: any) => {
      setIsLoadingAppointmentHistory(false);
      setHttpError(error.message);
    });
  }, [authState, currentPage]);

  if (isLoadingAppointmentHistory) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {appointmentHistories.length > 0 ? (
        <>
          <h5>Recent Appointment History:</h5>

          {appointmentHistories.map((appointmentHistory) => (
            <div key={appointmentHistory.id}>
              <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-none d-lg-block">
                      {appointmentHistory.img ? (
                        <img
                          src={appointmentHistory.img}
                          width="123"
                          height="196"
                          alt="Doctor"
                        />
                      ) : (
                        <img
                          src={require("./../../../img/doctor_img/doctor1.png")}
                          width="123"
                          height="196"
                          alt="Default"
                        />
                      )}
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                      {appointmentHistory.img ? (
                        <img
                          src={appointmentHistory.img}
                          width="123"
                          height="196"
                          alt="Doctor"
                        />
                      ) : (
                        <img
                          src={require("./../../../img/doctor_img/doctor1.png")}
                          width="123"
                          height="196"
                          alt="Default"
                        />
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title">
                        {" "}
                        {appointmentHistory.firstName +
                          " " +
                          appointmentHistory.lastName}{" "}
                      </h5>
                      <h4>{appointmentHistory.role}</h4>
                      <p className="card-text">{appointmentHistory.role}</p>
                      <hr />
                      <p className="card-text">
                        {" "}
                        Booked Date: {appointmentHistory.appointmentDate}
                      </p>
                      <p className="card-text">
                        {" "}
                        Cancelled Date: {appointmentHistory.cancelDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      ) : (
        <>
          <h3 className="mt-3">No Appointment History Available </h3>
          <Link className="btn btn-primary" to={"find-doctor"}>
            Find Other Doctors
          </Link>
        </>
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
