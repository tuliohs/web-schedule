
import React, { useState, useEffect, } from "react";

import {
    BrowserRouter as Router, Route, Switch
} from "react-router-dom";

//icons slide bar
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Schedule from "layouts/Schedule.js";
import Auth from "layouts/Auth.js";
import Customize from 'layouts/Customize'
import Explore from 'layouts/Explore'

// views without layouts
import Landing from "views/Landing.js";
import LandingOld from "views/LandingOld.js";
import Profile from "views/Profile.js";

import DefaultContext, { EEmpty } from 'constants/data/DefaultContext'
import { StoreProvider } from 'constants/data/StoreContext'
import AlertDynamic, { TMessage } from 'components/Notifications/AlertDynamic'
import RoutesPrivate from 'utils/Private/RoutesPrivate'
import NotFound from 'utils/NotFound'
import Public from 'views/Public'

const defaultMessage: TMessage = { type: 'sucess', text: 'sucess', timeExpire: 5 }
const App = () => {
    //{ JS CONFIG
    //    "compilerOptions": {
    //      "baseUrl": "src",
    //      "paths": {
    //        "*": ["src/*"]
    //      }
    //    }
    //  }
    const [empType, setEmpType] = useState<EEmpty>(EEmpty.Valid)
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [message, setMessage] = useState<TMessage>(defaultMessage);

    useEffect(() => {
        if (message !== defaultMessage)
            setShowAlert(true)
    }, [message])
    return (
        <DefaultContext.Provider value={{ showAlert, setShowAlert, message, setMessage, empType, setEmpType }}>
            {/*inicio das rotas*/}
            <Router>
                <StoreProvider>
                    <Switch>
                        {/* add routes with layouts */}
                        <RoutesPrivate path="/customize"  >
                            <Customize />
                        </RoutesPrivate>
                        <RoutesPrivate path="/myschedule"  >
                            <Schedule />
                        </RoutesPrivate>
                        <RoutesPrivate path="/explore"  >
                            <Explore />
                        </RoutesPrivate>
                        <RoutesPrivate roles={["admin"]} path="/admin"  >
                            <Admin />
                        </RoutesPrivate>
                        {/* add routes without layouts */}
                        <RoutesPrivate roles={["admin"]} path="/landingold" exact  >
                            <LandingOld />
                        </RoutesPrivate>
                        <RoutesPrivate roles={["admin"]} path="/profile" exact  >
                            <Profile />
                        </RoutesPrivate>
                        <Route path="/auth" component={Auth} />
                        <Route path="/public" exact component={Public} />
                        <Route path="/" exact component={Landing} />
                        {/* add redirect for first page */}
                        <Route path="*">
                            <NotFound />
                        </Route>
                        {/*<Redirect from="*" tyo="/" />*/}
                    </Switch>
                </StoreProvider>
            </Router>
            <AlertDynamic setMessage={setMessage} showAlert={showAlert} setShowAlert={setShowAlert} message={message} />
        </DefaultContext.Provider>)
}

export default App