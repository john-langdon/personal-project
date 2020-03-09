// import axios from 'axios'
require('dotenv').config()

const initialState = {
    favorites: []
}

const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

export const updateFavorites = e => {
    return {
        type: UPDATE_FAVORITES,
        payload: e
    }
}


export default function favorites(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_FAVORITES:
            return {
                ...state,
                favorites: payload
            }
            default:
                return state;
    }
}



