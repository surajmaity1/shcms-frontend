import { Link } from "react-router-dom";
import DoctorModel from "../../models/DoctorModel";
import { CreateReview } from "../utils/CreateReview";

export const DoctorReviewAppointmentBox: React.FC<{
  doctor: DoctorModel | undefined;
  mobile: boolean;
  currentAppointmentsCount: number;
  isAuthenticated: any;
  isAppointment: boolean;
  appointmentDoctor: any;
  isReviewGiven: boolean;
  submitReview: any;
}> = (props) => {
  function buttonAppointment() {
    if (props.isAuthenticated) {
      if (!props.isAppointment && props.currentAppointmentsCount < 3) {
        return (
          <button
            onClick={() => props.appointmentDoctor()}
            className="btn btn-success btn-lg"
          >
            Book Appointment
          </button>
        );
      } else if (props.isAppointment) {
        return (
          <p>
            <b>Appointment Accepted</b>
          </p>
        );
      } else if (!props.isAppointment) {
        return (
          <p className="text-danger">
            3 Appointments Allowed Per Day. <br />
            To Book New Appointments, Cancel Previous One.
          </p>
        );
      }
    }
    return (
      <Link to={"/login"} className="btn btn-success btn-lg">
        Log in
      </Link>
    );
  }

  function reviewRender() {
    if (props.isAuthenticated && !props.isReviewGiven) {
      return (
        <p>
          <CreateReview submitReview={props.submitReview} />
        </p>
      );
    } else if (props.isAuthenticated && props.isReviewGiven) {
      return (
        <p>
          <b>Thank you for Review Submission</b>
        </p>
      );
    }
    return (
      <div>
        <hr />
        <p>Complete Appointment to Give Review</p>
      </div>
    );
  }

  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{props.currentAppointmentsCount} / 3 </b>
            Appointments Booked
          </p>
          <hr />
          {props.doctor &&
          props.doctor.appointmentsAvailable &&
          props.doctor.appointmentsAvailable > 0 ? (
            <h4 className="text-success">Appointments Available</h4>
          ) : (
            <h4 className="text-danger">Waiting List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{props.doctor?.appointments} </b>
              booked
            </p>
            <p className="col-6 lead">
              <b>{props.doctor?.appointmentsAvailable} </b>
              available
            </p>
          </div>
        </div>
        {buttonAppointment()}
        <hr />
        <p className="mt-3">
          Results may differ untill appointment completion. Hurry up to book
          your appointment.
        </p>
        {reviewRender()}
      </div>
    </div>
  );
};
