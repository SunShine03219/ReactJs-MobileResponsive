import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Input, Spin, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { AvForm, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import { ProvisionsAction, currentStepAction, chatGptAction } from "../../../store/actions";
import leftArrow from '../../../assets/images/icons/arrow.png'
import "react-datepicker/dist/react-datepicker.css";
import successIcon from '../../../assets/images/icons/success.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import Chat from '../chat'

const { TextArea } = Input;

const Provisions = (props) => {
  const dispatch = useDispatch();

  const { success, loading, content, digital, email, edit_status, isChat } = useSelector((state) => ({
    success: state.Provisions.success,
    loading: state.Provisions.loading,
    content: state.Provisions.content,
    digital: state.Digital.content,
    email: state.Info.content?.email,
    edit_status: state.currentStep.edit_status,
    isChat: state.ChatGpt.isChat,

  }));

  React.useEffect(() => {
    if (email) dispatch(ProvisionsAction.getContent(email));
  }, [dispatch, email]);

  const [administration, setAdministration] = React.useState(
    content ? content.administration : "0"
  );

  const [compensation, setCompensation] = React.useState(
    content ? content.compensation : "0"
  );

  const [disinherit, setDisinherit] = React.useState(
    content ? content.disinherit : "0"
  );

  const [specific, setSpecific] = React.useState(
    content ? content.specific : "0"
  );

  const [wishForService, setWishForService] = React.useState(
    content ? content.wishForService : ""
  );

  const [wishForRestingPlace, setWishForRestingPlace] = React.useState(
    content ? content.wishForRestingPlace : ""
  );

  React.useEffect(() => {
    setAdministration(content ? content.administration : "0");
    setCompensation(content ? content.compensation : "0");
    setDisinherit(content ? content.disinherit : "0");
    setSpecific(content ? content.specific : "0");
    setWishForService(content ? content.wishForService : "");
    setWishForRestingPlace(content ? content.wishForRestingPlace : "");
  }, [content]);

  const [messageApi, contextHolder] = message.useMessage();

  const handleAdministration = (e) => {
    setAdministration(e.target.value);
  };

  const handleCompensation = (e) => {
    setCompensation(e.target.value);
  };

  const handleDisinherit = (e) => {
    setDisinherit(e.target.value);
  };

  const handleSpecific = (e) => {
    setSpecific(e.target.value);
  };

  const handleValidSubmit = (event, values) => {
    if (specific === "1" && !wishForService && !wishForRestingPlace) {
      return messageApi.open({
        type: "warning",
        content: "Please fill the text or click No",
      });
    } else {
      if (edit_status) {
        dispatch(
          ProvisionsAction.updateContent({
            ...values,
            wishForService,
            wishForRestingPlace,
            email,
          })
        );
      } else {
        localStorage.setItem("currentStep", 8);
        dispatch(
          ProvisionsAction.putContent({
            ...values,
            wishForService,
            wishForRestingPlace,
            email,
            lastStep: 8,
          })
        );
        props.next();
      }

    }
  };

  const handlePrev = () => {
    props.prev();
  };

  const handleWishForService = (e) => {
    setWishForService(e.target.value);
  };

  const handleWishForRestingPlace = (e) => {
    setWishForRestingPlace(e.target.value);
  };

  const updateOk = () => {
    dispatch(ProvisionsAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))

    dispatch(currentStepAction.setCurrentStep(10))
  }

  const subSubmitChat = (values) => {

  };

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({ current_step: 7 }))
  }

  return (
    <React.Fragment>
      {isChat ? (
        <Chat content={content} subSubmitChat={subSubmitChat} />
      ) : (
        <>
          {loading ? (
            <Spin tip="Loading" style={{ margin: "300px 0" }} size="large" />
          ) : (
            <>
              {contextHolder}
              <AvForm
                className="custom-form mt-4 pt-2"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v);
                }}
              >
                <div className="content-wrapper passdown-container">
                  <div className="mb-3">
                    <p className="passdown-title">Other Provisions</p>
                    <br />
                    <div className="mb-3">
                      <div className="flex">
                        <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                          Would you like to include an "Independent Administration"
                          clause in your will, enabling your executor to manage your
                          estate with minimal court supervision?
                        </p>
                        &nbsp;
                        <Tooltip
                          placement="bottom"
                          color={'#057CA4'}
                          title={
                            <span>
                              Consider including an "Independent Administration"
                              clause to allow your executor to manage your estate
                              with minimal court supervision, potentially expediting
                              the probate process and reducing associated costs.<br />
                              This clause can be beneficial if you trust your
                              executor's judgment and ability to handle your estate
                              efficiently and effectively.
                            </span>
                          }
                        >
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </div>
                      <div className="mb-3">
                        <AvRadioGroup
                          inline
                          name="administration"
                          value={administration}
                          onChange={handleAdministration}
                          required
                        >
                          <AvRadio label="Yes" value="1" />
                          <AvRadio label="No" value="0" />
                        </AvRadioGroup>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex">
                      <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                        Should your Executor{" "}
                        {digital.digitalAssets === "1" && "and Digital Executor"}{" "}
                        have the option to receive reasonable compensation for
                        administering your will?
                      </p>
                      &nbsp;
                      <Tooltip
                        placement="right"
                        color={'#057CA4'}
                        title={
                          <span>
                            Decide if your executor should have the option to
                            receive reasonable compensation for their efforts,
                            guided by the legal standard.<br />Compensating your executor
                            can be a considerate gesture that acknowledges the time
                            and effort required to manage your estate.
                          </span>
                        }
                      >
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </div>
                    <div className="mb-3">
                      <AvRadioGroup
                        inline
                        name="compensation"
                        value={compensation}
                        onChange={handleCompensation}
                        required
                      >
                        <AvRadio label="Yes" value="1" />
                        <AvRadio label="No" value="0" />
                      </AvRadioGroup>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                      If any of your beneficiaries decide to contest your will,
                      would you like to disinherit them (subject to any laws
                      preventing you from doing so)?
                    </p>
                    <div className="mb-3">
                      <AvRadioGroup
                        inline
                        name="disinherit"
                        value={disinherit}
                        onChange={handleDisinherit}
                        required
                      >
                        <AvRadio label="Yes" value="1" />
                        <AvRadio label="No" value="0" />
                      </AvRadioGroup>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="">
                      <p style={{ color: '#000000', fontSize: 20, marginRight: 5, marginTop: 40, marginBottom: 20 }}>
                        (Optional) Do you want to include specific instructions or
                        wishes for your burial and funeral proceedings in your will?
                        <br />
                        <br />
                      </p>

                      <div className="flex">
                        <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                          Note: this section is completely optional. Your Will remains
                          valid without specifying such wishes.
                        </p>
                        &nbsp;
                        <Tooltip
                          placement="right"
                          color={'#057CA4'}
                          title={
                            <span>
                              Specify your preferences for burial and funeral
                              proceedings to ensure your final wishes are respected
                              and followed.<br />Providing detailed instructions helps
                              alleviate the burden on your loved ones, who may be
                              uncertain about your preferences during a difficult
                              time.<br />Consider any religious or cultural beliefs, the
                              location of your burial or cremation, and any specific
                              requests for your funeral or memorial service.
                            </span>
                          }
                        >
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </div>

                    </div>
                    <div className="mb-3">
                      <AvRadioGroup
                        inline
                        name="specific"
                        value={specific}
                        onChange={handleSpecific}
                        required
                      >
                        <AvRadio label="Yes" value="1" />
                        <AvRadio label="No" value="0" />
                      </AvRadioGroup>
                    </div>
                    {specific === "1" && (
                      <>
                        <div className="mb-3 flex">
                          <div style={{ paddingRight: "5px", width: '100%' }}>
                            <div className="flex">
                              <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                                Complete the following sentence to list out your
                                wishes for your memorial or funeral service: "For my
                                memorial service,
                              </p>
                              <Tooltip
                                placement="top"
                                color={'#057CA4'}
                                overlayInnerStyle={{ width: '700px' }}
                                title={
                                  <span>
                                    Remember, this section is completely optional.
                                    <br />
                                    That said, if you prefer to outline your burial and
                                    funeral preferences, it's essential to be as
                                    specific and detailed as possible to ensure your
                                    end-of-life wishes are respected and carried out.
                                    <br />
                                    For your memorial service you should feel free to
                                    indicate your wishes (e.g., religious or secular,
                                    intimate or large gathering, specific songs or
                                    readings).
                                    <br />
                                    For the final disposition of your body, you should
                                    feel free to indicate your wishes (e.g., burial,
                                    cremation, burial at sea, green burial). If you
                                    choose cremation, specify how you want your ashes to
                                    be handled, such as scattering in a particular
                                    location or given to a specific person. If you're
                                    picking a standard burial, feel free to indicate the
                                    location of your preferred cemetery or burial plot,
                                    or any desired inscriptions on your headstone or
                                    memorial. If you have specific cultural or religious
                                    traditions you would like to be observed, make sure
                                    to include those as well.
                                    <br />
                                    It is also a good idea to discuss your wishes with
                                    your loved ones to ensure they understand and are
                                    prepared to honor your preferences. By providing
                                    clear and comprehensive instructions in your will,
                                    you can ease the burden on your family and friends
                                    during a difficult time and ensure your final wishes
                                    are carried out as you intended. However, keep in
                                    mind that funeral and burial instructions in a will
                                    may not always be legally binding, so it's essential
                                    to communicate your desires to your loved ones and
                                    consider additional methods to ensure your wishes
                                    are respected, such as creating a separate legally
                                    binding document or preplanning and prepaying for
                                    funeral arrangements.
                                  </span>
                                }
                              >
                                <QuestionCircleOutlined />
                              </Tooltip>
                            </div>
                            <TextArea
                              rows={4}
                              placeholder="maxLength is 1000"
                              maxLength={1000}
                              value={wishForService}
                              onChange={handleWishForService}
                            />
                            &nbsp;
                          </div>

                        </div>
                        <div className="mb-3">
                          <div style={{ paddingRight: "5px", width: '100%' }}>
                            <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                              Complete the following sentence to list out your
                              wishes for the final resting place of your body. If
                              you want to be cremated, mention that and explain how
                              you would like your remains to be handled: "With
                              respect to my body,
                            </p>
                            <div className="flex">
                              <TextArea
                                rows={4}
                                placeholder="maxLength is 1000"
                                maxLength={1000}
                                value={wishForRestingPlace}
                                onChange={handleWishForRestingPlace}
                              />
                            </div>
                          </div>
                        </div>
                        <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                          Note: these sentences will be added verbatim to your Will
                          as you write them here.
                        </p>
                      </>
                    )}
                  </div>
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
                      Tired of forms? Try creating your will using our new chat feature <div onClick={switchChat}>Click Here</div>
                    </label>
                  </div>
                  
                </div>
              </AvForm>
            </>
          )}

        </>
      )}


      <ModalOverlay isOpen={success}>
        <CustomModalContent isOpen={success} width={355} height={302}>
          <div className="">
            <img src={successIcon} alt="successIcon" />
            <p style={{ marginTop: 30 }}>Thank you for trusting us Modifications saved successfully</p>
            <div style={{ marginTop: 20 }}>
              <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={updateOk}> Ok </CustomButton>
            </div>
          </div>
        </CustomModalContent>
      </ModalOverlay>

    </React.Fragment>
  );
};

export default withRouter(Provisions);

Provisions.propTypes = {
  history: PropTypes.object,
};
