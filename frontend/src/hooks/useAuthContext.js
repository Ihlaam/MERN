import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)    //this object has our state and dispatch 

    if (!context) {
        throw Error('useAuthContext must be used inside a AuthContextProvider')
    }
    return context
}

//now every time we want to use our auth context ( any user value) 
//we can just invoke this hook and get the context value back