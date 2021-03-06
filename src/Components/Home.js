import twitch from "../images/twitch.png";
import discord from "../images/discord.png";
import gem from "../images/diamond.png";
import { Link, withRouter } from "react-router-dom";
let Home = () => {
  return (
    <div className="home">
      <div className="biglink">
        <a
          href="https://www.twitch.tv/monkeydrumma"
          target="_blank"
          rel="noreferrer"
          className="noButtonEffect"
        >
          <img src={twitch} alt="twitch icon" />
        </a>
        <div>
          <h2>I'm MonkeyDrumma</h2>
          <p>
            I'm a streamer on Twitch! My streams mainly focus on playing{" "}
            <span>Minecraft</span> on my realm with many of my viewers, but I
            occaisionally play <span>Modern Warfare 3</span>,{" "}
            <span>Phasmophobia</span>, and other games like those.
          </p>
          <a
            href="https://www.twitch.tv/monkeydrumma"
            target="_blank"
            rel="noreferrer"
          >
            Go to Twitch
          </a>
        </div>
      </div>
      <div className="biglink">
        <a
          href="https://www.monkeydrumma.com/shop"
          target="_blank"
          rel="noreferrer"
          className="noButtonEffect"
        >
          <img src={gem} alt="gem icon" />
        </a>
        <div>
          <h2>The Gem Shop</h2>
          <p>
            The Gem Shop contains <span>collectable items</span> that you can
            buy with Gems. Gems are earned from watching me on twitch! There are
            a few ways to earn the Gems, with more ways coming in the future.
            Check out the shop to see what items are available!
          </p>
          <Link to="/shop">Go to Shop</Link>
        </div>
      </div>
      <div className="biglink">
        <a
          href="https://www.monkeydrumma.com/shop"
          target="_blank"
          rel="noreferrer"
          className="noButtonEffect"
        >
          <img src={discord} alt="gem icon" />
        </a>
        <div>
          <h2>Discord Server</h2>
          <p>Feel free to join the community discord server!</p>
          <a
            href="https://discord.gg/kXHFhvhwzx"
            target="_blank"
            rel="noreferrer"
          >
            Join Server
          </a>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
