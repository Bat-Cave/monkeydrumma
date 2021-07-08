import gem from '../images/diamond.png';
import jsonFile from '../items.json';
import { useEffect, useState, useRef} from 'react';
let Home = () => {

    let [items, setItems] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [command, setCommand] = useState('');
    let [codeCopied, setCodeCopied] = useState(false);
    let [search, setSearch] = useState('');
    let [currentFilter, setCurrentFilter] = useState(0);
    const textAreaRef = useRef(null);
    let useSheetsApi = false;

    let filters = ['', 'Price (Low to High)', 'Price (High to Low)', 'Name (A-Z)', 'Name (Z-A)']

    
    


    let renderedItems = [].concat(items).map((e, i) => {
        return(
            <div className='item' key={i}>
                <h3>{e.name}</h3>
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
                    <h3 className='owned'><span>Owned by</span> {e.owner}</h3>
                )}
            </div>
        )
    })

    let buyHandler = itemName => {
        setCommand(`!buy ${itemName.toLowerCase().split(' ').join('-')}`)
        setShowModal(true);
    }

    useEffect(() => {
        if(useSheetsApi){
            let getItemsFromSpreadsheet = async () => {
                await fetch("https://v1.nocodeapi.com/monkeydrumma/google_sheets/DrYqSQxoGratCPVo?tabId=Items")
                .then(res => res.json())
                .then(
                    (result) => {
                        let itemsArray = [];
                        for(let j = 0; j < result.data.length; j++){
                            itemsArray.push(result.data[j]);
                        }
                        setItems(itemsArray);
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            };
            getItemsFromSpreadsheet();
         } else {
            let itemsArray = [];
            for(let j = 0; j < jsonFile.length; j++){
                itemsArray.push(jsonFile[j]);
            }
            setItems(itemsArray);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let searchedItems = [];
        for(let j = 0; j < jsonFile.length; j++){
            if(jsonFile[j].name.toLowerCase().includes(search)){
                searchedItems.push(jsonFile[j]);
            }
        }
        setItems(searchedItems)
    }, [search])

    
    useEffect(() => {
        let changeFilter = index => {
            let sortedArray = [];
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
                    for(let j = 0; j < jsonFile.length; j++){
                        sortedArray.push(jsonFile[j]);
                    }
                    setItems(sortedArray);
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
                <h1>Welcome</h1>
            </nav>
            <div className='searchContainer'>
                <input onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())} placeholder='Search'/>
                <select onChange={(e) => setCurrentFilter(e.target.value)}>
                    <option value='0'>None</option>
                    <option value='1'>{filters[1]}</option>
                    <option value='2'>{filters[2]}</option>
                    <option value='3'>{filters[3]}</option>
                    <option value='4'>{filters[4]}</option>
                </select>
            </div>
            <div className='items-container'>
                {items.length ? renderedItems : <div className='loading'></div>}
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

export default Home;