import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import { message, Checkbox } from "antd";
import { loginUser } from "../../store/actions";
import { Alert } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import logo from '../../assets/images/brands/logo.png';
import group1 from '../../assets/images/group1.png';
import emailIcon from '../../assets/images/icons/email.png'
import passwordIcon from '../../assets/images/icons/password.png'
import googleIcone from '../../assets/images/icons/google.png'
import twitterIcon from '../../assets/images/icons/twitter.png'
import facebookIcon from '../../assets/images/icons/facebook.png'
import appleIcon from '../../assets/images/icons/apple.png'
import {CustomButton} from '../../components/Custom/General'

const Login = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { error, verify } = useSelector((state) => ({
    error: state.Login.error,
    verify: state.EmailVerify,
  }));

  const [remember, setRemember] = useState(false)

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (verify.SuccessMsg)
      messageApi.open({
        type: "success",
        content: verify.SuccessMsg,
      });
    if (verify.Error)
      messageApi.open({
        type: "warning",
        content: verify.Error,
      });
  }, [verify, messageApi]);

  const handleValidSubmit = (event, values) => {
    dispatch(loginUser(values, props.history));
  };

  const onChangeRemember = (e) => {
    setRemember(e.target.checked)
  };

  return (
    <React.Fragment>
      {contextHolder}
      <MetaTags>
        <title>Login</title>
      </MetaTags>
      <div className="auth-container">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="login-left">
                <img src={logo} alt="logo" style={{marginTop: 30, cursor: 'pointer'}} onClick={() => history.push('/home')}/>
                <img src={group1} alt="group1" width={380} height={293} style={{marginTop: 40}}/>
                <p>Welcome back to passdown. Log in now to access your profile.</p>
              </div>
            </div>
            <div className="col-md-7">
              <div className="login-form">
                <p className="login-title">Login</p>
                <AvForm
                  className="custom-form mt-4 pt-2"
                  onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v);
                  }}
                >
                  {error ? (
                    <Alert color="danger">
                      Your email or password is incorrect
                    </Alert>
                  ) : null}

                  <div className="mb-3">
                    <div className="icon-container">
                      <img src={emailIcon} alt="emailIcon"/>
                    </div>
                    <AvField
                      name="email"
                      className="form-control custom-input"
                      placeholder="Enter E-mail address"
                      type="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <div className="icon-container">
                      <img src={passwordIcon} alt="passwordIcon"/>
                    </div>
                    <AvField
                      name="password"
                      type="password"
                      className="form-control custom-input"
                      required
                      placeholder="Enter Password"
                    />

                    <div className="f-p-btn d-flex justify-content-between" style={{ marginTop: 20, fontSize: 15 }}>
                      <Checkbox onChange={onChangeRemember}>Remembering login information</Checkbox>
                      <div className="flex-shrink-0">
                        <Link
                          to="/forgot-password"
                          style = {{fontSize: 15}}
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                  </div>

                  <div className="d-flex justify-content-between social">
                    <CustomButton className="login-btn" type="submit" width = {113} height = {45} fontSize = {20} background = {'#087FA7'}> Log In </CustomButton>
                    <div className="social-group">
                      <img src={facebookIcon} alt="facebookIcon"/>
                      <img src={twitterIcon} alt="twitterIcon"/>
                      <img src={googleIcone} alt="googleIcone"/>
                      <img src={appleIcon} alt="appleIcon"/>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="mb-0" style={{color: '#000000', fontSize: 18, paddingTop: 60}}>
                      Do you have an account ?
                      <Link to="/register" style = {{color: '#0A81A9', fontWeight: 'bold'}}> Register</Link>
                    </p>
                  </div>
                </AvForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
