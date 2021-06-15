import  React from 'react';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import useRoutes from './components/routes'
import {BrowserRouter} from "react-router-dom";
import LodingChat from "./components/LodingChat";




const App = () => {
    const {login, idSess, user, logout, loding} = useAuth()
    const isAuthenticated = !!idSess;

    const routes = useRoutes(isAuthenticated)

    if(loding){
        return <LodingChat />
    }
    return (
      <BrowserRouter>
            <AuthContext.Provider value={{
                idSess, user, login,logout, isAuthenticated
            }}>
                {routes}
            </AuthContext.Provider>
      </BrowserRouter>
    );
}

export default App;


