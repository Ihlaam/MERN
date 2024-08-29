//import to use .env
require('dotenv').config()

//packages
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const fs = require('fs');
const https = require('https');
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

//imports
const bookRoutes = require('./routes/bookRouter')
const userRoutes = require('./routes/userRouter')

//create express app
const app = express()

//middleware
app.use(express.json());
app.use(cookieParser())


// Setup CSRF middleware
app.use(csrf({ 
  cookie: { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Lax' 
  } 
}))

//middleware to expose CSRF token in response
app.use((req, res, next) => { 
    res.locals.csrfToken = req.csrfToken() //expose the token to be used in views or API requests
    console.log(req.path, req.method) 
    next()
})


// app.use(
//     helmet({
//       xFrameOptions: { action: "deny" },
//     }),
//   );

// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       frameAncestors: ["self"]
//     }
//   }));

//routes
app.use('/api/books', bookRoutes)
app.use('/api/user', userRoutes)



const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //create http server
        sslServer.listen(process.env.PORT, () => {
            console.log(`HTTPS Server running on port 4000`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
