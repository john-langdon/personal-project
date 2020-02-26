require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const app = express()

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

//controllers
const authentication = require('./controllers/authController')
// const {}

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log('DB is running smoothly')
    })
    .catch(error => {
        console.log(error)
    })

    app.use(
        session({
            saveUninitialized: true,
            resave: false,
            secret: SESSION_SECRET,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7 * 52 *1000
            }
        })
    )

    app.use(express.json())

    //authentication
    app.post('/auth/register', authentication.register);
    app.post('/auth/login', authentication.login);
    app.get('/auth/logout', authentication.logout);
    app.get('/auth/user', authentication.getUser);

    //cocktails
    // app.get('/api/cocktails', getCocktails)
    // app.post('/api/cocktails', postCocktail)
    // app.put('/api/cocktails/:id', editCocktail)
    // app.delete('/api/cocktails/:id', deleteCocktail)

    app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))
