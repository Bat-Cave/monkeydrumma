import { withRouter } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import s from "../sounds";
import "../styles/soundAlerts.css";
import banana from "../images/banana.png";

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
  const textAreaRef = useRef(null);

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
  let copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
  };

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
    setSounds(s.sounds);
    setSoundKeys(Object.keys(s.sounds));
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
        default:
          setSounds(s.sounds);
          setSoundKeys(Object.keys(s.sounds));
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
      setSounds(s.sounds);
      setSoundKeys(Object.keys(s.sounds));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    currSoundUrl && playSound(currSoundUrl);
    // eslint-disable-next-line
  }, [currSoundUrl]);

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
          height: `${currentFilter !== 0 ? "32px" : "0"}`,
        }}
      >
        <button onClick={() => setCurrentFilter(0)} className="clear">
          Clear Filters
        </button>
      </div>
      <div className="soundAlerts">
        {soundKeys.map((s, i) => (
          <div
            key={i}
            className="sound"
            onClick={() => handleClick(sounds[s].commandName)}
          >
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
        ))}
      </div>
      {showModal ? (
        <div
          className="modal-container sa-modal"
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
            <button
              onClick={(e) => {
                if (!codeCopied) {
                  e.stopPropagation();
                  setCodeCopied(true);
                  copyToClipboard(e);
                  setTimeout(() => {
                    setCodeCopied(false);
                  }, 5000);
                }
              }}
            >
              {codeCopied ? "Code Copied!" : "Copy Code"}
            </button>
            <p>Redeem "Play A Sound" and type this:</p>
            <div className="channelReward">
              <div className="rewardDetails">
                <div className="rewardLogo"></div>
                <p className="rewardTitle">Play a Sound</p>
                <img className="banana" src={banana} alt="banana" />
              </div>
              <textarea
                id="command"
                ref={textAreaRef}
                defaultValue={command}
                readOnly
                autoFocus
              ></textarea>
              <svg className="smile" version="1.1">
                <g>
                  <path d="M7 11a1 1 0 100-2 1 1 0 000 2zM14 10a1 1 0 11-2 0 1 1 0 012 0zM10 14a2 2 0 002-2H8a2 2 0 002 2z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z"
                    clip-rule="evenodd"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(SoundAlerts);
