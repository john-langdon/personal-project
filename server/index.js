require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { Pool,Client } = require('pg');
const path = require('path')
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const jwt = require('jsonwebtoken'); 

//console.log("session:",session);
const cors = require('cors')

const app = express()

app.use( express.static( `${__dirname}/../build` ));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'))
});

let {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;
SERVER_PORT = 4000
//SESSION_SECRET = 'secret_password';
// CONNECTION_STRING = "postgres://znxrsvpqhazlce:c00c5f9f0f29756aebb0c65b5e57ffaf5a46133d4d5d0fa856f3297c9a666512@:5432/d3u1anqri7blqe?ssl=true"

//controllers
const authentication = require('./controllers/authController')
const cocktails = require('./controllers/cocktailsController')


// const pool = new Pool({
//     connectionString : CONNECTION_STRING
// })
app.get('/getUsers', function(req, res){
    pool.query('SELECT * FROM users;',function(err, result){
    if(err){
    res.status(500).send(err.toString());
    } else{
    res.send(JSON.stringify(result.rows));
    }
    });
});
    
    
// const {}

// exports.local = passport.use(new LocalStrategy((username, password, cb) => {
//     authentication.login(username, password, cb);
// }));
// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());

// exports.getToken = function(user) {
//     return jwt.sign(user, "my_secret", {expiresIn: 3600});
// };

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "my_secret";

// exports.jwtPassport = passport.use(
//     new JwtStrategy(
//         opts,
//         (jwt_payload, done) => {
//             console.log('JWT payload:', jwt_payload);
//             // User.findOne({_id: jwt_payload._id}, (err, user) => {
//             //     if (err) {
//             //         return done(err, false);
//             //     } else if (user) {
//             //         return done(null, user);
//             //     } else {
//             //         return done(null, false);
//             //     }
//             // });
//         }
//     )
// );

// exports.verifyUser = passport.authenticate('jwt', {session: false});

// const db = massive({
//     host : 'ec2-35-168-54-239.compute-1.amazonaws.com',
//     port : 5432,
//     database : 'd3u1anqri7blqe',
//     user : 'znxrsvpqhazlce',
//     password : 'c00c5f9f0f29756aebb0c65b5e57ffaf5a46133d4d5d0fa856f3297c9a666512',
//     ssl : true
// })

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log('DB is running smoothly')
    })
    .catch(error => {
        console.log(error)
        //process.
    })

    app.use(
        session({
            saveUninitialized: true,
            resave: false,
            secret: SESSION_SECRET,
            cookie: {
                secure:false,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 52 *1000
            }
        })
    )

    app.use(express.json());
    app.use(cors());

    //authentication
    app.post('/auth/register', authentication.register);
    app.post('/auth/login', authentication.login);
    app.post('/auth/performlogin', authentication.performLogin);
    app.get('/auth/logout', authentication.logout);
    app.get('/auth/user', authentication.getUser);
    // app.put('/auth/usercity', authentication.getCity);
    // app.put('/auth/user', authentication.changePassword); // use body for password and get user id from req.session.user.id. Then update table with this info.
        // user will send new password from front, hash it, and update user's PW in table where user id matches

    // //endpoints for cocktails
    // // app.get('/api/cocktails', getCocktails)
    // app.post('/api/cocktails', cocktails.postCocktails) // consider not doing this
    // // app.put('/api/cocktails/:id', editCocktail)
    // // app.delete('/api/cocktails/:id', deleteCocktail)

    //erics endpoints for cocktails
    app.post('/api/favorites', cocktails.addToFav); // use re   q.body (for the cocktail_id)
    app.get('/api/favorites', cocktails.getFavs); // use re   q.body (for the cocktail_id)
    app.delete('/api/favorites', cocktails.delFavs);
    // app.put('/api/city', users.editCity);
        // send the drink id from the front and add it to the table with the user's id
    // app.get('/api/favorites', cocktails.getFavs); // dont need body or params, just use req.session.user.id
        // get all drinks from the favorites table that match the user id
    // app.delete('/api/favorites', cocktails.deleteFav) // use params
        // will remove the drink entry from favorites table using user id & drink id



    app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))
