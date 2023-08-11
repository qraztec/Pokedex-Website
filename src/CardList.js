import React from 'react';
import Card from './Card';

const CardList = ({ pokemon }) => {

    return (
        <div>
            {
                pokemon.map((user, i) => {
                    return <Card id={pokemon[i].id} name={pokemon[i].names} type={pokemon[i].joinedTypes} />
                })
            }
        </div>
    );
}
export default CardList;