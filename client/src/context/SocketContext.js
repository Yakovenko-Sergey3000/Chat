import {createContext} from "react";

export const SocketContext = createContext({
    isAuth: false,
    id: null
})