import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import QueryModel from "../../../models/QueryModel";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import AdminQueryRequest from "../../../models/AdminQueryRequest";
import { Pagination } from "../../utils/Pagination";
import { AdminQuery } from "./AdminQuery";

export const AdminQueries = () => {
  const { authState } = useOktaAuth();

  const [isLoadingQueries, setIsLoadingQueries] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Queries endpoint State
  const [queries, setQueries] = useState<QueryModel[]>([]);
  const [queriesPerPage] = useState(5);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Recall useEffect
  const [responseBtnSubmit, setResponseBtnSubmit] = useState(false);

  useEffect(() => {
    const retrieveUserQueries = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${
          process.env.REACT_APP_API
        }/queries/search/findByClosed?closed=false&page=${
          currentPage - 1
        }&size=${queriesPerPage}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const queryResponse = await fetch(url, requestOptions);
        if (!queryResponse.ok) {
          throw new Error("Error Occurred");
        }
        const queryResponseJson = await queryResponse.json();

        setQueries(queryResponseJson._embedded.queries);
        setTotalPages(queryResponseJson.page.totalPages);
      }
      setIsLoadingQueries(false);
    };
    retrieveUserQueries().catch((error: any) => {
      setIsLoadingQueries(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState, currentPage, responseBtnSubmit]);

  if (isLoadingQueries) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function submitResponseToQueries(id: number, response: string) {
    const url = `${process.env.REACT_APP_API}/queries/secure/admin/query`;
    if (
      authState &&
      authState?.isAuthenticated &&
      id !== null &&
      response !== ""
    ) {
      const adminQueryRequest: AdminQueryRequest = new AdminQueryRequest(
        id,
        response
      );
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminQueryRequest),
      };

      const adminQueryRequestModelResponse = await fetch(url, requestOptions);
      if (!adminQueryRequestModelResponse.ok) {
        throw new Error("Error Occurred");
      }
      setResponseBtnSubmit(!responseBtnSubmit);
    }
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-3">
      {queries.length > 0 ? (
        <>
          <h5>Pending QUERIES: </h5>
          {queries.map((query) => (
            <AdminQuery
              queryModel={query}
              key={query.id}
              submitResponseToQuery={submitResponseToQueries}
            />
          ))}
        </>
      ) : (
        <h5>NO Pending QUERIES</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
