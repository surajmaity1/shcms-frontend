import { Link } from "react-router-dom";

export const ConsultBestDoctor = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div
        className="container-fluid py-5 text-white 
                d-flex justify-content-center align-items-center"
      >
        <div>
          <h1 className="display-5 fw-bold">Best Doctors Near You</h1>
          <p className="col-md-8 fs-4">book appointment right now</p>
          <Link
            type="button"
            className="btn main-color btn-lg text-white"
            to="/find-doctors"
          >
            Consult Best Doctors
          </Link>
        </div>
      </div>
    </div>
  );
};
