import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import AdminHome from "views/admin/Admin";
import Users from "views/admin/Users";
import Trafic from "views/admin/Trafic";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import baseRouter from "constants/config/baseRouter";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-48 bg-gray-200">
        <AdminNavbar keyNavTitle="slidebar.Admin" />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path={`${baseRouter}/admin/home`} component={AdminHome} />
            <Route path={`${baseRouter}/admin/users`} component={Users} />
            <Route path={`${baseRouter}/admin/trafic`} exact component={Trafic} />
            <Route path={`${baseRouter}/admin/settings`} exact component={Settings} />
            <Route path={`${baseRouter}/admin/tables`} exact component={Tables} />
            <Redirect from={`${baseRouter}/admin`} to={`${baseRouter}/admin/home`} />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
