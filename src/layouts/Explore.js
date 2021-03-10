import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderDefault from "components/Headers/HeaderDefault.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Statistics from 'views/Explore/Statistics/Statistics'
import Factory from 'views/Explore/Factory/Factory'
import baseRouter from "constants/config/baseRouter";

export default function Explore() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-48 bg-gray-200">
                <AdminNavbar keyNavTitle="slidebar.Explore" />
                {/* Header */}
                <HeaderDefault />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path={`${baseRouter}/explore/factory`} exact component={Factory} />
                        <Route path={`${baseRouter}/explore/statistics`} exact component={Statistics} />
                        <Redirect from={`${baseRouter}/explore`} to={`${baseRouter}/explore/factory`} />
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
