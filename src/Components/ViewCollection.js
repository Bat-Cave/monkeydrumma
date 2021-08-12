import gem from '../images/diamond.png';
import { useEffect, useState, useRef} from 'react';
import Papa from "papaparse";
import {Link, withRouter} from 'react-router-dom';
let ViewCollection = () => {
    let [items, setItems] = useState([]);
    let [searchedItems, setSearchedItems] = useState([]);
    let [search, setSearch] = useState('');
    let [showModal, setShowModal] = useState(false);
    let [command, setCommand] = useState('');
    let [codeCopied, setCodeCopied] = useState(false);
    let [options, setOptions] = useState([]);
    const textAreaRef = useRef(null);

    useEffect(() => {
        Papa.parse('https://docs.google.com/spreadsheets/d/1ZFa3jk0mz2SYAq4xCOPgFDL7ZJMb_ysG5fO-QwFedV8/pub?output=csv', {
            download: true,
            header: true,
            complete: function(results) {
                var data = results.data
                setItems(data)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let newOptions = [];
        for(let o = 0; o < items.length; o++){
            if(items[o].owner !== 'none'){
                if(!newOptions.includes(items[o].owner)){
                    newOptions.push(items[o].owner);
                };
            }
        }
        setOptions(newOptions);
    }, [items])


    let searchForOwner = () => {
        let ownersItems = [];
        for(let j = 0; j < items.length; j++){
            if(items[j].owner.toLowerCase() === search){
                ownersItems.push(items[j]);
            }
        }
        setSearchedItems(ownersItems)
    }

    let handleValueChange = (name) => {
        setSearch(name);
    }
    useEffect(() => {
        searchForOwner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])
    

    let renderedItems = searchedItems.map((e, i) => {
        let imageUrl = '';
        if(e.rarity === 'common'){imageUrl = 'https://i.ibb.co/gD7S7TX/common.gif'};
        if(e.rarity === 'uncommon'){imageUrl = 'https://i.ibb.co/TrYqTpS/uncommon.gif'};
        if(e.rarity === 'rare'){imageUrl = 'https://i.ibb.co/bbjFVpH/rare.gif'};
        if(e.rarity === 'epic'){imageUrl = 'https://i.ibb.co/ccvybtq/epic.gif'};
        if(e.rarity === 'legendary'){imageUrl = 'https://i.ibb.co/5cB9c2p/legendary.gif'};
        return(
            <div className='item' key={i}>
                <h3><img className='rarity' src={imageUrl} alt={e.rarity}/>{e.name}<img className='rarity' src={imageUrl} alt={e.rarity}/></h3>
                <img className='item-image' src={e.url || gem} alt={e.name}/>
                <div>
                    <h3 className='owned'><span>Owned by</span> {e.owner}</h3>
                </div>
                <button onClick={() => displayHandler(e.name)} style={{fontSize: '12px'}}>Show on Stream</button>
            </div>
        )
    })

    let ownerOptions = options.map((e, i) => {
        return(
            <option value={e} key={i}>{e}</option>
        )   
    })

    let displayHandler = itemName => {
        setCommand(`!display ${itemName.toLowerCase().split(' ').join('-')}`)
        setShowModal(true);
    }

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
    };

    return(
    <div className='home' id='collection'>
        <nav>
            <h1>
                <img className='titleGem3' src={gem} alt='gem' />
                <img className='titleGem'  src={gem} alt='gem' />
                Collections
                <img className='titleGem4' src={gem} alt='gem' />
                <img className='titleGem2'  src={gem} alt='gem' />
            </h1>
            <div className='links'>
                <Link to='/'><i className="fas fa-home"></i>Home</Link>
                <Link to='/shop'><i className="fas fa-store-alt"></i>Gem Shop</Link>
                <Link to='/skins'><i className="fas fa-cube"></i>Skins</Link>
            </div>
        </nav>
        <div className='welcome noborder'>
            <p><span>Select your twitch username</span> below to see your collection! If your twitch username doesn't show up as an option, head to the Gem Shop to get a collectable!</p>
        </div>
        <div className='searchContainer'>
            <div>
                <span style={{minWidth: '150px'}}>Twitch Username:</span>
                <select onChange={(e) => handleValueChange(e.target.value.toLowerCase())}>
                    <option value=''>Select</option>
                    {ownerOptions}
                </select>
            </div>
        </div>
        <div className='items-container'>
            {searchedItems.length ? renderedItems : <h1>No Items to Display</h1>}
        </div>
        <div className='legend'>
            <h4 id='legendLabel'><i className="fas fa-chevron-right"></i></h4>
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
                    }}>{codeCopied ? 'Code Copied!' : 'Copy Code'}</button>
                </div>
            </div>
        ) : null}
    </div>
    )
}

export default withRouter(ViewCollection);