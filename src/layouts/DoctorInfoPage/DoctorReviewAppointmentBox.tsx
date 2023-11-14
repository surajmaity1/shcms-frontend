import { Link } from "react-router-dom";
import DoctorModel from "../../models/DoctorModel";

export const DoctorReviewAppointmentBox: React.FC<{
  doctor: DoctorModel | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>0/20 </b>
            appointments booked.
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
        <Link to="/#" className="btn btn-success btn-lg">
          Log In
        </Link>
        <hr />
        <p className="mt-3">
          Results may differ untill appointment completion. Hurry up to book
          your appointment.
        </p>
        <p>Complete appointment to leave a review.</p>
      </div>
    </div>
  );
};
