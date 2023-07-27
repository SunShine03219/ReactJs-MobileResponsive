import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutUser } from "../../store/actions";

const Logout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser(props.history));
    props.history.push("/login");
  }, [dispatch, props.history]);

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
