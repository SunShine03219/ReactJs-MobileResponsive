import MetaTags from "react-meta-tags";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import { message, Alert } from "antd";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { userChangePassword } from "../../store/actions";
import logo from '../../assets/images/brands/logo.png';
import group2 from '../../assets/images/group2.png';
import { CustomButton } from '../../components/Custom/General'
import passwordIcon from '../../assets/images/icons/password.png'


const ChangePasswordPage = (props) => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const { forgetError } = useSelector((state) => state.ForgetPassword);
  const [messageApi, contextHolder] = message.useMessage();

  const [noMatch, setNoMatch] = useState(false)

  React.useEffect(() => {
    if (forgetError)
      messageApi.open({
        type: "warning",
        content: forgetError,
      });
  }, [forgetError, messageApi]);

  function handleValidSubmit(event, values) {
    if(values.password !== values.confirm_password) {
      setNoMatch(true)
    } else {
      setNoMatch(false)
      dispatch(userChangePassword({ ...values, token }, props.history));
    }
  }

  return (
    <React.Fragment>
      {contextHolder}
      <MetaTags>
        <title>Reset Password</title>
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
                <p className="login-title">Reset Password</p>
                {noMatch && <Alert message="Error Text" type="error" />}
                <AvForm
                  className="custom-form mt-4 pt-2"
                  onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v);
                  }}
                >

                  <div className="mb-3">
                    <label style={{ fontSize: 18, marginBottom: 30 }}>Strong password include numbers, letters, and punctuation marks.</label>
                    <div className="icon-container">
                      <img src={passwordIcon} alt="passwordIcon" />
                    </div>
                    <AvField
                      name="password"
                      className="form-control custom-input"
                      placeholder="New Password"
                      type="password"
                      required
                    />
                  </div>


                  <div className="mb-3">
                    <div className="icon-container">
                      <img src={passwordIcon} alt="passwordIcon" />
                    </div>
                    <AvField
                      name="confirm_password"
                      type="password"
                      className="form-control custom-input"
                      required
                      placeholder="Confirm New Password"
                    />
                  </div>

                  <div className="social" style={{ marginTop: 70 }}>
                    <CustomButton className="login-btn" type="submit" width={241} height={45} fontSize={20} background={'#087FA7'}> Reset My Password </CustomButton>
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

export default withRouter(ChangePasswordPage);
