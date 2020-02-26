CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    profile_img VARCHAR(25)
)

CREATE TABLE favorites (
    user_id INT REFERENCES user(user_id),
    drink_id
)

CREATE TABLE cocktails (
    cocktail_id SERIAL PRIMARY KEY,
    user_id
)