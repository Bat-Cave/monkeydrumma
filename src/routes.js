import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Components/Home';
import ViewCollection from './Components/ViewCollection';

export default (
    <Switch>
        <Redirect path='/home' to='/' />
        <Route exact path='/' component={Home}/>
        <Route path='/viewcollection' component={ViewCollection}/>
    </Switch>
)