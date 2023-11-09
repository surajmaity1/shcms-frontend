import React from "react";

export const FetchSingleDoctor = () => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img
          src={require("./../../../img/doctor_img/doctor1.png")}
          width="151"
          height="233"
          alt="doctor"
        />
        <h6 className="mt-2">Doctor</h6>
        <p>SHCMS</p>
        <a className="btn main-color text-white" href="#">
          Book
        </a>
      </div>
    </div>
  );
};
