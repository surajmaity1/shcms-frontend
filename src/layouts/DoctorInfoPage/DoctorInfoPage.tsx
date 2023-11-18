import { useEffect, useState } from "react";
import DoctorModel from "../../models/DoctorModel";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { ReviewStar } from "../utils/ReviewStar";
import { DoctorReviewAppointmentBox } from "./DoctorReviewAppointmentBox";
import ReviewModel from "../../models/ReviewModel";
import { ReviewsRecent } from "./ReviewsRecent";
import { useOktaAuth } from "@okta/okta-react";

export const DoctorInfoPage = () => {
  const [doctor, setDoctor] = useState<DoctorModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const { authState } = useOktaAuth();

  // Appointment Count State
  const [currentAppointmentsCount, setCurrentAppointmentsCount] = useState(0);
  const [
    isLoadingCurrentAppointmentsCount,
    setIsLoadingCurrentAppointmentsCount,
  ] = useState(true);

  // check Doctor Appointment booked
  const [isAppointment, setIsAppointment] = useState(false);
  const [isLoadingDoctorAppointment, setIsLoadingDoctorAppointment] =
    useState(true);

  const doctorId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const retrieveDoctor = async () => {
      const baseUrl: string = `http://localhost:8080/shcms/doctors/${doctorId}`;
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Error occurred");
      }

      const responseJson = await response.json();
      const loadedDoctor: DoctorModel = {
        id: responseJson.id,
        firstName: responseJson.firstName,
        lastName: responseJson.lastName,
        role: responseJson.role,
        appointments: responseJson.appointments,
        appointmentsAvailable: responseJson.appointmentsAvailable,
        dept: responseJson.dept,
        img: responseJson.img,
      };

      setDoctor(loadedDoctor);
      setIsLoading(false);
    };

    retrieveDoctor().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isAppointment]);

  useEffect(() => {
    const retrieveDoctorReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/shcms/reviews/search/findByDoctorId?doctorId=${doctorId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Error occurred");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          doctorId: responseData[key].doctorId,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    retrieveDoctorReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const retrieveUserCurrentAppointmentsCount = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/shcms/doctors/secure/currentappointments/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const currentAppointmentCountResponse = await fetch(
          url,
          requestOptions
        );
        if (!currentAppointmentCountResponse.ok) {
          throw new Error("Error occurred!");
        }
        const currentAppointmentsCountResponseJson =
          await currentAppointmentCountResponse.json();
        setCurrentAppointmentsCount(currentAppointmentsCountResponseJson);
      }
      setIsLoadingCurrentAppointmentsCount(false);
    };
    retrieveUserCurrentAppointmentsCount().catch((error: any) => {
      setIsLoadingCurrentAppointmentsCount(false);
      setHttpError(error.message);
    });
  }, [authState, isAppointment]);

  useEffect(() => {
    const retrieveUserAppointmentDoctor = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/shcms/doctors/secure/isappointment/byuser?doctorId=${doctorId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const doctorAppointment = await fetch(url, requestOptions);

        if (!doctorAppointment.ok) {
          throw new Error("Error occurred");
        }

        const doctorAppointmentResponseJson = await doctorAppointment.json();
        setIsAppointment(doctorAppointmentResponseJson);
      }
      setIsLoadingDoctorAppointment(false);
    };
    retrieveUserAppointmentDoctor().catch((error: any) => {
      setIsLoadingDoctorAppointment(false);
      setHttpError(error.message);
    });
  }, [authState]);
  if (
    isLoading ||
    isLoadingReview ||
    isLoadingCurrentAppointmentsCount ||
    isLoadingDoctorAppointment
  ) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function appointmentDoctor() {
    const url = `http://localhost:8080/shcms/doctors/secure/appointment?doctorId=${doctor?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error("Error occurred");
    }
    setIsAppointment(true);
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {doctor?.img ? (
              <img src={doctor?.img} width="226" height="349" alt="Doctor" />
            ) : (
              <img
                src={require("./../../img/doctor_img/doctor1.png")}
                width="226"
                height="349"
                alt="Doctor"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{doctor?.firstName + " " + doctor?.lastName}</h2>
              <h5 className="text-primary">{doctor?.role}</h5>
              <p className="lead">{doctor?.dept}</p>
              <ReviewStar rating={totalStars} size={32} />
            </div>
          </div>
          <DoctorReviewAppointmentBox
            doctor={doctor}
            mobile={false}
            currentAppointmentsCount={currentAppointmentsCount}
            isAuthenticated={authState?.isAuthenticated}
            isAppointment={isAppointment}
            appointmentDoctor={appointmentDoctor}
          />
        </div>
        <hr />
        <ReviewsRecent reviews={reviews} doctorId={doctor?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {doctor?.img ? (
            <img src={doctor?.img} width="226" height="349" alt="Doctor" />
          ) : (
            <img
              src={require("./../../img/doctor_img/doctor1.png")}
              width="226"
              height="349"
              alt="Doctor"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{doctor?.firstName + " " + doctor?.lastName}</h2>
            <h5 className="text-primary">{doctor?.role}</h5>
            <p className="lead">{doctor?.dept}</p>
            <ReviewStar rating={totalStars} size={32} />
          </div>
        </div>
        <DoctorReviewAppointmentBox
          doctor={doctor}
          mobile={true}
          currentAppointmentsCount={currentAppointmentsCount}
          isAuthenticated={authState?.isAuthenticated}
          isAppointment={isAppointment}
          appointmentDoctor={appointmentDoctor}
        />
        <hr />
        <ReviewsRecent reviews={reviews} doctorId={doctor?.id} mobile={true} />
      </div>
    </div>
  );
};
