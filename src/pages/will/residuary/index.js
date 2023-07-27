import React from "react";
import { withRouter } from "react-router-dom";
import { Button, message, Tooltip, Spin } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import plus from '../../../assets/images/icons/plus.png'
import delIcon from '../../../assets/images/icons/delete.png'
import leftArrow from '../../../assets/images/icons/arrow.png'
import { ResiduaryAction, currentStepAction, chatGptAction } from "../../../store/actions";
import "react-datepicker/dist/react-datepicker.css";
import successIcon from '../../../assets/images/icons/success.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import Chat from '../chat'


const Residuary = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const { success, loading, content, info, children, email, edit_status, isChat, user } = useSelector((state) => ({
    success: state.Residuary.success,
    loading: state.Residuary.loading,
    content: state.Residuary.content,
    info: state.Info.content,
    children: state.Children.content,
    email: state.Info.content?.email,
    edit_status: state.currentStep.edit_status,
    isChat: state.ChatGpt.isChat,
    user: state.Login.user
  }));

  React.useEffect(() => {
    if (email) dispatch(ResiduaryAction.getContent(email));
  }, [dispatch, email]);

  const [estate, setEstate] = React.useState(
    content && content.estate ? content.estate : [0]
  );

  const [backupEstate, setBackupEstate] = React.useState(
    content && content.backupEstate ? content.backupEstate : [0]
  );

  const [beneficiaries, setBeneficiaries] = React.useState(
    content && content.beneficiaries ? content.beneficiaries : [""]
  );

  const [backupBeneficiaries, setBackupBeneficiaries] = React.useState(
    content && content.backupBeneficiaries ? content.backupBeneficiaries : [""]
  );

  const [distribution, setDistribution] = React.useState(
    content && content.distribution ? content.distribution : "custom"
  );

  const [disabled, setDisabled] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const [defaultRelations, setDefaultRelations] = React.useState(
    content && content.beneficiaryRelations
      ? content.beneficiaryRelations
      : [""]
  );

  const [defaultBackupRelations, setDefaultBackupRelations] = React.useState(
    content && content.backupBeneficiaryRelations
      ? content.backupBeneficiaryRelations
      : [""]
  );

  React.useEffect(() => {
    if (estate && estate.length > 0) {
      const tempEstate = estate.map((item) => {
        return parseFloat(item);
      });
      if (backupEstate && backupEstate.length > 0) {
        const tempBackupEstate = backupEstate.map((item) => {
          return parseFloat(item);
        });
        setDisabled(
          Math.round(
            tempEstate.reduce((sum, currentValue) => sum + currentValue)
          ) !== 100 ||
          (backupEstate.length !== 0 &&
            tempBackupEstate.reduce(
              (sum, currentValue) => sum + currentValue
            ) !== 100)
        );
      } else
        setDisabled(
          Math.round(
            tempEstate.reduce((sum, currentValue) => sum + currentValue)
          ) !== 100
        );
    }
  }, [estate, backupEstate]);

  React.useEffect(() => {
    setEstate(content && content.estate ? content.estate : [0]);
    setBackupEstate(
      content && content.backupEstate ? content.backupEstate : [0]
    );
    setBeneficiaries(
      content && content.beneficiaries ? content.beneficiaries : [""]
    );
    setBackupBeneficiaries(
      content && content.backupBeneficiaries
        ? content.backupBeneficiaries
        : [""]
    );
    setDistribution(
      content && content.distribution ? content.distribution : "custom"
    );
    setDefaultRelations(
      content && content.beneficiaryRelations
        ? content.beneficiaryRelations
        : [""]
    );
    setDefaultBackupRelations(
      content && content.backupBeneficiaryRelations
        ? content.backupBeneficiaryRelations
        : [""]
    );
  }, [content]);

  React.useEffect(() => {
    if (info?.maritalStatus === "1" && distribution === "spouse") {
      setEstate([100]);
      setBeneficiaries([info ? info.spouseFullName : ""]);
      setDefaultRelations(["spouse"]);
      setIsDisabled(true);
    } else if (children?.haveChildren === "1" && distribution === "children") {
      let tempEstate = [];
      let tempRelation = [];
      const amount = (100 / children.number).toFixed(1);
      for (let i = 1; i <= children.number; ++i) {
        tempEstate.push(amount);
        tempRelation.push("child");
      }
      setEstate(tempEstate);
      setDefaultRelations(tempRelation);
      setBeneficiaries(children.children);
      setIsDisabled(true);
    } else {
      setEstate(content && content.estate ? content.estate : [0]);
      setBeneficiaries(
        content && content.beneficiaries ? content.beneficiaries : [""]
      );
      setDefaultRelations(
        content && content.beneficiaryRelations
          ? content.beneficiaryRelations
          : [""]
      );
      setIsDisabled(false);
    }
  }, [distribution, content, info, children]);

  const handleValidSubmit = (event, values) => {
    let double = false;
    if (disabled)
      return messageApi.open({
        type: "warning",
        content: "The final sum of the percentages must equal 100.",
      });
    if (!beneficiaries || beneficiaries.length === 0)
      return messageApi.open({
        type: "warning",
        content: "Please add at lease one beneficiary.",
      });
    else if (backupBeneficiaries.length !== 0)
      beneficiaries.forEach((one) => {
        if (!!backupBeneficiaries.find((backup) => backup === one))
          double = true;
      });
    if (double)
      messageApi.open({
        type: "warning",
        content:
          "You cannot select the same person as beneficiary and backup beneficiary",
      });
    else {
      if (edit_status) {
        dispatch(ResiduaryAction.updateContent({ ...values, email }));
      } else {
        localStorage.setItem("currentStep", 4);
        dispatch(ResiduaryAction.putContent({ ...values, email, lastStep: 4 }));
        props.next();
      }

    }
  };

  const handlePrev = () => {
    props.prev();
  };

  const addEstate = (e) => {
    setEstate([...estate, 0]);
    setBeneficiaries([...beneficiaries, ""]);
  };

  const addBackupEstate = (e) => {
    setBackupEstate([...backupEstate, ""]);
    setBackupBeneficiaries([...backupBeneficiaries, ""]);
  };

  const changeEstate = (i) => (e) => {
    const temp = estate.map((item, index) => {
      if (index === i) item = e.target.value;
      return item;
    });
    setEstate(temp);
  };

  const changeBackupEstate = (i) => (e) => {
    const temp = backupEstate.map((item, index) => {
      if (index === i) item = e.target.value;
      return item;
    });
    setBackupEstate(temp);
  };

  const changeBeneficiaries = (i) => (e) => {
    const temp = beneficiaries.map((beneficiary, index) => {
      if (index === i) beneficiary = e.target.value;
      return beneficiary;
    });
    setBeneficiaries(temp);
  };

  const changeBackupBeneficiaries = (i) => (e) => {
    const temp = backupBeneficiaries.map((beneficiary, index) => {
      if (index === i) beneficiary = e.target.value;
      return beneficiary;
    });
    setBackupBeneficiaries(temp);
  };

  const removeEstate = (i) => () => {
    setEstate(estate.filter((child, index) => index !== i));
    setBeneficiaries(beneficiaries.filter((child, index) => index !== i));
  };

  const removeBackupEstate = (i) => () => {
    setBackupEstate(backupEstate.filter((child, index) => index !== i));
    setBackupBeneficiaries(
      backupBeneficiaries.filter((child, index) => index !== i)
    );
  };

  const handleDistribution = (e) => {
    setDistribution(e.target.value);
  };

  const handleSelect = (i) => (e) => {
    setDefaultRelations(
      defaultRelations.map((item, index) => {
        if (index === i) item = e.target.value;
        return item;
      })
    );
  };

  const handleBackupSelect = (i) => (e) => {
    setDefaultBackupRelations(
      defaultBackupRelations.map((item, index) => {
        if (index === i) item = e.target.value;
        return item;
      })
    );
  };

  const updateOk = () => {
    dispatch(ResiduaryAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))

    dispatch(currentStepAction.setCurrentStep(10))
  }

  const subSubmitChat = (values) => {

  };

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    if(user) {
      dispatch(chatGptAction.getCurrentQuestion({current_step: 3, email: user.email}))
    } else {
      const currentEamil = localStorage.getItem('currentEamil')
      dispatch(chatGptAction.getCurrentQuestion({current_step: 3, email: currentEamil}))
    }
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
                    <p className="passdown-title">Residuary Estate</p>
                    <br />
                    <div className="mb-3">
                      <div className="flex">
                        <p style={{ color: '#000000', fontSize: 14, lineHeight: 'normal' }}>
                          How would you like to distribute the remainder of your
                          estate (Residuary Estate)?
                        </p>
                        <Tooltip
                          placement="bottom"
                          color={'#057CA4'}
                          overlayInnerStyle={{width: '700px'}}
                          title={
                            <span>
                              This question asks you to decide how you'd like the remaining assets of your estate (known as the "residue") to be distributed after all specific bequests (aka specific gifts), debts, taxes, and expenses have been paid.<br /><br />
                              Option 1: "All to My Spouse"
                              If you select this option, all remaining assets of your estate will be given to your spouse. This is often chosen by individuals who want to ensure their spouse is financially secure before any other distributions are made.<br /><br />
                              Option 2: "All to My Children, Split Equally, Per Stirpes"
                              If you choose this option, the remaining assets of your estate will be equally divided among your children. If a child predeceases you, their share will be distributed to their descendants. This is what "per stirpes" means – it's a legal term for this type of distribution. For example, if you have two children and one has already passed away but has two children of their own, your grandkids would each receive half of their parent's share (their parent being your child). <br />
                              Please note, in some jurisdictions, a surviving spouse may have a right to community property, which are assets acquired during the marriage. This means that even if you choose this option, your spouse may still have a claim to a portion of the estate's assets.<br /><br />
                              Option 3: Custom Distribution
                              Selecting this option allows you to specify a custom plan for the distribution of your remaining assets. You might choose this if you want to include friends, distant relatives, or charities in your will, or if you want to specify different amounts for different heirs.<br />
                              Remember, it's essential that your will reflects your wishes accurately. Consider consulting with a legal professional if you're unsure about any part of this process.
                            </span>
                          }
                        >
                          <QuestionCircleOutlined style={{ marginLeft: 5, marginTop: 2 }} />
                        </Tooltip>
                      </div>


                      <div className="mb-3">
                        <AvRadioGroup
                          inline
                          name="distribution"
                          value={distribution}
                          onChange={handleDistribution}
                        >
                          {info && info?.maritalStatus === "1" && (
                            <AvRadio label="All to my spouse" value="spouse" />
                          )}
                          {children && children?.haveChildren === "1" && (
                            <AvRadio
                              label="All to my children, split equally, per stirpes"
                              value="children"
                            />
                          )}
                          <AvRadio label="Custom distribution" value="custom" />
                        </AvRadioGroup>
                      </div>

                      <div className="mb-3">
                        {distribution === "custom" && (
                          <div className="mb-3 flex column-form">
                            <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                              Please specify the names of your beneficiaries, their
                              relationship to you, as well as the percentage of your
                              Residuary Estate you would like them to receive. Note:
                              the final sum of the percentages must equal 100.</p>
                            &nbsp;
                            <Tooltip
                              placement="top"
                              color={'#057CA4'}
                              title={
                                <span>
                                  Detail how your remaining estate, known as the
                                  residuary estate, should be distributed among your
                                  beneficiaries and provide an alternate plan in
                                  case they don't survive you. This helps ensure
                                  that your assets are distributed according to your
                                  wishes and provides a clear plan for any
                                  unforeseen circumstances.
                                </span>
                              }
                            >
                              <QuestionCircleOutlined />
                            </Tooltip>
                          </div>
                        )}
                        <div className="mb-3">
                          {estate.map((one, i) => {
                            const item = (
                              <div className="mb-3 flex column-form" key={i}>
                                <AvField
                                  name={`estate[${i}]`}
                                  className="form-control passdown-input-height"
                                  placeholder="Percentage of your Residuary Estate (%)"
                                  onChange={changeEstate(i)}
                                  value={estate && estate[i]}
                                  disabled={isDisabled}
                                  validate={{
                                    max: {
                                      value: 100,
                                      errorMessage: "Maximum percentage is 100",
                                    },
                                    min: {
                                      value: 0.01,
                                      errorMessage: "Minimum percentage is 0.01",
                                    },
                                  }}
                                  type="number"
                                  required
                                />
                                <AvField
                                  name={`beneficiaries[${i}]`}
                                  className="form-control-middle passdown-input-height"
                                  placeholder="Beneficiary"
                                  disabled={isDisabled}
                                  onChange={changeBeneficiaries(i)}
                                  value={beneficiaries && beneficiaries[i]}
                                  type="text"
                                  required
                                />
                                {distribution === "custom" && (
                                  <AvField
                                    className="form-control-right passdown-input-height"
                                    type="select"
                                    disabled={isDisabled}
                                    name={`beneficiaryRelations[${i}]`}
                                    value={defaultRelations && defaultRelations[i]}
                                    onChange={handleSelect(i)}
                                    id="selectInput"
                                    errorMessage="Please choose a Relationship"
                                    required
                                  >
                                    <option value="" disabled>
                                      Relationship
                                    </option>
                                    <option value="parent">Parent</option>
                                    <option value="sibling">Sibling</option>
                                    <option value="cousin">Cousin</option>
                                    <option value="grandchild">Grandchild</option>
                                    <option value="grandparent">Grandparent</option>
                                    <option value="relative">Relative</option>
                                    <option value="friend">Friend</option>
                                    <option value="child">Child</option>
                                    <option value="spouse">Spouse</option>
                                    <option value="organization">
                                      Organization
                                    </option>
                                    <option value="other">Other</option>
                                  </AvField>
                                )}

                                <div className="delete-btn-wrapper">
                                  <Button
                                    danger
                                    disabled={isDisabled}
                                    onClick={removeEstate(i)}
                                    className="form-control-right delete-btn"
                                    icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} />}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            );
                            return item;
                          })}
                        </div>
                        <Button
                          disabled={isDisabled}
                          onClick={addEstate}
                          className="mb-3 add-gift-btn"
                          icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} />}
                        >
                          Click to add a beneficiary
                        </Button>
                      </div>
                      <div className="mb-3">
                        <div className="flex">
                          <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                            If no beneficiaries survive you, who should inherit your
                            Residuary Estate?
                          </p>
                          <Tooltip
                            placement="right"
                            color={'#057CA4'}
                            overlayInnerStyle={{width: '700px'}}
                            title={
                              <span>
                                This question asks you to designate a contingent beneficiary or beneficiaries for your residuary estate, which is the remainder of your assets after all specific bequests, debts, taxes, and expenses have been paid. <br />
                                A contingent beneficiary is someone who will inherit your residuary estate in the event that none of the primary beneficiaries you've named (like a spouse, children, or others in your will) survive you. It's a way of ensuring that your assets will go to a party of your choice, rather than being distributed according to state law, which may not align with your personal wishes. <br />
                                When choosing your contingent beneficiary, consider those individuals, charities, or organizations that align with your values and wishes. This could be a close friend, a non-immediate family member, a beloved charity, or an educational institution, among others. <br />
                                Remember, it's essential that your will reflects your wishes accurately. Consider consulting with a legal professional if you're unsure about any part of this process.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginLeft: 5, marginTop: 2 }} />
                          </Tooltip>
                        </div>

                        <div className="mb-3">
                          {backupEstate.map((one, i) => {
                            const item = (
                              <div className="mb-3 flex column-form" key={i}>
                                <AvField
                                  name={`backupEstate[${i}]`}
                                  className="form-control passdown-input-height"
                                  placeholder="Percentage of your Residuary Estate (%)"
                                  onChange={changeBackupEstate(i)}
                                  value={backupEstate && backupEstate[i]}
                                  validate={{
                                    max: {
                                      value: 100,
                                      errorMessage: "Maximum percentage is 100",
                                    },
                                    min: {
                                      value: 0.01,
                                      errorMessage: "Minimum percentage is 0.01",
                                    },
                                  }}
                                  type="number"
                                  required
                                />
                                <AvField
                                  name={`backupBeneficiaries[${i}]`}
                                  className="form-control-middle passdown-input-height"
                                  placeholder="Backup beneficiary"
                                  onChange={changeBackupBeneficiaries(i)}
                                  value={
                                    backupBeneficiaries && backupBeneficiaries[i]
                                  }
                                  type="text"
                                  required
                                />
                                <AvField
                                  className="form-control-right passdown-input-height"
                                  type="select"
                                  name={`backupBeneficiaryRelations[${i}]`}
                                  value={
                                    defaultBackupRelations &&
                                    defaultBackupRelations[i]
                                  }
                                  onChange={handleBackupSelect(i)}
                                  id="selectInput"
                                  errorMessage="Please choose a Relationship"
                                  required
                                >
                                  <option value="" disabled>
                                    Relationship
                                  </option>
                                  <option value="parent">Parent</option>
                                  <option value="sibling">Sibling</option>
                                  <option value="cousin">Cousin</option>
                                  <option value="grandchild">Grandchild</option>
                                  <option value="grandparent">Grandparent</option>
                                  <option value="relative">Relative</option>
                                  <option value="friend">Friend</option>
                                  <option value="child">Child</option>
                                  <option value="spouse">Spouse</option>
                                  <option value="organization">Organization</option>
                                  <option value="other">Other</option>
                                </AvField>

                                <div className="delete-btn-wrapper">
                                  <Button
                                    danger
                                    onClick={removeBackupEstate(i)}
                                    className="form-control-right delete-btn"
                                    icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} />}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            );
                            return item;
                          })}
                        </div>

                        <Button
                          onClick={addBackupEstate}
                          className="mb-3 add-gift-btn-long"
                          icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} />}
                        >
                          Click to add a backup beneficiary
                        </Button>
                      </div>
                    </div>
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

export default withRouter(Residuary);