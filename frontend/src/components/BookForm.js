import {useState} from 'react'
import { useBooksContext } from "../hooks/useBooksContext"

const BookForm = () => { 
    const { dispatch } = useBooksContext()
    const[title, setTitle] = useState('')
    const[author, setAuthor] = useState('')
    const[quantity, setQuantity] = useState('')
    const[error, setError] = useState(null)
    const[emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async(e) => {
        e.preventDefault() //default action is to refresh the page on submit, we do not want that

        const book = {title, author, quantity}

        const response = await fetch('api/books', {
            method: 'POST',
            body: JSON.stringify(book) ,     //converting our book to JSON 
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setAuthor('')
            setQuantity('')
            setError(null)
            setEmptyFields([])
            console.log("New book added", json)
            dispatch({type: 'CREATE_BOOK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new book</h3>

            <label>Book Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)} 
                value={title}    
                className={emptyFields.includes('title') ? 'error' : ''} //if this field includes a title we add it to a class, if not we give it an empty class
                />

            <label>Book Author:</label>
            <input
                type="text"
                onChange={(e) => setAuthor(e.target.value)} 
                value={author}  
                className={emptyFields.includes('author') ? 'error' : ''}   
                />

            <label>Book Quantity:</label>
            <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)} 
                value={quantity}    
                className={emptyFields.includes('quantity') ? 'error' : ''} 
                />
            <button>Add Book</button>   
            {error && <div className='error'>{error}</div>}        
        </form>
    )

 }

 export default BookForm