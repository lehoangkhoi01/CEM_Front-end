import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { checkFptMail } from "../../helpers/authUtils";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./loginSlice";
import { login } from "../../helpers/authUtils";
import { Redirect } from "react-router";
import "./style.css";

const Login = () => {
  const dispatch = useDispatch();

  const handleCallbackRespone = async (respone) => {
    const userObject = jwtDecode(respone.credential);
    //const isFptLogin = checkFptMail(userObject.email);
    const isFptLogin = true;
    if (isFptLogin) {
      let result = await login(userObject.email, userObject.name);
      if (result.ok) {
        localStorage.setItem("token", result.data);
        if (userObject.email === "khoihle01012001@gmail.com") {
          localStorage.setItem("cemrole", "admin");
        } else localStorage.setItem("cemrole", "student");
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
    // <div>
    //   <div id="signInDiv"></div>
    // </div>
    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <h2>Login</h2>
          <h3>FPT Club Events</h3>
          <div style={{ marginLeft: "20px" }} id="signInDiv"></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
