import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ViewCollection from "./components/ViewCollection";
import BossSkins from "./components/BossSkins";
import TwitchBotInfo from "./components/TwitchBotInfo";
import SoundAlerts from "./components/SoundAlerts";

export default (
  <Switch>
    <Redirect path="/home" to="/" />
    <Route exact path="/" component={Home} />
    <Route path="/shop" component={Shop} />
    <Route path="/viewcollection" component={ViewCollection} />
    <Route path="/skins" component={BossSkins} />
    <Route path="/twitchbotinfo" component={TwitchBotInfo} />
    <Route path="/soundalerts" component={SoundAlerts} />
  </Switch>
);
