const bcrypt = require('bcryptjs');

const register = (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body;
    bcrypt.hash(password, 12).then((hash) => {
        db.authentication.users([username, hash])
        .then(response => {
            // const {user_id, username} = response[0]
            // req.session.user={
            //     id: user_id,
            //     username: username
            // }
            console.log('REGISTERED!!!')
            console.log(req.session.user)
            res.status(200).json(req.session.user)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json('Server error')
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json('Internal Server Error Code 500')
    })
}

const performLogin = (req,res) => {
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
}

const login = (req,res) => {
    //console.log("request ",req.app);
    const db = req.app.get('db');
   // const token = authenticate.getToken({_id: req.user._id});
    const {username, password} = req.body;
    console.log(req.body)
    db.authentication.getUser(username).then(user => {
        console.log("user", user);
        if(user.length === 0) {
            // cb(null, false);
            res.status(500).json('username not found')
        } else {
            bcrypt.compare(password, user[0].password).then(areEqual => {
                console.log("areEqual", areEqual);
                if(areEqual) {
                    // cb(null, { id: first.id, username: first.username, type: first.type });
                    req.session.user = {
                        id: user[0].user_id,
                        username: user[0].username
                    }
                        console.log('LOGGED IN!!!')
                    console.log(req.session)
                    res.status(200).json(req.session.user)
                } else {
                    // cb(null, false)
                    res.status(403).json('incorrect username or password')
                }
            })
        }
    })
}

const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200)
}

const getUser = (req, res) => {
    console.log(req.session)
    res.status(200).json(req.session.user)
}

module.exports = {
    register,
    login,
    logout,
    getUser,
    performLogin
}