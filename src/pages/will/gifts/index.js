import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Tooltip, Spin, Select, AutoComplete, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { AvForm, AvRadio, AvRadioGroup } from "availity-reactstrap-validation";
import { GiftsAction, currentStepAction, chatGptAction } from "../../../store/actions";
import { relationTypes } from "../children/selectType";
import "react-datepicker/dist/react-datepicker.css";
import leftArrow from '../../../assets/images/icons/arrow.png'
import delIcon from '../../../assets/images/icons/delete.png'
import plus from '../../../assets/images/icons/plus.png'
import successIcon from '../../../assets/images/icons/success.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import Chat from '../chat'

const Gifts = (props) => {
  const dispatch = useDispatch();

  const { success, loading, content, email, relations, options, edit_status, isChat } = useSelector(
    (state) => ({
      success: state.Gifts.success,
      loading: state.Gifts.loading,
      content: state.Gifts.content,
      email: state.Info.content?.email,
      relations: state.Relations.content,
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
    if (email) dispatch(GiftsAction.getContent(email));
  }, [dispatch, email]);

  const [exist, setExist] = React.useState(content ? content.exist : "0");

  const [gifts, setGifts] = React.useState(
    content && content.gifts ? content.gifts : [""]
  );

  const [recipients, setRecipients] = React.useState(
    content && content.recipients ? content.recipients : [""]
  );

  const [recipientRelation, setRecipientRelation] = React.useState(
    content && content.recipientRelation ? content.recipientRelation : [""]
  );

  const [emptyGift, setEmptyGift] = React.useState(false);
  const [emptyRecipients, setEmptyRecipients] = React.useState(false);
  const [emptyRecipientRelation, setEmptyRecipientRelation] =
    React.useState(false);

  React.useEffect(() => {
    setExist(content ? content.exist : "0");
    setGifts(content && content.gifts ? content.gifts : [""]);
    setRecipients(content && content.recipients ? content.recipients : [""]);
    setRecipientRelation(
      content && content.recipientRelation ? content.recipientRelation : [""]
    );
  }, [content]);

  const [messageApi, contextHolder] = message.useMessage();

  const subSubmitChat = (values) => {
  };


  const handleValidSubmit = (event, values) => {
    if (
      exist === "1" &&
      (gifts.length === 0 ||
        recipients.length === 0 ||
        recipientRelation.length === 0 ||
        emptyGift ||
        emptyRecipients ||
        emptyRecipientRelation ||
        gifts.length !== recipients.length ||
        recipients.length !== recipientRelation.length)
    )
      messageApi.open({
        type: "warning",
        content: "Please fill all fields correctly",
      });
    else {
      if (edit_status) {
        dispatch(
          GiftsAction.updateContent({
            ...values,
            gifts,
            recipients,
            recipientRelation,
            email,
          })
        );
      } else {
        localStorage.setItem("currentStep", 3);
        dispatch(
          GiftsAction.putContent({
            ...values,
            gifts,
            recipients,
            recipientRelation,
            email,
            lastStep: 3,
          })
        );
        props.next();
      }
    }
  };

  const handlePrev = () => {
    props.prev();
  };

  const handleExist = (e) => {
    setExist(e.target.value);
    setGifts([""]);
    setRecipients([""]);
    setRecipientRelation([""]);
    setEmptyGift(true);
    setEmptyRecipients(true);
    setEmptyRecipientRelation(true);
  };

  const addGift = (e) => {
    setGifts([...gifts, ""]);
    setRecipients([...recipients, ""]);
    setRecipientRelation([...recipientRelation, ""]);
    setEmptyGift(true);
    setEmptyRecipients(true);
    setEmptyRecipientRelation(true);
  };

  const changeGift = (i) => (value) => {
    const temp = gifts.map((gift, index) => {
      if (index === i) gift = value;
      return gift;
    });
    if (value) setEmptyGift(false);
    else setEmptyGift(true);
    setGifts(temp);
  };

  const changeRecipient = (i) => (value) => {
    const temp = recipients.map((recipient, index) => {
      if (index === i) recipient = value;
      return recipient;
    });
    if (value) setEmptyRecipients(false);
    else setEmptyRecipients(true);
    setRecipients(temp);
  };

  const changeRecipientRelation = (i) => (value) => {
    const temp = recipientRelation.map((one, index) => {
      if (index === i) one = value;
      return one;
    });
    if (value) setEmptyRecipientRelation(false);
    else setEmptyRecipientRelation(true);
    setRecipientRelation(temp);
  };

  const removeGift = (i) => () => {
    setGifts(gifts.filter((child, index) => index !== i));
    setRecipients(recipients.filter((child, index) => index !== i));
    setRecipientRelation(
      recipientRelation.filter((child, index) => index !== i)
    );
    setEmptyGift(false);
    setEmptyRecipients(false);
    setEmptyRecipientRelation(false);
  };

  const onSelect = (i) => (value) => {
    if (value) {
      setEmptyRecipients(false);
      setEmptyRecipientRelation(false);
    }
    const selected = relations.find((item) => item.id === value);
    const tempRecipients = recipients.map((recipient, index1) => {
      if (index1 === i) recipient = selected.name ? selected.name : "";
      return recipient;
    });
    setRecipients(tempRecipients);
    const tempRecipientRelation = recipientRelation.map((one, index2) => {
      if (index2 === i) one = selected.relation ? selected.relation : "";
      return one;
    });
    setRecipientRelation(tempRecipientRelation);
  };

  const updateOk = () => {
    dispatch(GiftsAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))

    dispatch(currentStepAction.setCurrentStep(10))
  }


  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({ current_step: 2 }))

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
            <AvForm
              className="custom-form mt-4 pt-2"
              onValidSubmit={(e, v) => {
                handleValidSubmit(e, v);
              }}
            >
              {contextHolder}
              <div className="content-wrapper passdown-container">
                <p className="passdown-title">Gifts (Optional)</p>
                <br />
                <div className="flex">
                  <div className="mb-3">
                    <p style={{ color: '#000000', fontSize: 20, marginRight: 5, lineHeight: 'normal' }}>
                      Before we discuss who will inherit your estate and in what
                      percentages, are there any specific gifts you would like to
                      allocate to certain people or entities (e.g., my Toyota Prius
                      to my son, $1,000 to Doctors Without Borders, etc)?
                    </p>

                    <div className="flex">
                      <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}> Note: this section is completely optional. Your Will remains
                        valid without leaving specific gifts.
                      </p>
                      <Tooltip
                        placement="top"
                        color={'#057CA4'}
                        title={
                          <span>
                            Specify any assets or amounts you'd like to distribute to
                            particular individuals, organizations, or causes. Detailing
                            specific bequests allows you to ensure that your loved ones,
                            favorite charities, or other organizations receive the
                            assets you want them to have.
                            <br />
                            Note: leaving a gift to someone in this manner is completely
                            optional so feel free to skip this question.
                          </span>
                        }
                      >
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </div>

                  </div>

                </div>
                <div className="mb-3">
                  <AvRadioGroup
                    inline
                    name="exist"
                    value={exist}
                    onChange={handleExist}
                    required
                  >
                    <AvRadio label="Yes" value="1" />
                    <AvRadio label="No" value="0" />
                  </AvRadioGroup>
                </div>
                {exist === "1" && (
                  <div className="cutom-tooltip1">
                    <p style={{ color: '#000000', fontSize: 20, marginRight: 5, fontWeight: 'bold', marginTop: 30 }}>
                      Please specify the item you would like to gift and its
                      recipient.</p>
                    <br />
                    <div className="flex">
                      <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                        Important: some assets cannot be passed through a will,
                        click here to learn more.</p>
                      <br />
                      &nbsp;
                      <Tooltip
                        placement="right"
                        color={'#057CA4'}
                        overlayInnerStyle={{width: '700px'}}
                        title={
                          <span>
                            When preparing your will, it's essential to understand
                            that certain types of assets, such as bank accounts, are
                            not initially subject to probate. These assets generally
                            (a) allow you to designate beneficiaries from within an
                            account itself, or (b) are held under joint ownership,
                            allowing them to bypass the probate process and be
                            distributed directly to the intended recipients outside
                            of this Will.
                            <br />
                            As such it is important to understand the beneficiary
                            designations, or joint owners, that you list on those
                            accounts take precedence over any provisions you create
                            in this will.
                            <br />
                            Here is a non-exhaustive list of non-probate assets and
                            how you can pass these assets on to loved ones outside
                            of probate:
                            <br />
                            <ol>
                              <li>
                                Retirement Accounts (e.g., 401(k), IRA): Ensure you
                                have a designated beneficiary listed on your
                                account. Keep the beneficiary information up-to-date
                                and consider naming a contingent beneficiary in case
                                the primary beneficiary predeceases you.
                              </li>
                              <li>
                                Bank Accounts (e.g., checking, savings): Utilize
                                payable-on-death (POD) or transfer-on-death (TOD)
                                designations to allow the account to be transferred
                                directly to the named beneficiary upon your death.
                              </li>
                              <li>
                                Brokerage Accounts: Like bank accounts, use a TOD
                                designation to allow your investments to transfer
                                directly to the beneficiary without probate.
                              </li>
                              <li>
                                Life Insurance Policies: List a beneficiary for each
                                policy to ensure the death benefit is paid directly
                                to them upon your passing. Review and update
                                beneficiary information as needed, and consider
                                naming contingent beneficiaries.
                              </li>
                              <li>
                                Jointly Owned Property (e.g., real estate,
                                vehicles): Ensure the property is titled as joint
                                tenants with rights of survivorship or as tenants by
                                the entirety. Upon the death of one owner, the
                                property automatically passes to the surviving owner
                                without going through probate.
                              </li>
                            </ol>
                            Note, It is best practice to keep beneficiaries on those
                            accounts updated to ensure that your wishes are
                            fulfilled.
                          </span>
                        }
                      >
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </div>
                    <div className="mb-3">
                      {gifts.map((gift, i) => {
                        const item = (
                          <div className="mb-3 flex column-form" key={i}>
                            <AutoComplete
                              placeholder="Gift"
                              style={{ width: 400 }}
                              onSearch={changeGift(i)}
                              value={gifts[i]}
                              className="passdown-input-height"
                            />
                            <AutoComplete
                              options={options}
                              style={{ width: 400 }}
                              className="form-control-middle passdown-input-height"
                              placeholder="Recipient"
                              onSelect={onSelect(i)}
                              onSearch={changeRecipient(i)}
                              value={recipients[i]}
                            />
                            <Select
                              className="form-control-middle passdown-input-height"
                              placeholder="Please choose a Relationship"
                              style={{ width: 400 }}
                              value={recipientRelation[i]}
                              onChange={changeRecipientRelation(i)}
                              options={relationTypes}
                            />
                            <div className="delete-btn-wrapper">
                              <Button
                                danger
                                className="form-control-right delete-btn"
                                icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} />}
                                onClick={removeGift(i)}
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
                      icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} />}
                      onClick={addGift}
                    >
                      Click to add another gift
                    </Button>
                  </div>
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

export default withRouter(Gifts);

Gifts.propTypes = {
  history: PropTypes.object,
};
