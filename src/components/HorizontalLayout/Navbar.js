import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const { leftMenu } = useSelector((state) => ({
    leftMenu: state.Layout.leftMenu,
  }));

  useEffect(() => {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });
  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active");
      const parent2 = parent.parentElement;
      parent2.classList.add("active");
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active");
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active");
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active");
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active");
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    to="/will"
                  >
                    <FeatherIcon icon="home" />
                    <span>{props.t("Get Started")}</span>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

export default withTranslation()(withRouter(Navbar));
