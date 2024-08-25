//call in express again, it's a new file in different folder
const express = require('express')

//remember to cut this function
//const Book = require('../models/bookModel') 
const {createBook, getBook, getBooks, deleteBook, updateBook} = require('../controllers/bookController')

//creates an instance of the route
const router = express.Router()

// //quick test if db is working
// router.post('/', async (req, res) => {
//     const {title, author, quantity} = req.body
//     try {
//         const book = await Book.create({title, author, quantity})
//         res.status(200).json(book)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// })


//handle for routes
router.get('/', getBooks)

router.get('/:id', getBook)

router.post('/', createBook)

router.delete('/:id', deleteBook)

router.patch('/:id', updateBook)

//export routes
module.exports = router