import { AskQuestionHome } from "./components/AskQuestionHome";
import { ConsultBestDoctor } from "./components/ConsultBestDoctor";
import { HomePageDescription } from "./components/HomePageDesciption";
import { SwipeDoctorsMenu } from "./components/SwipeDoctorsMenu";

export const HomePage = () => {
  return (
    <>
      <ConsultBestDoctor />
      <SwipeDoctorsMenu />
      <HomePageDescription />
      <AskQuestionHome />
    </>
  );
};
