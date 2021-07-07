import gem from '../images/diamond.png';
import jsonItems from '../items.json';
import { useEffect, useState } from 'react';
let Home = () => {

    let [items, setItems] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [command, setCommand] = useState('');
    let [codeCopied, setCodeCopied] = useState(false);


    let renderedItems = items.map((e, i) => {
        return(
            <div className='item' key={i}>
                <h3>{e.name}</h3>
                <img className='item-image' src={e.url || gem} alt={e}/>
                <div className='price'>
                    <p>{e.price}</p>  
                    <img src={gem} alt='gems'/> 
                </div>
                <p>details</p>
                <button onClick={() => buyHandler(e.name)}>Buy</button>
            </div>
        )
    })

    let buyHandler = itemName => {
        setCommand(`!buy ${itemName.toLowerCase().split(' ').join('-')}`)
        setShowModal(true);
    }

    useEffect(() => {
        let itemsArray = [];
        for(let j = 0; j < jsonItems.length; j++){
            itemsArray.push(jsonItems[j]);
        }
        setItems(itemsArray);
    }, [])

    return(
        <div className='home'>
            <nav>
                <h1>Welcome</h1>
            </nav>
            <div className='items-container'>
                {renderedItems}
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
                        <code>{command}</code>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(command)
                            setCodeCopied(true);
                            setTimeout(() => {
                                setCodeCopied(false);
                            }, 5000)
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

export default Home;