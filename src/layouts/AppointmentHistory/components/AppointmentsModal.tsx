import AppointmentResponse from "../../../models/AppointmentResponse";

export const AppointmentsModal: React.FC<{
  appointmentResponse: AppointmentResponse;
  mobile: boolean;
  cancelDoctor: any;
  rescheduleAppointment: any;
}> = (props) => {
  return (
    <div
      className="modal fade"
      id={
        props.mobile
          ? `mobilemodal${props.appointmentResponse.doctor.id}`
          : `modal${props.appointmentResponse.doctor.id}`
      }
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      key={props.appointmentResponse.doctor.id}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Appointment Actions
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="mt-3">
                <div className="row">
                  <div className="col-2">
                    {props.appointmentResponse.doctor?.img ? (
                      <img
                        src={props.appointmentResponse.doctor?.img}
                        width="56"
                        height="87"
                        alt="Doctor"
                      />
                    ) : (
                      <img
                        src={require("./../../../img/doctor_img/doctor1.png")}
                        width="56"
                        height="87"
                        alt="Doctor"
                      />
                    )}
                  </div>
                  <div className="col-10">
                    <h6>{props.appointmentResponse.doctor.dept}</h6>
                    <h4>
                      {props.appointmentResponse.doctor.firstName +
                        " " +
                        props.appointmentResponse.doctor.lastName}
                    </h4>
                  </div>
                </div>
                <hr />
                {props.appointmentResponse.daysLeft > 0 && (
                  <p className="text-secondary">
                    Appointment will expire after{" "}
                    {props.appointmentResponse.daysLeft} days
                  </p>
                )}
                {props.appointmentResponse.daysLeft === 0 && (
                  <p className="text-success">Appointmet will expire today</p>
                )}
                {props.appointmentResponse.daysLeft < 0 && (
                  <p className="text-danger">
                    Appointment expired{" "}
                    {props.appointmentResponse.daysLeft * -1} days ago
                  </p>
                )}
                <div className="list-group mt-3">
                  <button
                    onClick={() =>
                      props.cancelDoctor(props.appointmentResponse.doctor.id)
                    }
                    data-bs-dismiss="modal"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    Cancel Appointment
                  </button>
                  <button
                    onClick={
                      props.appointmentResponse.daysLeft < 0
                        ? (event) => event.preventDefault()
                        : () =>
                            props.rescheduleAppointment(
                              props.appointmentResponse.doctor.id
                            )
                    }
                    data-bs-dismiss="modal"
                    className={
                      props.appointmentResponse.daysLeft < 0
                        ? "list-group-item list-group-item-action inactiveLink"
                        : "list-group-item list-group-item-action"
                    }
                  >
                    {props.appointmentResponse.daysLeft < 0
                      ? "Appointment Cancelled. Can't Reschedule."
                      : "Reschedule Appointment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
