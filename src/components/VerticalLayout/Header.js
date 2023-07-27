import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "react-drawer/lib/react-drawer.css";

import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import LightDark from "../CommonForBoth/Menus/LightDark";
import logoSvg from "../../assets/images/logo-sm.svg";
import { withTranslation } from "react-i18next";

import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  changelayoutMode,
} from "../../store/actions";

const Header = (props) => {
  const { onChangeLayoutMode } = props;
  const [search, setsearch] = useState(false);
  const [isClick, setClick] = useState(true);

  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    var body = document.body;
    setClick(!isClick);
    if (isClick === true) {
      body.classList.add("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "sm");
    } else {
      body.classList.remove("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "lg");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSvg} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={logoSvg} alt="" height="24" />{" "}
                  <span className="logo-txt">ONLINE TOOL</span>
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSvg} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={logoSvg} alt="" height="24" />{" "}
                  <span className="logo-txt">ONLINE TOOL</span>
                </span>
              </Link>
            </div>

            <button
              onClick={() => {
                tToggle();
              }}
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <button className="btn btn-primary" type="button">
                  <i className="bx bx-search-alt align-middle"></i>
                </button>
              </div>
            </form>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Search Result"
                      />

                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <LightDark
              layoutMode={props["layoutMode"]}
              onChangeLayoutMode={onChangeLayoutMode}
            />
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
  changelayoutMode: PropTypes.func,
  layoutMode: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
    layoutMode,
  } = state.Layout;
  return {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
    layoutMode,
  };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  changelayoutMode,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
