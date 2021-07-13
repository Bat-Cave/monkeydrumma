import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Components/Home';
import Shop from './Components/Shop';
import ViewCollection from './Components/ViewCollection';
import BossSkins from './Components/BossSkins';

export default (
    <Switch>
        <Redirect path='/home' to='/' />
        <Route exact path='/' component={Home}/>
        <Route path='/shop' component={Shop}/>
        <Route path='/viewcollection' component={ViewCollection}/>
        <Route path='/skins' component={BossSkins}/>
    </Switch>
)