import { createContext, useReducer } from 'react'

export const BooksContext = createContext()

export const booksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOK':
            return {
                books: action.payload
            }
        case 'CREATE_BOOK':
            return {
                books: [action.payload, ...state.books]     //we want to return a new array, and the rest of the workout data so we call the previous state in
            }  
        case 'DELETE_BOOK':
            return {
                books: state.books.filter((b) => b._id !== action.payload._id)
            }      
        default:
            return state    
    }
}

export const BooksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(booksReducer, {
        books: []
    })

    //first property is the type like the function it would do, the second is payload which is what is needed to make the change
    //in our case it takes in an array

    return(
        <BooksContext.Provider value={{...state, dispatch}} >
            { children }
        </BooksContext.Provider>
    )
}