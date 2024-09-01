import { useBooksContext } from "../hooks/useBooksContext"

const BookDetails = ({ book }) => {
    const { dispatch } = useBooksContext()

    const handleClick = async () => {
        const response = await fetch('api/books/' + book._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_BOOK', payload: json})
        }
    }

    return (
        <div className="book-details">
            <h4>{book.title}</h4>
            <p><strong>Author: </strong>{book.author}</p>
            <p><strong>Quantity: </strong>{book.quantity}</p>
            <p>{book.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
 }

 export default BookDetails
