import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Modal, Button } from "antd";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useSelector } from "react-redux";
import { MailOutlined } from "@ant-design/icons";
import Template from "./template";
import logo from "../../../assets/images/logo.svg";
import leftArrow from '../../../assets/images/icons/arrow.png'
import eidtIcon from '../../../assets/images/icons/edit.png'
import { CustomButton, CustomModalContent, ModalOverlay } from '../../../components/Custom/General'
import emailIcon from '../../../assets/images/icons/email.png'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import API from '../../../helper/api'

const Review = (props) => {
  const data = useSelector((state) => ({
    info: state.Info.content,
    children: state.Children.content,
    gifts: state.Gifts.content,
    residuary: state.Residuary.content,
    executor: state.Executor.content,
    digital: state.Digital.content,
    pets: state.Pets.content,
    provisions: state.Provisions.content,
    assets: state.Assets.content,
    user: state.Login.user,
    error:
      state.Info.error ||
      state.Children.error ||
      state.Gifts.error ||
      state.Residuary.error ||
      state.Executor.error ||
      state.Digital.error ||
      state.Pets.error ||
      state.Assets.error ||
      state.Provisions.error,
  }));

  const pdfExportComponent = React.useRef(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRedirectModalOpen, setIsRedirectModalOpen] = React.useState(false);
  const [instruction, setInstruction] = React.useState(null);
  const [allAssets, setAllAssets] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [digitalDate, setDigitalDate] = React.useState("");
  const [assetsDate, setAssetsDate] = React.useState("");
  const [totalPage, setTotalPage] = React.useState(0);
  const [space, setSpace] = React.useState(true);
  const [verifyAgain, setVerifyAgain] = useState(false)

  React.useEffect(() => {
    setDigitalDate(data?.digital?.digitalDate?.split(" "));
  }, [data?.digital]);

  React.useEffect(() => {
    setDigitalDate(data?.digital?.digitalDate?.split(" "));
    if (data?.assets?.assetsDate) {
      setAssetsDate(data?.assets?.assetsDate?.split(" "));
    }
    let temp = [];
    if (data?.assets?.realEstate) {
      temp.push({ content: data.assets.realEstate, name: "Real Estate" });
    }
    if (data?.assets?.retirement) {
      temp.push({
        content: data?.assets?.retirement,
        name: "Retirement Accounts",
      });
    }
    if (data?.assets?.brokerage) {
      temp.push({ content: data.assets.brokerage, name: "Brokerage Accounts" });
    }
    if (data?.assets?.lifeInsurance) {
      temp.push({ content: data.assets.lifeInsurance, name: "Life Insurance" });
    }
    if (data?.assets?.bankAccount) {
      temp.push({ content: data.assets.bankAccount, name: "Bank Accounts" });
    }
    if (data?.assets?.vehicles) {
      temp.push({ content: data.assets.vehicles, name: "Vehicles" });
    }
    if (data?.assets?.businesses) {
      temp.push({ content: data.assets.businesses, name: "Businesses" });
    }
    if (data?.assets?.other) {
      temp.push({ content: data.assets.other, name: "Other Valuables" });
    }
    setAllAssets(temp);
  }, [data?.assets, data?.digital]);

  const handlePrev = () => {
    props.prev();
  };

  const handleSigninClick = () => {
    props.history.push("/login");
  };

  const handleSignupClick = () => {
    localStorage.setItem('redirectWill', 'true')
    props.history.push("/register");
  };

  const showVerifyAgain = () => {
    setIsRedirectModalOpen(false)
    setVerifyAgain(true)
  }

  const sendEmailVerify = async (event, values) => {
    setVerifyAgain(false)
    const userdata = {
      fullName: data?.user?.fullName,
      email: values.email
    }
    await API.post('/send-verifyemail', userdata)
  }

  const handleSubmit = () => {
    /* Total Page and Page Size calculation */
    const headerSize = 139;

    let section1 = 0;
    if (data.children?.haveChildren === "1") {
      if (data.info?.maritalStatus === "1") section1 = 169;
      else section1 = 150;
    } else {
      if (data.info?.maritalStatus === "1") section1 = 97;
      else section1 = 78;
    }

    let section2 = 261;
    if (
      data.children?.haveChildren === "1" &&
      data.residuary?.distribution !== "spouse"
    )
      section2 += 94;
    if (data.gifts?.exist === "1")
      section2 += 107 + 35 * data.gifts?.gifts.length;
    section2 += 35 * data.residuary?.estate.length;
    if (data.residuary?.backupEstate)
      section2 += 53 + 35 * data.residuary?.backupEstate.length;

    let section3 = 0;
    if (data.digital?.digitalAssets === "1") {
      if (data.digital?.listDigitalAssets === "0") section3 = 344;
      else section3 = 401;
    }

    let section4 = 0;
    if (data.pets?.havePets === "1") {
      if (data.pets?.allocate === "0") section4 = 132;
      else section4 = 204;
    }

    let section5 = 229;
    if (data.children?.ageAllowed === "1") section5 += 94;
    if (data.digital?.digitalAssets === "1") section5 += 76;
    if (data.pets?.havePets === "1") section5 += 75;

    let section6 = 1001;
    if (data.digital?.digitalAssets === "1") section6 += 339;
    if (data.provisions?.administration === "1") section6 += 76;
    if (data.provisions?.compensation === "1") section6 += 94;

    let section7 = 247;
    if (data.provisions?.disinherit === "1") section7 += 302;

    let section8 = 0;
    if (data.provisions?.specific === "1") {
      if (
        (data.provisions?.wishForService &&
          data.provisions?.wishForRestingPlace) ||
        (data.provisions?.wishForService?.length === 0 &&
          data.provisions?.wishForRestingPlace?.length !== 0)
      )
        section8 = 113;
      if (
        data.provisions?.wishForService?.length !== 0 &&
        data.provisions?.wishForRestingPlace?.length !== 0
      )
        section8 = 148;
    }

    const totalSize =
      headerSize +
      section1 +
      section2 +
      section3 +
      section4 +
      section5 +
      section6 +
      section7 +
      section8;
    setTotalPage(parseInt(totalSize / 732) + 2);
    if (totalSize % 732 > 600) setSpace(false);
    else setSpace(true);


    if (!data?.user) {
      setContent({
        type: "unAuthorized",
        msg: "Before creating documents, please sign in or sign up!",
      });
      return setIsRedirectModalOpen(true);
    }

    if (!data.user?.email_verified) {
      setContent({
        type: "inActive",
        msg: (
          <p style={{ fontSize: "18px" }}>
            Your account is not activated. Please check your email!
          </p>
        ),
      });
      return setIsRedirectModalOpen(true);
    }

    setIsModalOpen(true);

    if (document.documentElement.clientWidth < 768) {
      setInstruction(
        <>
          <div className="mb-3">
            <h6 className="pdf-export">
              Estate Planning: Next Steps & Maintenance of Your Will
            </h6>
          </div>
          <div className="mb-3">
            <h5 className="pdf-export">A. Next Steps</h5>
            <ol>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Review & Sign Will:
                <br />
                Review your will for accuracy. Once fully satisfied, sign the
                will in the presence of two witnesses who are not beneficiaries
                in the will.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Store Original Will:
                <br />
                Store the original in a safe location. Inform your executor or
                trusted family member of its location.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Inform Executor & Key Parties:
                <br />
                Notify your executor of their role. Inform other key parties of
                their responsibilities.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Update Beneficiary Designations:
                <br />
                Review and update designations for life insurance, retirement
                accounts, etc. Align with your overall estate plan.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Create Financial Inventory:
                <br />
                List assets, liabilities, and financial documents. Provide a
                copy to your executor.
              </li>
            </ol>
          </div>
          <div className="mb-3">
            <h5 className="pdf-export">B. Maintaining Your Will</h5>
            <ol>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Review Will Periodically:
                <br />
                Review your will every 3-5 years or after significant life
                events. Make changes using our generator or consult an attorney.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Changes in Assets & Relationships:
                <br />
                Update your will when acquiring/disposing of assets or when
                relationships with key parties change.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Stay Informed on Laws:
                <br />
                Monitor changes in estate planning laws. Consult an attorney if
                necessary.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Amendments to Your Will:
                <br />
                Make changes using our will generator or work with an attorney
                for substantial updates.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Communicate with Executor:
                <br />
                Keep your executor informed of any updates or changes to your
                estate plan.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Disclaimer: passdown is not a law firm, and the use of our will
                generator does not create an attorney-client relationship. The
                information provided in this document is for general guidance
                and should not be considered legal advice. If you have any
                questions or need further assistance, consider seeking the
                counsel of an estate planning attorney to ensure your will
                remains accurate and effective.
              </li>
            </ol>
            <div style={{ minHeight: 50 }}>
              <img height="30" src={logo} alt="Company logo" />
            </div>
          </div>
        </>
      );
    } else
      setInstruction(
        <>
          <div className="mb-3">
            <h6
              className="pdf-export"
              style={{ fontFamily: "Times New Roman" }}
            >
              Estate Planning: Next Steps & Maintenance of Your Will
            </h6>
          </div>
          <div className="mb-3">
            <h6 className="pdf-export">
              Congratulations on taking the important step of creating a will
              using our do-it-yourself will generator. This document serves as a
              guide for the next steps you should take after your will has been
              generated, as well as follow-through instructions on how to
              maintain your will.
            </h6>
          </div>
          <div className="mb-3">
            <h5 className="pdf-export">A. Next Steps</h5>
            <ol>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Review & Sign the Will:
                <br />
                Carefully review the generated will to confirm that it
                accurately reflects your wishes. If you have any questions or
                concerns, consider consulting with an estate planning attorney.
                Once you are satisfied, sign the will in the presence of two
                witnesses who are not beneficiaries in the will.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Store the Original Will:
                <br />
                Store the original will in a safe and secure location, such as a
                fireproof safe or a safe deposit box. Ensure that your executor
                and/or a trusted family member know the location of the original
                will.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Inform Executor and Key Parties:
                <br />
                Inform your chosen executor of their role and provide them with
                a copy of the will. You may also want to inform other key
                parties, such as trustees or guardians, of their
                responsibilities.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Update Your Beneficiary Designations:
                <br />
                Review and update beneficiary designations for life insurance
                policies, retirement accounts, and other assets that pass
                outside of the will. Ensure that these designations align with
                your overall estate plan.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Create a Financial Inventory:
                <br />
                Compile a list of your assets, liabilities, and important
                financial documents, such as deeds, titles, and insurance
                policies. Provide a copy to your executor to help them carry out
                their duties.
              </li>
            </ol>
          </div>
          <div className="mb-3">
            <h5 className="pdf-export">B. Maintaining Your Will</h5>
            <ol>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Review Your Will Periodically:
                <br />
                Review your will every 3-5 years or after significant life
                events, such as births, deaths, marriages, or divorces. This
                will help ensure that your will remains accurate and up-to-date.
                If you need to make changes, you can use our will generator or
                consult with an estate planning attorney.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Changes in Assets:
                <br />
                If you acquire or dispose of significant assets, review your
                will to ensure it still reflects your wishes regarding the
                distribution of your estate.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Changes in Relationships:
                <br />
                If your relationships with your executor, trustees, or
                beneficiaries change, consider updating your will to reflect
                your current wishes.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Changes in Laws:
                <br />
                Stay informed of changes in estate planning laws that may affect
                your will. Consult with an estate planning attorney if you have
                any questions or concerns.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Amendments to Your Will:
                <br />
                If you need to make changes to your will, use our will generator
                or work with an estate planning attorney to create a formal
                amendment known as a codicil, or draft a new will if the changes
                are substantial.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Communicate with Your Executor:
                <br />
                Maintain an open line of communication with your executor. They
                should be aware of any updates to your will or changes to your
                estate plan.
              </li>
              <li className="pdf-export" style={{ fontSize: "11px" }}>
                Disclaimer: passdown is not a law firm, and the use of our will
                generator does not create an attorney-client relationship. The
                information provided in this document is for general guidance
                and should not be considered legal advice. If you have any
                questions or need further assistance, consider seeking the
                counsel of an estate planning attorney to ensure your will
                remains accurate and effective.
              </li>
            </ol>
            <div style={{ minHeight: 50 }}>
              <img height="30" src={logo} alt="Company logo" />
            </div>
          </div>
        </>
      );
  };

  const handleOk = async () => {
    if (pdfExportComponent.current) {
      await pdfExportComponent.current.save();
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsRedirectModalOpen(false);
  };

  return (
    <>
      <div className="content-wrapper passdown-container">
        <p className="passdown-title" style={{ marginTop: 30 }}>Review your responses</p>

        <p style={{ color: '#000000', fontSize: 20, marginRight: 5, lineHeight: 'normal' }}>
          Please review everything on this page to make sure it is in accordance
          with your wishes. If you would like to change anything, click the
          "Edit" button on the corresponding section.
        </p>

        <div className="review-card">
          <div className="review-header">
            <label>Your Information</label>
            <div className="header-top-right" onClick={() => props.backTo(9)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            <div className="row">
              <div className="col-md-6 review-item">
                <p className="review-title">FULL NAME</p>
                <p className="review-result">{data?.info?.fullName}</p>
              </div>
              <div className="col-md-6 review-item">
                <p className="review-title">STATE</p>
                <p className="review-result">{data?.info?.state}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 review-item">
                <p className="review-title">MARITAL STATUS</p>
                <p className="review-result">
                  {data?.info?.maritalStatus === "1" ? (
                    <p>I'm married to {data?.info?.spouseFullName}</p>
                  ) : data?.info?.maritalType === "single" ? (
                    <p>I am unmarried</p>
                  ) : (
                    <p>I am in a domestic partnership</p>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="review-card mt-4">
          <div className="review-header">
            <label>Children</label>
            <div className="header-top-right" onClick={() => props.backTo(8)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            {data?.children?.haveChildren === "1" ? (
              <>
                <div className="row">
                  <div className="col-md-6 review-item">
                    <p className="review-title">CHILDREN</p>
                    {data?.children?.children?.map((child, i) => (
                      <p className="review-result" key={i}>{child}</p>
                    ))}
                  </div>

                  <div className="col-md-6 review-item">
                    <p className="review-title">ARE ANY CHILDREN MINOR?</p>
                    <p className="review-result">{data?.children?.ageAllowed === "1" ? "Yes" : "No"}</p>
                  </div>

                </div>
                {data?.children?.ageAllowed === "1" && (
                  <div className="row">
                    <div className="col-md-6 review-item">
                      <p className="review-title">GUARDIANS</p>
                      <p className="review-result">
                        {data?.children?.guardianName},
                        {data?.children?.guardianCity},
                        {data?.children?.guardianState}
                      </p>
                    </div>
                    <div className="col-md-6 review-item">
                      <p className="review-title">BACKUP GUARDIANS</p>
                      <p className="review-result">
                        {data?.children?.backupGuardianName},
                        {data?.children?.backupGuardianCity},
                        {data?.children?.backupGuardianState}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <p>I have no children</p>
              </>
            )}

          </div>
        </div >

        <div className="review-card mt-4">
          <div className="review-header">
            <label>Gifts</label>
            <div className="header-top-right" onClick={() => props.backTo(7)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            {data?.gifts?.exist === "1" ? (
              <div className="row">
                {data?.gifts?.gifts?.map((gift, i) => (
                  <Row gutter={8} key={i}>
                    <Col span={8}>
                      <p>{gift}</p>
                    </Col>
                    <Col span={8}>
                      <p>{data?.gifts?.recipients[i]}</p>
                    </Col>
                    <Col span={8}>
                      <p>{data?.gifts?.recipientRelation[i]}</p>
                    </Col>
                  </Row>
                ))}
              </div>
            ) : (
              <p>There are no specific gifts</p>
            )}
          </div>
        </div>


        <div className="review-card mt-4">
          <div className="review-header">
            <label>Residuary Estate</label>
            <div className="header-top-right" onClick={() => props.backTo(6)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            {data?.residuary &&
              data?.residuary?.estate &&
              data?.residuary?.estate?.map((item, i) => (
                <div key={i}>
                  <p>
                    {item}% of residuary to {data?.residuary?.beneficiaries[i]},
                    my{" "}
                    {data?.residuary?.beneficiaryRelations
                      ? data?.residuary?.beneficiaryRelations[i]
                      : data?.residuary?.beneficiaries[0] ===
                        data?.info?.spouseFullName
                        ? "spouse"
                        : "child"}
                  </p>
                </div>
              ))}
            {data?.residuary?.backupBeneficiaries &&
              data?.residuary?.backupBeneficiaries[0] && (
                <>
                  {data?.residuary?.backupEstate[0] &&
                    data?.residuary?.backupEstate?.map((item, i) => (
                      <div key={i}>
                        <p>
                          {item}% of residuary to{" "}
                          {data?.residuary?.backupBeneficiaries[i]}, my{" "}
                          {data?.residuary?.backupBeneficiaryRelations[i]}
                        </p>
                      </div>
                    ))}
                </>
              )}
          </div>
        </div>

        <div className="review-card mt-4">
          <div className="review-header">
            <label>Executor</label>
            <div className="header-top-right" onClick={() => props.backTo(5)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            <div className="row">
              <div className="col-md-6">
                <p className="review-title">Executor for your estate</p>
                <p className="review-result">
                  {data?.executor?.executorName} {">"} {data?.executor?.executorCity} {">"} {data?.executor?.executorState} {">"} {data?.executor?.executorRelation}
                </p>
              </div>
              <div className="col-md-6">
                <p className="review-title">Backup executor for your estate</p>
                <p className="review-result">
                  {data.executor?.backupExecutorName} {">"} {data.executor?.backupExecutorCity} {">"} {data.executor?.backupExecutorState} {">"} {data.executor?.backupExecutorRelation}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="review-card mt-4">
          <div className="review-header">
            <label>Digital Assets</label>
            <div className="header-top-right" onClick={() => props.backTo(4)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            {data.digital?.digitalAssets === "1" ? (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <p className="review-title">Digital executor for your estate</p>
                    <p className="review-result">
                      {data.digital?.digitalExecutorName} {">"} {data.digital?.digitalExecutorCity} {">"} {data.digital?.digitalExecutorState} {">"} {data.digital?.digitalExecutorRelation}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="review-title">Backup digital executor for your estate</p>
                    <p className="review-result">
                      {data.digital?.backupDigitalExecutorName} {">"} {data.digital?.backupDigitalExecutorCity} {">"} {data.digital?.backupDigitalExecutorState} {">"} {data.digital?.backupDigitalExecutorRelation}
                    </p>
                  </div>
                </div>
                {data.digital?.listDigitalAssets === "1" && (
                  <>
                    <p className="review-title">List of Digital Assets</p>
                    {data.digital?.digitalAssetName &&
                      data.digital?.digitalAssetName?.map((one, i) => (
                        <Row gutter={8} key={i}>
                          <Col span={8}>{one}</Col>
                          <Col span={8}>{data.digital?.whereToAccess[i]}</Col>
                          <Col span={8}>{data.digital?.instructions[i]}</Col>
                        </Row>
                      ))}
                  </>
                )}
              </>
            ) : (
              <p>
                I don't want to include provisions in your will for the
                transfer of my digital assets
              </p>
            )}

          </div>
        </div>

        <div className="review-card mt-4">
          <div className="review-header">
            <label>Pets</label>
            <div className="header-top-right" onClick={() => props.backTo(3)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            {data.pets?.havePets === "1" ? (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <p className="review-title">My pets</p>
                    <p className="review-result">
                      {data.pets?.petsName?.map((pet, i) => (
                        <Row gutter={8} key={i}>
                          <Col span={12}>
                            <p>{pet}</p>
                          </Col>
                          <Col span={12}>{data.pets?.species[i]}</Col>
                        </Row>
                      ))}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="review-title">Caretaker of my pets</p>
                    <p className="review-result">
                      {data.pets?.caretakerName} {">"} {data.pets?.caretakerCity} {">"} {data.pets?.caretakerState} {">"} {data.pets?.caretakerRelation}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="review-title">Backup caretaker of my pets</p>
                    <p className="review-result">
                      {data.pets?.backupCaretakerName} {">"} {data.pets?.backupCaretakerCity} {">"} {data.pets?.backupCaretakerState} {">"} {data.pets?.backupCaretakerRelation}
                    </p>
                  </div>
                  <div className="col-md-6">
                    {data.pets?.allocate === "1" ? (
                      <p>
                        I direct ${data.pets?.portion} of my estate to my Pet
                        Caretaker to be used for the benefit of care of my pets
                      </p>
                    ) : (
                      <p>
                        I don't want to allocate a portion of my estate to
                        caretaker
                      </p>
                    )}
                  </div>
                </div>

              </>
            ) : (
              <p>I have no pets</p>
            )}

          </div>
        </div>

        <div className="review-card mt-4">
          <div className="review-header">
            <label>Other Provisions</label>
            <div className="header-top-right" onClick={() => props.backTo(2)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            <div className="row">
              <div className="col-md-6">
                <p className="review-title">Independent Administration</p>
                {data.provisions?.administration === "1" ? (
                  <p className="review-result">
                    I'd like to include an "Independent Administration" clause in
                    my will
                  </p>
                ) : (
                  <p className="review-result">
                    I wouldn't like to include an "Independent Administration"
                    clause in my will
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <p className="review-title">Compensation</p>
                {data.provisions?.compensation === "1" ? (
                  <p className="review-result">
                    My Executor and Digital Executor should have the option to
                    receive reasonable compensation for administering my will
                  </p>
                ) : (
                  <p className="review-result">
                    My Executor and Digital Executor shouldn't have the option to
                    receive reasonable compensation for administering my will
                  </p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="review-title">No Contest</p>
                {data.provisions?.disinherit === "1" ? (
                  <p className="review-result">
                    If any of my beneficiaries decide to contest my will, I would
                    like to disinherit them
                  </p>
                ) : (
                  <p className="review-result">
                    If any of my beneficiaries decide to contest my will, I
                    wouldn't like to disinherit them
                  </p>
                )}
              </div>

              <div className="col-md-6">
                <p className="review-title">Funeral Arrangements and Special Directives</p>
                {data.provisions?.specific === "1" ? (
                  <>
                    <p className="review-result">
                      "For my memorial service, {data.provisions?.wishForService}."
                    </p>
                    <p className="review-result">
                      "With respect to my body,{" "}
                      {data.provisions?.wishForRestingPlace}."
                    </p>
                  </>
                ) : (
                  <p>
                    I don't want to include specific instructions or wishes for my
                    burial and funeral proceedings in my will
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="review-card mt-4">
          <div className="review-header">
            <label>Assets</label>
            <div className="header-top-right" onClick={() => props.backTo(1)}>
              <label>Edit</label>
              <img src={eidtIcon} alt="eidtIcon" />
            </div>
          </div>
          <div className="review-content mt-2">
            {data.assets?.haveAssets === "1" ? (
              <div className="row">
                {data.assets?.realEstate && (
                  <>
                    <p className="review-title">Real Estate</p>
                    {data.assets?.realEstate?.map((one, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={6}>
                          <p>{one.type}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.state}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.value}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.debt}</p>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}

                {data.assets?.retirement && (
                  <>
                    <p className="review-title">Retirement Accounts</p>
                    {data.assets?.retirement?.map((one, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={6}>
                          <p>{one.type}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.state}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.value}</p>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}

                {data.assets?.brokerage && (
                  <>
                    <p className="review-title">Brokerage Accounts</p>

                    {data.assets?.brokerage?.map((one, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={6}>
                          <p>{one.type}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.state}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.value}</p>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
                {data.assets?.lifeInsurance && (
                  <>
                    <p className="review-title">Life Insurance</p>
                    {data.assets?.lifeInsurance?.map((one, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={6}>
                          <p>{one.type}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.state}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.value}</p>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
                {data.assets?.bankAccount && (
                  <>
                    <p className="review-title">Bank Accounts</p>
                    {data.assets?.bankAccount?.map((one, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={6}>
                          <p>{one.type}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.state}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.value}</p>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
                {data.assets?.vehicles && (
                  <>
                    <p className="review-title">Vehicles</p>
                    {data.assets?.vehicles?.map((one, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={6}>
                          <p>{one.type}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.state}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.value}</p>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
                {data.assets?.businesses && (
                  <>
                    <p className="review-title">Businesses</p>
                    {data.assets?.businesses?.map((one, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={6}>
                          <p>{one.type}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.state}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.value}</p>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
                {data.assets?.other && (
                  <>
                    <p className="review-title">Other Valuables</p>
                    {data.assets?.other?.map((one, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={6}>
                          <p>{one.type}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.state}</p>
                        </Col>
                        <Col span={6}>
                          <p>{one.value}</p>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}

              </div>
            ) : (
              <p>I have no assets</p>
            )}

          </div>
        </div>

        <div className="button-wrapper" style={{ marginBottom: 50 }}>
          <div className="bottom-left" onClick={handlePrev}>
            <img src={leftArrow} alt="leftArrow" />
            <label>Previous</label>
          </div>
          <button
            className="button button--submit"
            type="button"
            onClick={handleSubmit}
          >
            <h5 style={{ color: "white", margin: 0 }}> Save & Download </h5>
          </button>
        </div>

      </div >
      <Modal
        title={
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "375px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fee1b7",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                height: "3rem",
                width: "3rem",
              }}
            >
              <MailOutlined style={{ fontSize: "22px" }} />
            </div>
            <h5 style={{ margin: "6px", paddingLeft: "8px", fontSize: "22px" }}>
              Unverified email address!
            </h5>
          </div>
        }
        open={isRedirectModalOpen}
        closable={true}
        onCancel={() => setIsRedirectModalOpen(false)}
        footer={
          content.type === "unAuthorized" ? (
            [
              <Button
                type="primary"
                ghost
                key="Sign in"
                onClick={handleSigninClick}
              >
                Sign in
              </Button>,
              <Button type="primary" key="Sign up" onClick={handleSignupClick}>
                Sign up
              </Button>,
            ]
          ) : (
            <Button type="primary" key="Sign up" onClick={showVerifyAgain}>
              Verify Again
            </Button>
          )
        }
      >
        {content.msg}
      </Modal>
      <Modal
        title={"Preview"}
        open={isModalOpen}
        onOk={handleOk}
        okText="Download"
        onCancel={handleCancel}
        closable={false}
      >
        <PDFExport
          pageTemplate={(props) => (
            <Template
              {...props}
              name={data?.info?.fullName}
              attached={
                data?.digital?.listDigitalAssets === "1"
                  ? data?.assets?.haveAssets === "1"
                    ? 2
                    : 1
                  : data?.assets?.haveAssets === "1"
                    ? 1
                    : 0
              }
              digital={data.digital?.listDigitalAssets === "1"}
            />
          )}
          fileName={`Last Will and Testament of ${data.info?.fullName}.pdf`}
          ref={pdfExportComponent}
          paperSize={"A4"}
          forcePageBreak=".page-break"
          margin={{ top: "20mm", left: "20mm", right: "13mm", bottom: "30mm" }}
        >
          <div style={{ position: "relative" }}>
            <div style={{ minHeight: 70 }}>
              <img height="50" src={logo} alt="Company logo" />
            </div>
            <div style={{ minHeight: 0, display: "none" }}>
              <img height="0" src={logo} alt="Company logo" />
            </div>
            {instruction}
            <div className="main-content">
              <div className="pdf-header page-break">
                <p className="pdf-export">
                  Last Will and Testament of &nbsp;{data.info?.fullName}
                </p>
              </div>
              <p className="title pdf-export">
                I, {data.info?.fullName} ("Testator"), a resident of the State of{" "}
                &nbsp;
                {data.info?.state} make and declare this Last Will and Testament
                ("Will") to be my Will while revoking all wills and codicils
                previously made by me.
              </p>
              <section>
                <p className="subtitle pdf-export">
                  ARTICLE I: FAMILY IDENTIFICATION
                </p>
                {data.info?.maritalStatus === "1" ? (
                  <p className="description pdf-export">
                    As of the date of this Will, I am married to &nbsp;
                    {data.info?.spouseFullName}, who I may refer to as "my
                    spouse" in various provisions throughout this Will.
                  </p>
                ) : data.info?.maritalType === "single" ? (
                  data.children?.haveChildren === "1" ? (
                    <p className="description pdf-export">
                      As of the date of this Will, I am unmarried.
                    </p>
                  ) : (
                    <p className="description pdf-export">
                      As of the date of this Will, I am unmarried and without
                      children.
                    </p>
                  )
                ) : data.children?.haveChildren === "1" ? (
                  <p className="description pdf-export">
                    I am in a domestic partnership.
                  </p>
                ) : (
                  <p className="description pdf-export">
                    I am in a domestic partnership. I do not have children.
                  </p>
                )}
                {data.children?.haveChildren === "1" && (
                  <p className="description pdf-export">
                    I have {data.children?.number} children and their names are{" "}
                    {data.children?.children?.map((child, i) => {
                      if (i === data.children?.children.length - 1)
                        return `and ${child}.`;
                      return `${child}, `;
                    })}{" "}
                    &nbsp; Any and all references to "my children" in this Will
                    are references to the aforementioned children in addition to
                    any future born children or any children adopted by me after
                    the execution of this Will.
                  </p>
                )}
              </section>
              <section>
                <p className="subtitle pdf-export">
                  ARTICLE II: DISPOSITION OF MY ESTATE
                </p>
                <p className="description pdf-export">
                  I direct the disposition of all the property of my estate in
                  the following manner and order of priority:
                </p>
                <ol>
                  <li className="description pdf-export">
                    Debts, Taxes, and Expenses: all of my debts, taxes, and
                    funeral expenses shall be accounted for and paid from my
                    estate.
                  </li>
                  {data.gifts?.exist === "1" && (
                    <li className="description pdf-export">
                      <p className="description pdf-export">
                        Specific Gifts: the following specific bequests shall be
                        accounted for and paid from my estate:
                      </p>
                      {data.gifts?.gifts?.map((gift, i) => (
                        <div key={i}>
                          <p className="description pdf-export">
                            {gift} shall be given to {data.gifts?.recipients[i]}
                            {data.gifts?.recipientRelation[i] !== "other"
                              ? data.gifts?.recipientRelation[i] !==
                                "organization"
                                ? `, my ${data.gifts?.recipientRelation[i]}`
                                : ", an organization"
                              : ""}
                            .
                          </p>
                        </div>
                      ))}
                      <p className="description pdf-export">
                        If any of beneficiaries of these Specific Bequests fail
                        to survive me, then this bequest shall be distributed
                        with my residuary estate as outlined in the Section C of
                        this Article.
                      </p>
                    </li>
                  )}
                  <li className="description pdf-export">
                    <div className="mb-3">
                      <p className="description pdf-export">
                        Residuary Estate: my Residuary Estate shall be accounted
                        for and distributed in the following manner:
                      </p>
                    </div>
                    {data.residuary?.estate &&
                      data.residuary?.estate?.map((item, i) => (
                        <div key={i}>
                          <p className="description pdf-export">
                            {item}% shall go to{" "}
                            {data.residuary?.beneficiaries[i]}
                            {data.residuary?.beneficiaryRelations
                              ? data.residuary?.beneficiaryRelations[i] !==
                                "other"
                                ? data.residuary?.beneficiaryRelations[i] !==
                                  "organization"
                                  ? `, my ${data.residuary?.beneficiaryRelations[i]}`
                                  : ", an organization"
                                : ""
                              : data.residuary?.beneficiaries[0] ===
                                data.info?.spouseFullName
                                ? ", my spouse"
                                : ", my child"}
                            .
                          </p>
                        </div>
                      ))}
                    <p className="description pdf-export">
                      If any of the beneficiaries of my Residuary Estate fail to
                      survive me, then their share shall lapse, and their share
                      shall be distributed to the remaining Residuary Estate
                      beneficiaries in equal shares.{" "}
                      {data.children?.haveChildren === "1" &&
                        data.residuary?.distribution !== "spouse" &&
                        `Notwithstanding the
                    foregoing, if it is one of my children that fails to survive
                    me, then his or her share shall be distributed to the
                    children of my deceased child in equal shares. If the child
                    who failed to survive me does not have children, then that
                    child's share shall be distributed to my remaining living
                    children in equal shares, unless no remaining children of
                    mine survive me, in which case the share shall be
                    distributed in equal shares to each remaining Residuary
                    Estate beneficiary.`}
                    </p>
                    {data.residuary?.backupBeneficiaries && (
                      <>
                        <p className="description pdf-export">
                          If no Residuary Estate beneficiary survives me, then
                          the Residuary Estate shall be distributed in the final
                          manner:{" "}
                        </p>
                        {data.residuary?.backupEstate &&
                          data.residuary?.backupEstate?.map((item, i) => (
                            <div key={i}>
                              <p className="description pdf-export">
                                {item}% shall go to{" "}
                                {data.residuary?.backupBeneficiaries[i]}
                                {data.residuary?.backupBeneficiaryRelations[
                                  i
                                ] !== "other"
                                  ? data.residuary?.backupBeneficiaryRelations[
                                    i
                                  ] !== "organization"
                                    ? `, my ${data.residuary?.backupBeneficiaryRelations[i]}`
                                    : ", an organization"
                                  : ""}
                                .
                              </p>
                            </div>
                          ))}
                      </>
                    )}
                  </li>
                </ol>
              </section>
              {data.digital?.digitalAssets === "1" && (
                <section>
                  <p className="subtitle pdf-export">
                    ARTICLE III: TRANSFER OF DIGITAL ASSETS
                  </p>
                  <>
                    <p className="pdf-export description">
                      {data.digital?.listDigitalAssets === "1"
                        ? `I direct my digital assets to be distributed and
                    administered in the manner set forth in a separate writing
                    that I left for my Digital Executor. To the extent I have
                    not left specific instructions or adequate instructions for
                    any of my digital assets, my`
                        : "My"}{" "}
                      Digital Executor shall have complete discretion in
                      administering{" "}
                      {data.digital?.listDigitalAssets === "1" ? "those" : "my"}{" "}
                      digital assets in accordance with this section and the
                      remaining provisions of my Will. If the laws in my state
                      do not recognize the role of a Digital Executor, then all
                      the responsibilities and duties set forth in this Will
                      pertaining to my Digital Executor shall be assumed by my
                      Executor.{" "}
                    </p>
                    <p className="pdf-export description">
                      For the avoidance of doubt, my digital assets include my
                      online accounts such as social media accounts, photo and
                      data storage services, email accounts, and all data stored
                      therein as well as other online virtual property such as
                      domain names, blogs, websites, cryptocurrency, non
                      fungible tokens, and any other digital intellectual
                      property that I owned upon my death. My digital assets
                      shall also include all electronic assets and electronic
                      data and files stored on my computers, hard drives,
                      phones, or any other electronic devices that I may have
                      owned or had access to.
                    </p>
                    <p className="pdf-export description">
                      In furtherance of the foregoing, I authorize the custodian
                      of any of my digital assets to provide access to such
                      digital assets to my Digital Executor.
                    </p>
                    <br />
                  </>
                </section>
              )}
              {data.pets?.havePets === "1" && (
                <section>
                  <p className="subtitle pdf-export">
                    ARTICLE {data.digital?.digitalAssets === "1" ? "IV" : "III"}:
                    PET CARE DIRECTIVES
                  </p>
                  <>
                    <p className="description pdf-export">
                      My pets include{" "}
                      {data.pets?.petsName &&
                        data.pets?.petsName?.map((pet, i) => {
                          if (
                            data.pets?.petsName.length > 1 &&
                            i === data.pets?.petsName.length - 1
                          )
                            return `, and ${pet}, my ${data.pets?.species[i]}`;
                          return ` ${pet}, my ${data.pets?.species[i]}`;
                        })}
                      .
                    </p>
                    <p className="description pdf-export">
                      I grant my Pet Caretaker the full authority and powers to
                      tender to, care for, and manage my pets as I have managed
                      and cared for them during my lifetime.
                    </p>
                    {data.pets?.allocate === "1" && (
                      <p className="description pdf-export">
                        I direct ${data.pets?.portion} of my estate to my Pet
                        Caretaker to be used for the benefit of care of my pets,
                        including but not limited to the provision of food,
                        veterinary services, and any other expenses that may be
                        required for the care of my pets.
                      </p>
                    )}
                  </>
                </section>
              )}
              <section>
                <p className="subtitle pdf-export">
                  ARTICLE{" "}
                  {data.digital?.digitalAssets === "1"
                    ? data.pets?.havePets === "1"
                      ? "V"
                      : "IV"
                    : data.pets?.havePets === "1"
                      ? "IV"
                      : "III"}
                  : SELECTION OF REPRESENTATIVES AND <br />
                  FIDUCIARIES
                </p>
                <ol>
                  <li className="pdf-export description">
                    Executors. I nominate &nbsp;{data.executor?.executorName}, of{" "}
                    &nbsp;
                    {data.executor?.executorCity}, {data.executor?.executorState}
                    {data.executor?.executorRelation !== "other"
                      ? data.executor?.executorRelation !== "organization"
                        ? `, my ${data.executor?.executorRelation}`
                        : ", an organization"
                      : ""}{" "}
                    as the Executor of my Will. {data.executor?.executorName}{" "}
                    will be responsible for carrying out and executing the
                    instructions in this Will. If&nbsp;
                    {data.executor?.executorName} is unavailable, unable, or
                    unwilling to serve as Executor at any time, I nominate{" "}
                    {data.executor?.backupExecutorName}, of&nbsp;{" "}
                    {data.executor?.backupExecutorCity},{" "}
                    {data.executor?.backupExecutorState}{" "}
                    {data.executor?.backupExecutorRelation !== "other"
                      ? data.executor?.backupExecutorRelation !== "organization"
                        ? `, my ${data.executor?.backupExecutorRelation}`
                        : ", an organization"
                      : ""}
                    &nbsp;to serve as Executor of my Will.
                  </li>
                  {data.children?.ageAllowed === "1" && (
                    <li className="pdf-export description">
                      Guardians. In the event I have children that are
                      considered minors under California state law at the time
                      of my death, I nominate {data.children?.guardianName},
                      of&nbsp; {data.children?.guardianCity},{" "}
                      {data.children?.guardianState}, to serve as the Guardian
                      for all of my minor children. If{" "}
                      {data.children?.guardianName} is unable or unavailable to
                      serve as Guardian of my minor children, I nominate{" "}
                      {data.children?.backupGuardianName}, of&nbsp;{" "}
                      {data.children?.backupGuardianCity},{" "}
                      {data.children?.backupGuardianState}, to serve as their
                      Guardian.
                    </li>
                  )}
                  {data.digital?.digitalAssets === "1" && (
                    <li className="pdf-export description">
                      Digital Executors. I nominate{" "}
                      {data.digital?.digitalExecutorName}, of&nbsp;{" "}
                      {data.digital?.digitalExecutorCity},{" "}
                      {data.digital?.digitalExecutorState}
                      {data.digital?.digitalExecutorRelation !== "other"
                        ? data.digital?.digitalExecutorRelation !==
                          "organization"
                          ? `, my ${data.digital.digitalExecutorRelation}`
                          : ", an organization"
                        : ""}{" "}
                      to serve as the Digital Executor of my estate. If{" "}
                      {data.digital?.digitalExecutorName} cannot serve as the
                      Digital Executor of my estate for any reason, I nominate{" "}
                      {data.digital?.backupDigitalExecutorName}, of&nbsp;{" "}
                      {data.digital?.backupDigitalExecutorCity},{" "}
                      {data.digital?.backupDigitalExecutorState}
                      {data.digital?.backupDigitalExecutorRelation !== "other"
                        ? data.digital?.backupDigitalExecutorRelation !==
                          "organization"
                          ? `, my ${data.digital?.backupDigitalExecutorRelation}`
                          : ", an organization"
                        : ""}
                      &nbsp; to serve as the Digital Executor of my estate.
                    </li>
                  )}
                  {data.pets?.havePets === "1" && (
                    <li className="pdf-export description">
                      Pet Caretaker. I nominate {data.pets?.caretakerName},
                      of&nbsp; {data.pets?.caretakerCity},{" "}
                      {data.pets?.caretakerState}
                      {data.pets?.caretakerRelation !== "other"
                        ? data.pets?.caretakerRelation !== "organization"
                          ? `, my ${data.pets?.caretakerRelation}`
                          : ", an organization"
                        : ""}
                      &nbsp; to serve as the Pet Caretaker of my estate. If{" "}
                      {data.pets?.caretakerName} cannot serve as the Pet
                      Caretaker of my estate for any reason, I nominate{" "}
                      {data.pets?.backupCaretakerName}, of&nbsp;{" "}
                      {data.pets?.backupCaretakerCity},{" "}
                      {data.pets?.backupCaretakerState}
                      {data.pets?.backupCaretakerRelation !== "other"
                        ? data.pets?.backupCaretakerRelation !== "organization"
                          ? `, my ${data.pets?.backupCaretakerRelation}`
                          : ", an organization"
                        : ""}
                      &nbsp; to serve as the Pet Caretaker of my estate.
                    </li>
                  )}
                </ol>
                <p className="description pdf-export">
                  As a general matter, no Executor
                  {data.children?.haveChildren === "1" && ", Guardian"}
                  {data.digital?.digitalAssets === "1" && ", Digital Executor"}
                  {data.pets?.havePets === "1" && " or Pet Caretaker"} of mine
                  shall be required to furnish or file any bond, surety, or
                  other security in any jurisdiction.
                </p>
              </section>
              <section>
                <div className="mb-3">
                  <p className="subtitle pdf-export">
                    ARTICLE{" "}
                    {data.digital?.digitalAssets === "1"
                      ? data.pets?.havePets === "1"
                        ? "VI"
                        : "V"
                      : data.pets?.havePets === "1"
                        ? "V"
                        : "IV"}
                    : POWERS OF MY REPRESENTATIVES AND FIDUCIARIES
                  </p>
                </div>
                <ol>
                  <li className="pdf-export description">
                    Executor. I grant my Executor full authority to take any
                    reasonable act to administer my Will and any trust
                    established under my Will. In addition to any other powers
                    granted by law or any other provision of this Will, I grant
                    my Executor the power and authority to undertake, decide
                    upon, and execute any of the following actions, in my
                    Executor's sole discretion:
                    <ol>
                      <li className="pdf-export description">
                        account for and determine the fair market value of all
                        the assets in my estate that are to be distributed to my
                        beneficiaries;{" "}
                      </li>
                      <li className="pdf-export description">
                        distribute the assets of my estate without requiring pro
                        rata distribution of specific assets and without
                        requiring pro rata allocation of the tax bases of those
                        assets;
                      </li>
                      <li className="pdf-export description">
                        sell, partition, grant, assign, lease, convey, option,
                        abandon, divide, encumber, exchange, or mortgage any
                        property and perform any other acts pertaining to the
                        disposition or management of property;
                      </li>
                      <li className="pdf-export description">
                        manage any business I might have as a going concern and
                        manage any business interest I may have by executing
                        votes or any means of control, including but not limited
                        to the power to to sell my business or business
                        interest;{" "}
                      </li>
                      <li className="pdf-export description">
                        invest, hold, reinvest, collect, manage, or sell any
                        real or personal property of mine without the need for
                        diversifying risk of any kind or any amount, and without
                        the risk of non-productivity subject to limitation by
                        statute or law;
                      </li>
                      <li className="pdf-export description">
                        settle and fund trusts that for the benefit of any
                        beneficiary of this Will;
                      </li>
                      <li className="pdf-export description">
                        hire, retain, or employ professionals such as
                        accountants, attorneys, custodians for trusts, or any
                        other professional and pay such professionals from the
                        principal or income of my estate;
                      </li>
                      <li className="pdf-export description">
                        defend, initiate, prosecute, settle, abandon, or contest
                        claims surrounding or directed at my estate, as well as
                        to release powers or establish reserves with respect to
                        my estate;
                      </li>
                      <li className="pdf-export description">
                        sign, execute and deliver any documents or instruments
                        needed to carry out the provisions of this Will as well
                        as to perform any other or additional acts necessary to
                        properly administer my estate;
                      </li>
                      <li className="pdf-export description">
                        pay or settle debts, or obtain a loan, enter into any
                        credit agreement, and pledge the property of my estate
                        to secure such loans;
                      </li>
                      <li className="pdf-export description">
                        to make any election allowed by the Internal Revenue
                        Code regarding the taxes of my estate as well as to
                        execute tax returns, pay taxes, request and deposit
                        refunds;
                      </li>
                      <li className="pdf-export description">
                        to make payments or distributions required by this Will
                        (i) directly to a beneficiary, (ii) or by paying a
                        beneficiary's expenses directly to the person or entity
                        with whom the expense is owing, or (iii) to a caregiver,
                        guardian, or conservator of the beneficiary that is in
                        place for the sole use and benefit of the beneficiary;
                      </li>
                      <li className="pdf-export description">
                        to make, except as otherwise provided herein, the
                        required distributions to my beneficiaries that are
                        minors at the time of death, by distributing or paying
                        any or all of the minor's property to a trustee of a
                        trust for the minor that my Executor may elect to
                        settle, or a custodian that my Executor may elect to
                        select for the minor, in either case for the sole use or
                        benefit of the minor and in accordance with the Uniform
                        Gifts to Minors Act, Uniform Transfers to Minors Act, or
                        similar law of the state in which the minor resides,
                        until the minor reaches the age of 25, or another age
                        selected by my Executor not to exceed the age of 25;
                      </li>
                      <li className="pdf-export description">
                        to act, in accordance with the powers set forth in this
                        Will and in any manner allowed by common law, or the
                        laws of the state in which this Will is being
                        administered, without the need for prior judicial
                        approval, without prior authority of any court,
                        independently, and without limitation; and
                      </li>
                      <li className="pdf-export description">
                        except as otherwise provided in this Will, the powers of
                        my Executor as the property of my estate shall apply
                        until the distribution of that property.
                      </li>
                    </ol>
                  </li>
                  {data.digital?.digitalAssets === "1" && (
                    <li className="pdf-export description">
                      Digital Executor. I grant my Digital Executor the
                      authority and powers appropriate and necessary for the
                      proper administration of the digital assets of my estate.
                      In addition to any authority or powers granted by law, and
                      in accordance with the remaining provisions of this Will,
                      I grant my Digital Executor the power to:
                      <ol>
                        <li className="pdf-export description">
                          take custody of, manage, sell, trade, terminate,
                          distribute, access download, convert file formats,
                          backup, clear the cache any of my digital assets
                          without prior judicial approval or prior authority of
                          any court, and without notice to anyone;
                        </li>
                        <li className="pdf-export description">
                          hire and compensate digital professionals, counsel,
                          and any other person or entity deemed necessary for
                          the proper administration of my digital assets; and
                        </li>
                        <li className="pdf-export description">
                          delegate authority or continue to exercise all powers
                          and authority granted to my Digital Executor under
                          this Will until all my digital assets have been
                          properly distributed, transferred, or concluded,
                          notwithstanding the termination of my estate.
                        </li>
                      </ol>
                      The authorization I am providing to my Digital Executor to
                      administer my digital assets shall constitute lawful
                      consent under the Electronic Communications Privacy Act,
                      the Stored Communications Act, the Computer Fraud and
                      Abuse Act, and any other applicable federal or state data
                      law relating to data privacy, digital assets, or fraud.
                      Furthermore with respect to unauthorized computer access
                      laws and other computer fraud concerns, my Digital
                      Executor shall be considered an authorized user of my
                      digital assets.
                    </li>
                  )}
                  {data.provisions?.administration === "1" && (
                    <li className="pdf-export description">
                      Independent Administration: notwithstanding the foregoing,{" "}
                      {data.digital.digitalAssets === "1"
                        ? `both my Executor and Digital
                  Executor`
                        : `my Executor`}{" "}
                      shall have the power and authority to administer my estate
                      using any "unsupervised", "independent", or "informal"
                      probate or equivalent process or legislation designed to
                      allow the administration of my estate without intervention
                      by a probate court.
                    </li>
                  )}
                  {data.provisions?.compensation === "1" && (
                    <li className="pdf-export description">
                      Reimbursement and Compensation:{" "}
                      {data.digital?.digitalAssets === "1"
                        ? `both my Executor and Digital
                  Executor`
                        : `my Executor`}{" "}
                      shall have the right to reimbursement of reasonable
                      expenses that may be incurred through the administration
                      of this Will.{" "}
                      {data.digital?.digitalAssets === "1"
                        ? `I also authorize my Executor and Digital Executor to elect to receive reasonable compensation for the spent administering this Will as provided under laws of the jurisdiction in which my Will is being administered.`
                        : `I also authorize my Executor to elect to receive reasonable compensation for the spent administering this Will as provided under laws of the jurisdiction in which my Will is being administered.`}
                    </li>
                  )}
                </ol>
              </section>
              <section>
                <p className="subtitle pdf-export">
                  ARTICLE{" "}
                  {data.digital?.digitalAssets === "1"
                    ? data.pets?.havePets === "1"
                      ? "VII"
                      : "VI"
                    : data.pets?.havePets === "1"
                      ? "VI"
                      : "V"}
                  : GENERAL PROVISIONS
                </p>
                <ol>
                  <li className="pdf-export description">
                    Severability. If any provision of this Will is held to be
                    unenforceable, void, or invalid, the remaining provisions
                    shall fully remain and continue in full force and effect
                    permissible under governing law.
                  </li>
                  <li className="pdf-export description">
                    Survivorship. With respect to my beneficiaries under this
                    Will, no named beneficiary, whether a person or an entity,
                    can be deemed to have survived me unless they are alive and
                    existing as a person or entity on the one hundred-twentieth
                    (120) hour following the time of my death.
                  </li>
                  <li className="pdf-export description">
                    Gender and Plurality. Unless the context of any given
                    provision in this Will requires otherwise, any reference to
                    a gender should be understood to encompass all genders.
                    Furthermore, references in the singular shall encompass the
                    plural and vice versa.
                  </li>
                  {data.provisions?.disinherit === "1" && (
                    <li className="pdf-export description">
                      No Contest. If any of the beneficiaries named in my Will,
                      directly or indirectly, contests the validity or probate
                      of this Will or any of its provisions, or institutes or
                      joins in, except as a party defendant, any proceeding to
                      contest the validity or probate of this Will or to prevent
                      any provision hereof from being carried out in accordance
                      with the terms hereof, then all benefits provided for such
                      beneficiary and such contesting beneficiary's descendants
                      are revoked and will pass as if that contesting
                      beneficiary and such contesting beneficiary's descendants
                      had failed to survive me. The provisions of this Section E
                      under this Article VII will be enforceable unless in a
                      court action determining whether this no contest clause
                      should be enforced, the party bringing the contest
                      establishes that the contest was brought and maintained in
                      good faith and that just cause exists for bringing the
                      contest. Each benefit conferred herein is made on the
                      condition precedent that the beneficiary receiving such
                      benefit accepts and agrees to all of the provisions of
                      this Will or any trust created hereunder, and the
                      provisions of this Section E under this Article VII are an
                      essential part of each and every benefit. The Executor
                      will be reimbursed for the reasonable costs and expenses,
                      including attorneys' fees, incurred in connection with the
                      defense of any such contest.
                    </li>
                  )}
                </ol>
              </section>
              {data.provisions?.specific === "1" &&
                (data.provisions?.wishForService.length !== 0 ||
                  data.provisions?.wishForRestingPlace.length !== 0) && (
                  <section>
                    <p className="subtitle pdf-export">
                      ARTICLE{" "}
                      {data.digital?.digitalAssets === "1"
                        ? data.pets?.havePets === "1"
                          ? "VIII"
                          : "VII"
                        : data.pets?.havePets === "1"
                          ? "VII"
                          : "VI"}
                      : FUNERAL ARRANGEMENTS AND SPECIAL DIRECTIVES
                    </p>
                    <div className="mb-3">
                      <p className="description pdf-export">
                        It is my desire and wish to include the following
                        funeral arrangements and special directives:
                      </p>
                    </div>
                    <div className="mb-3">
                      {data.provisions?.wishForService && (
                        <p className="description pdf-export">
                          For my memorial service, &nbsp;
                          {data.provisions?.wishForService} .
                        </p>
                      )}
                      {data.provisions?.wishForRestingPlace && (
                        <p className="description pdf-export">
                          With respect to my body, &nbsp;
                          {data.provisions?.wishForRestingPlace} .
                        </p>
                      )}
                    </div>
                  </section>
                )}
              {space && (
                <p
                  style={{
                    margin: "30px 0",
                    textAlign: "center",
                    fontSize: "10px",
                  }}
                >
                  <em>Remainder of Page Intentionally Left Blank</em>
                </p>
              )}
            </div>
            <section className="page-break">
              <p className="description pdf-export">
                <strong>IN WITNESS WHEREOF, &nbsp;{""}</strong> I have
                subscribed my name below, this ____ day of _____________,
                _________
              </p>
              <div style={{ padding: "20px" }}>
                <Row gutter={8}>
                  <Col span={12}></Col>
                  <Col span={12}>
                    <p style={{ margin: 0 }}>______________________________</p>
                    <p className="pdf-export description">
                      {data.info?.fullName}, Testator
                    </p>
                  </Col>
                </Row>
              </div>
              <p className="pdf-export description">
                We, the undersigned, hereby certify that the above instrument,
                which consists of {totalPage} pages, including the page(s) which
                contain the witness signatures, was signed in our sight and
                presence by {data.info?.fullName} (the "Testator"), who declared
                this instrument to be his/her Last Will and Testament and we, at
                the Testator's request and in the Testator's sight and presence,
                do hereby subscribe our names as witnesses on the date shown
                above.
              </p>
              <div style={{ padding: "20px" }}>
                <Row gutter={4}>
                  <Col span={12}>
                    <p className="pdf-export description">
                      Signature of First Witness
                    </p>
                    <p className="pdf-export description">
                      _______________________
                    </p>
                    <p className="pdf-export description">
                      Name: _________________{" "}
                    </p>
                    <p className="pdf-export description">
                      Address: _______________{" "}
                    </p>
                    <p className="pdf-export description">
                      City: ___________________{" "}
                    </p>
                    <p className="pdf-export description">
                      State: __________________{" "}
                    </p>
                    <p className="pdf-export description">
                      Phone Number: __________{" "}
                    </p>
                    <p className="pdf-export description">
                      Email: _________________{" "}
                    </p>
                  </Col>
                  <Col span={12}>
                    <p className="pdf-export description">
                      Signature of Second Witness
                    </p>
                    <p className="pdf-export description">
                      _______________________
                    </p>
                    <p className="pdf-export description">
                      Name: _________________{" "}
                    </p>
                    <p className="pdf-export description">
                      Address: _______________{" "}
                    </p>
                    <p className="pdf-export description">
                      City: ___________________{" "}
                    </p>
                    <p className="pdf-export description">
                      State: __________________{" "}
                    </p>
                    <p className="pdf-export description">
                      Phone Number: __________{" "}
                    </p>
                    <p className="pdf-export description">
                      Email: _________________{" "}
                    </p>
                  </Col>
                </Row>
              </div>
            </section>

            {data.digital?.listDigitalAssets === "1" && (
              <section className="page-break">
                <div className="mb-3">
                  <p className="subtitle pdf-export">
                    SCHEDULE A<br />
                    MY DIGITAL ASSETS
                    <br />
                    <span style={{ fontSize: "12px", lineHeight: "20px" }}>
                      As of {digitalDate[1]} {digitalDate[2]}, {digitalDate[3]}
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <p className="description pdf-export">
                    This is a non-testamentary document as it is solely intended
                    for the guidance of my Digital Executor in his or her role
                    in identifying and locating my digital assets. As such, this
                    document should not be filed with the probate court and I
                    specifically wish for this document to be excluded from any
                    public filing.
                  </p>
                </div>
                <ol type="1">
                  {data.digital?.digitalAssetName &&
                    data.digital.digitalAssetName?.map((item, i) => (
                      <li className="pdf-export description" key={i}>
                        Name: &nbsp;{item}
                        <ul style={{ listStyleType: "disc" }}>
                          <li className="pdf-export description">
                            Where to Access: &nbsp;
                            {data.digital?.whereToAccess[i]}
                          </li>
                          <li className="pdf-export description">Username:</li>
                          <li className="pdf-export description">Password:</li>
                          <li className="pdf-export description">
                            Instructions to Digital Executor: &nbsp;
                            {data.digital?.instructions[i]}
                          </li>
                        </ul>
                      </li>
                    ))}
                </ol>
              </section>
            )}

            {data.assets?.haveAssets === "1" && (
              <section className="page-break">
                <div className="mb-3">
                  <p className="subtitle pdf-export">
                    SCHEDULE{" "}
                    {data.digital?.listDigitalAssets === "1" ? "B" : "A"}
                    <br />
                    ASSETS IN MY ESTATE
                    <br />
                    <span style={{ fontSize: "12px", lineHeight: "20px" }}>
                      As of {assetsDate[1]} {assetsDate[2]}, {assetsDate[3]}
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <p className="description pdf-export">
                    This is a non-testamentary document as it is solely intended
                    for the guidance of my Executor in his or her role in
                    identifying and locating my assets for distribution in
                    accordance with my Will. As such, this document should not
                    be filed with the probate court and I specifically wish for
                    this document to be excluded from any public filing.
                  </p>
                </div>
                {allAssets && (
                  <>
                    <Row gutter={4}>
                      <Col span={2}>
                        <p className="description pdf-export"></p>
                      </Col>
                      <Col span={4}>
                        <p className="description pdf-export">Asset</p>
                      </Col>
                      <Col span={18}>
                        <Row gutter={4}>
                          <Col span={8}>
                            <p className="description pdf-export">
                              Description
                            </p>
                          </Col>
                          <Col span={8}>
                            <p className="description pdf-export">State</p>
                          </Col>
                          <Col span={4}>
                            <p className="description pdf-export">Value ($)</p>
                          </Col>
                          <Col span={4}>
                            <p className="description pdf-export">Debt ($)</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {allAssets?.map((item, i) => (
                      <Row gutter={8} key={i}>
                        <Col span={2}>
                          <p className="description  pdf-export">{i + 1}</p>
                        </Col>
                        <Col span={4}>
                          <p className="description pdf-export">{item.name}</p>
                        </Col>
                        <Col span={18}>
                          {item?.content?.map((one, index) => (
                            <Row key={index} gutter={4}>
                              <Col span={8}>
                                <p className="description pdf-export">
                                  {one.type}
                                </p>
                              </Col>
                              <Col span={8}>
                                <p className="description pdf-export">
                                  {one.state}
                                </p>
                              </Col>
                              <Col span={4}>
                                <p className="description pdf-export">
                                  ${one.value}
                                </p>
                              </Col>
                              {item.name === "Real Estate" && (
                                <Col span={4}>
                                  <p className="description pdf-export">
                                    ${one.debt}
                                  </p>
                                </Col>
                              )}
                            </Row>
                          ))}
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
              </section>
            )}

          </div>
        </PDFExport>
      </Modal>

      <ModalOverlay isOpen={verifyAgain}>
        <CustomModalContent isOpen={verifyAgain} width={355} height={302}>
          <AvForm
            className="custom-form mt-4 pt-2"
            onValidSubmit={(e, v) => {
              sendEmailVerify(e, v);
            }}
            style={{ width: '100%' }}
          >
            <div className="mb-3">
              <div className="icon-container">
                <img src={emailIcon} alt="emailIcon" />
              </div>
              <p style={{ marginTop: 30 }}>Input your email address</p>
              <AvField
                name="email"
                className="form-control custom-input"
                disabled={!!data?.user?.email}
                placeholder="Email"
                value={data?.user?.email}
                type="email"
                required
              />
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                <div style={{marginRight: 20}}>
                  <CustomButton className="login-btn" type="button" width={100} height={35} fontSize={16} background={'#087FA7'} onClick={() => setVerifyAgain(false)}> Cancel </CustomButton>
                </div>
                <CustomButton className="login-btn" type="submit" width={100} height={35} fontSize={16} background={'#087FA7'}> Send </CustomButton>
              </div>
            </div>
          </AvForm>
        </CustomModalContent>
      </ModalOverlay>

    </>
  );
};

export default withRouter(Review);
