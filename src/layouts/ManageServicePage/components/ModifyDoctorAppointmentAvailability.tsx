import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import DoctorModel from "../../../models/DoctorModel";

export const ModifyDoctorAppointmentAvailability: React.FC<{
  doctor: DoctorModel;
  removeDoctor: any;
}> = (props, key) => {
  const { authState } = useOktaAuth();
  const [totalAppointment, setTotalAppointment] = useState<number>(0);
  const [availability, setAvailability] = useState<number>(0);

  useEffect(() => {
    const retrieveDoctorInState = () => {
      props.doctor.appointments
        ? setTotalAppointment(props.doctor.appointments)
        : setTotalAppointment(0);
      props.doctor.appointmentsAvailable
        ? setAvailability(props.doctor.appointmentsAvailable)
        : setAvailability(0);
    };
    retrieveDoctorInState();
  }, []);

  async function addMoreDoctorAppointmentAvailability() {
    const url = `${process.env.REACT_APP_API}/admin/secure/addmore/doctor/availability?doctorId=${props.doctor?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const availabilityUpdateResponse = await fetch(url, requestOptions);
    if (!availabilityUpdateResponse.ok) {
      throw new Error("Error Occurred");
    }
    setTotalAppointment(totalAppointment + 1);
    setAvailability(availability + 1);
  }

  async function reduceDoctorAppointmentAvailability() {
    const url = `${process.env.REACT_APP_API}/admin/secure/reduce/doctor/availability?doctorId=${props.doctor?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const availabilityUpdateResponse = await fetch(url, requestOptions);
    if (!availabilityUpdateResponse.ok) {
      throw new Error("Error Occurred");
    }
    setTotalAppointment(totalAppointment - 1);
    setAvailability(availability - 1);
  }

  async function removeDoctor() {
    const url = `${process.env.REACT_APP_API}/admin/secure/remove/doctor?doctorId=${props.doctor?.id}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const removeDoctorResponse = await fetch(url, requestOptions);
    if (!removeDoctorResponse.ok) {
      throw new Error("Error Occurred");
    }
    props.removeDoctor();
  }

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {props.doctor.img ? (
              <img
                src={props.doctor.img}
                width="123"
                height="196"
                alt="Doctor"
              />
            ) : (
              <img
                src={require("./../../../img/doctor_img/doctor1.png")}
                width="123"
                height="196"
                alt="Doctor"
              />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.doctor.img ? (
              <img
                src={props.doctor.img}
                width="123"
                height="196"
                alt="Doctor"
              />
            ) : (
              <img
                src={require("./../../../img/doctor_img/doctor1.png")}
                width="123"
                height="196"
                alt="Doctor"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">
              {props.doctor.firstName + " " + props.doctor.lastName}
            </h5>
            <h4>{props.doctor.role}</h4>
            <p className="card-text"> {props.doctor.dept} </p>
          </div>
        </div>
        <div className="mt-3 col-md-4">
          <div className="d-flex justify-content-center algin-items-center">
            <p>
              Total Appointments: <b>{totalAppointment}</b>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Availability: <b>{availability}</b>
            </p>
          </div>
        </div>
        <div className="mt-3 col-md-1">
          <div className="d-flex justify-content-start">
            <button
              className="m-1 btn btn-md btn-danger"
              onClick={removeDoctor}
            >
              Remove
            </button>
          </div>
        </div>
        <button
          className="m1 btn btn-md main-color text-white"
          onClick={addMoreDoctorAppointmentAvailability}
        >
          Increase Availability
        </button>
        <button
          className="m1 btn btn-md btn-warning"
          onClick={reduceDoctorAppointmentAvailability}
        >
          Reduce Availability
        </button>
      </div>
    </div>
  );
};
