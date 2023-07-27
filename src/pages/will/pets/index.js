import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Tooltip, AutoComplete, Select, Spin, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  AvForm,
  AvField,
  AvRadio,
  AvRadioGroup,
} from "availity-reactstrap-validation";
import leftArrow from '../../../assets/images/icons/arrow.png'
import plus from '../../../assets/images/icons/plus.png'
import delIcon from '../../../assets/images/icons/delete.png'
import { PetsAction, RelationsAction, currentStepAction, chatGptAction } from "../../../store/actions";
import { relationTypes, stateTypes } from "../children/selectType";
import successIcon from '../../../assets/images/icons/success.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import Chat from '../chat'
import "react-datepicker/dist/react-datepicker.css";

const Pets = (props) => {
  const dispatch = useDispatch();

  const { success, loading, content, relations, options, email, edit_status, isChat } = useSelector(
    (state) => ({
      success: state.Pets.success,
      loading: state.Pets.loading,
      content: state.Pets.content,
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
    if (email) dispatch(PetsAction.getContent(email));
  }, [dispatch, email]);

  const [havePets, setHavePets] = React.useState(
    content ? content.havePets : "0"
  );
  const [allocate, setAllocate] = React.useState(
    content ? content.allocate : "0"
  );
  const [petsName, setPetsName] = React.useState(
    content && content.petsName ? content.petsName : [""]
  );
  const [species, setSpecies] = React.useState(
    content && content.species ? content.species : [""]
  );

  const [caretakerName, setCaretakerName] = React.useState(
    content && content.caretakerName ? content.caretakerName : ""
  );

  const [caretakerCity, setCaretakerCity] = React.useState(
    content && content.caretakerCity ? content.caretakerCity : ""
  );

  const [caretakerState, setCaretakerState] = React.useState(
    content && content.caretakerState ? content.caretakerState : ""
  );

  const [caretakerRelation, setCaretakerRelation] = React.useState(
    content && content.caretakerRelation ? content.caretakerRelation : ""
  );

  const [backupCaretakerName, setBackupCaretakerName] = React.useState(
    content && content.backupCaretakerName ? content.backupCaretakerName : ""
  );

  const [backupCaretakerCity, setBackupCaretakerCity] = React.useState(
    content && content.backupCaretakerCity ? content.backupCaretakerCity : ""
  );

  const [backupCaretakerState, setBackupCaretakerState] = React.useState(
    content && content.backupCaretakerState ? content.backupCaretakerState : ""
  );

  const [backupCaretakerRelation, setBackupCaretakerRelation] = React.useState(
    content && content.backupCaretakerRelation
      ? content.backupCaretakerRelation
      : ""
  );

  const [portion, setPortion] = React.useState(
    content && content.portion ? content.portion : ""
  );

  React.useEffect(() => {
    setHavePets(content ? content.havePets : "0");
    setAllocate(content ? content.allocate : "0");
    setPetsName(content && content.petsName ? content.petsName : [""]);
    setSpecies(content && content.species ? content.species : [""]);
    setCaretakerName(
      content && content.caretakerName ? content.caretakerName : ""
    );
    setCaretakerCity(
      content && content.caretakerCity ? content.caretakerCity : ""
    );
    setCaretakerState(
      content && content.caretakerState ? content.caretakerState : ""
    );
    setCaretakerRelation(
      content && content.caretakerRelation ? content.caretakerRelation : ""
    );
    setBackupCaretakerName(
      content && content.backupCaretakerName ? content.backupCaretakerName : ""
    );
    setBackupCaretakerCity(
      content && content.backupCaretakerCity ? content.backupCaretakerCity : ""
    );
    setBackupCaretakerState(
      content && content.backupCaretakerState
        ? content.backupCaretakerState
        : ""
    );
    setBackupCaretakerRelation(
      content && content.backupCaretakerRelation
        ? content.backupCaretakerRelation
        : ""
    );
    setPortion(content && content.portion ? content.portion : "");
  }, [content]);

  const [messageApi, contextHolder] = message.useMessage();

  const handleSearch = (value) => {
    setCaretakerName(value);
  };

  const handleSearchCity = (value) => {
    setCaretakerCity(value);
  };

  const handleSearchState = (value) => {
    setCaretakerState(value);
  };

  const onSelect = (value) => {
    const selected = relations.find((item) => item.id === value);
    setCaretakerName(selected.name);
    setCaretakerCity(selected.city ? selected.city : "");
    setCaretakerState(selected.state ? selected.state : "");
    setCaretakerRelation(selected.relation ? selected.relation : "");
  };

  const selectCaretakerRelation = (value) => {
    setCaretakerRelation(value);
  };

  const handleSearchBackup = (value) => {
    setBackupCaretakerName(value);
  };

  const handleSearchBackupCity = (value) => {
    setBackupCaretakerCity(value);
  };

  const handleSearchBackupState = (value) => {
    setBackupCaretakerState(value);
  };

  const onSelectBackup = (value) => {
    const selected = relations.find((item) => item.id === value);
    setBackupCaretakerName(selected.name);
    setBackupCaretakerCity(selected.city ? selected.city : "");
    setBackupCaretakerState(selected.state ? selected.state : "");
    setBackupCaretakerRelation(selected.relation ? selected.relation : "");
  };

  const selectBackupCaretakerRelation = (value) => {
    setBackupCaretakerRelation(value);
  };

  const handleValidSubmit = (event, values) => {
    if (
      havePets === "1" &&
      (!caretakerName ||
        !caretakerCity ||
        !caretakerState ||
        !caretakerRelation)
    )
      messageApi.open({
        type: "warning",
        content:
          "Please insert the caretaker's information correctly: name, city, state and relation",
      });
    else if (
      havePets === "1" &&
      (!backupCaretakerName ||
        !backupCaretakerCity ||
        !backupCaretakerState ||
        !backupCaretakerRelation)
    )
      messageApi.open({
        type: "warning",
        content:
          "Please insert the backup executor's information correctly: name, city, state and relation",
      });
    else if (havePets === "1" && caretakerName === backupCaretakerName)
      messageApi.open({
        type: "warning",
        content:
          "You can not nominate the same person as an executor and a backup executor",
      });
    else {
      if (edit_status) {
        let tempRelations = [];
        dispatch(
          PetsAction.updateContent({
            ...values,
            caretakerName,
            caretakerCity,
            caretakerState,
            caretakerRelation,
            backupCaretakerName,
            backupCaretakerCity,
            backupCaretakerState,
            backupCaretakerRelation,
            email,
          })
        );
        if (
          !relations.find((item) => item.name === caretakerName) &&
          caretakerName.length > 0
        )
          tempRelations = [
            ...relations,
            {
              id: `${caretakerName}-${caretakerCity}-${caretakerState}-${caretakerRelation}`,
              name: caretakerName,
              city: caretakerCity,
              state: caretakerState,
              relation: caretakerRelation,
            },
          ];
        else
          tempRelations = relations.map((item) => {
            if (item.name === caretakerName)
              item = {
                id: `${caretakerName}-${caretakerCity}-${caretakerState}-${caretakerRelation}`,
                name: caretakerName,
                city: caretakerCity,
                state: caretakerState,
                relation: caretakerRelation,
              };
            return item;
          });

        if (
          !relations.find((item) => item.name === backupCaretakerName) &&
          backupCaretakerName.length > 0
        )
          tempRelations = [
            ...tempRelations,
            {
              id: `${backupCaretakerName}-${backupCaretakerCity}-${backupCaretakerState}-${backupCaretakerRelation}`,
              name: backupCaretakerName,
              city: backupCaretakerCity,
              state: backupCaretakerState,
              relation: backupCaretakerRelation,
            },
          ];
        else
          tempRelations = tempRelations.map((item) => {
            if (item.name === backupCaretakerName)
              item = {
                id: `${backupCaretakerName}-${backupCaretakerCity}-${backupCaretakerState}-${backupCaretakerRelation}`,
                name: backupCaretakerName,
                city: backupCaretakerCity,
                state: backupCaretakerState,
                relation: backupCaretakerRelation,
              };
            return item;
          });

        dispatch(RelationsAction.putContent(tempRelations));

      } else {
        let tempRelations = [];
        localStorage.setItem("currentStep", 7);
        dispatch(
          PetsAction.putContent({
            ...values,
            caretakerName,
            caretakerCity,
            caretakerState,
            caretakerRelation,
            backupCaretakerName,
            backupCaretakerCity,
            backupCaretakerState,
            backupCaretakerRelation,
            email,
            lastStep: 7,
          })
        );
        if (
          !relations.find((item) => item.name === caretakerName) &&
          caretakerName.length > 0
        )
          tempRelations = [
            ...relations,
            {
              id: `${caretakerName}-${caretakerCity}-${caretakerState}-${caretakerRelation}`,
              name: caretakerName,
              city: caretakerCity,
              state: caretakerState,
              relation: caretakerRelation,
            },
          ];
        else
          tempRelations = relations.map((item) => {
            if (item.name === caretakerName)
              item = {
                id: `${caretakerName}-${caretakerCity}-${caretakerState}-${caretakerRelation}`,
                name: caretakerName,
                city: caretakerCity,
                state: caretakerState,
                relation: caretakerRelation,
              };
            return item;
          });

        if (
          !relations.find((item) => item.name === backupCaretakerName) &&
          backupCaretakerName.length > 0
        )
          tempRelations = [
            ...tempRelations,
            {
              id: `${backupCaretakerName}-${backupCaretakerCity}-${backupCaretakerState}-${backupCaretakerRelation}`,
              name: backupCaretakerName,
              city: backupCaretakerCity,
              state: backupCaretakerState,
              relation: backupCaretakerRelation,
            },
          ];
        else
          tempRelations = tempRelations.map((item) => {
            if (item.name === backupCaretakerName)
              item = {
                id: `${backupCaretakerName}-${backupCaretakerCity}-${backupCaretakerState}-${backupCaretakerRelation}`,
                name: backupCaretakerName,
                city: backupCaretakerCity,
                state: backupCaretakerState,
                relation: backupCaretakerRelation,
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

  const handlePets = (e) => {
    setHavePets(e.target.value);
    if (e.target.value === "1") setPetsName([""]);
  };

  const handleAllocate = (e) => {
    setAllocate(e.target.value);
  };

  const changePets = (i) => (e) => {
    const temp = petsName.map((petName, index) => {
      if (index === i) petName = e.target.value;
      return petName;
    });
    setPetsName(temp);
  };

  const changeSpecies = (i) => (e) => {
    const temp = species.map((item, index) => {
      if (index === i) item = e.target.value;
      return item;
    });
    setSpecies(temp);
  };

  const removePet = (i) => () => {
    setPetsName(petsName.filter((child, index) => index !== i));
    setSpecies(species.filter((child, index) => index !== i));
  };

  const addPet = (e) => {
    setPetsName([...petsName, ""]);
    setSpecies([...species, ""]);
  };

  const changePortion = (e) => {
    setPortion(parseInt(e.target.value).toLocaleString());
  };

  const handlePortionKeyPress = (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    setPortion(numericValue);
  };

  const handlePortionOnBlur = (e) => {
    if (e.target.value === "NaN") setPortion("");
  };

  const updateOk = () => {
    dispatch(PetsAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))

    dispatch(currentStepAction.setCurrentStep(10))
  }

  const subSubmitChat = (values) => {

  };

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({current_step: 6}))
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
                  <p className="passdown-title">Pets</p>
                  <br />
                  <div className="flex">
                    <p style={{ color: '#000000', fontSize: 14 }}>
                      Do you have pets that you would like to be cared for through
                      this Will?{" "}
                    </p>
                    &nbsp;
                    <Tooltip
                      placement="right"
                      color={'#057CA4'}
                      title={
                        <span>
                          List your pets' names and species if you'd like to include
                          provisions for their care after your passing.<br /> Including a
                          pet provision ensures that your beloved pets are taken
                          care of according to your wishes and that they continue to
                          receive love and care even when you are no longer able to
                          provide it.
                        </span>
                      }
                    >
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </div>
                  <div className="mb-3">
                    <AvRadioGroup
                      inline
                      name="havePets"
                      value={havePets}
                      onChange={handlePets}
                      required
                    >
                      <AvRadio label="Yes" value="1" />
                      <AvRadio label="No" value="0" />
                    </AvRadioGroup>
                  </div>
                  {havePets === "1" && (
                    <>
                      <div className="mb-3">
                        <p style={{ color: '#000000', fontSize: 14 }}>
                          Please provide your pets' names and species/types.
                        </p>
                        {petsName.map((child, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`petsName[${i}]`}
                                className="form-control passdown-input-height"
                                placeholder="Full name"
                                onChange={changePets(i)}
                                value={petsName[i]}
                                type="text"
                                required
                              />
                              <AvField
                                name={`species[${i}]`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Species"
                                onChange={changeSpecies(i)}
                                value={species[i]}
                                type="text"
                                required
                              />

                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} />}
                                  onClick={removePet(i)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          );
                          return item;
                        })}

                        <Button
                          className="mb-3 add-gift-btn"
                          block
                          icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} />}
                          onClick={addPet}
                        >
                          Click to add another pet
                        </Button>
                      </div>
                      <div className="mb-3">
                        <div className="flex">
                          <p style={{ color: '#000000', fontSize: 14 }}>
                            Please nominate a caretaker for your pets, providing
                            their full legal name, city, and state of residence, as
                            well as their relationship to you.
                          </p>
                          &nbsp;
                          <Tooltip
                            placement="top"
                            color={'#057CA4'}
                            title={
                              <span>
                                Nominate a person to care for your pets and a backup
                                to ensure they're taken care of according to your
                                wishes.<br />Select someone who will be committed to
                                providing a loving home for your pets, and a backup
                                in case the primary caretaker is unable to fulfill
                                the role.
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
                              value={caretakerName}
                              className="passdown-input-height"
                            />
                            <AutoComplete
                              className="form-control-middle passdown-input-height"
                              style={{ width: 300 }}
                              onSearch={handleSearchCity}
                              placeholder="City"
                              value={caretakerCity}
                            />
                            <Select
                              className="form-control-right passdown-input-height"
                              style={{ width: 300 }}
                              placeholder="State"
                              value={caretakerState}
                              onChange={handleSearchState}
                              options={stateTypes}
                            />
                            <Select
                              className="form-control-middle passdown-input-height"
                              style={{ width: 300 }}
                              placeholder="Please choose a Relationship"
                              value={caretakerRelation}
                              onChange={selectCaretakerRelation}
                              options={relationTypes}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p style={{ color: '#000000', fontSize: 14 }}>
                          Additionally, please nominate a backup pet caretaker.
                        </p>
                        <div className="mb-3 flex column-form">
                          <AutoComplete
                            options={options}
                            style={{ width: 300 }}
                            onSelect={onSelectBackup}
                            onSearch={handleSearchBackup}
                            placeholder="Full name"
                            value={backupCaretakerName}
                            className="passdown-input-height"
                          />
                          <AutoComplete
                            className="form-control-middle passdown-input-height"
                            style={{ width: 300 }}
                            onSearch={handleSearchBackupCity}
                            placeholder="City"
                            value={backupCaretakerCity}
                          />
                          <Select
                            className="form-control-right passdown-input-height"
                            style={{ width: 300 }}
                            placeholder="State"
                            value={backupCaretakerState}
                            onChange={handleSearchBackupState}
                            options={stateTypes}
                          />
                          <Select
                            className="form-control-middle passdown-input-height"
                            style={{ width: 300 }}
                            placeholder="Please choose a Relationship"
                            value={backupCaretakerRelation}
                            onChange={selectBackupCaretakerRelation}
                            options={relationTypes}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex">
                          <p style={{ color: '#000000', fontSize: 14 }}>
                            Do you wish to allocate a portion of your estate to the
                            Pet caretaker for the care of your pets?
                          </p>
                          &nbsp;
                          <Tooltip
                            placement="top"
                            color={'#057CA4'}
                            title={
                              <span>
                                Decide if you'd like to allocate funds from your
                                estate for your pet caretaker to use for your pets'
                                care.<br />Setting aside funds for pet care ensures that
                                your pets receive the necessary care, including
                                food, shelter, and medical expenses, without placing
                                an undue financial burden on the caretaker.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </div>
                        <div className="mb-3">
                          <AvRadioGroup
                            inline
                            name="allocate"
                            value={allocate}
                            onChange={handleAllocate}
                            required
                          >
                            <AvRadio label="Yes" value="1" />
                            <AvRadio label="No" value="0" />
                          </AvRadioGroup>
                        </div>
                      </div>
                      {allocate === "1" && (
                        <div className="mb-3">
                          <p style={{ color: '#000000', fontSize: 14 }}>
                            How much cash would you like to allocate?
                          </p>
                          <AvField
                            name="portion"
                            className="form-control-right passdown-input-height"
                            placeholder="Portion of your estate ($)"
                            onKeyPress={handlePortionKeyPress}
                            onBlur={handlePortionOnBlur}
                            onChange={changePortion}
                            value={portion}
                            type="text"
                            required
                          />
                        </div>
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

export default withRouter(Pets);

Pets.propTypes = {
  history: PropTypes.object,
};
