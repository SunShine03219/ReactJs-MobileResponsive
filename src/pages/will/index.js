import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import Passdown from "./passdown";
import Info from "./info";
import Children from "./children";
import Executor from "./Executor";
import Residuary from "./residuary";
import Gifts from "./gifts";
import Digital from "./digital";
import Pets from "./pets";
import Provisions from "./provisions";
import Review from "./review";
import Assets from "./assets";

import {
  AssetsAction,
  ChildrenAction,
  DigitalAction,
  ExecutorAction,
  GiftsAction,
  InfoAction,
  PassdownAction,
  PetsAction,
  ProvisionsAction,
  ResiduaryAction,
  loginSuccess,
  currentStepAction
} from "../../store/actions";
import Progress from './progress'

const Will = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state) => state.currentStep);

  const next = () => {
    dispatch(currentStepAction.setCurrentStep(currentStep + 1))
  };

  const backTo = (i) => {
    dispatch(currentStepAction.setEditStatus(true))
    dispatch(currentStepAction.setCurrentStep(currentStep - i))
  };

  const prev = () => {
    dispatch(currentStepAction.setCurrentStep(currentStep - 1))
    localStorage.setItem("currentStep", currentStep - 2);
  };

  useEffect(() => {
    if (localStorage.getItem("currentStep")) {
      const currentStep = parseInt(localStorage.getItem('currentStep'))
      if(currentStep === 10) {
        dispatch(currentStepAction.setCurrentStep(parseInt(localStorage.getItem("currentStep"))));
      } else {
        dispatch(currentStepAction.setCurrentStep(parseInt(localStorage.getItem("currentStep")) + 1));
      }
    }
    if (localStorage.getItem("authUser")) {
      const userData = jwtDecode(localStorage.getItem("authUser"));
      dispatch(loginSuccess(userData));
    } else if (localStorage.getItem("infoData1")) {
      const infoData = JSON.parse(localStorage.getItem("infoData1"));
      dispatch(InfoAction.fetchContent(infoData));
    }
    if (localStorage.getItem("assetsData")) {
      const { iat, exp, ...rest } = jwtDecode(
        localStorage.getItem("assetsData")
      );
      dispatch(AssetsAction.fetchContent(rest));
    }
    if (localStorage.getItem("childrenData")) {
      const { iat, exp, ...rest } = jwtDecode(
        localStorage.getItem("childrenData")
      );
      dispatch(ChildrenAction.fetchContent(rest));
    }
    if (localStorage.getItem("digitalData")) {
      const { iat, exp, ...rest } = jwtDecode(
        localStorage.getItem("digitalData")
      );
      dispatch(DigitalAction.fetchContent(rest));
    }
    if (localStorage.getItem("executorData")) {
      const { iat, exp, ...rest } = jwtDecode(
        localStorage.getItem("executorData")
      );
      dispatch(ExecutorAction.fetchContent(rest));
    }
    if (localStorage.getItem("giftsData")) {
      const { iat, exp, ...rest } = jwtDecode(
        localStorage.getItem("giftsData")
      );
      dispatch(GiftsAction.fetchContent(rest));
    }
    if (localStorage.getItem("infoData")) {
      const { iat, exp, ...rest } = jwtDecode(localStorage.getItem("infoData"));
      dispatch(InfoAction.fetchContent(rest));
    }
    if (localStorage.getItem("passdownData")) {
      const { iat, exp, ...rest } = jwtDecode(
        localStorage.getItem("passdownData")
      );
      dispatch(PassdownAction.fetchContent(rest));
    }
    if (localStorage.getItem("petsData")) {
      const { iat, exp, ...rest } = jwtDecode(localStorage.getItem("petsData"));
      dispatch(PetsAction.fetchContent(rest));
    }
    if (localStorage.getItem("provisionsData")) {
      const { iat, exp, ...rest } = jwtDecode(
        localStorage.getItem("provisionsData")
      );
      dispatch(ProvisionsAction.fetchContent(rest));
    }
    if (localStorage.getItem("residuaryData")) {
      const { iat, exp, ...rest } = jwtDecode(
        localStorage.getItem("residuaryData")
      );
      dispatch(ResiduaryAction.fetchContent(rest));
    }
  }, [dispatch]);

  const steps = [
    {
      title: "Terms of Use",
      content: <Passdown next={next} />,
    },
    {
      title: "Information",
      content: <Info next={next} prev={prev} />,
    },
    {
      title: "Children",
      content: <Children next={next} prev={prev} />,
    },
    {
      title: "Gifts",
      content: <Gifts next={next} prev={prev} />,
    },
    {
      title: "Estate",
      content: <Residuary next={next} prev={prev} />,
    },
    {
      title: "Executor",
      content: <Executor next={next} prev={prev} />,
    },
    {
      title: "Digital Assets",
      content: <Digital next={next} prev={prev} />,
    },
    {
      title: "Pets",
      content: <Pets next={next} prev={prev} />,
    },
    {
      title: "Provisions",
      content: <Provisions next={next} prev={prev} />,
    },
    {
      title: "Assets",
      content: <Assets next={next} prev={prev} />,
    },
    {
      title: "Review",
      content: <Review prev={prev} backTo={backTo} />,
    },
  ];

  return (
    <div className="container">
      <div className="will-container">
        <Progress />
        {currentStep === -1 ? (
          <>
            {steps[7] && steps[7].content && (
              <div>{steps[7].content}</div>
            )}
          </>
        ) : (
          <>
            {steps[currentStep] && steps[currentStep].content && (
              <div>{steps[currentStep].content}</div>
            )}
          </>
        )}

      </div>

    </div>
  );
};

export default Will;
