import {useCallback, useEffect, useState} from 'react';
import {useCookies} from "react-cookie";

export const useAuth = () => {
    const [idSess, setIdSess] = useState(null);
    const [user, setUser] = useState(null);
    const [loding, setLoding] = useState(false)
    const [cookie,,removeCookie] = useCookies(['idSess'])

    const login = useCallback((id, dataUser) => {
        setIdSess(id)
        setUser(dataUser)
    },[])


    const logout = useCallback(() => {
        setIdSess(null)
        setUser(null)
        removeCookie(['idSess'])
    },[removeCookie])

    const authMiddleware = useCallback(async () => {
        setLoding(true)
        const res = await fetch('api/chat')
        const dataUser = await res.json()

        if(Object.keys(dataUser).length === 0) {
            setLoding(false)
            setIdSess(null)
            setUser(null)
            return
        } else {
            login(cookie.idSess, dataUser);
            setLoding(false);
        }
    


    }, [login, cookie.idSess])

    useEffect(() => {
       authMiddleware()
    },[authMiddleware])

    return {login, user, idSess, logout, loding}
}