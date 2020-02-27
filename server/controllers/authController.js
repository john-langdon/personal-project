const bcrypt = require('bcryptjs');

const register = (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body;
    bcrypt.hash(password, 12).then((hash) => {
        db.authentication.registerUser([username, hash])
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

const login = (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body;
    db.authentication.getUser(username).then(user => {
        if(user.length === 0) {
            res.status(400).json('username not found')
        } else {
            bcrypt.compare(password, user[0].password).then(areEqual => {
                if(areEqual) {
                    const {user_id, username} = user[0]
                    req.session.user = {
                        id: user_id,
                        username: username
                    }
                    res.status(200).json(req.session.user)
                } else {
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
    getUser
}