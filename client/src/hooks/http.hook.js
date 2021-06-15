import {useCallback} from "react";

export const useHttp = () => {

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        try {
            const res = await fetch(url, {method, headers, body})

            const data = await res.json()
            if(!res.ok) {
                throw new Error(data || 'Что-то пошло не так')
            }
                return data
        } catch (e) {
            throw e
        }
    }, [])



    return { request }
}


