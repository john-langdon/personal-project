const bcrypt = require('bcryptjs');

const register = (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body;
    bcrypt.hash(password, 12).then((hash) => {
        db.users.save([username, hash])
        .then(response => {
            const {user_id, username} = response[0]
            req.session.user={
                id: user_id,
                username: username
            }
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
    db.users.findOne({username:username}).then(user => {
        console.log("user", user);
        if(user.length === 0) {
            cb(null, false);
            res.status(400).json('username not found')
        } else {
            bcrypt.compare(password, user.password).then(areEqual => {
                console.log("areEqual", areEqual);
                if(areEqual) {
                    // cb(null, { id: first.id, username: first.username, type: first.type });
                    req.session.user = {
                        id: user.user_id,
                        username: user.username
                    }
                    console.log(req.session)
                    res.status(200).json(req.session)
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