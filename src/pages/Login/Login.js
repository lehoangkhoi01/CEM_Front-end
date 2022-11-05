import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { checkFptMail } from "../../helpers/authUtils";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./loginSlice";
import { login } from "../../helpers/authUtils";
import { Redirect } from "react-router";

const Login = () => {
  const dispatch = useDispatch();

  const handleCallbackRespone = async (respone) => {
    const userObject = jwtDecode(respone.credential);
    const isFptLogin = checkFptMail(userObject.email);
    if (isFptLogin) {
      let result = await login(userObject.email, userObject.name);
      if (result.ok) {
        localStorage.setItem("token", result.data);
        dispatch(loginSuccess());
        return <Redirect to="/home" />;
      }
    } else {
      console.log("Can not login.");
    }
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "425139212741-ofiqe8icnj5perc28n66jrme6k1f8mkr.apps.googleusercontent.com",
      callback: handleCallbackRespone,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    // google.accounts.id.prompt();
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
};

export default Login;
