import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import RegistarionPage from "../pages/RegistrationPage";



const useRoutes = (isAuth) => {
        if(isAuth) {
            return (
                <Switch>
                    <Route path="/chat">
                        <ChatPage/>
                        <Redirect to="/mess"/>
                    </Route>
                    <Route path="/search">
                        <ChatPage/>
                    </Route>
                    <Route path="/mess">
                        <ChatPage/>
                    </Route>
                    <Route path="/settings">
                        <ChatPage/>
                    </Route>
                    <Route path="/contacts">
                        <ChatPage/>
                    </Route>


                    <Redirect to="/chat"/>
                </Switch>
            )
        }


        return (
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/registrarion">
                    <RegistarionPage/>
                </Route>
                <Redirect from="/" to="/login" />
            </Switch>
        );

}

export default useRoutes;