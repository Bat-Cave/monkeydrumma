// import gem from '../images/diamond.png';
// import { useEffect, useState, useRef} from 'react';
// import Tabletop from "tabletop";
import {withRouter} from 'react-router-dom';
const axios = require('axios')
let TwitchBotInfo = () => {
    
    let testEndpoint = () => {
        axios({
            method: 'get',
            url: 'https://bilbobananabot.glitch.me/test',
        })
        .then(function (response) {
            console.log(response);
        });

    }

    return(
    <div className='home' id='twitchbotinfo'>
        twitchbotinfo
        <button onClick={() => testEndpoint()}> Test </button>
    </div>
    )
}

export default withRouter(TwitchBotInfo);