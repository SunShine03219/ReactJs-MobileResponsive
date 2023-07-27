import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Spin, Modal, Button } from "antd";
import { QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import {
  AvForm,
  AvField,
  AvRadio,
  AvRadioGroup,
} from "availity-reactstrap-validation";
import leftArrow from '../../../assets/images/icons/arrow.png'
import successIcon from '../../../assets/images/icons/success.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import { InfoAction, currentStepAction, chatGptAction } from "../../../store/actions";
import "react-datepicker/dist/react-datepicker.css";
import Chat from '../chat'

import {states} from '../../../constants/auto-complete'

const Info = (props) => {
  const dispatch = useDispatch();
  const { success, loading, content, email, detected, user, edit_status, isChat } = useSelector((state) => ({
    success: state.Info.success,
    loading: state.Info.loading,
    content: state.Info.content,
    email: state.Login.user ? state.Login.user.email : state.Info.email,
    detected: state.Info.detected,
    user: state.Login.user,
    edit_status: state.currentStep.edit_status,
    isChat: state.ChatGpt.isChat
  }));

  const [isOpen, setIsOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");
  const [data, setData] = React.useState("");
  const [emailData, setEmailData] = React.useState("");

  const [maritalType, setMaritalType] = React.useState(
    content ? content.maritalType : ""
  );

  const [maritalStatus, setMaritalStatus] = React.useState(
    content ? content.maritalStatus : ""
  );


  React.useEffect(() => {
    if (email) dispatch(InfoAction.getContent(email));
  }, [dispatch, email]);

  React.useEffect(() => {
    setMaritalType(content ? content.maritalType : "");
    setMaritalStatus(content ? content.maritalStatus : "");
  }, [content]);

  const handleValidSubmit = (event, values) => {
    if (edit_status) {
      dispatch(InfoAction.updateContent({ ...values }));
    } else {
      if (user) {
        localStorage.setItem("currentStep", 1);
        dispatch(InfoAction.putContent({ ...values, lastStep: 1 }));
        props.next();
      } else {
        const infoData = JSON.stringify({ ...values, lastStep: 1 });
        localStorage.setItem("infoData1", infoData);
        localStorage.setItem("currentStep", 1);
        dispatch(InfoAction.findContent(values));
        setData({ ...values, lastStep: 1 });
        setEmailData(values.email);
        setIsOpen(true);
      }
    }
  };

  const subSubmitChat = (values) => {
  };

  const handleSignupClick = () => {
    props.history.push("/register");
    setIsModalOpen(false);
    setIsOpen(false);
  };

  const handleSigninClick = () => {
    props.history.push("/login");
    setIsModalOpen(false);
    setIsOpen(false);
  };

  const handleResetClick = () => {
    localStorage.setItem("currentStep", 1);
    dispatch(InfoAction.resetAndPutContent({ ...data, email: emailData }));
    setIsModalOpen(false);
    setIsOpen(false);
    props.next();
  };

  React.useEffect(() => {
    if (!user) {
      setModalType(detected.user);
      setModalContent(
        detected.user ? (
          <p style={{ fontSize: "16px" }}>
            You already have an account. Please Sign in and continue
          </p>
        ) : (
          <p style={{ fontSize: "16px" }}>
            We detected that your email is already in use, but not yet
            registered.
            <br />
            Click <strong>Continue</strong> to sign-up for an account so you can
            continue from your last visit. Or click <strong>Reset</strong> so
            you can start over.
          </p>
        )
      );
      if (detected.will === false) {
        localStorage.setItem("currentStep", 1);
        dispatch(InfoAction.putContent({ ...data, email: emailData }));
        dispatch(InfoAction.setContent({ user: false, will: true }));
        props.next();
      }
      if (detected.will === true && isOpen) setIsModalOpen(true);
    }
  }, [detected, user, isOpen, data, dispatch, emailData, props]);

  const changeMaritalStatus = (e) => {
    setMaritalStatus(e.target.value);
  };

  const changeMaritalType = (e) => {
    setMaritalType(e.target.value);
  };

  const handlePrev = () => {
    props.prev();
  };

  const updateOk = () => {
    dispatch(InfoAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))
    dispatch(currentStepAction.setCurrentStep(10))
  }

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({ current_step: 0 }))
  }

  return (
    <React.Fragment>
      {!isChat ? (
        <>
          {loading ? (
            <Spin tip="Loading" style={{ margin: "300px" }} size="large" />
          ) : (
            <AvForm
              className="custom-form mt-4 pt-2"
              onValidSubmit={(e, v) => {
                handleValidSubmit(e, v);
              }}
            >
              <div className="content-wrapper passdown-container">
                <p className="passdown-title">Your Information</p>
                <br />
                <div className="flex">
                  <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>Please provide your full legal name.</p>
                  <Tooltip
                    placement="top"
                    color={'#057CA4'}
                    title={
                      <span>
                        Provide your full legal name to ensure your will is properly
                        identified and executed. <br />Providing accurate and complete
                        information helps avoid confusion and potential disputes
                        among your beneficiaries, ensuring that your estate is
                        distributed according to your wishes.
                      </span>
                    }
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </div>
                <div className="mb-3">
                  <AvField
                    name="fullName"
                    className="form-control passdown-input-height"
                    placeholder="Full name"
                    value={content && content.fullName}
                    type="text"
                    required
                  />
                </div>
                <div className="flex">
                  <p style={{ color: '#000000', fontSize: 14, marginRight: 5, marginTop: 10 }}>What is your email?</p>
                  <Tooltip
                    placement="top"
                    color={'#057CA4'}
                    title={
                      <span>
                        The email address you provide serves as a distinct marker
                        for your documents, ensuring you can return and pick up
                        where you left off whenever you wish. <br /> Furthermore, we also
                        offer the convenience of sending your documents directly to
                        this email, enabling you to store them for future reference.
                      </span>
                    }
                  >
                    <QuestionCircleOutlined style={{ marginTop: 10 }} />
                  </Tooltip>
                </div>
                <div className="mb-3">
                  <AvField
                    name="email"
                    className="form-control passdown-input-height"
                    disabled={!!email}
                    placeholder="Email"
                    value={email ? email : content?.email}
                    type="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <p style={{ color: '#000000', fontSize: 14, marginRight: 5, marginTop: 30 }}>What state do you live in?</p>
                  <div className="mb-3">
                    <AvField
                      type="select"
                      name="state"
                      id="selectInput"
                      value={content && content.state}
                      errorMessage="Please choose a State"
                      required
                      className='passdown-input-height'
                    >
                      <option value="" disabled>
                        State
                      </option>
                      {states.map((item, index) => {
                        return (
                          <option value={item.value} key={index}>{item.value}</option>
                        )
                      })}
                    </AvField>
                  </div>
                </div>

                <div className="mb-3">
                <p style={{ color: '#000000', fontSize: 14, marginRight: 5, marginTop: 30 }}> What is the address of your primary residence? </p>

                  <AvField
                    name="address"
                    className="mb-3 form-control passdown-input-height"
                    placeholder="Street Address 1"
                    value={content && content.address}
                    type="text"
                    required
                  />

                  <AvField
                    name="apart_number"
                    className="mb-3 form-control passdown-input-height"
                    placeholder="Suite/Apartment/Unit Number"
                    value={content && content.apart_number}
                    type="text"
                    required
                  />

                  <AvField
                    name="city"
                    className="mb-3 form-control passdown-input-height"
                    placeholder="City"
                    value={content && content.city}
                    type="text"
                    required
                  />

                  <AvField
                    name="zip_code"
                    className="mb-3 form-control passdown-input-height"
                    placeholder="Zip Code"
                    value={content && content.zip_code}
                    type="text"
                    required
                  />

                </div>

                <div className="flex">
                  <p style={{ color: '#000000', fontSize: 14, marginRight: 5, marginTop: 20 }}>Are you currently married?</p>
                  <Tooltip
                    placement="top"
                    color={'#057CA4'}
                    title={
                      <span>
                        Indicate your marital status and spouse's name to help
                        clarify the distribution of assets and any spousal rights.
                        <br />
                        This information is crucial for determining how your estate
                        will be divided and whether your spouse has any claims to
                        your assets under your state's inheritance laws.
                      </span>
                    }
                  >
                    <QuestionCircleOutlined style={{ marginTop: 20 }} />
                  </Tooltip>
                </div>
                <div className="mb-3">
                  <AvRadioGroup
                    inline
                    name="maritalStatus"
                    value={maritalStatus}
                    onChange={changeMaritalStatus}
                    required
                  >
                    <AvRadio label="Yes" value="1" />
                    <AvRadio label="No" value="0" />
                  </AvRadioGroup>
                </div>
                {maritalStatus === "0" && (
                  <>
                    <div className="mb-3">
                      <AvRadioGroup
                        inline
                        name="maritalType"
                        value={maritalType}
                        onChange={changeMaritalType}
                        required
                      >
                        <AvRadio label="Single" value="single" />
                        <AvRadio
                          label="Domestic Partnership"
                          value="in a domestic partnership"
                        />
                      </AvRadioGroup>
                    </div>
                  </>
                )}
                {maritalStatus === "1" && (
                  <>
                    <p style={{ color: '#000000', fontSize: 14 }}>Please provide your spouse's full legal name.</p>
                    <div className="mb-3">
                      <AvField
                        name="spouseFullName"
                        className="form-control"
                        placeholder="Full name"
                        type="text"
                        value={
                          content && content.maritalStatus === "1"
                            ? content?.spouseFullName
                            : ""
                        }
                        required
                      />
                    </div>
                  </>
                )}

                <div className="button-wrapper" >
                  {!edit_status && (
                    <div className="bottom-left" onClick={handlePrev}>
                      <img src={leftArrow} alt="leftArrow" />
                      <label>Previous</label>
                    </div>
                  )}

                  {edit_status ? (
                    <button
                      className="button button--submit"
                      type="submit"
                    >
                      <h5 style={{ color: "white", margin: 0 }}> Save </h5>
                    </button>
                  ) : (
                    <button
                      className="button button--submit"
                      type="submit"
                    >
                      <h5 style={{ color: "white", margin: 0 }}> Save & Continue </h5>
                    </button>
                  )}

                </div>

                <div className="switch-will">
                  <label>
                    Tired of forms? Try creating your will using our new chat feature. <div onClick={switchChat}>Click Here</div>
                  </label>
                </div>

              </div>
              <Modal
                title={
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "auto",
                      marginRight: "auto",
                      maxWidth: "200px",
                    }}
                  >
                    <WarningOutlined
                      style={{ color: "orange", fontSize: "40px" }}
                    />
                    <h5 style={{ margin: 0, paddingLeft: "8px", fontSize: "28px" }}>
                      Warning
                    </h5>
                  </div>
                }
                open={isModalOpen}
                closable={false}
                footer={
                  modalType ? (
                    <Button
                      type="primary"
                      key="Sign in"
                      onClick={handleSigninClick}
                    >
                      Continue
                    </Button>
                  ) : (
                    [
                      <Button
                        type="primary"
                        key="Sign up"
                        onClick={handleSignupClick}
                      >
                        Continue
                      </Button>,
                      <Button
                        type="primary"
                        ghost
                        key="continue"
                        onClick={handleResetClick}
                      >
                        Reset
                      </Button>,
                    ]
                  )
                }
              >
                {modalContent}
              </Modal>
            </AvForm>
          )}

          <ModalOverlay isOpen={success}>
            <CustomModalContent isOpen={success} width={355} height={302}>
              <div className="">
                <img src={successIcon} alt="successIcon" />
                <p style={{ marginTop: 30 }}>Thank you for trusting us Modifications saved successfully</p>
                <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={updateOk}> Ok </CustomButton>
              </div>
            </CustomModalContent>
          </ModalOverlay>
        </>
      ) : (
        <Chat content={content} subSubmitChat={subSubmitChat} />
      )}


    </React.Fragment>
  );
};

export default withRouter(Info);