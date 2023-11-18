import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";
import { Review } from "../utils/Review";

export const ReviewsRecent: React.FC<{
  reviews: ReviewModel[];
  doctorId: number | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div className={props.mobile ? "mt-3" : "row mt-5"}>
      <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
        <h4>Recent Reviews: </h4>
      </div>
      <div className="col-sm-10 col-md-10">
        {props.reviews.length > 0 ? (
          <>
            {props.reviews.slice(0, 3).map((eachReview) => (
              <Review review={eachReview} key={eachReview.id}></Review>
            ))}

            <div className="m-3">
              <Link
                type="button"
                className="btn main-color btn-md text-white"
                to={`/all-reviews/${props.doctorId}`}
              >
                Read More
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">No review. </p>
          </div>
        )}
      </div>
    </div>
  );
};
