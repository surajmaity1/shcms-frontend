import { useEffect, useState } from "react";
import DoctorModel from "../../models/DoctorModel";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { DoctorFind } from "./components/DoctorFind";
import { Pagination } from "../utils/Pagination";

export const DoctorsFindPage = () => {
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [department, setDepartment] = useState("Doctor Department");

  useEffect(() => {
    const retrieveDoctor = async () => {
      const baseUrl: string = `${process.env.REACT_APP_API}/doctors`;

      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${doctorsPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error occurred");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.doctors;

      setTotalDoctors(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedDoctors: DoctorModel[] = [];

      for (const key in responseData) {
        loadedDoctors.push({
          id: responseData[key].id,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          role: responseData[key].role,
          appointments: responseData[key].appointments,
          appointmentsAvailable: responseData[key].appointmentsAvailable,
          dept: responseData[key].dept,
          img: responseData[key].img,
        });
      }

      setDoctors(loadedDoctors);
      setIsLoading(false);
    };

    retrieveDoctor().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByFirstNameContaining?firstName=${search}&page=<pageNumber>&size=${doctorsPerPage}`
      );
    }
    setDepartment("Doctor Department");
  };

  const departmentField = (dept: string) => {
    setCurrentPage(1);
    if (
      dept.toLowerCase() === "dept1" ||
      dept.toLowerCase() === "dept2" ||
      dept.toLowerCase() === "dept3" ||
      dept.toLowerCase() === "dept4"
    ) {
      setDepartment(dept);
      setSearchUrl(
        `/search/findByDept?dept=${dept}&page=<pageNumber>&size=${doctorsPerPage}`
      );
    } else {
      setDepartment("All");
      setSearchUrl(`?page=<pageNumber>&size=${doctorsPerPage}`);
    }
  };

  const indexOfLastDoctor: number = currentPage * doctorsPerPage;
  const indexOfFirstDoctor: number = indexOfLastDoctor - doctorsPerPage;
  let lastItem =
    doctorsPerPage * currentPage <= totalDoctors
      ? doctorsPerPage * currentPage
      : totalDoctors;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {department}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => departmentField("All")}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={() => departmentField("dept1")}>
                    <a className="dropdown-item" href="#">
                      Dept 1
                    </a>
                  </li>
                  <li onClick={() => departmentField("dept2")}>
                    <a className="dropdown-item" href="#">
                      Dept 2
                    </a>
                  </li>
                  <li onClick={() => departmentField("dept3")}>
                    <a className="dropdown-item" href="#">
                      Dept 3
                    </a>
                  </li>
                  <li onClick={() => departmentField("dept4")}>
                    <a className="dropdown-item" href="#">
                      Dept 4
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalDoctors > 0 ? (
            <>
              <div className="mt-3">
                <h5>Total Doctors: ({totalDoctors})</h5>
              </div>
              <p>
                {indexOfFirstDoctor + 1} to {lastItem} of {totalDoctors}{" "}
                doctors:
              </p>
              {doctors.map((doctor) => (
                <DoctorFind doctor={doctor} key={doctor.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3> Search Didn't match. Unable to find Doctor?</h3>
              <h5>Reach out to us</h5>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
              >
                Inform Hospital Services
              </a>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
