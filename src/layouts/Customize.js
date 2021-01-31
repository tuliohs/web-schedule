import React from "react";
import { Switch, Route, } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderDefault from "components/Headers/HeaderDefault.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Topic from 'views/customize/Topic/Topic'
import ItemsScreen from 'views/customize/Item/ItemsScreen'
import Category from 'views/customize/Category/Category'
import Profile from 'views/customize/Profile/Profile'
//import Route from 'utils/Private/Route'

export default function Customize() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-200">
                <AdminNavbar />
                {/* Header */}
                <HeaderDefault />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/customize/lab/topic" exact >
                            <Topic />
                        </Route>
                        <Route path="/customize/lab/item" exact >
                            <ItemsScreen />
                        </Route>
                        <Route path="/customize/lab/category" exact >
                            <Category />
                        </Route>
                        <Route path="/customize/profile" exact >
                            <Profile />
                        </Route>

                        {/*Excluido  porque  não estava peritindo o rediecionamento*/}
                        {/*<Redirect from="/customize" to="/customize/topic" />*/}
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
