
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

// views without layouts
import Landing from "views/Landing.js";
import LandingOld from "views/LandingOld.js";
import Profile from "views/Profile.js";

import DefaultContext, { TMessage, EEmpty } from 'constants/data/DefaultContext'
import { StoreProvider } from 'constants/data/StoreContext'
import AlertDynamic from 'components/Notifications/AlertDynamic'
import RoutesPrivate from 'utils/Private/RoutesPrivate'
import NotFound from 'utils/NotFound'

const defaultMessage: TMessage = { type: 'sucess', text: 'sucess' }
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

    const [secondMessage, setSecondsMessage] = useState<number>(5);

    useEffect(() => {
        if (message !== defaultMessage)
            setShowAlert(true)
    }, [message])
    return (
        <DefaultContext.Provider value={{ showAlert, setShowAlert, setSecondsMessage, message, setMessage, empType, setEmpType }}>
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
                        <RoutesPrivate path="/admin"  >
                            <Admin />
                        </RoutesPrivate>
                        {/* add routes without layouts */}
                        <RoutesPrivate path="/landingold" exact  >
                            <LandingOld />
                        </RoutesPrivate>
                        <Route path="/auth" component={Auth} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/" exact component={Landing} />
                        {/* add redirect for first page */}
                        <Route path="*">
                            <NotFound />
                        </Route>
                        {/*<Redirect from="*" tyo="/" />*/}
                    </Switch>
                </StoreProvider>
            </Router>
            <AlertDynamic showAlert={showAlert}
                secondMessage={secondMessage} setSecondsMessage={setSecondsMessage}
                setShowAlert={setShowAlert} message={message} />
        </DefaultContext.Provider>)
}

export default App