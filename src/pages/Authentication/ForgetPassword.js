import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Spin } from "antd";
import { userForgetPassword } from "../../store/actions";
import logo from '../../assets/images/brands/logo.png';
import group2 from '../../assets/images/group2.png';
import emailIcon from '../../assets/images/icons/email.png'
import emailSuccessIcon from '../../assets/images/icons/emailsuccess.png'
import { CustomButton, ModalContent, ModalOverlay } from '../../components/Custom/General'
import mistake from '../../assets/images/icons/mistake.png'


const ForgetPasswordPage = (props) => {
  const dispatch = useDispatch();

  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const { forgetSuccessMsg, forgetError, loading } = useSelector((state) => state.ForgetPassword);

  useEffect(() => {
    if(forgetSuccessMsg) {
      setIsSuccess(true)
    }
    if(forgetError) {
      setIsError(true)
    }
  }, [forgetSuccessMsg, forgetError])

  function handleValidSubmit(event, values) {
    dispatch(userForgetPassword(values, props.history));
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Forget Password</title>
      </MetaTags>
      <div className="auth-container">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="login-left">
                <img src={logo} alt="logo" style={{ marginTop: 30 }} />
                <img src={group2} alt="group2" style={{ marginTop: 40 }} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et magna aliqua.  Ut enim ad minim veniam</p>
              </div>
            </div>
            <div className="col-md-7">
              <div className="forgotpassword-form">
                <p className="login-title">Forgot Password</p>
                {loading && <Spin />}
                <AvForm
                  className="custom-form mt-4 pt-2"
                  onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v);
                  }}
                >

                  <div className="mb-3">
                    <label style={{ fontSize: 18, marginBottom: 30 }}>Enter your email below and we’ll help you reset your password</label>
                    <div className="icon-container">
                      <img src={emailIcon} alt="emailIcon" />
                    </div>
                    <AvField
                      name="email"
                      className="form-control custom-input"
                      placeholder="Enter E-mail address"
                      type="email"
                      required
                    />
                  </div>

                  <div className="social" style={{ marginTop: 70 }}>
                    <CustomButton className="login-btn" type="submit" width={241} height={45} fontSize={20} background={'#087FA7'}> Reset My Password </CustomButton>
                  </div>

                  <div className="text-center">
                    <p className="mb-0" style={{ color: '#000000', fontSize: 18, paddingTop: 80 }}>
                      Do you have an account ?
                      <Link to="/register" style={{ color: '#0A81A9', fontWeight: 'bold' }}> Register</Link>
                    </p>
                  </div>
                </AvForm>
              </div>
            </div>
          </div>
        </div>

        <ModalOverlay isOpen={isSuccess}>
          <ModalContent isOpen={isSuccess}>
            <div className="error-content">
              <img src={emailSuccessIcon} alt="emailSuccessIcon" />
              <p>{forgetSuccessMsg}</p>
              <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={() => setIsSuccess(false)}> Ok </CustomButton>
            </div>
          </ModalContent>
        </ModalOverlay>

        <ModalOverlay isOpen={isError}>
          <ModalContent isOpen={isError}>
            <div className="error-content">
              <img src={mistake} alt="mistake" />
              <p>{forgetError}</p>
              <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={() => setIsError(false)}> Ok </CustomButton>
            </div>
          </ModalContent>
        </ModalOverlay>

      </div>
    </React.Fragment>
  );
};

export default withRouter(ForgetPasswordPage);
