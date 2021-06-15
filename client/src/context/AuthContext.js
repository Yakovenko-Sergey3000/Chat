import {createContext} from 'react'
const noop = () => {};
export const AuthContext = createContext({
    isSess: null,
    user: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})

