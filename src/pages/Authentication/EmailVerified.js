import React from "react";
import { useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import { verifyEmail } from "../../store/actions";

const EmailVerified = (props) => {
  const { token } = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(verifyEmail({ token }, props.history));
  }, [token, dispatch, props.history]);

  return <h1>Success</h1>;
};

export default withRouter(EmailVerified);
