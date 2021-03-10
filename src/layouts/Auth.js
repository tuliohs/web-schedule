import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

//import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import ForgotPass from "views/auth/ForgotPass";
import Register from "views/auth/Register.js";
import RegisterComplet from "views/auth/RegisterComplet";
import DefaultNavbar from "components/Navbars/DefaultNavbar/DefaultNavBar";
import baseRouter from "constants/config/baseRouter";

export default function Auth() {
  return (
    <>
      <DefaultNavbar showAcessBtn={false} />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png") + ")",
            }}
          ></div>
          <Switch>
            <Route path={`${baseRouter}/auth/login`} exact component={Login} />
            <Route path={`${baseRouter}/auth/register`} exact component={Register} />
            <Route path={`${baseRouter}/auth/register/complet`} exact component={RegisterComplet} />
            <Route path={`${baseRouter}/auth/forgotpass`} exact component={ForgotPass} />
            <Redirect from="/auth" to={`${baseRouter}/auth/login`} />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
