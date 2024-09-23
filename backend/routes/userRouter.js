const express = require('express')
const { loginUser, signupUser, logoutUser, getUsers} = require('../controllers/userController')
const router = express.Router()

const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();

const bruteForce = new ExpressBrute(store, {
    freeRetries: 5, // Number of allowed retries
    minWait: 1000 * 60, // 1 minute wait after retries exhausted
    maxWait: 1000 * 60 * 10, // 10 minutes max wait
    lifetime: 1000 * 60 * 10, // 10 minutes lifetime
});

router.get('/users', getUsers)

router.post('/login', bruteForce.prevent, loginUser)

router.post('/signup', signupUser)

router.get('/logout', logoutUser)

//export routes
module.exports = router


// {
//     "email": "laam@demo.com",
//     "password": "laaM123!"
    
// }