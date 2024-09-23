const Book = require('../models/bookModel')
const mongoose = require('mongoose')

//get all books
const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({createdAt: -1})
    res.status(200).json(books)
}

//get single book
const getBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such book"})
    }

    const book = await Book.findById(id)

    if (!book) {
        return res.status(404).json({error: 'No such book'})
    }

    res.status(200).json({book})
}

//create new book
const createBook = async (req, res) => {
    const {title, author, quantity} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!author) {
        emptyFields.push('author')
    }
    if(!quantity) {
        emptyFields.push('quantity')
    }
    if(emptyFields.length > 0)
    {
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }


    //add doc to db
    try {
        const book = await Book.create({title, author, quantity})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such book"})
    }

    const book = await Book.findOneAndDelete({_id: id})

    if (!book) {
        return res.status(400).json({error: 'No such book'})
    }

    res.status(200).json(book)

}

//update a book
const updateBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such book"})
    }

    const book = await Book.findOneAndUpdate({_id: id}, {
        ...req.body  //spread the properties out of the request
    })

    if (!book) {
        return res.status(400).json({error: 'No such book'})
    }

    res.status(200).json(book)
}


module.exports = {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook,
}