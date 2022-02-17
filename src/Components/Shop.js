import gem from "../images/diamond.png";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { withRouter } from "react-router-dom";
import { TwitchChat } from "react-twitch-embed";

let Home = () => {
  let [items, setItems] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [command, setCommand] = useState("");
  let [codeCopied, setCodeCopied] = useState(false);
  // let [search, setSearch] = useState('');
  let [currentFilter, setCurrentFilter] = useState(0);
  let [maxItemsToDisplay, setMaxItemsToDisplay] = useState(30);

  let filters = [
    "",
    "Price (Low to High)",
    "Price (High to Low)",
    "Name (A-Z)",
    "Name (Z-A)",
  ];

  let renderedItems = [].concat(items).map((e, i) => {
    let imageUrl = "";
    if (i < maxItemsToDisplay) {
      if (e.rarity === "common") {
        imageUrl = "https://i.ibb.co/gD7S7TX/common.gif";
      }
      if (e.rarity === "uncommon") {
        imageUrl = "https://i.ibb.co/TrYqTpS/uncommon.gif";
      }
      if (e.rarity === "rare") {
        imageUrl = "https://i.ibb.co/bbjFVpH/rare.gif";
      }
      if (e.rarity === "epic") {
        imageUrl = "https://i.ibb.co/ccvybtq/epic.gif";
      }
      if (e.rarity === "legendary") {
        imageUrl = "https://i.ibb.co/5cB9c2p/legendary.gif";
      }
      let isNew = Date.now() - e["date added"] < 2592000000 ? true : false;
      return (
        <div className="item" key={i}>
          {isNew && <span className="new-item">New</span>}
          {e.owner === "none" ? (
            <h3>{e.name}</h3>
          ) : (
            <h3>
              <img className="rarity" src={imageUrl} alt={e.rarity} />
              {e.name}
              <img className="rarity" src={imageUrl} alt={e.rarity} />
            </h3>
          )}
          <img className="item-image" src={e.url || gem} alt={e} />
          {e.owner === "none" ? (
            <div>
              <div className="price">
                <p>{e.price}</p>
                <img src={gem} alt="gems" />
              </div>
              <button onClick={() => buyHandler(e.name)}>Buy</button>
            </div>
          ) : (
            <div>
              <h3 className="owned">
                <span>Owned by</span> {e.owner}
              </h3>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  });

  let buyHandler = (itemName) => {
    setCommand(`!buy ${itemName.toLowerCase().split(" ").join("-")}`);
    setShowModal(true);
  };

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/1ZFa3jk0mz2SYAq4xCOPgFDL7ZJMb_ysG5fO-QwFedV8/pub?output=csv",
      {
        download: true,
        header: true,
        complete: function (results) {
          var data = results.data;
          setItems(data);
          setCurrentFilter(99);
          setCurrentFilter(0);
        },
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let changeFilter = (index) => {
      let sortedPrice;
      let sortedName;
      let sortedOwner;
      switch (+index) {
        case 1:
          sortedPrice = [...items].sort((a, b) => +a.price - +b.price);
          setItems(sortedPrice);
          break;
        case 2:
          sortedPrice = [...items].sort((a, b) => +b.price - +a.price);
          setItems(sortedPrice);
          break;
        case 3:
          sortedName = [...items].sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          setItems(sortedName);
          break;
        case 4:
          sortedName = [...items].sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          });
          setItems(sortedName);
          break;
        default:
          let ownedItems = [];
          let unOwnedItems = [];

          for (let i = 0; i < items.length; i++) {
            items[i].owner === "none"
              ? unOwnedItems.push(items[i])
              : ownedItems.push(items[i]);
          }
          let sortedUnowned = [...unOwnedItems].sort(function (a, b) {
            return b.id - a.id;
          });
          sortedOwner = [...ownedItems].sort(function (a, b) {
            let ownerA = a.owner === "none" ? "" : a.owner;
            let ownerB = b.owner === "none" ? "" : b.owner;

            if (ownerA > ownerB) {
              return -1;
            }
            if (ownerA < ownerB) {
              return 1;
            }
            return 0;
          });

          let joinedItems = sortedUnowned.concat(sortedOwner);

          setItems(joinedItems);
          break;
      }
    };
    changeFilter(currentFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter]);

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name);
    setCodeCopied(true);
    setTimeout(() => {
      setCodeCopied(false);
    }, 3000);
  };

  return (
    <div className="home" id="shop">
      <div className="welcome">
        <h3>Welcome!</h3>
        <p>
          This is the <span>Gem Shop</span>! Here you can see available
          collectable items to purchase with your valuable gems. You earn{" "}
          <span>1 Gem for every 20 minutes</span> you watch MonkeyDrumma, but
          soon you'll be able to join Gem Raffles, face other viewers in mini
          games for Gems, and more!
        </p>
        <p>
          Each item has a rarity value, <span>BUT</span> you won't know the
          rarity of the item you buy until the item is purchased. There is a
          rarity legend at the bottom-left side of the screen.
        </p>
      </div>
      <div className="searchContainer">
        {/* <div>
                    <span>Search:</span>
                    <input onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Search'/>
                </div> */}
        <div>
          <span>Filter Items:</span>
          <select onChange={(e) => setCurrentFilter(e.target.value)}>
            <option value="0">None</option>
            <option value="1">{filters[1]}</option>
            <option value="2">{filters[2]}</option>
            <option value="3">{filters[3]}</option>
            <option value="4">{filters[4]}</option>
          </select>
        </div>
      </div>
      <div className="items-container">
        {items.length ? (
          renderedItems
        ) : (
          <div className="loading">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <button
          id="loadmore"
          onClick={() => setMaxItemsToDisplay(maxItemsToDisplay + 30)}
        >
          Load More
        </button>
      </div>
      <div className="legend">
        <h4 id="legendLabel">
          <i className="fas fa-chevron-right"></i>
        </h4>
        <div>
          <p>Common:</p>
          <img src="https://i.ibb.co/gD7S7TX/common.gif" alt="common" />
        </div>
        <div>
          <p>Uncommon:</p>
          <img src="https://i.ibb.co/TrYqTpS/uncommon.gif" alt="uncommon" />
        </div>
        <div>
          <p>Rare:</p>
          <img src="https://i.ibb.co/bbjFVpH/rare.gif" alt="rare" />
        </div>
        <div>
          <p>Epic:</p>
          <img src="https://i.ibb.co/ccvybtq/epic.gif" alt="epic" />
        </div>
        <div>
          <p>Legendary:</p>
          <img src="https://i.ibb.co/5cB9c2p/legendary.gif" alt="legendary" />
        </div>
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
          <p>
            Send <span>{command}</span> in chat!
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

export default withRouter(Home);
