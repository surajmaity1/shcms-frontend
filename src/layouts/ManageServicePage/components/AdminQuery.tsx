import { useState } from "react";
import QueryModel from "../../../models/QueryModel";

export const AdminQuery: React.FC<{
  queryModel: QueryModel;
  submitResponseToQuery: any;
}> = (props, key) => {
  const [displayWarning, setDisplayWarning] = useState(false);
  const [response, setResponse] = useState("");

  function submitBtn() {
    if (props.queryModel.id !== null && response !== "") {
      props.submitResponseToQuery(props.queryModel.id, response);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
    }
  }

  return (
    <div key={props.queryModel.id}>
      <div className="card mt-2 shadow p-3 bg-body rounded">
        <h5>
          Case #{props.queryModel.id}: {props.queryModel.query}
        </h5>
        <h6>{props.queryModel.userEmail}</h6>
        <p>{props.queryModel.description}</p>
        <hr />
        <div>
          <h5>Response: </h5>
          <form action="PUT">
            {displayWarning && (
              <div className="alert alert-danger" role="alert">
                FILL ALL THE DETAILS
              </div>
            )}
            <div className="col-md-12 mb-3">
              <label className="form-label"> Description </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setResponse(e.target.value)}
                value={response}
              ></textarea>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={submitBtn}
              >
                Send Response
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
