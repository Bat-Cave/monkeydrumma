import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

let Nav = () => {
  let path = typeof window !== "undefined" ? document.location.pathname : null;
  let [userId, setUserId] = useState("");
  let [userName, setUserName] = useState("");

  useEffect(() => {
    //CHECK TWTICH AUTH SHIZ

    let url = window.location.href;
    let hash = window.location.hash;

    if (hash) {
      let id_token = url.substring(url.indexOf("id_token=") + 9);
      id_token = id_token.substring(0, id_token.indexOf("&"));
      let ACCESS_TOKEN = url.substring(url.indexOf("access_token=") + 13);
      ACCESS_TOKEN = ACCESS_TOKEN.substring(0, ACCESS_TOKEN.indexOf("&"));
      let user_info = jwt_decode(id_token);
      if (
        user_info.iss === "https://id.twitch.tv/oauth2" &&
        user_info.aud === CLIENT_ID
      ) {
        axios
          .get(`https://api.twitch.tv/helix/users?id=${user_info.sub}`, {
            headers: {
              Authorization: "Bearer " + ACCESS_TOKEN,
              "Client-Id": CLIENT_ID,
            },
          })
          .then((res) => {
            console.log(res.data.data[0]);
            setUserId(res.data.data[0].id);
            setUserName(res.data.data[0].login);
          })
          .catch((err) => console.log(err));

        let interval_id = setInterval(() => {
          fetch("https://id.twitch.tv/oauth2/validate", {
            headers: {
              Authorization: "OAuth " + ACCESS_TOKEN,
            },
          })
            .then((res) => {
              if (res.status === 401) {
                clearInterval(interval_id);
              }
            })
            .catch((err) => console.log(err));
        }, 60 * 60 * 1000);
      }
    }

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

    // eslint-disable-next-line
  }, []);

  console.log(`
  
    userId: ${userId}
    userName: ${userName}

  `);

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const links = [
    {
      to: "/",
      iconClass: "fas fa-home",
      text: "Home",
    },
    {
      to: "/shop",
      iconClass: "fas fa-store-alt",
      text: "Shop",
    },
    {
      to: "/viewcollection",
      iconClass: "fas fa-shapes",
      text: "Collections",
    },
    {
      to: "/skins",
      iconClass: "fas fa-cube",
      text: "Skins",
    },
    {
      to: "/soundalerts",
      iconClass: "fas fa-volume-up",
      text: "Sounds",
    },
  ];

  const CLIENT_ID = encodeURIComponent("0oynmbgva1trafbfd1uhifebicwplw");
  // const REDIRECT_URI = encodeURIComponent("http://localhost:3000");
  // const RESPONSE_TYPE = encodeURIComponent("token id_token");
  // const SCOPE = encodeURIComponent(
  //   "openid user:read:email user:read:follows user:read:subscriptions"
  // );
  // const CLAIMS = encodeURIComponent(
  //   JSON.stringify({
  //     id_token: { email: null, email_verified: null },
  //   })
  // );
  // const STATE = encodeURIComponent(
  //   "meet" + Math.random().toString(36).substring(2, 15)
  // );

  // const create_twitch_endpoint = () => {
  //   let nonce = encodeURIComponent(
  //     Math.random().toString(36).substring(2, 15) +
  //       Math.random().toString(36).substring(2, 15)
  //   );

  //   let openid_url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&claims=${CLAIMS}&state=${STATE}&nonce=${nonce}`;

  //   return openid_url;
  // };

  return (
    <div className="home">
      <nav>
        <div className="links">
          {links.map((l, i) => {
            return (
              <Link
                key={`link-${i}`}
                to={l.to}
                id={`${path === l.to ? "active" : ""}`}
              >
                <i className={l.iconClass}></i>
                {windowDimensions.width < 595 ? "" : l.text}
              </Link>
            );
          })}
          {/* <a href={create_twitch_endpoint()}>Login with Twitch</a> */}
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Nav);
