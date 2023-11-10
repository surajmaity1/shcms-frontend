import React from "react";
import DoctorModel from "../../../models/DoctorModel";

export const FetchSingleDoctor: React.FC<{ doctor: DoctorModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {props.doctor.img ? (
          <img src={props.doctor.img} width="151" height="233" alt="doctor" />
        ) : (
          <img
            src={require("./../../../img/doctor_img/doctor1.png")}
            width="151"
            height="233"
            alt="doctor"
          />
        )}
        <h6 className="mt-2">
          {props.doctor.firstName + " " + props.doctor.lastName}
        </h6>
        <p>{props.doctor.role}</p>
        <a className="btn main-color text-white" href="#">
          Book
        </a>
      </div>
    </div>
  );
};
