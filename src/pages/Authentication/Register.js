import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../store/actions";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import logo from '../../assets/images/brands/logo.png';
import mistake from '../../assets/images/icons/mistake.png'
import success from '../../assets/images/icons/success.png'
import group1 from '../../assets/images/group1.png';
import emailIcon from '../../assets/images/icons/email.png'
import userIcon from '../../assets/images/icons/user.png'
import passwordIcon from '../../assets/images/icons/password.png'
import googleIcone from '../../assets/images/icons/google.png'
import twitterIcon from '../../assets/images/icons/twitter.png'
import facebookIcon from '../../assets/images/icons/facebook.png'
import appleIcon from '../../assets/images/icons/apple.png'
import { CustomButton, CustomModalContent, ModalContent, ModalOverlay } from '../../components/Custom/General'
import { Checkbox, Spin } from 'antd';

const Register = (props) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { user, registrationError, loading } = useSelector((state) => state.Account);

  const [terms, setTerms] = useState(false)
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentEamil, setCurrentEamil] = useState(null)


  useEffect(() => {
    const infoData = JSON.parse(localStorage.getItem('infoData1'))
    if (infoData) {
      setCurrentEamil(infoData.email)
    } else {
      const currentEamil = localStorage.getItem('currentEamil')
      if (currentEamil) {
        setCurrentEamil(currentEamil)
      }
    }
  }, [])

  useEffect(() => {
    if (registrationError) {
      setIsError(true)
    }
    if (user) {
      setIsSuccess(true)
    }
  }, [user, registrationError])

  const onChangeTerms = (e) => {
    setTerms(e.target.checked)
  };

  const handleValidSubmit = (event, values) => {
    dispatch(registerUser(values, props.history));
  };

  const removeAlert = () => {
    setIsError(false)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register</title>
      </MetaTags>
      <div className="auth-container">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="login-left">
                <img src={logo} alt="logo" style={{ marginTop: 30, cursor: 'pointer' }} onClick={() => history.push('/home')} />
                <img src={group1} alt="group1" width={380} height={293} style={{ marginTop: 40 }} />
                <p>Welcome to passdown! We're thrilled to have you here. </p>
              </div>
            </div>
            <div className="col-md-7">
              <div className="login-form">
                <p className="login-title">Register</p>
                {loading && <Spin />}
                <AvForm
                  className="custom-form mt-4 pt-2"
                  onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v);
                  }}
                >
                  {user && user ? (
                    <Alert color="success">
                      Register User Successfully
                    </Alert>
                  ) : null}

                  <div className="mb-3">
                    <div className="icon-container">
                      <img src={userIcon} alt="userIcon" />
                    </div>
                    <AvField
                      name="fullName"
                      className="form-control custom-input"
                      placeholder="Enter First and Last name"
                      type="text"
                      required
                    />
                  </div>

                  {currentEamil ? (
                    <div className="mb-3">
                      <div className="icon-container">
                        <img src={emailIcon} alt="emailIcon" />
                      </div>
                      <AvField
                        name="email"
                        className="form-control custom-input"
                        disabled={!!currentEamil}
                        placeholder="Email"
                        value={currentEamil}
                        type="email"
                        required
                      />
                    </div>
                  ) : (
                    <div className="mb-3">
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
                  )}


                  <div className="">
                    <div className="icon-container">
                      <img src={passwordIcon} alt="passwordIcon" />
                    </div>
                    <AvField
                      name="password"
                      type="password"
                      className="form-control custom-input"
                      required
                      placeholder="Enter Password"
                    />
                  </div>

                  <div className="register_terms" >
                    <Checkbox onChange={onChangeTerms}></Checkbox>
                    <label style={{ fontSize: 15, marginLeft: 10 }}>
                      By checking this box, I confirm that I am at least 18 years of age, and that I have read and agree to Passdown’s Terms of Service and Privacy Policy.
                    </label>
                  </div>

                  <div className="d-flex justify-content-between social" style={{ marginTop: 30 }}>
                    <CustomButton className="login-btn" type="submit" width={137} height={45} fontSize={20} background={'#087FA7'}> Register </CustomButton>
                    <div className="social-group">
                      <img src={facebookIcon} alt="facebookIcon" />
                      <img src={twitterIcon} alt="twitterIcon" />
                      <img src={googleIcone} alt="googleIcone" />
                      <img src={appleIcon} alt="appleIcon" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="mb-0" style={{ color: '#000000', fontSize: 18, paddingTop: 60 }}>
                      Do you have an account ?
                      <Link to="/login" style={{ color: '#0A81A9', fontWeight: 'bold' }}> Login </Link>
                    </p>
                  </div>
                </AvForm>
              </div>
            </div>
          </div>
        </div>

        <ModalOverlay isOpen={isError}>
          <ModalContent isOpen={isError}>
            <div className="error-content">
              <img src={mistake} alt="mistake" />
              <p>{registrationError}</p>
              <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={removeAlert}> Ok </CustomButton>
            </div>
          </ModalContent>
        </ModalOverlay>

        <ModalOverlay isOpen={isSuccess}>
          <CustomModalContent isOpen={isSuccess} width={500} height={370}>
            <div className="error-content">
              <img src={success} alt="success" />
              <p>
                Thank you for registering with Passdown. To complete your account setup, we just need to verify your email address. Please check your inbox for a message from us. Click on the verification link provided in the email to validate your account. If you don't receive the email within a few minutes, please check your spam folder. We're excited to have you on board!
              </p>
              <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={() => history.push('/login')}> Ok </CustomButton>
            </div>
          </CustomModalContent>
        </ModalOverlay>
      </div>
    </React.Fragment>
  );
};

export default Register;
