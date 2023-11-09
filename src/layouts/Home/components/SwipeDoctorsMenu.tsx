import { FetchSingleDoctor } from "./FetchSingleDoctor";

export const SwipeDoctorsMenu = () => {
  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Best General Surgeon</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
                d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              <FetchSingleDoctor />
              <FetchSingleDoctor />
              <FetchSingleDoctor />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              <FetchSingleDoctor />
            </div>
          </div>
          <div className="carousel-item">
            <div className="carousel-item active">
              <div className="row d-flex justify-content-center align-items-center">
                <FetchSingleDoctor />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <FetchSingleDoctor />
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <a className="btn btn-outline-secondary btn-lg" href="#">
          View More
        </a>
      </div>
    </div>
  );
};
