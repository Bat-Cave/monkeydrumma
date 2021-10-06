import { withRouter } from "react-router-dom";
import { useEffect, useState, useRef } from "react/cjs/react.development";
import s from "../sounds";
import "../styles/soundAlerts.css";
import banana from "../images/banana.png";

let SoundAlerts = () => {
  let [sounds, setSounds] = useState({});
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
  const textAreaRef = useRef(null);

  let playSound = async (link) => {
    currAudio.src = currSoundUrl;
    currAudio.type = "audio/mp3";
    console.log(currSoundId);

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

    console.log(newObj);
  };

  useEffect(() => {
    setSounds(s.sounds);
    setSoundKeys(Object.keys(s.sounds));
    convertObject(s.sounds);
  }, []);

  useEffect(() => {
    currSoundUrl && playSound(currSoundUrl);
    // eslint-disable-next-line
  }, [currSoundUrl]);

  return (
    <div className="home">
      <div className="welcome noborder">
        <p>
          <span>Choose a Sound Alert Below to play on stream!</span>
        </p>
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
              <p className="link">play on stream</p>
            </div>
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
              <svg class="smile" version="1.1">
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
