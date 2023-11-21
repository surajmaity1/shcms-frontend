import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import QueryModel from "../../../models/QueryModel";

export const SendNewQuery = () => {
  const { authState } = useOktaAuth();
  const [query, setQuery] = useState("");
  const [description, setDescription] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  async function submitNewQuery() {
    const url = `http://localhost:8080/shcms/queries/secure/send/query`;
    if (authState?.isAuthenticated && query !== "" && description !== "") {
      const queryRequestModel: QueryModel = new QueryModel(query, description);
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryRequestModel),
      };

      const submitNewQuestionResponse = await fetch(url, requestOptions);
      if (!submitNewQuestionResponse.ok) {
        throw new Error("Error Occurred");
      }

      setQuery("");
      setDescription("");
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="card mt-3">
      <div className="card-header">Ask Query to Health Care Service</div>
      <div className="card-body">
        <form method="POST">
          {displayWarning && (
            <div className="alert alert-danger" role="alert">
              FILL ALL THE DETAILS
            </div>
          )}
          {displaySuccess && (
            <div className="alert alert-success" role="alert">
              Queries sent just now.
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Query</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Query"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Describe Query</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              placeholder="Briefly Describe Query"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={submitNewQuery}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
