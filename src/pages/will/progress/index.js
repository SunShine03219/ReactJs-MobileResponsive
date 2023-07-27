import React from "react";
import { useSelector } from "react-redux";

const Progress = () => {
  const { currentStep } = useSelector((state) => state.currentStep);

  const termStyle = {
    color: currentStep >= -1 || currentStep >= 0 ? "white" : "#656565",
    zIndex: 10,
  };

  const inforStyle = {
    color: currentStep >= 1 ? "white" : "#656565",
    zIndex: 10,
  };

  const childStyle = {
    color: currentStep >= 2 ? "white" : "#656565",
    zIndex: 10,
  };

  const giftStyle = {
    color: currentStep >= 3 ? "white" : "#656565",
    zIndex: 10,
  };

  const estateStyle = {
    color: currentStep >= 4 ? "white" : "#656565",
    zIndex: 10,
  };

  const executorStyle = {
    color: currentStep >= 5 ? "white" : "#656565",
    zIndex: 10,
  };

  const digitalStyle = {
    color: currentStep >= 6 ? "white" : "#656565",
    zIndex: 10,
  };

  const petStyle = {
    color: currentStep >= 7 ? "white" : "#656565",
    zIndex: 10,
  };

  const provisionStyle = {
    color: currentStep >= 8 ? "white" : "#656565",
    zIndex: 10,
  };

  const assetStyle = {
    color: currentStep >= 9 ? "white" : "#656565",
    zIndex: 10,
  };

  const reviewStyle = {
    color: currentStep >= 10 ? "white" : "#656565",
    zIndex: 10,
  };

  const pixel = [
    "11%",
    "22%",
    "32%",
    "38%",
    "45%",
    "55%",
    "66%",
    "75%",
    "83%",
    "90%",
    "100%",
  ];

  return (
    <>
      <div className="scroll-container">
        <div className="will-progress">
          <label style={termStyle}>Terms of Use</label>
          <label style={inforStyle}>Information</label>
          <label style={childStyle}>Children</label>
          <label style={giftStyle}>Gifts</label>
          <label style={estateStyle}>Estate</label>
          <label style={executorStyle}>Executor</label>
          <label style={digitalStyle}>Digital Assets</label>
          <label style={petStyle}>Pets</label>
          <label style={provisionStyle}>Provisions</label>
          <label style={assetStyle}>Assets</label>
          <label style={reviewStyle}>Review</label>
          {currentStep === -1 ? (
            <div className="progress-real" style={{ width: pixel[0] }}></div>
          ) : (
            <div
              className="progress-real"
              style={{ width: pixel[currentStep] }}
            ></div>
          )}
        </div>
      </div>
      {currentStep === -1 ? (
        <div className="progress-percent">{0 * 10}%</div>
      ) : (
        <div className="progress-percent">{currentStep * 10}%</div>
      )}
    </>
  );
};

export default Progress;
