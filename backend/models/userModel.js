const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, {timestamps: true })

//when using this we can't use => we have to use the keyword function, just how js works
userSchema.statics.signup = async function (email, password) {


    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email invalid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password invalid')
    }
    //verification
    const existingUser = await this.findOne({ email })

    if (existingUser) {
        throw Error('Email already taken')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user
}


//login
userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    
    //try to find the user, not just checking if it exists. if we can't find anyone then we throw an error
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email or password')
    }

    const match = await bcrypt.compare(password, user.password)  

    if(!match){
        throw Error('Incorrect email or password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)

