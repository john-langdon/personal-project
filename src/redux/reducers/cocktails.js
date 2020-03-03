import axios from 'axios'
require('dotenv').config()

const initialState = {
    cocktail: []

}

const ADD_COCKTAIL = 'ADD_COCKTAIL'




export const addCocktail = (cocktail) => {
    return {
        type: ADD_COCKTAIL,
        payload: axios.post('/api/cocktails', cocktail)
    }
}


export default function favorites(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
            case ADD_COCKTAIL:
                return { ...state, cocktails: payload.data};
            
                default:
                    return state;
        }
    }



