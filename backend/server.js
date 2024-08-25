//import to use .env
require('dotenv').config()

//require express package which node is using
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const fs = require('fs');
const https = require('https');
const bookRoutes = require('./routes/bookRouter')
const userRoutes = require('./routes/userRouter')

//https/tls
const credentials = {
     key: fs.readFileSync('/etc/ssl/private/private.key'), 
     cert: fs.readFileSync('/etc/ssl/private/server.cert') };

//create express app by invoking a function
const app = express()
app.use(express.json());


//middleware
app.use((req, res, next) => { 
    console.log(req.path, req.method) 
    next()
})
app.use(
    helmet({
      xFrameOptions: { action: "deny" },
    }),
  );

app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      frameAncestors: ["self"]
    }
  }));

//routes
app.use('/api/books', bookRoutes)
app.use('/api/user', userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //create https server
        https.createServer(credentials, app).listen(process.env.PORT, () => {
            console.log(`HTTPS Server running on port 4000`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
