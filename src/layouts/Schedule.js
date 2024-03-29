import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderDefault from "components/Headers/HeaderDefault.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Schedule from 'views/mySchedule/Schedule/Schedule'
import Revision from 'views/mySchedule/Revision/Revision'
import Next from 'views/mySchedule/Next/Next'
import baseRouter from "constants/config/baseRouter";

export default function MySchedule() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-48 bg-gray-200">
                <AdminNavbar keyNavTitle="slidebar.MySchedule" />
                {/* Header */}
                <HeaderDefault />

                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path={`${baseRouter}/myschedule/schedule`} exact component={Schedule} />
                        <Route path={`${baseRouter}/myschedule/revision`} exact component={Revision} />
                        <Route path={`${baseRouter}/myschedule/next`} exact component={Next} />
                        <Redirect from={`${baseRouter}/myschedule`} to={`${baseRouter}/myschedule/schedule`} />
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
