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
import Statistics from 'views/mySchedule/Statistics/Statistics'
//import NotFound from 'utils/NotFound'
//import RoutesPrivate from 'utils/Private/RoutesPrivate'

export default function MySchedule() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-200">
                <AdminNavbar />
                {/* Header */}
                <HeaderDefault />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/myschedule/schedule" exact component={Schedule} />
                        <Route path="/myschedule/revision" exact component={Revision} />
                        <Route path="/myschedule/next" exact component={Next} />
                        <Route path="/myschedule/statistics" exact component={Statistics} />
                        <Redirect from="/myschedule" to="/myschedule/schedule" />
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
