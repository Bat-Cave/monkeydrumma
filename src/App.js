import "./App.css";
import routes from "./routes";
import Nav from "./Components/Nav";
import { TwitchPlayer } from "react-twitch-embed";

function App() {
  return (
    <div className="App" id="particles-js">
      <Nav />
      <div className="playerWrapper">
        <div className="player">
          <TwitchPlayer
            channel="monkeydrumma"
            width="350px"
            height="196.875px"
          />
        </div>
      </div>
      {routes}
    </div>
  );
}

export default App;
