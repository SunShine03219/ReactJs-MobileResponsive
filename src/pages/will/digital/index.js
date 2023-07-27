import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Button, AutoComplete, Select, Spin, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import leftArrow from '../../../assets/images/icons/arrow.png'
import plus from '../../../assets/images/icons/plus.png'
import delIcon from '../../../assets/images/icons/delete.png'
import { DigitalAction, RelationsAction, currentStepAction, chatGptAction } from "../../../store/actions";
import { relationTypes, stateTypes } from "../children/selectType";
import successIcon from '../../../assets/images/icons/success.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import "react-datepicker/dist/react-datepicker.css";
import Chat from '../chat'

const Digital = (props) => {
  const dispatch = useDispatch();

  const { success, loading, content, relations, email, options, edit_status, isChat } = useSelector(
    (state) => ({
      success: state.Digital.success,
      loading: state.Digital.loading,
      content: state.Digital.content,
      relations: state.Relations.content,
      email: state.Info.content?.email,
      edit_status: state.currentStep.edit_status,
      isChat: state.ChatGpt.isChat,
      options:
        state.Relations.content.length !== 0 &&
        state.Relations.content.map((item) => {
          return { value: item.id, label: item.id };
        }),
    })
  );

  React.useEffect(() => {
    if (email) dispatch(DigitalAction.getContent(email));
  }, [dispatch, email]);

  const [digitalAssets, setDigitalAssets] = React.useState(
    content ? content.digitalAssets : "0"
  );

  const [digitalExecutorName, setDigitalExecutorName] = React.useState(
    content && content.digitalExecutorName ? content.digitalExecutorName : ""
  );

  const [digitalExecutorCity, setDigitalExecutorCity] = React.useState(
    content && content.digitalExecutorCity ? content.digitalExecutorCity : ""
  );

  const [digitalExecutorState, setDigitalExecutorState] = React.useState(
    content && content.digitalExecutorState ? content.digitalExecutorState : ""
  );

  const [digitalExecutorRelation, setDigitalExecutorRelation] = React.useState(
    content && content.digitalExecutorRelation
      ? content.digitalExecutorRelation
      : ""
  );

  const [backupDigitalExecutorName, setBackupDigitalExecutorName] =
    React.useState(
      content && content.backupDigitalExecutorName
        ? content.backupDigitalExecutorName
        : ""
    );

  const [backupDigitalExecutorCity, setBackupDigitalExecutorCity] =
    React.useState(
      content && content.backupDigitalExecutorCity
        ? content.backupDigitalExecutorCity
        : ""
    );

  const [backupDigitalExecutorState, setBackupDigitalExecutorState] =
    React.useState(
      content && content.backupDigitalExecutorState
        ? content.backupDigitalExecutorState
        : ""
    );

  const [backupDigitalExecutorRelation, setBackupDigitalExecutorRelation] =
    React.useState(
      content && content.backupDigitalExecutorRelation
        ? content.backupDigitalExecutorRelation
        : ""
    );

  const [listDigitalAssets, setListDigitalAssets] = React.useState(
    content ? content.listDigitalAssets : "0"
  );

  const [digitalAssetName, setDigitalAssetName] = React.useState(
    content && content.digitalAssetName ? content.digitalAssetName : [""]
  );

  const [whereToAccess, setWhereToAccess] = React.useState(
    content && content.whereToAccess ? content.whereToAccess : [""]
  );

  const [instructions, setInstructions] = React.useState(
    content && content.instructions ? content.instructions : [""]
  );

  React.useEffect(() => {
    setDigitalAssets(content ? content.digitalAssets : "0");
    setDigitalExecutorName(
      content && content.digitalExecutorName ? content.digitalExecutorName : ""
    );
    setDigitalExecutorCity(
      content && content.digitalExecutorCity ? content.digitalExecutorCity : ""
    );
    setDigitalExecutorState(
      content && content.digitalExecutorState
        ? content.digitalExecutorState
        : ""
    );
    setDigitalExecutorRelation(
      content && content.digitalExecutorRelation
        ? content.digitalExecutorRelation
        : ""
    );
    setBackupDigitalExecutorName(
      content && content.backupDigitalExecutorName
        ? content.backupDigitalExecutorName
        : ""
    );
    setBackupDigitalExecutorCity(
      content && content.backupDigitalExecutorCity
        ? content.backupDigitalExecutorCity
        : ""
    );
    setBackupDigitalExecutorState(
      content && content.backupDigitalExecutorState
        ? content.backupDigitalExecutorState
        : ""
    );
    setBackupDigitalExecutorRelation(
      content && content.backupDigitalExecutorRelation
        ? content.backupDigitalExecutorRelation
        : ""
    );
    setListDigitalAssets(content ? content.listDigitalAssets : "0");
    setDigitalAssetName(
      content && content.digitalAssetName ? content.digitalAssetName : [""]
    );
    setWhereToAccess(
      content && content.whereToAccess ? content.whereToAccess : [""]
    );
    setInstructions(
      content && content.instructions ? content.instructions : [""]
    );
  }, [content]);

  const now = new Date();

  const [messageApi, contextHolder] = message.useMessage();

  const handleSearch = (value) => {
    setDigitalExecutorName(value);
  };

  const handleSearchCity = (value) => {
    setDigitalExecutorCity(value);
  };

  const handleSearchState = (value) => {
    setDigitalExecutorState(value);
  };

  const onSelect = (value) => {
    const selected = relations.find((item) => item.id === value);
    setDigitalExecutorName(selected.name);
    setDigitalExecutorCity(selected.city ? selected.city : "");
    setDigitalExecutorState(selected.state ? selected.state : "");
    setDigitalExecutorRelation(selected.relation ? selected.relation : "");
  };

  const selectExecutorRelation = (value) => {
    setDigitalExecutorRelation(value);
  };

  const handleSearchBackup = (value) => {
    setBackupDigitalExecutorName(value);
  };

  const handleSearchBackupCity = (value) => {
    setBackupDigitalExecutorCity(value);
  };

  const handleSearchBackupState = (value) => {
    setBackupDigitalExecutorState(value);
  };

  const onSelectBackup = (value) => {
    const selected = relations.find((item) => item.id === value);
    setBackupDigitalExecutorName(selected.name);
    setBackupDigitalExecutorCity(selected.city ? selected.city : "");
    setBackupDigitalExecutorState(selected.state ? selected.state : "");
    setBackupDigitalExecutorRelation(
      selected.relation ? selected.relation : ""
    );
  };

  const selectBackupExecutorRelation = (value) => {
    setBackupDigitalExecutorRelation(value);
  };

  const handleValidSubmit = (event, values) => {
    if (
      digitalAssets === "1" &&
      (!digitalExecutorName ||
        !digitalExecutorCity ||
        !digitalExecutorState ||
        !digitalExecutorRelation)
    )
      messageApi.open({
        type: "warning",
        content:
          "Please insert the digital executor's information correctly: name, city, state and relation",
      });
    else if (
      digitalAssets === "1" &&
      (!backupDigitalExecutorName ||
        !backupDigitalExecutorCity ||
        !backupDigitalExecutorState ||
        !backupDigitalExecutorRelation)
    )
      messageApi.open({
        type: "warning",
        content:
          "Please insert the backup digital executor's information correctly: name, city, state and relation",
      });
    else if (
      digitalAssets === "1" &&
      digitalExecutorName === backupDigitalExecutorName
    )
      messageApi.open({
        type: "warning",
        content:
          "You can not nominate the same person as a digital executor and a backup digital executor",
      });
    else {
      if (edit_status) {
        let tempRelations = [];
        dispatch(
          DigitalAction.updateContent({
            ...values,
            digitalDate: now.toString(),
            digitalExecutorName,
            digitalExecutorCity,
            digitalExecutorState,
            digitalExecutorRelation,
            backupDigitalExecutorName,
            backupDigitalExecutorCity,
            backupDigitalExecutorState,
            backupDigitalExecutorRelation,
            email,
          })
        );
        if (
          !relations.find((item) => item.name === digitalExecutorName) &&
          digitalExecutorName.length > 0
        )
          tempRelations = [
            ...relations,
            {
              id: `${digitalExecutorName}-${digitalExecutorCity}-${digitalExecutorState}-${digitalExecutorRelation}`,
              name: digitalExecutorName,
              city: digitalExecutorCity,
              state: digitalExecutorState,
              relation: digitalExecutorRelation,
            },
          ];
        else
          tempRelations = relations.map((item) => {
            if (item.name === digitalExecutorName)
              item = {
                id: `${digitalExecutorName}-${digitalExecutorCity}-${digitalExecutorState}-${digitalExecutorRelation}`,
                name: digitalExecutorName,
                city: digitalExecutorCity,
                state: digitalExecutorState,
                relation: digitalExecutorRelation,
              };
            return item;
          });

        if (
          !relations.find((item) => item.name === backupDigitalExecutorName) &&
          backupDigitalExecutorName.length > 0
        )
          tempRelations = [
            ...tempRelations,
            {
              id: `${backupDigitalExecutorName}-${backupDigitalExecutorCity}-${backupDigitalExecutorState}-${backupDigitalExecutorRelation}`,
              name: backupDigitalExecutorName,
              city: backupDigitalExecutorCity,
              state: backupDigitalExecutorState,
              relation: backupDigitalExecutorRelation,
            },
          ];
        else
          tempRelations = tempRelations.map((item) => {
            if (item.name === backupDigitalExecutorName)
              item = {
                id: `${backupDigitalExecutorName}-${backupDigitalExecutorCity}-${backupDigitalExecutorState}-${backupDigitalExecutorRelation}`,
                name: backupDigitalExecutorName,
                city: backupDigitalExecutorCity,
                state: backupDigitalExecutorState,
                relation: backupDigitalExecutorRelation,
              };
            return item;
          });

        dispatch(RelationsAction.putContent(tempRelations));
      } else {
        let tempRelations = [];
        localStorage.setItem("currentStep", 6);
        dispatch(
          DigitalAction.putContent({
            ...values,
            digitalDate: now.toString(),
            digitalExecutorName,
            digitalExecutorCity,
            digitalExecutorState,
            digitalExecutorRelation,
            backupDigitalExecutorName,
            backupDigitalExecutorCity,
            backupDigitalExecutorState,
            backupDigitalExecutorRelation,
            email,
            lastStep: 6,
          })
        );
        if (
          !relations.find((item) => item.name === digitalExecutorName) &&
          digitalExecutorName.length > 0
        )
          tempRelations = [
            ...relations,
            {
              id: `${digitalExecutorName}-${digitalExecutorCity}-${digitalExecutorState}-${digitalExecutorRelation}`,
              name: digitalExecutorName,
              city: digitalExecutorCity,
              state: digitalExecutorState,
              relation: digitalExecutorRelation,
            },
          ];
        else
          tempRelations = relations.map((item) => {
            if (item.name === digitalExecutorName)
              item = {
                id: `${digitalExecutorName}-${digitalExecutorCity}-${digitalExecutorState}-${digitalExecutorRelation}`,
                name: digitalExecutorName,
                city: digitalExecutorCity,
                state: digitalExecutorState,
                relation: digitalExecutorRelation,
              };
            return item;
          });

        if (
          !relations.find((item) => item.name === backupDigitalExecutorName) &&
          backupDigitalExecutorName.length > 0
        )
          tempRelations = [
            ...tempRelations,
            {
              id: `${backupDigitalExecutorName}-${backupDigitalExecutorCity}-${backupDigitalExecutorState}-${backupDigitalExecutorRelation}`,
              name: backupDigitalExecutorName,
              city: backupDigitalExecutorCity,
              state: backupDigitalExecutorState,
              relation: backupDigitalExecutorRelation,
            },
          ];
        else
          tempRelations = tempRelations.map((item) => {
            if (item.name === backupDigitalExecutorName)
              item = {
                id: `${backupDigitalExecutorName}-${backupDigitalExecutorCity}-${backupDigitalExecutorState}-${backupDigitalExecutorRelation}`,
                name: backupDigitalExecutorName,
                city: backupDigitalExecutorCity,
                state: backupDigitalExecutorState,
                relation: backupDigitalExecutorRelation,
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

  const handleDigitalAssets = (e) => {
    setDigitalAssets(e.target.value);
  };

  const handleListDigitalAssets = (e) => {
    setListDigitalAssets(e.target.value);
  };

  const changeDigitalAssetName = (i) => (e) => {
    const temp = digitalAssetName.map((item, index) => {
      if (index === i) item = e.target.value;
      return item;
    });
    setDigitalAssetName(temp);
  };

  const changeWhereToAccess = (i) => (e) => {
    const temp = whereToAccess.map((item, index) => {
      if (index === i) item = e.target.value;
      return item;
    });
    setWhereToAccess(temp);
  };

  const changeInstructions = (i) => (e) => {
    const temp = instructions.map((item, index) => {
      if (index === i) item = e.target.value;
      return item;
    });
    setInstructions(temp);
  };

  const removeDigitalAsset = (i) => () => {
    setDigitalAssetName(digitalAssetName.filter((one, index) => index !== i));
    setWhereToAccess(whereToAccess.filter((one, index) => index !== i));
    setInstructions(instructions.filter((one, index) => index !== i));
  };

  const addDigitalAsset = (e) => {
    setDigitalAssetName([...digitalAssetName, ""]);
    setWhereToAccess([...whereToAccess, ""]);
    setInstructions([...instructions, ""]);
  };

  const updateOk = () => {
    dispatch(DigitalAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))

    dispatch(currentStepAction.setCurrentStep(10))
  }

  const subSubmitChat = (values) => {

  };

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')

    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({current_step: 5}))
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
                    <p className="passdown-title">Digital Assets</p>
                    <br />
                    <div className="mb-3">
                      <div className="flex">
                        <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                          Do you wish to include provisions in your will for the
                          transfer of your digital assets (e.g., social media
                          accounts, online banking)?
                        </p>
                        &nbsp;
                        <Tooltip
                          placement="bottom"
                          color={'#057CA4'}
                          title={
                            <span>
                              Decide if you'd like provisions for managing your
                              digital assets, such as social media accounts, online
                              banking, and digital files. <br /> Including a provision for
                              digital assets ensures that your online presence and
                              valuable digital assets are handled according to your
                              wishes.
                            </span>
                          }
                        >
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </div>
                      <div className="mb-3">
                        <AvRadioGroup
                          inline
                          name="digitalAssets"
                          value={digitalAssets}
                          onChange={handleDigitalAssets}
                          required
                        >
                          <AvRadio label="Yes" value="1" />
                          <AvRadio label="No" value="0" />
                        </AvRadioGroup>
                      </div>
                    </div>
                    {digitalAssets === "1" && (
                      <>
                        <div className="mb-3">
                          <div className="flex">
                            <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>  Please nominate a Digital Executor, providing their
                              full legal name, city, and state of residence, as well
                              as their relationship to you.
                            </p>
                            &nbsp;
                            <Tooltip
                              placement="bottom"
                              color={'#057CA4'}
                              title={
                                <span>
                                  Nominate a person to handle your digital assets
                                  and a backup to ensure your digital legacy is
                                  managed properly.<br />The digital executor will be
                                  responsible for managing, transferring, or closing
                                  your digital accounts according to your wishes, so
                                  choose someone you trust and who is tech-savvy.
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
                                value={digitalExecutorName}
                                className="passdown-input-height"
                              />
                              <AutoComplete
                                className="form-control-middle passdown-input-height"
                                style={{ width: 300 }}
                                onSearch={handleSearchCity}
                                placeholder="City"
                                value={digitalExecutorCity}
                              />
                              <Select
                                className="form-control-right passdown-input-height"
                                style={{ width: 300 }}
                                placeholder="State"
                                value={digitalExecutorState}
                                onChange={handleSearchState}
                                options={stateTypes}
                              />
                              <Select
                                className="form-control-middle passdown-input-height"
                                style={{ width: 300 }}
                                placeholder="Please choose a Relationship"
                                value={digitalExecutorRelation}
                                onChange={selectExecutorRelation}
                                options={relationTypes}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}> Additionally, please nominate a backup Digital Executor.</p>
                          <div className="mb-3 flex column-form">
                            <AutoComplete
                              options={options}
                              style={{ width: 300 }}
                              onSelect={onSelectBackup}
                              onSearch={handleSearchBackup}
                              placeholder="Full name"
                              value={backupDigitalExecutorName}
                              className="passdown-input-height"
                            />
                            <AutoComplete
                              className="form-control-middle passdown-input-height"
                              style={{ width: 300 }}
                              onSearch={handleSearchBackupCity}
                              placeholder="City"
                              value={backupDigitalExecutorCity}
                            />
                            <Select
                              className="form-control-right passdown-input-height"
                              style={{ width: 300 }}
                              placeholder="State"
                              value={backupDigitalExecutorState}
                              onChange={handleSearchBackupState}
                              options={stateTypes}
                            />
                            <Select
                              className="form-control-middle passdown-input-height"
                              style={{ width: 300 }}
                              placeholder="Please choose a Relationship"
                              value={backupDigitalExecutorRelation}
                              onChange={selectBackupExecutorRelation}
                              options={relationTypes}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="passdown-title" style={{ marginTop: 40 }}>List of Digital Assets (Optional)</p>
                          <br />
                          <div className="mb-3">
                            <div className="mb-3">
                              <p style={{ color: '#000000', fontSize: 20, marginRight: 5, lineHeight: 'normal' }}> Would you like to list out some or all of the
                                digital assets that matter to you? It's good for
                                your Digital Executor to know what they are, where
                                they can be found, and how you want the digital
                                asset handled.</p>
                              <br />
                              <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>  Note: this section is completely optional. Your Will
                                remains valid without a list of your Digital Assets.</p>
                            </div>
                            <div className="mb-3">
                              <AvRadioGroup
                                inline
                                name="listDigitalAssets"
                                value={listDigitalAssets}
                                onChange={handleListDigitalAssets}
                                required
                              >
                                <AvRadio label="Yes" value="1" />
                                <AvRadio label="No" value="0" />
                              </AvRadioGroup>
                            </div>
                          </div>
                          {listDigitalAssets === "1" && (
                            <>
                              <div className="mb-3">
                                <div className="flex">
                                  <p style={{ color: '#000000', fontSize: 20, marginRight: 5, lineHeight: 'normal' }}> List the name of each digital asset and
                                    instructions on where to find the digital asset.
                                    Also give your digital executor additional
                                    instructions. These instructions should tell the
                                    Digital Executor (a) if you want the digital
                                    asset transferred to a loved one, (b) if you
                                    want the digital asset deleted without sharing
                                    it with any of your beneficiaries, (c) managed
                                    in any particular way, etc.</p>
                                  &nbsp;
                                  <Tooltip
                                    placement="top"
                                    color={'#057CA4'}
                                    title={
                                      <span>
                                        Digital assets include a broad range of
                                        online accounts, digital files, and
                                        intellectual property. When listing your
                                        digital assets, provide a clear description
                                        of each asset (e.g., email accounts, social
                                        media profiles, blogs, digital photos,
                                        cryptocurrency wallets), instructions on
                                        where to find them, and any additional
                                        guidance for your Digital Executor. Think
                                        about factors like privacy concerns,
                                        sentimental value, and financial
                                        implications when deciding how you'd like
                                        each asset to be managed. For example, you
                                        may want some digital assets to be archived,
                                        while others should be deleted or
                                        transferred to specific beneficiaries. By
                                        giving detailed and unambiguous
                                        instructions, you can ensure that your
                                        digital legacy is preserved and managed
                                        according to your wishes.
                                        <br />
                                        Don't forget to go to Schedule A after you
                                        create your will to manually fill in all
                                        usernames and passwords, where relevant.
                                      </span>
                                    }
                                  >
                                    <QuestionCircleOutlined />
                                  </Tooltip>
                                </div>
                                <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                                  This list will be appended to a page at the end of
                                  your will, where we will leave some blank spaces
                                  for you to fill out the username and password for
                                  the asset, should it require credentials for
                                  access.
                                </p>
                                <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                                  This page will specifically be non-testamentary,
                                  meaning that you would specify your intention to
                                  avoid having it filed publicly in any probate
                                  proceeding.
                                </p>
                                <div className="mb-3">
                                  {digitalAssetName &&
                                    digitalAssetName.map((one, i) => {
                                      const item = (
                                        <div className="mb-3 flex column-form" key={i}>
                                          <AvField
                                            name={`digitalAssetName[${i}]`}
                                            className="form-control passdown-input-height"
                                            placeholder="Digital Asset Name (ex: email, harddrive, etc)"
                                            onChange={changeDigitalAssetName(i)}
                                            value={digitalAssetName[i]}
                                            type="text"
                                            required
                                          />
                                          <AvField
                                            name={`whereToAccess[${i}]`}
                                            className="form-control-middle passdown-input-height"
                                            placeholder="Where to Access (ex: www.gmail.com, in my safe, etc)"
                                            onChange={changeWhereToAccess(i)}
                                            value={whereToAccess[i]}
                                            type="text"
                                            required
                                          />
                                          <AvField
                                            name={`instructions[${i}]`}
                                            className="form-control-right passdown-input-height"
                                            placeholder="Instructions to Digital Executor"
                                            onChange={changeInstructions(i)}
                                            value={instructions[i]}
                                            type="text"
                                            required
                                          />

                                          <div className="delete-btn-wrapper">
                                            <Button
                                              danger
                                              className="form-control-right delete-btn"
                                              icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} />}
                                              onClick={removeDigitalAsset(i)}
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
                                  className="mb-3 add-gift-btn"
                                  block
                                  icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} />}
                                  onClick={addDigitalAsset}
                                >
                                  Click to add a digital asset
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
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

export default withRouter(Digital);

Digital.propTypes = {
  history: PropTypes.object,
};
