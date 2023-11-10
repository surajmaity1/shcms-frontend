import DoctorModel from "../../../models/DoctorModel";

export const DoctorFind: React.FC<{ doctor: DoctorModel }> = (props) => {
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
                src={require("../../../img/doctor_img/doctor1.png")}
                width="123"
                height="196"
                alt="Doctor"
              />
            )}
          </div>
          <div
            className="d-lg-none d-flex justify-content-center 
                        align-items-center"
          >
            {props.doctor.img ? (
              <img
                src={props.doctor.img}
                width="123"
                height="196"
                alt="Doctor"
              />
            ) : (
              <img
                src={require("../../../img/doctor_img/doctor1.png")}
                width="123"
                height="196"
                alt="Doctor"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.doctor.role}</h5>
            <h4>{props.doctor.firstName + " " + props.doctor.firstName}</h4>
            <p className="card-text">{props.doctor.dept}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <a className="btn btn-md main-color text-white" href="#">
            More Info
          </a>
        </div>
      </div>
    </div>
  );
};
