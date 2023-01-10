import React from "react";
import { withRouter } from "../common/with-router";
import authService from "../services/auth.service";
import Spinner from "react-bootstrap/Spinner";

function LogoutPage(props) {
  authService
    .logout()
    .then(() => {
      props.router.navigate("/login");
      console.log({ message: "Logged out" });
    })
    .catch((err) => {
      props.router.navigate("/login");
      console.log("error caught in logout page: " + err);
    });
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" className="p-2 align-self-center m-0" />
      </div>
    </div>
  );
}

export default withRouter(LogoutPage);
