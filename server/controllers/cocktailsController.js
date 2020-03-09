const getCocktails = (req, res) => {
    const db = req.app.get('db')
}

const postCocktails = (req, res) => {
    const db = req.app.get('db')
    const {cocktail_id} = req.body;
    db.cocktails.addCocktail([cocktail_name])
        .then(post => {
            res.sendStatus(200)
        })
        .catch(error => {
            console.error(error)
            res.status(500).json("internal server error")
        })
}


const addToFav = (req, res) => {
    // console.log("addToFav", req.session);
    const db = req.app.get('db');
    const {drink_id} = req.body; //const drink_id = req.body.drink_id;
    const user_id = req.session.user.id
    console.log(req.body)
    db.cocktails.addFavorites([user_id, drink_id])
    .then(post => {
        res.status(200).json("ok");
    })
    .catch(error => {
        console.error(error)
        res.status(500).json("internal server error")
    })
    //res.status(200).json("ok");
    //const {id} = req.session.user; // const id = req.session.user.id;

}

const getFavs = (req, res) => {
    const db = req.app.get('db');
    console.log(req.session)
    const user_id = req.session.user.id; //const cocktail_id = req.body.cocktail_id;
    console.log("user_id ",user_id);
    db.favorites.getFavs(user_id)
    .then(favorites => {
        console.log("ok", favorites);
        res.status(200).json(favorites);
    });
    //res.status(200).json("ok");
    //const {id} = req.session.user; // const id = req.session.user.id;

}

const delFavs = (req, res) => {
    const db = req.app.get('db');
    const {favorites_id} = req.query; //const cocktail_id = req.body.cocktail_id;
    console.log("favorites_id",favorites_id);
    db.favorites.destroy({favorites_id}, {})
    .then(favorites => {
        console.log("ok", favorites);
        res.json(favorites);
    });
    //res.status(200).json("ok");
    //const {id} = req.session.user; // const id = req.session.user.id;

}

module.exports = {
    postCocktails,
    addToFav,
    getFavs,
    delFavs
}