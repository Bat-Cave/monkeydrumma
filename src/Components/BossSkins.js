import block from '../images/minecraftblock.png';
import twitchPower from '../images/twitchskin.png';
import {Link, withRouter} from 'react-router-dom';

let BossSkins = () => {
    
    let skins = [
        {
            name: 'Twitch Power',
            img3DUrl: 'https://i.ibb.co/PgwxLLT/twitchskin-Boss-Battle1.gif',
            imgUrl: twitchPower,
            description: "This skin represents the power of teamwork represented by MonkeyDrumma's chat when they defeated The Corruptor.",
            milestone: '100 Twitch Followers'
        }
    ]

    let renderedSkins = skins.map((s, i) => {
        return(
            <div className='skin' key={i}>
                <img src={s.img3DUrl} alt={s.name} />
                <div className='skinInfo'>
                    <div className='plaque'>
                        <h4>{s.name}</h4>
                        <h5>{s.milestone}</h5>
                    </div>
                    <h6>{s.description}</h6>
                    <a href={s.imgUrl} download='twitchpower.png' target='_blank' rel='noreferrer' alt={s.name}>Download Skin</a>
                </div>
            </div>
        )
    })

    return(
    <div className='home' id='BossSkins'>
        <nav>
            <h1>
                <img className='titleGem3' src={block} alt='gem' />
                <img className='titleGem'  src={block} alt='gem' />
                Boss Skins
                <img className='titleGem4' src={block} alt='gem' />
                <img className='titleGem2'  src={block} alt='gem' />
            </h1>
            <div className='links'>
                <Link to='/'><i className="fas fa-home"></i>Home</Link>
                <Link to='/shop'><i className="fas fa-store-alt"></i>Gem Shop</Link>
            </div>
        </nav>
        <div className='items-container'>
            {renderedSkins}
        </div>
    </div>
    )
}

export default withRouter(BossSkins);