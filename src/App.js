import PropTypes from "prop-types";
import React from "react";
import dotenv from "dotenv";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import {
  authRoutes,
  mainRoutes,
  adminRoutes,
} from "./routes/allRoutes";
import Authmiddleware from "./routes/middleware/Authmiddleware";
import Adminmiddleware from "./routes/middleware/Adminmiddleware";
import HorizontalLayout from "./components/HorizontalLayout/";
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

import "antd/dist/reset.css";
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";

dotenv.config();

const App = (props) => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {mainRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={HorizontalLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {adminRoutes.map((route, idx) => (
            <Adminmiddleware
              path={route.path}
              layout={VerticalLayout}
              component={route.component}
              key={idx}
              isAdminProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
