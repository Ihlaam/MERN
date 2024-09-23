import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const logout = () => {

        //to logout we don't send a request to the backend. we will just remove the user from local storage and delete token
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}