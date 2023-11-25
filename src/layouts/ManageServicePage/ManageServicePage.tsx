import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AdminQueries } from "./components/AdminQueries";
import { RegisterNewDoctor } from "./components/RegisterNewDoctor";

export const ManageServicePage = () => {
  const { authState } = useOktaAuth();

  const [changeNumberOfDoctorsClick, setChangeNumberOfDoctorsClick] =
    useState(false);
  const [queriesClick, setQueriesClick] = useState(false);

  function addDoctorClickFunction() {
    setChangeNumberOfDoctorsClick(false);
    setQueriesClick(false);
  }

  function changeNumberOfDoctorsClickFunction() {
    setChangeNumberOfDoctorsClick(true);
    setQueriesClick(false);
  }

  function queriesClickFunction() {
    setChangeNumberOfDoctorsClick(false);
    setQueriesClick(true);
  }

  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container">
      <div className="mt-5">
        <h3>Manage Service</h3>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={addDoctorClickFunction}
              className="nav-link active"
              id="nav-add-book-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-add-book"
              type="button"
              role="tab"
              aria-controls="nav-add-book"
              aria-selected="false"
            >
              Add New Doctor
            </button>
            <button
              onClick={changeNumberOfDoctorsClickFunction}
              className="nav-link"
              id="nav-quantity-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-quantity"
              type="button"
              role="tab"
              aria-controls="nav-quantity"
              aria-selected="true"
            >
              Change Availability
            </button>
            <button
              onClick={queriesClickFunction}
              className="nav-link"
              id="nav-messages-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-messages"
              type="button"
              role="tab"
              aria-controls="nav-messages"
              aria-selected="false"
            >
              Queries
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-add-book"
            role="tabpanel"
            aria-labelledby="nav-add-book-tab"
          >
            <RegisterNewDoctor />
          </div>
          <div
            className="tab-pane fade"
            id="nav-quantity"
            role="tabpanel"
            aria-labelledby="nav-quantity-tab"
          >
            {changeNumberOfDoctorsClick ? <p>Change Availability</p> : <></>}
          </div>
          <div
            className="tab-pane fade"
            id="nav-messages"
            role="tabpanel"
            aria-labelledby="nav-messages-tab"
          >
            {queriesClick ? <AdminQueries /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
