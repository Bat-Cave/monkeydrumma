import gem from '../images/diamond.png';
import { useEffect, useState, useRef} from 'react';
import Tabletop from "tabletop";
import {Link, withRouter} from 'react-router-dom';
let Home = () => {

    let [items, setItems] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [command, setCommand] = useState('');
    let [codeCopied, setCodeCopied] = useState(false);
    let [search, setSearch] = useState('');
    let [currentFilter, setCurrentFilter] = useState(1);
    const textAreaRef = useRef(null);

    let filters = ['', 'Price (Low to High)', 'Price (High to Low)', 'Name (A-Z)', 'Name (Z-A)']

    
    


    let renderedItems = [].concat(items).map((e, i) => {
        let imageUrl = '';
        if(e.rarity === 'common'){imageUrl = 'https://i.ibb.co/gD7S7TX/common.gif'};
        if(e.rarity === 'uncommon'){imageUrl = 'https://i.ibb.co/TrYqTpS/uncommon.gif'};
        if(e.rarity === 'rare'){imageUrl = 'https://i.ibb.co/bbjFVpH/rare.gif'};
        if(e.rarity === 'epic'){imageUrl = 'https://i.ibb.co/ccvybtq/epic.gif'};
        if(e.rarity === 'legendary'){imageUrl = 'https://i.ibb.co/5cB9c2p/legendary.gif'};
        return(
            <div className='item' key={i}>
                {e.owner === 'none' ? (
                    <h3>{e.name}</h3>
                ) : (
                    <h3><img className='rarity' src={imageUrl} alt={e.rarity}/>{e.name}<img className='rarity' src={imageUrl} alt={e.rarity}/></h3>
                )}
                <img className='item-image' src={e.url || gem} alt={e}/>
                {e.owner === 'none' ? (
                    <div>
                        <div className='price'>
                            <p>{e.price}</p>  
                            <img src={gem} alt='gems'/> 
                        </div>
                        <button onClick={() => buyHandler(e.name)}>Buy</button>
                    </div>
                ) : (
                    <div>
                        <h3 className='owned'><span>Owned by</span> {e.owner}</h3>
                    </div>
                )}
            </div>
        )
    })

    let buyHandler = itemName => {
        setCommand(`!buy ${itemName.toLowerCase().split(' ').join('-')}`)
        setShowModal(true);
    }

    useEffect(() => {
        Tabletop.init({
            key: "1ZFa3jk0mz2SYAq4xCOPgFDL7ZJMb_ysG5fO-QwFedV8",
            simpleSheet: true
        })
        .then((data) => setItems(data))
        .catch((err) => console.warn(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let searchedItems = [];
        for(let j = 0; j < items.length; j++){
            if(items[j].name.toLowerCase().includes(search)){
                searchedItems.push(items[j]);
            }
        }
        setItems(searchedItems)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    
    useEffect(() => {
        let changeFilter = index => {
            let sortedPrice;
            let sortedName;
            switch(+index){
                case 1: 
                    sortedPrice = [...items].sort((a,b) => a.price - b.price);
                    setItems(sortedPrice);
                    break
                case 2:
                    sortedPrice = [...items].sort((a,b) => b.price - a.price);
                    setItems(sortedPrice);
                    break
                case 3:
                    sortedName = [...items].sort(function(a, b){
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                    });
                    setItems(sortedName);
                    break
                case 4:
                    sortedName = [...items].sort(function(a, b){
                        if(a.name > b.name) { return -1; }
                        if(a.name < b.name) { return 1; }
                        return 0;
                    });
                    setItems(sortedName);
                    break
                default :
                    Tabletop.init({
                        key: "1ZFa3jk0mz2SYAq4xCOPgFDL7ZJMb_ysG5fO-QwFedV8",
                        simpleSheet: true
                    })
                    .then((data) => setItems(data))
                    .catch((err) => console.warn(err));
            }
        }
        changeFilter(currentFilter)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFilter])

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
    };


    return(
        <div className='home'>
            <nav>
                <h1>
                    <img className='titleGem3' src={gem} alt='gem' />
                    <img className='titleGem'  src={gem} alt='gem' />
                    Gem Shop
                    <img className='titleGem4' src={gem} alt='gem' />
                    <img className='titleGem2'  src={gem} alt='gem' />
                </h1>
                <div className='links'>
                    <Link to='/viewcollection'>View Collections</Link>
                </div>
            </nav>
            <div className='welcome'>
                <h3>Welcome!</h3>
                <p>This is the <span>Gem Shop</span>! Here you can see available collectable items to purchase with your valuable gems. You earn <span>1 Gem for every 20 minutes</span> you watch MonkeyDrumma, but soon you'll be able to join Gem Raffles, face other viewers in mini games for Gems, and more!</p>
                <p>Each item has a rarity value, <span>BUT</span> you won't know the rarity of the item you buy until the item is purchased. There is a rarity legend at the bottom-left side of the screen.</p>
            </div>
            <div className='searchContainer'>
                <div>
                    <span>Search:</span>
                    <input onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())} placeholder='Search'/>
                </div>
                <div>
                    <span>Filter Items:</span>
                    <select onChange={(e) => setCurrentFilter(e.target.value)}>
                        <option value='0'>None</option>
                        <option value='1'>{filters[1]}</option>
                        <option value='2'>{filters[2]}</option>
                        <option value='3'>{filters[3]}</option>
                        <option value='4'>{filters[4]}</option>
                    </select>
                </div>
            </div>
            <div className='items-container'>
                {items.length ? renderedItems : <h1>No Items to Display</h1>}
            </div>
            <div className='legend'>
                <h4 id='legendLabel'>LEGEND</h4>
                <div>
                    <p>Common:</p>
                    <img src='https://i.ibb.co/gD7S7TX/common.gif' alt='common'/>
                </div>
                <div>
                    <p>Uncommon:</p>
                    <img src='https://i.ibb.co/TrYqTpS/uncommon.gif' alt='uncommon'/>
                </div>
                <div>
                    <p>Rare:</p>
                    <img src='https://i.ibb.co/bbjFVpH/rare.gif' alt='rare'/>
                </div>
                <div>
                    <p>Epic:</p>
                    <img src='https://i.ibb.co/ccvybtq/epic.gif' alt='epic'/>
                </div>
                <div>
                    <p>Legendary:</p>
                    <img src='https://i.ibb.co/5cB9c2p/legendary.gif' alt='legendary'/>
                </div>
            </div>
            {showModal ? (
                <div className='modal-container' onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(false);
                }}>
                    <div className='modal' onClick={(e) => e.stopPropagation()}>
                        <button id='close' onClick={(e) => {
                            setShowModal(false);
                        }}>X</button>
                        <p>Type this command in the twitch chat:</p>
                        <textarea id='command' ref={textAreaRef} defaultValue={command} readOnly autoFocus></textarea>
                        <button onClick={(e) => {
                            if(!codeCopied){
                                e.stopPropagation();
                                setCodeCopied(true);
                                copyToClipboard(e);
                                setTimeout(() => {
                                    setCodeCopied(false);
                                }, 5000)
                            };
                        }}>Copy Code</button>
                        {codeCopied ? (
                            <p id='code-copied'>Code Copied!</p>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default withRouter(Home);