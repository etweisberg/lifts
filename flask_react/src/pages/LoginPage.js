import React from "react";
import AuthService from "../services/auth.service";

async function logMeIn(){
  const response = await AuthService.login("test", "1234");
  console.log(response);
}

export default function LoginPage() {
  return (
    <div>
      Login Page
      <button onClick={logMeIn}>Log In</button>
    </div>
  );
}
