
import React, { useState, useCallback, useEffect } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Schedule from "layouts/Schedule.js";
import Auth from "layouts/Auth.js";
import Customize from 'layouts/Customize'

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

import DefaultContext from 'constants/data/DefaultContext'
import AlertDynamic from 'components/Notifications/AlertDynamic'

const defaultMessage = { type: 'sucess', text: 'sucess' }
const App = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(defaultMessage);
    useEffect(() => {
        if (message !== defaultMessage)
            setShowAlert(true)
    }, [message])
    return (
        <DefaultContext.Provider value={{ showAlert, setShowAlert, message, setMessage }}>
            <BrowserRouter>
                <Switch>
                    {/* add routes with layouts */}
                    <Route path="/customize" component={Customize} />
                    <Route path="/myschedule" component={Schedule} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/auth" component={Auth} />
                    {/* add routes without layouts */}
                    <Route path="/landing" exact component={Landing} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/" exact component={Schedule} />
                    {/* add redirect for first page */}
                    <Redirect from="*" to="/" />
                </Switch>
            </BrowserRouter>
            <AlertDynamic showAlert={showAlert} setShowAlert={setShowAlert} message={message} />

        </DefaultContext.Provider>)
}

export default App