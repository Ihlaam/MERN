import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

//we need to keep track of our context, for session management so we know when
//a user is logged in or out

export const useLogin = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)  //eg. loading screen
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //1. update the auth context with email
            //2. update isLoading to false bc we finished
            //3. update our jsonwebtoken in local storage. if a user closes page and reopens, they should still be logged in
            localStorage.setItem('user', JSON.stringify(json))
            //we have to store strings inside localstorage so we convert out json object to a string
       
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }

    return { login, isLoading, error}
}