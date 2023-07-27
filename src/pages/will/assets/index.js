import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Tooltip, message, Spin } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  AvForm,
  AvField,
  AvRadio,
  AvRadioGroup,
} from "availity-reactstrap-validation";
import leftArrow from '../../../assets/images/icons/arrow.png'
import plus from '../../../assets/images/icons/plus.png'
import delIcon from '../../../assets/images/icons/delete.png'
import { AssetsAction, currentStepAction, chatGptAction } from "../../../store/actions";
import "react-datepicker/dist/react-datepicker.css";
import successIcon from '../../../assets/images/icons/success.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import Chat from '../chat'
import { states } from '../../../constants/auto-complete'

const Assets = (props) => {
  const dispatch = useDispatch();

  const { success, loading, content, email, edit_status, isChat } = useSelector((state) => ({
    success: state.Assets.success,
    loading: state.Assets.loading,
    content: state.Assets.content,
    email: state.Info.content?.email,
    edit_status: state.currentStep.edit_status,
    isChat: state.ChatGpt.isChat,
  }));

  React.useEffect(() => {
    if (email) dispatch(AssetsAction.getContent(email));
  }, [dispatch, email]);

  const [haveAssets, setHaveAssets] = React.useState(
    content ? content.haveAssets : "0"
  );

  const [realEstate, setRealEstate] = React.useState(
    content && content.realEstate ? content.realEstate : []
  );

  const [retirement, setRetirement] = React.useState(
    content && content.retirement ? content.retirement : []
  );

  const [brokerage, setBrokerage] = React.useState(
    content && content.brokerage ? content.brokerage : []
  );

  const [lifeInsurance, setLifeInsurance] = React.useState(
    content && content.lifeInsurance ? content.lifeInsurance : []
  );

  const [bankAccount, setBankAccount] = React.useState(
    content && content.bankAccounts ? content.bankAccounts : []
  );

  const [vehicles, setVehicles] = React.useState(
    content && content.vehicles ? content.vehicles : []
  );

  const [businesses, setBusinesses] = React.useState(
    content && content.businesses ? content.businesses : []
  );

  const [other, setOther] = React.useState(
    content && content.other ? content.other : []
  );

  React.useEffect(() => {
    setHaveAssets(content ? content.haveAssets : "0");
    setRealEstate(content && content.realEstate ? content.realEstate : []);
    setRetirement(content && content.retirement ? content.retirement : []);
    setBrokerage(content && content.brokerage ? content.brokerage : []);
    setLifeInsurance(
      content && content.lifeInsurance ? content.lifeInsurance : []
    );
    setBankAccount(content && content.bankAccounts ? content.bankAccounts : []);
    setVehicles(content && content.vehicles ? content.vehicles : []);
    setBusinesses(content && content.businesses ? content.businesses : []);
    setOther(content && content.other ? content.other : []);
  }, [content]);

  const [messageApi, contextHolder] = message.useMessage();
  const now = new Date();

  const handleValidSubmit = (event, values) => {
    if (
      haveAssets === "1" &&
      realEstate.length === 0 &&
      retirement.length === 0 &&
      brokerage.length === 0 &&
      lifeInsurance.length === 0 &&
      bankAccount.length === 0 &&
      vehicles.length === 0 &&
      businesses.length === 0 &&
      other.length === 0
    )
      messageApi.open({
        type: "warning",
        content: "Please add one of the following assets, or click no",
      });
    else {
      if (edit_status) {
        dispatch(
          AssetsAction.updateContent({
            ...values,
            assetsDate: now.toString(),
            email,
          })
        );
      } else {
        localStorage.setItem("currentStep", 9);
        dispatch(
          AssetsAction.putContent({
            ...values,
            assetsDate: now.toString(),
            email,
            lastStep: 9,
          })
        );
        props.next();
      }
    }
  };

  const handlePrev = () => {
    props.prev();
  };

  const handleAssets = (e) => {
    setHaveAssets(e.target.value);
  };

  const addRealEstate = (e) => {
    setRealEstate([...realEstate, {}]);
  };

  const removeRealEstate = (i) => () => {
    setRealEstate(realEstate.filter((child, index) => index !== i));
  };

  const changeRealEstateAddress = (i) => (e) => {
    const temp = realEstate.map((item, index) => {
      if (index === i) item.type = e.target.value;
      return item;
    });
    setRealEstate(temp);
  };

  const changeRealEstateState = (i) => (e) => {
    const temp = realEstate.map((item, index) => {
      if (index === i) item.state = e.target.value;
      return item;
    });
    setRealEstate(temp);
  };

  const changeRealEstateValue = (i) => (e) => {
    const temp = realEstate.map((item, index) => {
      if (index === i) item.value = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setRealEstate(temp);
  };

  const handleRealEstateKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = realEstate.map((item, index) => {
      if (index === i) item.value = numericValue;
      return item;
    });
    setRealEstate(temp);
  };

  const handleRealEstateOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = realEstate.map((item, index) => {
        if (index === i) item.value = "";
        return item;
      });
      setRealEstate(temp);
    }
  };

  const changeRealEstateDebt = (i) => (e) => {
    const temp = realEstate.map((item, index) => {
      if (index === i) item.debt = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setRealEstate(temp);
  };

  const handleRealEstateDebtKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = realEstate.map((item, index) => {
      if (index === i) item.debt = numericValue;
      return item;
    });
    setRealEstate(temp);
  };

  const handleRealEstateDebtOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = realEstate.map((item, index) => {
        if (index === i) item.debt = "";
        return item;
      });
      setRealEstate(temp);
    }
  };

  const addRetirement = (e) => {
    setRetirement([...retirement, {}]);
  };

  const removeRetirement = (i) => () => {
    setRetirement(retirement.filter((child, index) => index !== i));
  };

  const changeRetirementType = (i) => (e) => {
    const temp = retirement.map((item, index) => {
      if (index === i) item.type = e.target.value;
      return item;
    });
    setRetirement(temp);
  };

  const changeRetirementState = (i) => (e) => {
    const temp = retirement.map((item, index) => {
      if (index === i) item.state = e.target.value;
      return item;
    });
    setRetirement(temp);
  };

  const changeRetirementValue = (i) => (e) => {
    const temp = retirement.map((item, index) => {
      if (index === i) item.value = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setRetirement(temp);
  };

  const handleRetirementKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = retirement.map((item, index) => {
      if (index === i) item.value = numericValue;
      return item;
    });
    setRetirement(temp);
  };

  const handleRetirementOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = retirement.map((item, index) => {
        if (index === i) item.value = "";
        return item;
      });
      setRetirement(temp);
    }
  };

  const addBrokerage = (e) => {
    setBrokerage([...brokerage, {}]);
  };

  const removeBrokerage = (i) => () => {
    setBrokerage(brokerage.filter((child, index) => index !== i));
  };

  const changeBrokerageType = (i) => (e) => {
    const temp = brokerage.map((item, index) => {
      if (index === i) item.type = e.target.value;
      return item;
    });
    setBrokerage(temp);
  };

  const changeBrokerageState = (i) => (e) => {
    const temp = brokerage.map((item, index) => {
      if (index === i) item.state = e.target.value;
      return item;
    });
    setBrokerage(temp);
  };

  const changeBrokerageValue = (i) => (e) => {
    const temp = brokerage.map((item, index) => {
      if (index === i) item.value = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setBrokerage(temp);
  };

  const handleBrokerageKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = brokerage.map((item, index) => {
      if (index === i) item.value = numericValue;
      return item;
    });
    setBrokerage(temp);
  };

  const handleBrokerageOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = brokerage.map((item, index) => {
        if (index === i) item.value = "";
        return item;
      });
      setBrokerage(temp);
    }
  };

  const addLifeInsurance = (e) => {
    setLifeInsurance([...lifeInsurance, {}]);
  };

  const removeLifeInsurance = (i) => () => {
    setLifeInsurance(lifeInsurance.filter((child, index) => index !== i));
  };

  const changeLifeInsuranceType = (i) => (e) => {
    const temp = lifeInsurance.map((item, index) => {
      if (index === i) item.type = e.target.value;
      return item;
    });
    setLifeInsurance(temp);
  };

  const changeLifeInsuranceState = (i) => (e) => {
    const temp = lifeInsurance.map((item, index) => {
      if (index === i) item.state = e.target.value;
      return item;
    });
    setLifeInsurance(temp);
  };

  const changeLifeInsuranceValue = (i) => (e) => {
    const temp = lifeInsurance.map((item, index) => {
      if (index === i) item.value = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setLifeInsurance(temp);
  };

  const handleLifeInsuranceKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = lifeInsurance.map((item, index) => {
      if (index === i) item.value = numericValue;
      return item;
    });
    setLifeInsurance(temp);
  };

  const handleLifeInsuranceOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = lifeInsurance.map((item, index) => {
        if (index === i) item.value = "";
        return item;
      });
      setLifeInsurance(temp);
    }
  };

  const addBankAccount = (e) => {
    setBankAccount([...bankAccount, {}]);
  };

  const removeBankAccount = (i) => () => {
    setBankAccount(bankAccount.filter((child, index) => index !== i));
  };

  const changeBankAccountType = (i) => (e) => {
    const temp = bankAccount.map((item, index) => {
      if (index === i) item.type = e.target.value;
      return item;
    });
    setBankAccount(temp);
  };

  const changeBankAccountState = (i) => (e) => {
    const temp = bankAccount.map((item, index) => {
      if (index === i) item.state = e.target.value;
      return item;
    });
    setBankAccount(temp);
  };

  const changeBankAccountValue = (i) => (e) => {
    const temp = bankAccount.map((item, index) => {
      if (index === i) item.value = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setBankAccount(temp);
  };

  const handleBankAccountKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = bankAccount.map((item, index) => {
      if (index === i) item.value = numericValue;
      return item;
    });
    setBankAccount(temp);
  };

  const handleBankAccountOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = bankAccount.map((item, index) => {
        if (index === i) item.value = "";
        return item;
      });
      setBankAccount(temp);
    }
  };

  const addVehicles = (e) => {
    setVehicles([...vehicles, {}]);
  };

  const removeVehicles = (i) => () => {
    setVehicles(vehicles.filter((child, index) => index !== i));
  };

  const changeVehiclesType = (i) => (e) => {
    const temp = vehicles.map((item, index) => {
      if (index === i) item.type = e.target.value;
      return item;
    });
    setVehicles(temp);
  };

  const changeVehiclesState = (i) => (e) => {
    const temp = vehicles.map((item, index) => {
      if (index === i) item.state = e.target.value;
      return item;
    });
    setVehicles(temp);
  };

  const changeVehiclesValue = (i) => (e) => {
    const temp = vehicles.map((item, index) => {
      if (index === i) item.value = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setVehicles(temp);
  };

  const handleVehiclesKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = vehicles.map((item, index) => {
      if (index === i) item.value = numericValue;
      return item;
    });
    setVehicles(temp);
  };

  const handleVehiclesOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = vehicles.map((item, index) => {
        if (index === i) item.value = "";
        return item;
      });
      setVehicles(temp);
    }
  };

  const addBusinesses = (e) => {
    setBusinesses([...businesses, {}]);
  };

  const removeBusinesses = (i) => () => {
    setBusinesses(businesses.filter((child, index) => index !== i));
  };

  const changeBusinessesType = (i) => (e) => {
    const temp = businesses.map((item, index) => {
      if (index === i) item.type = e.target.value;
      return item;
    });
    setBusinesses(temp);
  };

  const changeBusinessesState = (i) => (e) => {
    const temp = businesses.map((item, index) => {
      if (index === i) item.state = e.target.value;
      return item;
    });
    setBusinesses(temp);
  };

  const changeBusinessesValue = (i) => (e) => {
    const temp = businesses.map((item, index) => {
      if (index === i) item.value = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setBusinesses(temp);
  };

  const handleBusinessesKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = businesses.map((item, index) => {
      if (index === i) item.value = numericValue;
      return item;
    });
    setBusinesses(temp);
  };

  const handleBusinessesOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = businesses.map((item, index) => {
        if (index === i) item.value = "";
        return item;
      });
      setBusinesses(temp);
    }
  };

  const addOther = (e) => {
    setOther([...other, {}]);
  };

  const removeOther = (i) => () => {
    setOther(other.filter((child, index) => index !== i));
  };

  const changeOtherType = (i) => (e) => {
    const temp = other.map((item, index) => {
      if (index === i) item.type = e.target.value;
      return item;
    });
    setOther(temp);
  };

  const changeOtherState = (i) => (e) => {
    const temp = other.map((item, index) => {
      if (index === i) item.state = e.target.value;
      return item;
    });
    setOther(temp);
  };

  const changeOtherValue = (i) => (e) => {
    const temp = other.map((item, index) => {
      if (index === i) item.value = parseInt(e.target.value).toLocaleString();
      return item;
    });
    setOther(temp);
  };

  const handleOtherKeyPress = (i) => (e) => {
    const numericValue = e.target.value.replace(/\D+/g, "");
    const temp = other.map((item, index) => {
      if (index === i) item.value = numericValue;
      return item;
    });
    setOther(temp);
  };

  const handleOtherOnBlur = (i) => (e) => {
    if (e.target.value === "NaN") {
      const temp = other.map((item, index) => {
        if (index === i) item.value = "";
        return item;
      });
      setOther(temp);
    }
  };

  const updateOk = () => {

    dispatch(AssetsAction.updateSuccess(false))
    dispatch(currentStepAction.setEditStatus(false))
    dispatch(currentStepAction.setCurrentStep(10))
  }


  const subSubmitChat = (values) => {

  };

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({ current_step: 8 }))
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
              <div className="content-wrapper passdown-container">
                {contextHolder}
                <p className="passdown-title">Assets (Optional)</p>
                <br />
                <div className="flex">
                  <p style={{ color: '#000000', fontSize: 20, marginRight: 5, lineHeight: 'normal' }}>
                    It is recommended to leave your beneficiaries with an inventory
                    of assets you have some or complete ownership over so they know
                    what you're leaving behind.
                  </p>

                </div>
                <div className="mb-3">
                  <div className="flex">
                    <p style={{ color: '#000000', fontSize: 20, marginRight: 5, lineHeight: 'normal' }}>
                      Would you like to create a quick list of your assets?
                    </p>
                    &nbsp;
                    <Tooltip
                      placement="right"
                      color={'#057CA4'}
                      overlayInnerStyle={{ width: '700px' }}
                      title={
                        <span>
                          Creating a thorough asset inventory is crucial to helping
                          your beneficiaries and executor understand the scope of your
                          estate and simplifying the probate process.<br />When listing
                          your assets, consider marital property laws in your state
                          and assume that any asset acquired during your marriage is
                          owned 50/50 with your spouse, unless a prenuptial or
                          postnuptial agreement states otherwise.<br />Include all relevant
                          categories of assets, such as real estate, retirement
                          accounts, brokerage accounts, life insurance policies, bank
                          accounts, vehicles, businesses, and other valuables like
                          jewelry, artwork, or collectibles. Remember to update your
                          inventory regularly to reflect changes in your assets and
                          store it in a secure yet accessible location, so your
                          executor and beneficiaries can easily find and reference it.
                          <br />
                          Note: this section is completely optional. Your Will remains
                          valid without this section.
                        </span>
                      }
                    >
                      <QuestionCircleOutlined />
                    </Tooltip>

                  </div>

                  <br />
                  <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                    Note: this section is completely optional. Your will remains
                    valid without the asset inventory.
                  </p>
                </div>
                <div className="mb-3">
                  <AvRadioGroup
                    inline
                    name="haveAssets"
                    value={haveAssets}
                    onChange={handleAssets}
                    required
                  >
                    <AvRadio label="Yes" value="1" />
                    <AvRadio label="No" value="0" />
                  </AvRadioGroup>
                </div>
                {haveAssets === "1" && (
                  <>
                    <div className="mb-3">
                      <p style={{ color: '#000000', fontSize: 20, marginRight: 5, lineHeight: 'normal' }}>
                        Where applicable, fill in the categories below. If you are
                        married, you should assume that any asset acquired during
                        the course of your marriage is owned 50/50 between you and
                        your spouse.
                      </p>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <p style={{ color: '#000000', fontSize: 14, marginRight: 5 }}>
                          Real Estate: list your homes below, their addresses, their
                          approximate value, and the approximate debt you owe on
                          them.
                        </p>
                        {realEstate.map((one, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`realEstate[${i}].type`}
                                className="form-control passdown-input-height"
                                placeholder="Address"
                                onChange={changeRealEstateAddress(i)}
                                value={realEstate[i]?.type}
                                type="text"
                                required
                              />
                              <AvField
                                type="select"
                                className="form-control-middle passdown-input-height"
                                errorMessage="Please choose a State"
                                name={`realEstate[${i}].state`}
                                value={realEstate[i]?.state}
                                onChange={changeRealEstateState(i)}
                                required
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
                              <AvField
                                name={`realEstate[${i}].value`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Value"
                                onKeyPress={handleRealEstateKeyPress(i)}
                                onBlur={handleRealEstateOnBlur(i)}
                                onChange={changeRealEstateValue(i)}
                                value={realEstate[i]?.value}
                                type="text"
                                required
                              />
                              <AvField
                                name={`realEstate[${i}].debt`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Debt"
                                onKeyPress={handleRealEstateDebtKeyPress(i)}
                                onBlur={handleRealEstateDebtOnBlur(i)}
                                onChange={changeRealEstateDebt(i)}
                                value={realEstate[i]?.debt}
                                type="text"
                                required
                              />

                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} width={20} height={20} />}
                                  onClick={removeRealEstate(i)}
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
                        icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} width={20} height={20} />}
                        onClick={addRealEstate}
                      >
                        Click to add real estate
                      </Button>

                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                          }}
                        >
                          Retirement Accounts: list out the account type, retirement
                          account provider/financial institution, and approximate
                          value.
                        </p>
                        {retirement.map((one, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`retirement[${i}].type`}
                                className="form-control passdown-input-height"
                                placeholder="Account Provider"
                                onChange={changeRetirementType(i)}
                                value={retirement[i]?.type}
                                type="text"
                                required
                              />
                              <AvField
                                type="select"
                                className="form-control-middle passdown-input-height"
                                errorMessage="Please choose a State"
                                name={`retirement[${i}].state`}
                                value={retirement[i]?.state}
                                onChange={changeRetirementState(i)}
                                required
                              >
                                <option value="" disabled>
                                  State Account Opened
                                </option>
                                {states.map((item, index) => {
                                  return (
                                    <option value={item.value} key={index}>{item.value}</option>
                                  )
                                })}
                              </AvField>
                              <AvField
                                name={`retirement[${i}].value`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Value"
                                onKeyPress={handleRetirementKeyPress(i)}
                                onBlur={handleRetirementOnBlur(i)}
                                onChange={changeRetirementValue(i)}
                                value={retirement[i]?.value}
                                type="text"
                                required
                              />
                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} width={20} height={20} />}
                                  onClick={removeRetirement(i)}
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
                        className="mb-3 add-gift-btn-long"
                        block
                        icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} width={20} height={20} />}
                        onClick={addRetirement}
                      >
                        Click to add retirement accounts
                      </Button>

                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                          }}
                        >
                          Brokerage Accounts: list out your brokerage account
                          provider/financial institution, and approximate value.
                        </p>
                        {brokerage.map((one, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`brokerage[${i}].type`}
                                className="form-control passdown-input-height"
                                placeholder="Account Provider"
                                onChange={changeBrokerageType(i)}
                                value={brokerage[i]?.type}
                                type="text"
                                required
                              />
                              <AvField
                                type="select"
                                className="form-control-middle passdown-input-height"
                                errorMessage="Please choose a State"
                                name={`brokerage[${i}].state`}
                                value={brokerage[i]?.state}
                                onChange={changeBrokerageState(i)}
                                required
                              >
                                <option value="" disabled>
                                  State Account Opened
                                </option>
                                {states.map((item, index) => {
                                  return (
                                    <option value={item.value} key={index}>{item.value}</option>
                                  )
                                })}
                              </AvField>
                              <AvField
                                name={`brokerage[${i}].value`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Value"
                                onKeyPress={handleBrokerageKeyPress(i)}
                                onBlur={handleBrokerageOnBlur(i)}
                                onChange={changeBrokerageValue(i)}
                                value={brokerage[i]?.value}
                                type="text"
                                required
                              />

                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} width={20} height={20} />}
                                  onClick={removeBrokerage(i)}
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
                        className="mb-3 add-gift-btn-long"
                        block
                        icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} width={20} height={20} />}
                        onClick={addBrokerage}
                      >
                        Click to add brokerage accounts
                      </Button>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                          }}
                        >
                          Life Insurance: list out the policy provider and
                          approximate value of each policy.
                        </p>
                        {lifeInsurance.map((one, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`lifeInsurance[${i}].type`}
                                className="form-control passdown-input-height"
                                placeholder="Policy Provider"
                                onChange={changeLifeInsuranceType(i)}
                                value={lifeInsurance[i]?.type}
                                type="text"
                                required
                              />
                              <AvField
                                type="select"
                                className="form-control-middle passdown-input-height"
                                errorMessage="Please choose a State"
                                name={`lifeInsurance[${i}].state`}
                                value={lifeInsurance[i]?.state}
                                onChange={changeLifeInsuranceState(i)}
                                required
                              >
                                <option value="" disabled>
                                  State Policy Purchased
                                </option>
                                {states.map((item, index) => {
                                  return (
                                    <option value={item.value} key={index}>{item.value}</option>
                                  )
                                })}
                              </AvField>
                              <AvField
                                name={`lifeInsurance[${i}].value`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Value"
                                onKeyPress={handleLifeInsuranceKeyPress(i)}
                                onBlur={handleLifeInsuranceOnBlur(i)}
                                onChange={changeLifeInsuranceValue(i)}
                                value={lifeInsurance[i]?.value}
                                type="text"
                                required
                              />

                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} width={20} height={20} />}
                                  onClick={removeLifeInsurance(i)}
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
                        icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} width={20} height={20} />}
                        onClick={addLifeInsurance}
                      >
                        Click to add life insurance
                      </Button>

                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                          }}
                        >
                          Bank Accounts: list out each bank account, corresponding
                          bank, and approximate value.
                        </p>
                        {bankAccount.map((one, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`bankAccount[${i}].type`}
                                className="form-control passdown-input-height"
                                placeholder="Bank"
                                onChange={changeBankAccountType(i)}
                                value={bankAccount[i].type}
                                type="text"
                                required
                              />
                              <AvField
                                type="select"
                                className="form-control-middle passdown-input-height"
                                errorMessage="Please choose a State"
                                name={`bankAccount[${i}].state`}
                                value={bankAccount[i]?.state}
                                onChange={changeBankAccountState(i)}
                                required
                              >
                                <option value="" disabled>
                                  State Account Opened
                                </option>
                                {states.map((item, index) => {
                                  return (
                                    <option value={item.value} key={index}>{item.value}</option>
                                  )
                                })}
                              </AvField>
                              <AvField
                                name={`bankAccount[${i}].value`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Value"
                                onKeyPress={handleBankAccountKeyPress(i)}
                                onBlur={handleBankAccountOnBlur(i)}
                                onChange={changeBankAccountValue(i)}
                                value={bankAccount[i]?.value}
                                type="text"
                                required
                              />

                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} width={20} height={20} />}
                                  onClick={removeBankAccount(i)}
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
                        icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} width={20} height={20} />}
                        onClick={addBankAccount}
                      >
                        Click to add bank account
                      </Button>

                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                          }}
                        >
                          Vehicles: list out each car you own and its approximate
                          value.
                        </p>
                        {vehicles.map((one, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`vehicles[${i}].type`}
                                className="form-control passdown-input-height"
                                placeholder="Vehicle"
                                onChange={changeVehiclesType(i)}
                                value={vehicles[i]?.type}
                                type="text"
                                required
                              />
                              <AvField
                                type="select"
                                className="form-control-middle passdown-input-height"
                                errorMessage="Please choose a State"
                                name={`vehicles[${i}].state`}
                                value={vehicles[i]?.state}
                                onChange={changeVehiclesState(i)}
                                required
                              >
                                <option value="" disabled>
                                  State Vehicle Resides
                                </option>
                                {states.map((item, index) => {
                                  return (
                                    <option value={item.value} key={index}>{item.value}</option>
                                  )
                                })}
                              </AvField>
                              <AvField
                                name={`vehicles[${i}].value`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Value"
                                onKeyPress={handleVehiclesKeyPress(i)}
                                onBlur={handleVehiclesOnBlur(i)}
                                onChange={changeVehiclesValue(i)}
                                value={vehicles[i]?.value}
                                type="text"
                                required
                              />

                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} width={20} height={20} />}
                                  onClick={removeVehicles(i)}
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
                        icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} width={20} height={20} />}
                        onClick={addVehicles}
                      >
                        Click to add a vehicle
                      </Button>

                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                          }}
                        >
                          Businesses: list out the names of your businesses, the
                          state in which they are formed, and approximate value.
                        </p>
                        {businesses.map((one, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`businesses[${i}].type`}
                                className="form-control passdown-input-height"
                                placeholder="Business Name"
                                onChange={changeBusinessesType(i)}
                                value={businesses[i]?.type}
                                type="text"
                                required
                              />
                              <AvField
                                type="select"
                                className="form-control-middle passdown-input-height"
                                errorMessage="Please choose a State"
                                name={`businesses[${i}].state`}
                                value={businesses[i]?.state}
                                onChange={changeBusinessesState(i)}
                                required
                              >
                                <option value="" disabled>
                                  State Business Formed
                                </option>
                                {states.map((item, index) => {
                                  return (
                                    <option value={item.value} key={index}>{item.value}</option>
                                  )
                                })}
                              </AvField>
                              <AvField
                                name={`businesses[${i}].value`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Value"
                                onKeyPress={handleBusinessesKeyPress(i)}
                                onBlur={handleBusinessesOnBlur(i)}
                                onChange={changeBusinessesValue(i)}
                                value={businesses[i]?.value}
                                type="text"
                                required
                              />

                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} width={20} height={20} />}
                                  onClick={removeBusinesses(i)}
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
                        icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} width={20} height={20} />}
                        onClick={addBusinesses}
                      >
                        Click to add business
                      </Button>

                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                          }}
                        >
                          Other Valuables: list out other valuables such as jewelry
                          and approximate value.
                        </p>
                        {other.map((one, i) => {
                          const item = (
                            <div className="mb-3 flex column-form" key={i}>
                              <AvField
                                name={`other[${i}].type`}
                                className="form-control passdown-input-height"
                                placeholder="Name or Description"
                                onChange={changeOtherType(i)}
                                value={other[i]?.type}
                                type="text"
                                required
                              />
                              <AvField
                                type="select"
                                className="form-control-middle passdown-input-height"
                                errorMessage="Please choose a State"
                                name={`other[${i}].state`}
                                value={other[i]?.state}
                                onChange={changeOtherState(i)}
                                required
                              >
                                <option value="" disabled>
                                  State Valuable Resides
                                </option>
                                {states.map((item, index) => {
                                  return (
                                    <option value={item.value} key={index}>{item.value}</option>
                                  )
                                })}
                              </AvField>
                              <AvField
                                name={`other[${i}].value`}
                                className="form-control-middle passdown-input-height"
                                placeholder="Estimated Value"
                                onKeyPress={handleOtherKeyPress(i)}
                                onBlur={handleOtherOnBlur(i)}
                                onChange={changeOtherValue(i)}
                                value={other[i]?.value}
                                type="text"
                                required
                              />

                              <div className="delete-btn-wrapper">
                                <Button
                                  danger
                                  className="form-control-right delete-btn"
                                  icon={<img src={delIcon} alt="delIcon" style={{ marginRight: 5 }} width={20} height={20} />}
                                  onClick={removeOther(i)}
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
                        icon={<img src={plus} alt="plus" style={{ marginRight: 5 }} width={20} height={20} />}
                        onClick={addOther}
                      >
                        Click to add other valuables
                      </Button>
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

export default withRouter(Assets);

Assets.propTypes = {
  history: PropTypes.object,
};
