import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import AppointmentResponse from "../../../models/AppointmentResponse";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { Link } from "react-router-dom";
import { AppointmentsModal } from "./AppointmentsModal";

export const Appointments = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  // Current Appointments
  const [currentAppointments, setCurrentAppointments] = useState<
    AppointmentResponse[]
  >([]);
  const [isLoadingUserAppointments, setIsLoadingUserAppointments] =
    useState(true);
  const [appointment, setAppointment] = useState(false);

  useEffect(() => {
    const retrieveUserCurrentAppointments = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/doctors/secure/currentappointments`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const currentAppointmentsResponse = await fetch(url, requestOptions);

        if (!currentAppointmentsResponse.ok) {
          throw new Error("Error occurred");
        }
        const currentAppointmentsResponseJson =
          await currentAppointmentsResponse.json();
        setCurrentAppointments(currentAppointmentsResponseJson);
      }
      setIsLoadingUserAppointments(false);
    };
    retrieveUserCurrentAppointments().catch((error: any) => {
      setIsLoadingUserAppointments(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState, appointment]);

  if (isLoadingUserAppointments) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function cancelDoctor(doctorId: number) {
    const url = `${process.env.REACT_APP_API}/doctors/secure/cancel?doctorId=${doctorId}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const cancelResponse = await fetch(url, requestOptions);
    if (!cancelResponse.ok) {
      throw new Error("Error occurred");
    }
    setAppointment(!appointment);
  }

  async function rescheduleAppointment(doctorId: number) {
    const url = `${process.env.REACT_APP_API}/doctors/secure/reschedule/appointment?doctorId=${doctorId}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const rescheduleResponse = await fetch(url, requestOptions);
    if (!rescheduleResponse.ok) {
      throw new Error("Error occurred");
    }
    setAppointment(!appointment);
  }

  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-lg-block mt-2">
        {currentAppointments.length > 0 ? (
          <>
            <h5>PRESENT APPOINTMENTS: </h5>

            {currentAppointments.map((currentAppointment) => (
              <div key={currentAppointment.doctor.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {currentAppointment.doctor?.img ? (
                      <img
                        src={currentAppointment.doctor?.img}
                        width="226"
                        height="349"
                        alt="Doctor"
                      />
                    ) : (
                      <img
                        src={require("./../../../img/doctor_img/doctor1.png")}
                        width="226"
                        height="349"
                        alt="Doctor"
                      />
                    )}
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Actions</h4>
                        {currentAppointment.daysLeft > 0 && (
                          <p className="text-secondary">
                            Appointment will expire after{" "}
                            {currentAppointment.daysLeft} days
                          </p>
                        )}
                        {currentAppointment.daysLeft === 0 && (
                          <p className="text-success">
                            Appointmet will expire today
                          </p>
                        )}
                        {currentAppointment.daysLeft < 0 && (
                          <p className="text-danger">
                            Appointment expired{" "}
                            {currentAppointment.daysLeft * -1} days ago
                          </p>
                        )}
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${currentAppointment.doctor.id}`}
                          >
                            Manage Appointment
                          </button>
                          <Link
                            to={"find-doctors"}
                            className="list-group-item list-group-item-action"
                          >
                            Find other Doctors?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">Help us by Giving Review.</p>
                      <Link
                        className="btn btn-primary"
                        to={`/info-doctor/${currentAppointment.doctor.id}`}
                      >
                        Give Review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <AppointmentsModal
                  appointmentResponse={currentAppointment}
                  mobile={false}
                  cancelDoctor={cancelDoctor}
                  rescheduleAppointment={rescheduleAppointment}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">No Appointments Booked.</h3>
            <Link className="btn btn-primary" to={`find-doctors`}>
              Find New Doctors?
            </Link>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="container d-lg-none mt-2">
        {currentAppointments.length > 0 ? (
          <>
            <h5 className="mb-3">PRESENT APPOINTMENTS: </h5>

            {currentAppointments.map((currentAppointment) => (
              <div key={currentAppointment.doctor.id}>
                <div className="d-flex justify-content-center align-items-center">
                  {currentAppointment.doctor?.img ? (
                    <img
                      src={currentAppointment.doctor?.img}
                      width="226"
                      height="349"
                      alt="Doctor"
                    />
                  ) : (
                    <img
                      src={require("./../../../img/doctor_img/doctor1.png")}
                      width="226"
                      height="349"
                      alt="Doctor"
                    />
                  )}
                </div>
                <div className="card d-flex mt-5 mb-3">
                  <div className="card-body container">
                    <div className="mt-3">
                      <h4>Appointment Actions</h4>
                      {currentAppointment.daysLeft > 0 && (
                        <p className="text-secondary">
                          Appointment will expire after{" "}
                          {currentAppointment.daysLeft} days
                        </p>
                      )}
                      {currentAppointment.daysLeft === 0 && (
                        <p className="text-success">
                          Appointmet will expire today
                        </p>
                      )}
                      {currentAppointment.daysLeft < 0 && (
                        <p className="text-danger">
                          Appointment expired {currentAppointment.daysLeft * -1}{" "}
                          days ago
                        </p>
                      )}
                      <div className="list-group mt-3">
                        <button
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                          data-bs-toggle="modal"
                          data-bs-target={`#mobilemodal${currentAppointment.doctor.id}`}
                        >
                          Manage Appointment
                        </button>
                        <Link
                          to={"find-doctors"}
                          className="list-group-item list-group-item-action"
                        >
                          Find other Doctors?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className="mt-3">Help us by Giving Review.</p>
                    <Link
                      className="btn btn-primary"
                      to={`/info-doctor/${currentAppointment.doctor.id}`}
                    >
                      Give Review
                    </Link>
                  </div>
                </div>

                <hr />
                <AppointmentsModal
                  appointmentResponse={currentAppointment}
                  mobile={true}
                  cancelDoctor={cancelDoctor}
                  rescheduleAppointment={rescheduleAppointment}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">No Appointments Booked</h3>
            <Link className="btn btn-primary" to={`find-doctors`}>
              Find New Doctors?
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
