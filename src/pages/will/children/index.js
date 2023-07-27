import React from "react";
import { Select, Tooltip, AutoComplete, message, Spin } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AvForm,
  AvField,
  AvRadio,
  AvRadioGroup,
} from "availity-reactstrap-validation";

import { ChildrenAction, RelationsAction, currentStepAction, chatGptAction } from "../../../store/actions";
import { relationTypes, stateTypes } from "../children/selectType";
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import leftArrow from '../../../assets/images/icons/arrow.png'
import successIcon from '../../../assets/images/icons/success.png'
import "react-datepicker/dist/react-datepicker.css";
import Chat from '../chat'


const numberOfChildren = [];
for (let i = 1; i <= 15; ++i) {
  numberOfChildren.push({ value: i, label: `${i}` });
}

const Children = (props) => {
  const dispatch = useDispatch();

  const { success, loading, content, info, email, edit_status, isChat } = useSelector((state) => ({
    success: state.Children.success,
    loading: state.Children.loading,
    content: state.Children.content,
    info: state.Info.content,
    email: state.Info.content?.email,
    edit_status: state.currentStep.edit_status,
    isChat: state.ChatGpt.isChat

  }));

  React.useEffect(() => {
    if (email) dispatch(ChildrenAction.getContent(email));
  }, [dispatch, email]);

  const [haveChildren, setHaveChildren] = React.useState(
    content ? content.haveChildren : "0"
  );
  const [ageAllowed, setAgeAllowed] = React.useState(
    content ? content.ageAllowed : "0"
  );
  const [childrenname, setChildrenName] = React.useState(
    content && content.children ? content.children : []
  );

  const [number, setNumber] = React.useState(
    content && content.number ? content.number : 1
  );

  const [guardianName, setGuardianName] = React.useState(
    content && content.guardianName ? content.guardianName : ""
  );

  const [guardianCity, setGuardianCity] = React.useState(
    content && content.guardianCity ? content.guardianCity : ""
  );

  const [guardianState, setGuardianState] = React.useState(
    content && content.guardianState ? content.guardianState : ""
  );

  const [guardianRelation, setGuardianRelation] = React.useState(
    content && content.guardianRelation ? content.guardianRelation : ""
  );

  const [backupGuardianName, setBackupGuardianName] = React.useState(
    content && content.backupGuardianName ? content.backupGuardianName : ""
  );

  const [backupGuardianCity, setBackupGuardianCity] = React.useState(
    content && content.backupGuardianCity ? content.backupGuardianCity : ""
  );

  const [backupGuardianState, setBackupGuardianState] = React.useState(
    content && content.backupGuardianState ? content.backupGuardianState : ""
  );

  const [backupGuardianRelation, setBackupGuardianRelation] = React.useState(
    content && content.backupGuardianRelation
      ? content.backupGuardianRelation
      : ""
  );

  React.useEffect(() => {
    setHaveChildren(content ? content.haveChildren : "0");
    setAgeAllowed(content ? content.ageAllowed : "0");
    setChildrenName(content && content.children ? content.children : []);
    setNumber(content && content.number ? content.number : 1);
    setGuardianName(
      content && content.guardianName ? content.guardianName : ""
    );
    setGuardianCity(
      content && content.guardianCity ? content.guardianCity : ""
    );
    setGuardianState(
      content && content.guardianState ? content.guardianState : ""
    );
    setGuardianRelation(
      content && content.guardianRelation ? content.guardianRelation : ""
    );
    setBackupGuardianName(
      content && content.backupGuardianName ? content.backupGuardianName : ""
    );
    setBackupGuardianCity(
      content && content.backupGuardianCity ? content.backupGuardianCity : ""
    );
    setBackupGuardianState(
      content && content.backupGuardianState ? content.backupGuardianState : ""
    );
    setBackupGuardianRelation(
      content && content.backupGuardianRelation
        ? content.backupGuardianRelation
        : ""
    );
  }, [content]);

  const [messageApi, contextHolder] = message.useMessage();

  const handleValidSubmit = (event, values) => {
    if (
      haveChildren === "1" &&
      ageAllowed === "1" &&
      (!guardianName || !guardianCity || !guardianState || !guardianRelation)
    )
      messageApi.open({
        type: "warning",
        content:
          "Please insert the guardian's information correctly: name, city, state and relation",
      });
    else if (
      haveChildren === "1" &&
      ageAllowed === "1" &&
      (!backupGuardianName ||
        !backupGuardianCity ||
        !backupGuardianState ||
        !backupGuardianRelation)
    )
      messageApi.open({
        type: "warning",
        content:
          "Please insert the backup guardian's information correctly: name, city, state and relation",
      });
    else if (
      haveChildren === "1" &&
      ageAllowed === "1" &&
      guardianName === backupGuardianName
    )
      messageApi.open({
        type: "warning",
        content:
          "You can not nominate the same person as a guardian and a backup guardian",
      });
    else {
      let relations = [];
      if (info?.spouseFullName)
        relations.push({
          id: `${info?.spouseFullName}-${info.state}-spouse`,
          name: info?.spouseFullName,
          state: info?.state,
          relation: "spouse",
        });
      if (
        haveChildren === "1" &&
        ageAllowed === "1" &&
        guardianName &&
        guardianName !== info?.spouseFullName
      )
        relations.push({
          id: `${guardianName}-${guardianCity}-${guardianState}-${guardianRelation}`,
          name: guardianName,
          city: guardianCity,
          state: guardianState,
          relation: guardianRelation,
        });

      if (
        haveChildren === "1" &&
        ageAllowed === "1" &&
        guardianName &&
        guardianName === info?.spouseFullName
      )
        relations = relations.map((item) => ({
          ...item,
          id: `${guardianName}-${guardianCity}-${guardianState}-${guardianRelation}`,
          city: guardianCity,
        }));

      if (
        haveChildren === "1" &&
        ageAllowed === "1" &&
        backupGuardianName &&
        backupGuardianName !== info?.spouseFullName &&
        backupGuardianName !== guardianName
      )
        relations.push({
          id: `${backupGuardianName}-${backupGuardianCity}-${backupGuardianState}-${backupGuardianRelation}`,
          name: backupGuardianName,
          city: backupGuardianCity,
          state: backupGuardianState,
          relation: backupGuardianRelation,
        });

      if (
        haveChildren === "1" &&
        ageAllowed === "1" &&
        backupGuardianName &&
        backupGuardianName === info?.spouseFullName &&
        backupGuardianName !== guardianName
      )
        relations = relations.map((item) => ({
          ...item,
          id: `${backupGuardianName}-${backupGuardianCity}-${backupGuardianState}-${backupGuardianRelation}`,
          city: backupGuardianCity,
        }));

      if (number > 0 && childrenname.length === number) {
        for (let i = 0; i < number; ++i) {
          if (
            childrenname[i] !== backupGuardianName &&
            childrenname[i] !== guardianName
          )
            relations.push({
              id: `${childrenname[i]}-child`,
              name: childrenname[i],
              relation: "child",
            });
        }
      }
      if (edit_status) {
        dispatch(
          ChildrenAction.updateContent({
            ...values,
            number,
            guardianName,
            guardianCity,
            guardianState,
            guardianRelation,
            backupGuardianName,
            backupGuardianCity,
            backupGuardianState,
            backupGuardianRelation,
            email
          })
        );
        dispatch(RelationsAction.putContent(relations));
      } else {
        localStorage.setItem("currentStep", 2);
        dispatch(
          ChildrenAction.putContent({
            ...values,
            number,
            guardianName,
            guardianCity,
            guardianState,
            guardianRelation,
            backupGuardianName,
            backupGuardianCity,
            backupGuardianState,
            backupGuardianRelation,
            email,
            lastStep: 2,
          })
        );
        dispatch(RelationsAction.putContent(relations));
        props.next();
      }
    }
  };

  const handlePrev = () => {
    props.prev();
  };

  const handleChildren = (e) => {
    setHaveChildren(e.target.value);
    if (e.target.value === "1") setChildrenName([""]);
    else {
      setChildrenName([""]);
      setNumber(0);
      setGuardianName([""]);
      setGuardianCity([""]);
      setGuardianState([""]);
      setGuardianRelation([""]);
      setBackupGuardianName([""]);
      setBackupGuardianCity([""]);
      setBackupGuardianState([""]);
      setBackupGuardianRelation([""]);
      setAgeAllowed("0");
    }
  };

  const changeChildrenName = (i) => (e) => {
    const temp = childrenname.map((childname, index) => {
      if (index === i) childname = e.target.value;
      return childname;
    });
    setChildrenName(temp);
  };

  const selectNumber = (value) => {
    setNumber(value);
    let temp = [];
    for (let i = 1; i <= value; ++i) {
      temp.push("");
    }
    setChildrenName(temp);
  };

  const handleAgeAllow = (e) => {
    setAgeAllowed(e.target.value);
    if (e.target.value === "0") {
      setGuardianName("");
      setGuardianCity("");
      setGuardianState("");
      setGuardianRelation("");
      setBackupGuardianName("");
      setBackupGuardianState("");
      setBackupGuardianCity("");
      setBackupGuardianRelation("");
    }
  };

  const handleSearch = (value) => {
    setGuardianName(value);
  };

  const handleSearchCity = (value) => {
    setGuardianCity(value);
  };

  const handleSearchState = (value) => {
    setGuardianState(value);
  };

  const onSelect = (value) => {
    setGuardianName(value);
    setGuardianState(info.state);
    setGuardianRelation("spouse");
  };

  const selectGuardianRelation = (value) => {
    setGuardianRelation(value);
  };

  const handleSearchBackup = (value) => {
    if (!guardianName)
      messageApi.open({
        type: "warning",
        content: "Please nominate a guardian at first.",
      });
    else if (guardianName === value)
      messageApi.open({
        type: "warning",
        content: "You already nominated this person as a guardian!",
      });
    else setBackupGuardianName(value);
  };

  const handleSearchBackupCity = (value) => {
    setBackupGuardianCity(value);
  };

  const handleSearchBackupState = (value) => {
    setBackupGuardianState(value);
  };

  const onSelectBackup = (value) => {
    if (!guardianName)
      messageApi.open({
        type: "warning",
        content: "Please nominate a guardian at first.",
      });
    else if (guardianName === value)
      messageApi.open({
        type: "warning",
        content: "You already nominated this person as a guardian!",
      });
    else {
      setBackupGuardianName(value);
      setBackupGuardianState(info.state);
      setBackupGuardianRelation("spouse");
    }
  };

  const selectBackupGuardianRelation = (value) => {
    setBackupGuardianRelation(value);
  };

  const updateOk = () => {
    dispatch(ChildrenAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))
    dispatch(currentStepAction.setCurrentStep(10))
  }

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({ current_step: 1 }))
  }

  const subSubmitChat = (values) => {
  };


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
                  <p className="passdown-title">Children</p>
                  <br />
                  <div className="flex">
                    <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>Do you have any children?</p>
                    <Tooltip
                      placement="top"
                      color={'#057CA4'}
                      title={
                        <span>
                          List the names and birthdates of all your children,
                          including stepchildren or adopted children, to ensure
                          proper inheritance. <br />Providing this information helps to
                          accurately identify your beneficiaries and prevents
                          disputes among family members about who should inherit
                          your estate.
                        </span>
                      }
                    >
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </div>
                  <div className="mb-3">
                    <AvRadioGroup
                      inline
                      name="haveChildren"
                      value={haveChildren}
                      onChange={handleChildren}
                      required
                    >
                      <AvRadio label="Yes" value="1" />
                      <AvRadio label="No" value="0" />
                    </AvRadioGroup>
                  </div>
                  {haveChildren === "1" && (
                    <>
                      <div className="mb-3">
                        <p style={{ color: '#000000', fontSize: 14, marginTop: 20 }}>How many children do you have?</p>
                        <Select
                          placeholder="1"
                          style={{
                            width: "100%",
                          }}
                          value={number}
                          onChange={selectNumber}
                          options={numberOfChildren}
                          className="passdown-input-height"
                        />
                      </div>
                      <div className="mb-3">
                        <p style={{ color: '#000000', fontSize: 14 }}>What are their full legal names?</p>
                        {childrenname.map((child, i) => {
                          const item = (
                            <div className="mb-3" key={i}>
                              <AvField
                                name={`children[${i}]`}
                                className="form-control passdown-input-height"
                                placeholder="Full name"
                                onChange={changeChildrenName(i)}
                                value={childrenname[i]}
                                type="text"
                                required
                              />
                            </div>
                          );
                          return item;
                        })}
                      </div>
                      <div className="mb-3">
                        <div className="flex">
                          <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>Are any of your children currently minors (under the age
                            of 18)?</p>
                          <Tooltip
                            placement="top"
                            color={'#057CA4'}
                            title={
                              <span>
                                Identify any minor children to ensure appropriate
                                guardianship and financial provisions are included
                                in your will. <br />Knowing which children are minors
                                allows you to make informed decisions about their
                                care and financial support in case you pass away
                                before they reach adulthood.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </div>
                        <div className="mb-3">
                          <AvRadioGroup
                            inline
                            name="ageAllowed"
                            value={ageAllowed}
                            onChange={handleAgeAllow}
                            required
                          >
                            <AvRadio label="Yes" value="1" />
                            <AvRadio label="No" value="0" />
                          </AvRadioGroup>
                        </div>
                      </div>
                      {ageAllowed === "1" && (
                        <>
                          <div className="flex">
                            <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}> Please nominate a guardian for them, providing the
                              guardian's full legal name, city, and state of
                              residence.?</p>

                            <Tooltip
                              placement="top"
                              color={'#057CA4'}
                              title={
                                <span>
                                  Nominate a trusted individual to care for your
                                  minor children and a backup to ensure their
                                  well-being. <br />Selecting a guardian and a backup
                                  helps provide security for your children's future
                                  and ensures they receive proper care and guidance
                                  if you are no longer able to provide for them.
                                </span>
                              }
                            >
                              <QuestionCircleOutlined />
                            </Tooltip>
                          </div>
                          <div className="mb-3">
                            <div className="mb-3 flex column-form">
                              <AutoComplete
                                options={
                                  info?.spouseFullName && [
                                    { value: info?.spouseFullName },
                                  ]
                                }
                                onSelect={onSelect}
                                onSearch={handleSearch}
                                placeholder="Full name"
                                value={guardianName}
                                className="passdown-input-height"
                              />
                              <AutoComplete
                                className="form-control-middle passdown-input-height"
                                onSearch={handleSearchCity}
                                placeholder="City"
                                value={guardianCity}

                              />
                              <Select
                                className="form-control-right passdown-input-height"
                                placeholder="State"
                                value={guardianState}
                                onChange={handleSearchState}
                                options={stateTypes}
                              />
                              <Select
                                className="form-control-middle passdown-input-height"
                                placeholder="Please choose a Relationship"
                                value={guardianRelation}
                                onChange={selectGuardianRelation}
                                options={relationTypes}
                              />
                            </div>
                          </div>
                          <p style={{ color: '#000000', fontSize: 14 }}>Please nominate a backup guardian.</p>
                          <div className="mb-3">
                            <div className="mb-3 flex column-form">
                              <AutoComplete
                                options={
                                  info?.spouseFullName && [
                                    { value: info?.spouseFullName },
                                  ]
                                }
                                onSelect={onSelectBackup}
                                onSearch={handleSearchBackup}
                                placeholder="Full name"
                                value={backupGuardianName}
                                className="passdown-input-height"
                              />
                              <AutoComplete
                                className="form-control-middle passdown-input-height"
                                onSearch={handleSearchBackupCity}
                                placeholder="City"
                                value={backupGuardianCity}
                              />
                              <Select
                                className="form-control-right passdown-input-height"
                                placeholder="State"
                                value={backupGuardianState}
                                onChange={handleSearchBackupState}
                                options={stateTypes}
                              />
                              <Select
                                className="form-control-middle passdown-input-height"
                                placeholder="Please choose a Relationship"
                                value={backupGuardianRelation}
                                onChange={selectBackupGuardianRelation}
                                options={relationTypes}
                              />
                            </div>
                          </div>
                        </>
                      )}
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

export default withRouter(Children);