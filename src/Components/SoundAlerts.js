import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "../sounds";
import "../styles/soundAlerts.css";
import { TwitchChat } from "react-twitch-embed";

let SoundAlerts = () => {
  let [sounds, setSounds] = useState([]);
  let [soundKeys, setSoundKeys] = useState([]);
  let [currSoundUrl, setCurrSoundUrl] = useState("");
  let [currSoundId, setCurrSoundId] = useState("");
  // eslint-disable-next-line
  let [currAudio, setCurrAudio] = useState(new Audio());
  // eslint-disable-next-line
  let [playing, setPlaying] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [command, setCommand] = useState("");
  let [codeCopied, setCodeCopied] = useState(false);
  let [currentFilter, setCurrentFilter] = useState(0);
  let [search, setSearch] = useState("");
  // const textAreaRef = useRef(null);

  let playSound = async (link) => {
    currAudio.src = currSoundUrl;
    currAudio.type = "audio/mp3";

    try {
      await currAudio.play();
      setPlaying(true);
      currAudio.addEventListener("ended", () => {
        setPlaying(false);
        setCurrSoundId("");
      });
    } catch (err) {
      console.log("Failed to play..." + err);
    }
  };

  let handlePlay = (id, url) => {
    setCurrSoundId(id);
    setCurrSoundUrl(url);
  };
  let handlePause = async (id, url) => {
    await currAudio.pause();
    setCurrSoundId("");
    setCurrSoundUrl("");
  };

  let handleClick = (comm) => {
    setCommand(comm.toLowerCase());
    setShowModal(true);
  };
  // let copyToClipboard = (e) => {
  //   textAreaRef.current.select();
  //   document.execCommand("copy");
  //   // This is just personal preference.
  //   // I prefer to not show the whole text area selected.
  //   e.target.focus();
  // };

  let convertObject = (obj) => {
    let newObj = {};

    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      let soundObjInfo = obj[keys[i]];
      soundObjInfo.commandName = soundObjInfo.commandName.toLowerCase();
      newObj[keys[i].toLowerCase()] = soundObjInfo;
    }
  };

  useEffect(() => {
    let sorted = Object.keys(s.sounds).sort();
    setSounds(s.sounds);
    setSoundKeys(sorted);
    convertObject(s.sounds);
  }, []);

  useEffect(() => {
    setSearch("");
    let changeFilter = (index) => {
      switch (+index) {
        case 1:
          let memes = Object.keys(s.sounds).reduce(function (r, e) {
            if (s.sounds[e].tags.includes("memes")) r[e] = s.sounds[e];
            return r;
          }, {});

          setSounds(memes);
          setSoundKeys(Object.keys(memes));
          break;
        case 2:
          let anime = Object.keys(s.sounds).reduce(function (r, e) {
            if (s.sounds[e].tags.includes("anime")) r[e] = s.sounds[e];
            return r;
          }, {});

          setSounds(anime);
          setSoundKeys(Object.keys(anime));
          break;
        case 3:
          let soundEffect = Object.keys(s.sounds).reduce(function (r, e) {
            if (s.sounds[e].tags.includes("sound effect")) r[e] = s.sounds[e];
            return r;
          }, {});

          setSounds(soundEffect);
          setSoundKeys(Object.keys(soundEffect));
          break;
        case 4:
          let music = Object.keys(s.sounds).reduce(function (r, e) {
            if (s.sounds[e].tags.includes("music")) r[e] = s.sounds[e];
            return r;
          }, {});

          setSounds(music);
          setSoundKeys(Object.keys(music));
          break;
        case 5:
          let movie = Object.keys(s.sounds).reduce(function (r, e) {
            if (s.sounds[e].tags.includes("movie")) r[e] = s.sounds[e];
            return r;
          }, {});

          setSounds(movie);
          setSoundKeys(Object.keys(movie));
          break;
        case 6:
          let videoGame = Object.keys(s.sounds).reduce(function (r, e) {
            if (s.sounds[e].tags.includes("video game")) r[e] = s.sounds[e];
            return r;
          }, {});

          setSounds(videoGame);
          setSoundKeys(Object.keys(videoGame));
          break;
        case 7:
          let minecraft = Object.keys(s.sounds).reduce(function (r, e) {
            if (s.sounds[e].tags.includes("minecraft")) r[e] = s.sounds[e];
            return r;
          }, {});
          setSounds(minecraft);
          setSoundKeys(Object.keys(minecraft));
          break;
        case 99:
          let newSounds = Object.keys(s.sounds).reduce(function (r, e) {
            if (Date.now() - s.sounds[e].dateAdded < 2592000000) {
              r[e] = s.sounds[e];
            }
            return r;
          }, {});
          setSounds(newSounds);
          setSoundKeys(Object.keys(newSounds));
          break;
        default:
          let sorted = Object.keys(s.sounds).sort();
          setSounds(s.sounds);
          setSoundKeys(sorted);
          break;
      }
    };
    changeFilter(currentFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter]);

  useEffect(() => {
    let searchSounds = (title) => {
      let searchResult = Object.keys(s.sounds).reduce(function (r, e) {
        if (s.sounds[e].title.toLowerCase().includes(title.toLowerCase()))
          r[e] = s.sounds[e];
        return r;
      }, {});

      setSounds(searchResult);
      setSoundKeys(Object.keys(searchResult));
    };

    if (search !== "") {
      searchSounds(search);
    } else {
      let sorted = Object.keys(s.sounds).sort();
      setSounds(s.sounds);
      setSoundKeys(sorted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    currSoundUrl && playSound(currSoundUrl);
    // eslint-disable-next-line
  }, [currSoundUrl]);

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name);
    setCodeCopied(true);
    setTimeout(() => {
      setCodeCopied(false);
    }, 3000);
  };

  return (
    <div className="home">
      <div className="welcome nowhiteborder">
        <p>
          <span>Choose a Sound Alert Below to play on stream!</span>
        </p>
      </div>
      <div className="soundFilter">
        <div>
          <h3>Search</h3>
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          <h3>Filters</h3>
          <div>
            <button onClick={() => setCurrentFilter(99)} className="new">
              New
            </button>
            <button onClick={() => setCurrentFilter(1)} className="memes">
              Memes
            </button>
            <button onClick={() => setCurrentFilter(2)} className="anime">
              Anime
            </button>
            <button onClick={() => setCurrentFilter(3)} className="soundeffect">
              Sound Effect
            </button>
            <button onClick={() => setCurrentFilter(4)} className="music">
              Music
            </button>
            <button onClick={() => setCurrentFilter(5)} className="movie">
              Movie
            </button>
            <button onClick={() => setCurrentFilter(6)} className="videogame">
              Video Game
            </button>
            <button onClick={() => setCurrentFilter(7)} className="minecraft">
              Minecraft
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: `flex`,
          justifyContent: "center",
          transition: "all .25s ease",
          margin: "8px",
          overflow: "hidden",
          animation: `${
            currentFilter !== 0 ? "fade-in .5s ease" : "fade-out .5s ease"
          }`,
          height: `${currentFilter !== 0 ? "36px" : "0"}`,
        }}
      >
        <button onClick={() => setCurrentFilter(0)} className="clear">
          Clear Filters
        </button>
      </div>
      <div className="soundAlerts">
        {soundKeys.map((s, i) => {
          let isNew =
            Date.now() - sounds[s].dateAdded < 2592000000 ? true : false;
          return (
            <div
              key={i}
              className="sound"
              onClick={() => handleClick(sounds[s].commandName)}
            >
              {isNew && <span className="new-item">New</span>}
              <div className="soundInfo">
                <h3>{sounds[s].title}</h3>
                {currSoundId === `sound-${i}` ? (
                  <button
                    className="soundButton"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePause(`sound-${i}`, sounds[s].url);
                    }}
                    id={`sound-${i}`}
                  >
                    <i className="fas fa-pause"></i>
                  </button>
                ) : (
                  <button
                    className="soundButton"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(`sound-${i}`, sounds[s].url);
                    }}
                    id={`sound-${i}`}
                  >
                    <i className="fas fa-play"></i>
                  </button>
                )}
              </div>
              <div className="soundTags">
                {sounds[s].tags.map((t, i) => {
                  return (
                    <span
                      key={`tag-${i}`}
                      className={`tag ${t.split(" ").join("")}`}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
              <p className="link">play on stream</p>
            </div>
          );
        })}
      </div>
      <div
        className={`modal-container`}
        style={{
          top: `${showModal ? "0%" : "-150%"}`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(false);
        }}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button
            id="close"
            onClick={(e) => {
              setShowModal(false);
            }}
          >
            X
          </button>
          <p style={{ background: "#00c7ac" }}>
            Redeem <span>"Play a Sound"</span> and type <span>{command}</span>
            <button
              style={{ display: "block", width: "100%" }}
              onClick={() => handleCopy(command)}
            >
              {codeCopied ? "Command Copied!" : "Copy Command"}
            </button>
          </p>
          <div className="chatWrapper">
            <TwitchChat
              channel="monkeydrumma"
              theme="dark"
              title="Twitch Chat Embed"
              id="twitch-chat"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SoundAlerts);
