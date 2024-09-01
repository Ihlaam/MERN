import { BooksContext } from '../context/BooksContext'
import { useContext } from 'react'

export const useBooksContext = () => {
    const context = useContext(BooksContext)    //this object has our state and dispatch 

    if (!context) {
        throw Error('useBooksContext must be used inside a BooksContextProvider')
    }
    return context
}

//now everytime we want to use our bookData we can just invoke this hook and get the context value back