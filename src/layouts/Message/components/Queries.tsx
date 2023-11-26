import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import QueryModel from "../../../models/QueryModel";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { Pagination } from "../../utils/Pagination";

export const Queries = () => {
  const { authState } = useOktaAuth();
  const [isLoadingQueries, setIsLoadingQueries] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Queries
  const [queries, setQueries] = useState<QueryModel[]>([]);

  // Pagination
  const [queriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const retrieveUserQueries = async () => {
      if (authState && authState?.isAuthenticated) {
        const url = `${
          process.env.REACT_APP_API
        }/queries/search/findByUserEmail?userEmail=${
          authState?.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=${queriesPerPage}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const queriesResponse = await fetch(url, requestOptions);
        if (!queriesResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const mequeriesResponseJson = await queriesResponse.json();
        setQueries(mequeriesResponseJson._embedded.queries);
        setTotalPages(mequeriesResponseJson.page.totalPages);
      }
      setIsLoadingQueries(false);
    };
    retrieveUserQueries().catch((error: any) => {
      setIsLoadingQueries(false);
      setHttpError(error.messages);
    });
    window.scrollTo(0, 0);
  }, [authState, currentPage]);

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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {queries.length > 0 ? (
        <>
          <h5>PRESENT QUERIES: </h5>
          {queries.map((query) => (
            <div key={query.id}>
              <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>
                  Query #{query.id}: {query.query}
                </h5>
                <h6>{query.userEmail}</h6>
                <p>{query.description}</p>
                <hr />
                <div>
                  <h5>REPLY: </h5>
                  {query.response && query.adminEmail ? (
                    <>
                      <h6>{query.adminEmail} (admin)</h6>
                      <p>{query.response}</p>
                    </>
                  ) : (
                    <p>
                      <i>PENDING. HEALTH CARE SERVICE REPLY SOON.</i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h5>ALL QEURIES</h5>
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
