import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import jwt from "jwt-decode";
import defaultUser from "../../../assets/images/users/avatar-1.jpg";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const UserMenu = (props) => {
  const { loading } = useSelector((state) => ({
    loading: state.loading,
  }));

  const [menu, setMenu] = useState(false);
  const [userName, setUsername] = useState("User");

  useEffect(() => {
    setUsername("User");
  }, [props.success]);

  useEffect(() => {
    if (localStorage.getItem("authUser") && !loading) {
      const user = jwt(localStorage.getItem("authUser"));
      setUsername(user.fullName);
    }
  }, [loading]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item bg-soft-light border-start border-end"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={defaultUser}
            alt="User Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{userName}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {userName === "User" ? (
            <>
              <Link to="/login" className="dropdown-item">
                <i className="bx bx-log-in-circle font-size-16 align-middle me-1" />
                <span>{props.t("Log in")}</span>
              </Link>
              <Link to="/register" className="dropdown-item">
                <i className="bx bx-user-plus font-size-16 align-middle me-1" />
                <span>{props.t("Register")}</span>
              </Link>
              <div className="dropdown-divider" />
            </>
          ) : (
            <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
              <span>{props.t("Logout")}</span>
            </Link>
          )}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

UserMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(UserMenu))
);
