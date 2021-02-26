
import React, { useState, useEffect, Suspense, } from "react";

import {
    Router as Router, Route, Switch, BrowserRouter
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
import Landing from "views/others/Landing.js";
import Policy from 'views/others/Policy'
import Terms from 'views/others/Terms'

//pages not usage
import LandingOld from "views/others/LandingOld.js";
import Profile from "views/Profile.js";

import DefaultContext, { EEmpty } from 'constants/data/DefaultContext'
import { StoreProvider } from 'constants/data/StoreContext'
import AlertDynamic, { TMessage } from 'components/Notifications/AlertDynamic'
import RoutesPrivate from 'utils/Private/RoutesPrivate'
import NotFound from 'utils/NotFound'
import Public from 'views/Public'
import history from "utils/history";

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
        <Suspense fallback="loading">
            {/*The tag Suspense was add because is required in i18*/}
            <DefaultContext.Provider value={{ showAlert, setShowAlert, message, setMessage, empType, setEmpType }}>
                {/*inicio das rotas*/}
                <BrowserRouter>
                    {/*Router and history was add to usage fo the history outside functions*/}
                    <Router history={history} >
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
                                <Route path="/policy" exact component={Policy} />
                                <Route path="/terms" exact component={Terms} />
                                <Route path="/" exact component={Landing} />
                                {/* add redirect for first page */}
                                <Route path="*">
                                    <NotFound />
                                </Route>
                                {/*<Redirect from="*" tyo="/" />*/}
                            </Switch>
                        </StoreProvider>
                    </Router>
                </BrowserRouter>

                <AlertDynamic setMessage={setMessage} showAlert={showAlert} setShowAlert={setShowAlert} message={message} />
            </DefaultContext.Provider>
        </Suspense>)
}

export default App