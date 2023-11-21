import { useState } from "react";
import { SendNewQuery } from "./components/SendNewQuery";
import { Queries } from "./components/Queries";

export const QueryPage = () => {
  const [queriesClick, setQueriesClick] = useState(false);

  return (
    <div className="container">
      <div className="mt-3 mb-2">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={() => setQueriesClick(false)}
              className="nav-link active"
              id="nav-send-message-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-send-message"
              type="button"
              role="tab"
              aria-controls="nav-send-message"
              aria-selected="true"
            >
              Ask Query
            </button>
            <button
              onClick={() => setQueriesClick(true)}
              className="nav-link"
              id="nav-message-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-message"
              type="button"
              role="tab"
              aria-controls="nav-message"
              aria-selected="false"
            >
              Queries Response
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-send-message"
            role="tabpanel"
            aria-labelledby="nav-send-message-tab"
          >
            <SendNewQuery />
          </div>
          <div
            className="tab-pane fade"
            id="nav-message"
            role="tabpanel"
            aria-labelledby="nav-message-tab"
          >
            {queriesClick ? <Queries /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
