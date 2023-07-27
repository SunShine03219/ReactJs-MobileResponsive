import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAdminProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const user =
        localStorage.getItem("authUser") &&
        jwtDecode(localStorage.getItem("authUser"));
      if (
        isAdminProtected &&
        (!localStorage.getItem("authUser") || user.role !== "admin")
      ) {
        return (
          <Redirect
            to={{ pathname: "/admin/login", state: { from: props.location } }}
          />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default Authmiddleware;
