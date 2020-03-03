import {createStore, combineReducers, applyMiddleware} from 'redux'
import promise from 'redux-promise-middleware'

//reducers
import authReducer from './reducers/authReducer'
import cocktails from './reducers/cocktails'
import favorites from './reducers/favorites'

const combineReducer = combineReducers({
    authReducer,
    cocktails,
    favorites
})

export default createStore(combineReducer, applyMiddleware(promise))