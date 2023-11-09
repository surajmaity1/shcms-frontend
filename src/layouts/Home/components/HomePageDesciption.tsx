export const HomePageDescription = () => {
  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>How does this work?</h1>
              <p className="lead">
                Helping Our Patients And Their Families Get Back To What Matters
                Most.Consult Top Doctors By Speciality For Any Health
                Concern.Create your account to book appointment.
              </p>
              <a className="btn main-color btn-lg text-white" href="#">
                Registration
              </a>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div
            className="col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center"
          >
            <div className="ml-2">
              <h1>Health Advice From Top Doctors</h1>
              <p className="lead">
                Health Articles That Keep You Informed About Good Health
                Practices And Achieve Your Goals
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>How does this work?</h1>
              <p className="lead">
                Helping Our Patients And Their Families Get Back To What Matters
                Most.Consult Top Doctors By Speciality For Any Health
                Concern.Create your account to book appointment.
              </p>
              <a className="btn main-color btn-lg text-white" href="#">
                Registration
              </a>
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>Health Advice From Top Doctors</h1>
              <p className="lead">
                Health Articles That Keep You Informed About Good Health
                Practices And Achieve Your Goals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
