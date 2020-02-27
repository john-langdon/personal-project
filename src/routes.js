import React from 'react';
import {Switch, Route} from 'react-router-dom'

//components
import GuestHome from './components/guestHome'
import Home from './components/home'

export default (
    <Switch>
        <Route component={GuestHome} exaxt path='/' />
        <Route component={Home} path='home' />
    </Switch>
)