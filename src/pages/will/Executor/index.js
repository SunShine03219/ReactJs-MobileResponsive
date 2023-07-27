import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, AutoComplete, Select, Spin, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { AvForm } from "availity-reactstrap-validation";
import leftArrow from '../../../assets/images/icons/arrow.png'
import { ExecutorAction, RelationsAction, currentStepAction, chatGptAction } from "../../../store/actions";
import { relationTypes, stateTypes } from "../children/selectType";
import "react-datepicker/dist/react-datepicker.css";
import successIcon from '../../../assets/images/icons/success.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import Chat from '../chat'

const Executor = (props) => {
  const dispatch = useDispatch();

  const { success, loading, content, relations, options, email, edit_status, isChat } = useSelector(
    (state) => ({
      success: state.Executor.success,
      loading: state.Executor.loading,
      content: state.Executor.content,
      relations: state.Relations.content,
      edit_status: state.currentStep.edit_status,
      isChat: state.ChatGpt.isChat,
      options:
        state.Relations.content.length !== 0 &&
        state.Relations.content.map((item) => {
          return { value: item.id, label: item.id };
        }),
      email: state.Info.content?.email,
    })
  );

  React.useEffect(() => {
    if (email) dispatch(ExecutorAction.getContent(email));
  }, [dispatch, email]);

  const [executorName, setExecutorName] = React.useState(
    content && content.executorName ? content.executorName : ""
  );

  const [executorCity, setExecutorCity] = React.useState(
    content && content.executorCity ? content.executorCity : ""
  );

  const [executorState, setExecutorState] = React.useState(
    content && content.executorState ? content.executorState : ""
  );

  const [executorRelation, setExecutorRelation] = React.useState(
    content && content.executorRelation ? content.executorRelation : ""
  );

  const [backupExecutorName, setBackupExecutorName] = React.useState(
    content && content.backupExecutorName ? content.backupExecutorName : ""
  );

  const [backupExecutorCity, setBackupExecutorCity] = React.useState(
    content && content.backupExecutorCity ? content.backupExecutorCity : ""
  );

  const [backupExecutorState, setBackupExecutorState] = React.useState(
    content && content.backupExecutorState ? content.backupExecutorState : ""
  );

  const [backupExecutorRelation, setBackupExecutorRelation] = React.useState(
    content && content.backupExecutorRelation
      ? content.backupExecutorRelation
      : ""
  );

  React.useEffect(() => {
    setExecutorName(
      content && content.executorName ? content.executorName : ""
    );
    setExecutorCity(
      content && content.executorCity ? content.executorCity : ""
    );
    setExecutorState(
      content && content.executorState ? content.executorState : ""
    );
    setExecutorRelation(
      content && content.executorRelation ? content.executorRelation : ""
    );
    setBackupExecutorName(
      content && content.backupExecutorName ? content.backupExecutorName : ""
    );
    setBackupExecutorCity(
      content && content.backupExecutorCity ? content.backupExecutorCity : ""
    );
    setBackupExecutorState(
      content && content.backupExecutorState ? content.backupExecutorState : ""
    );
    setBackupExecutorRelation(
      content && content.backupExecutorRelation
        ? content.backupExecutorRelation
        : ""
    );
  }, [content]);

  const [messageApi, contextHolder] = message.useMessage();

  const handleSearch = (value) => {
    setExecutorName(value);
  };

  const handleSearchCity = (value) => {
    setExecutorCity(value);
  };

  const handleSearchState = (value) => {
    setExecutorState(value);
  };

  const onSelect = (value) => {
    const selected = relations.find((item) => item.id === value);
    setExecutorName(selected.name);
    setExecutorCity(selected.city ? selected.city : "");
    setExecutorState(selected.state ? selected.state : "");
    setExecutorRelation(selected.relation ? selected.relation : "");
  };

  const selectExecutorRelation = (value) => {
    setExecutorRelation(value);
  };

  const handleSearchBackup = (value) => {
    setBackupExecutorName(value);
  };

  const handleSearchBackupCity = (value) => {
    setBackupExecutorCity(value);
  };

  const handleSearchBackupState = (value) => {
    setBackupExecutorState(value);
  };

  const onSelectBackup = (value) => {
    const selected = relations.find((item) => item.id === value);
    setBackupExecutorName(selected.name);
    setBackupExecutorCity(selected.city ? selected.city : "");
    setBackupExecutorState(selected.state ? selected.state : "");
    setBackupExecutorRelation(selected.relation ? selected.relation : "");
  };

  const selectBackupExecutorRelation = (value) => {
    setBackupExecutorRelation(value);
  };

  const handleValidSubmit = (event, values) => {
    if (!executorName || !executorCity || !executorState || !executorRelation)
      messageApi.open({
        type: "warning",
        content:
          "Please insert the executor's information correctly: name, city, state and relation",
      });
    else if (
      !backupExecutorName ||
      !backupExecutorCity ||
      !backupExecutorState ||
      !backupExecutorRelation
    )
      messageApi.open({
        type: "warning",
        content:
          "Please insert the backup executor's information correctly: name, city, state and relation",
      });
    else if (executorName === backupExecutorName)
      messageApi.open({
        type: "warning",
        content:
          "You can not nominate the same person as an executor and a backup executor",
      });
    else {
      if (edit_status) {
        let tempRelations = [];
        dispatch(
          ExecutorAction.updateContent({
            executorName,
            executorCity,
            executorState,
            executorRelation,
            backupExecutorName,
            backupExecutorCity,
            backupExecutorState,
            backupExecutorRelation,
            email,
          })
        );

        if (
          !relations.find((item) => item.name === executorName) &&
          executorName.length > 0
        )
          tempRelations = [
            ...relations,
            {
              id: `${executorName}-${executorCity}-${executorState}-${executorRelation}`,
              name: executorName,
              city: executorCity,
              state: executorState,
              relation: executorRelation,
            },
          ];
        else
          tempRelations = relations.map((item) => {
            if (item.name === executorName)
              item = {
                id: `${executorName}-${executorCity}-${executorState}-${executorRelation}`,
                name: executorName,
                city: executorCity,
                state: executorState,
                relation: executorRelation,
              };
            return item;
          });

        if (
          !relations.find((item) => item.name === backupExecutorName) &&
          backupExecutorName.length > 0
        )
          tempRelations = [
            ...tempRelations,
            {
              id: `${backupExecutorName}-${backupExecutorCity}-${backupExecutorState}-${backupExecutorRelation}`,
              name: backupExecutorName,
              city: backupExecutorCity,
              state: backupExecutorState,
              relation: backupExecutorRelation,
            },
          ];
        else
          tempRelations = tempRelations.map((item) => {
            if (item.name === backupExecutorName)
              item = {
                id: `${backupExecutorName}-${backupExecutorCity}-${backupExecutorState}-${backupExecutorRelation}`,
                name: backupExecutorName,
                city: backupExecutorCity,
                state: backupExecutorState,
                relation: backupExecutorRelation,
              };
            return item;
          });

        dispatch(RelationsAction.putContent(tempRelations));
      } else {
        let tempRelations = [];
        localStorage.setItem("currentStep", 5);
        dispatch(
          ExecutorAction.putContent({
            executorName,
            executorCity,
            executorState,
            executorRelation,
            backupExecutorName,
            backupExecutorCity,
            backupExecutorState,
            backupExecutorRelation,
            email,
            lastStep: 5,
          })
        );

        if (
          !relations.find((item) => item.name === executorName) &&
          executorName.length > 0
        )
          tempRelations = [
            ...relations,
            {
              id: `${executorName}-${executorCity}-${executorState}-${executorRelation}`,
              name: executorName,
              city: executorCity,
              state: executorState,
              relation: executorRelation,
            },
          ];
        else
          tempRelations = relations.map((item) => {
            if (item.name === executorName)
              item = {
                id: `${executorName}-${executorCity}-${executorState}-${executorRelation}`,
                name: executorName,
                city: executorCity,
                state: executorState,
                relation: executorRelation,
              };
            return item;
          });

        if (
          !relations.find((item) => item.name === backupExecutorName) &&
          backupExecutorName.length > 0
        )
          tempRelations = [
            ...tempRelations,
            {
              id: `${backupExecutorName}-${backupExecutorCity}-${backupExecutorState}-${backupExecutorRelation}`,
              name: backupExecutorName,
              city: backupExecutorCity,
              state: backupExecutorState,
              relation: backupExecutorRelation,
            },
          ];
        else
          tempRelations = tempRelations.map((item) => {
            if (item.name === backupExecutorName)
              item = {
                id: `${backupExecutorName}-${backupExecutorCity}-${backupExecutorState}-${backupExecutorRelation}`,
                name: backupExecutorName,
                city: backupExecutorCity,
                state: backupExecutorState,
                relation: backupExecutorRelation,
              };
            return item;
          });
        dispatch(RelationsAction.putContent(tempRelations));
        props.next();
      }
    }
  };

  const handlePrev = () => {
    props.prev();
  };


  const updateOk = () => {
    dispatch(ExecutorAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))

    dispatch(currentStepAction.setCurrentStep(10))
  }

  const subSubmitChat = (values) => {

  };

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({current_step: 4}))
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
                    <p className="passdown-title">Executor</p>
                    <br />
                    <div className="mb-3">
                      <div className="flex">
                        <p style={{ color: '#000000', fontSize: 14, lineHeight: 'normal' }}>
                          Please nominate an executor for your estate, providing
                          their full legal name, city, and state of residence, as
                          well as their relationship to you.
                        </p>
                        &nbsp;
                        <Tooltip
                          placement="bottom"
                          color={'#057CA4'}
                          title={
                            <span>
                              Nominate a reliable individual to manage your estate,
                              known as the executor, and a backup to ensure a smooth
                              probate process. <br />The executor plays a crucial role in
                              carrying out your wishes and distributing your assets,
                              so choose someone you trust and who can handle the
                              responsibilities.
                            </span>
                          }
                        >
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </div>
                      <div className="mb-3">
                        <div className="mb-3 flex column-form">
                          <AutoComplete
                            options={options}
                            style={{ width: 300 }}
                            onSelect={onSelect}
                            onSearch={handleSearch}
                            placeholder="Full name"
                            value={executorName}
                            className="passdown-input-height"
                          />
                          <AutoComplete
                            className="form-control-middle passdown-input-height"
                            style={{ width: 300 }}
                            onSearch={handleSearchCity}
                            placeholder="City"
                            value={executorCity}
                          />
                          <Select
                            className="form-control-right passdown-input-height"
                            style={{ width: 300 }}
                            placeholder="State"
                            value={executorState}
                            onChange={handleSearchState}
                            options={stateTypes}
                          />
                          <Select
                            className="form-control-middle passdown-input-height"
                            style={{ width: 300 }}
                            placeholder="Please choose a Relationship"
                            value={executorRelation}
                            onChange={selectExecutorRelation}
                            options={relationTypes}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p style={{ color: '#000000', fontSize: 14, lineHeight: 'normal' }}>
                        Additionally, please nominate a backup executor.
                      </p>
                      <div className="mb-3 flex column-form">
                        <AutoComplete
                          options={options}
                          style={{ width: 300 }}
                          onSelect={onSelectBackup}
                          onSearch={handleSearchBackup}
                          placeholder="Full name"
                          value={backupExecutorName}
                          className="passdown-input-height"
                        />
                        <AutoComplete
                          className="form-control-middle passdown-input-height"
                          style={{ width: 300 }}
                          onSearch={handleSearchBackupCity}
                          placeholder="City"
                          value={backupExecutorCity}
                        />
                        <Select
                          className="form-control-right passdown-input-height"
                          style={{ width: 300 }}
                          placeholder="State"
                          value={backupExecutorState}
                          onChange={handleSearchBackupState}
                          options={stateTypes}
                        />
                        <Select
                          className="form-control-middle passdown-input-height"
                          style={{ width: 300 }}
                          placeholder="Please choose a Relationship"
                          value={backupExecutorRelation}
                          onChange={selectBackupExecutorRelation}
                          options={relationTypes}
                        />
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

export default withRouter(Executor);

Executor.propTypes = {
  history: PropTypes.object,
};
