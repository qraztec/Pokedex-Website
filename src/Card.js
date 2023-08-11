import React from 'react';
import './Card.css';

const Card = ({id, name, type}) => {
    
    return (
        
        <div className='bg-white dib br3 pa3 ma2 grow card'>
            <img alt='photo' src={`https://img.pokemondb.net/artwork/avif/${name}.avif`} />
            <div className="bg-moon-gray">
                <p>#{id}</p>
                <h2>{name}</h2>
                <p>{type}</p> <br />
            </div>
        </div>
    );
}

export default Card