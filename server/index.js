require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const app = express()

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

//controllers
const authentication = require('./controllers/authController')
const cocktails = require('./controllers/cocktailsController')
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
    // app.put('/auth/user', authentication.changePassword); // use body for password and get user id from req.session.user.id. Then update table with this info.
        // user will send new password from front, hash it, and update user's PW in table where user id matches

    //endpoints for cocktails
    // app.get('/api/cocktails', getCocktails)
    app.post('/api/cocktails', cocktails.postCocktails) // consider not doing this
    // app.put('/api/cocktails/:id', editCocktail)
    // app.delete('/api/cocktails/:id', deleteCocktail)

    //erics endpoints for cocktails
    // app.post('/api/favorites', cocktails.addFav); // use req.body (for the cocktail_id)
        // send the drink id from the front and add it to the table with the user's id
    // app.get('/api/favorites', cocktails.getFavs); // dont need body or params, just use req.session.user.id
        // get all drinks from the favorites table that match the user id
    // app.delete('/api/favorites', cocktails.deleteFav) // use params
        // will remove the drink entry from favorites table using user id & drink id




    app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))
