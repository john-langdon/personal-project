import React from 'react';
import {Switch, Route} from 'react-router-dom'

//components
import GuestHome from './components/guestHome'
import Home from './components/Home/home'
import Favorites from './components/Favorites/favorites'

export default (
    <Switch>
        <Route component={GuestHome} exact path='/' />
        <Route component={Home} path='/home' />
        <Route component={Favorites} path='/favorites' />
    </Switch>
)