import React from "react";
import { withRouter } from "../common/with-router";
import authService from "../services/auth.service";
import Spinner from "react-bootstrap/Spinner";

function LogoutPage(props) {
  authService
    .logout()
    .then(() => {
      props.router.navigate("/login");
      return { message: "Logged out" };
    })
    .catch((err) => {
      return { error: err };
    });
  return <Spinner animation="border" />;
}

export default withRouter(LogoutPage);
