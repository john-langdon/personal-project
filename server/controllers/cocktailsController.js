const getCocktails = (req, res) => {
    const db = req.app.get('db')
}

const postCocktails = (req, res) => {
    const db = req.app.get('db')
    const {cocktail_name} = req.body
    db.cocktails.addCocktail([cocktail_name])
        .then(post => {
            res.sendStatus(200)
        })
        .catch(error => {
            console.error(error)
            res.status(500).json("internal server error")
        })
    }


    const addToFavorites = (req, res) => {
        const db = req.app.get('db')
        const {}
    }

    module.exports = {
        postCocktails
    }