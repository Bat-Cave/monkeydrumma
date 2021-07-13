import gem from '../images/diamond.png';
import { useEffect, useState} from 'react';
import Tabletop from "tabletop";
import {Link, withRouter} from 'react-router-dom';
let ViewCollection = () => {
    let [items, setItems] = useState([]);
    let [searchedItems, setSearchedItems] = useState([]);
    let [search, setSearch] = useState('');

    useEffect(() => {
        Tabletop.init({
            key: "1ZFa3jk0mz2SYAq4xCOPgFDL7ZJMb_ysG5fO-QwFedV8",
            simpleSheet: true
        })
        .then((data) => setItems(data))
        .catch((err) => console.warn(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    let searchForOwner = () => {
        let ownersItems = [];
        for(let j = 0; j < items.length; j++){
            if(items[j].owner.toLowerCase() === search){
                ownersItems.push(items[j]);
            }
        }
        setSearchedItems(ownersItems)
    }

    

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
            </div>
        )
    })





    return(
    <div className='home' id='collection'>
        <nav>
            <h1>
                <img className='titleGem3' src={gem} alt='gem' />
                <img className='titleGem'  src={gem} alt='gem' />
                Collection
                <img className='titleGem4' src={gem} alt='gem' />
                <img className='titleGem2'  src={gem} alt='gem' />
            </h1>
            <div className='links'>
                <Link to='/'><i className="fas fa-home"></i>Home</Link>
                <Link to='/shop'><i className="fas fa-store-alt"></i>Gem Shop</Link>
            </div>
        </nav>
        <div className='welcome noborder'>
            <p>Enter your twitch username below to see your collection!</p>
        </div>
        <div className='searchContainer'>
            <div>
                <span style={{minWidth: '150px'}}>Twitch Username:</span>
                <input onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Search' onKeyDown={(e) => e.code === 'Enter' ? searchForOwner(search) : null}/>
            </div>
            <button onClick={() => searchForOwner(search)} >Search</button>
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
    </div>
    )
}

export default withRouter(ViewCollection);