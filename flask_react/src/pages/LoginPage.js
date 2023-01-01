import React from "react";
import { withRouter } from "../common/with-router";
import authService from "../services/auth.service";

function LoginPage(props) {
  async function logMeIn() {
    await authService.login("test", "1234");
    props.router.navigate("/dashboard");
  }

  return (
    <div>
      Login Page
      <button onClick={logMeIn}>Log In</button>
    </div>
  );
}

export default withRouter(LoginPage);
