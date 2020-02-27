CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
)

CREATE TABLE favorites (
    user_id INT REFERENCES users(user_id),
    cocktail_id INT REFERENCES cocktails(cocktail_id),
    favorites_id SERIAL PRIMARY KEY
)

CREATE TABLE cocktails (
    cocktail_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    liqour_id SERIAL PRIMARY KEY
    reciepe_instructions TEXT
)

DELETE FROM users
WHERE user_id = $1