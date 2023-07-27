import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React from "react";
import { Row, Col, Alert, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

import { loginAdmin } from "../../store/actions";
import logo from "../../assets/images/logo-sm.svg";
import CarouselPage from "./CarouselPage";

const Login = (props) => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  const handleValidSubmit = (event, values) => {
    dispatch(loginAdmin(values, props.history));
  };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login</title>
      </MetaTags>
      <div className="auth-page">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/home" className="d-block auth-logo">
                        <img src={logo} alt="" height="28" />{" "}
                        <span className="logo-txt">ONLINE TOOL</span>
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Welcome Back !</h5>
                        <p className="text-muted mt-2">
                          Sign in to continue to ONLINE TOOL.
                        </p>
                      </div>
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
                          <AvField
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <label className="form-label">Password</label>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="password"
                              type="password"
                              className="form-control"
                              required
                              placeholder="Enter Password"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </AvForm>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} ONLINE TOOL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
