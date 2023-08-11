// import logo from './logo.svg';
import { render } from '@testing-library/react';
// import React from 'react';
import React, { Component } from 'react';
import CardList from './CardList';
// import { robots } from '../Robots';
import SearchBox from './SearchBox'
import Scroll from './Scroll';
// import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'
// import { type } from '@testing-library/user-event/dist/type';





class App extends Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      searchfield: ''
    }
  }

  async componentDidMount() {
    try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=386');
    const pokeInfo = await response.json();
    const data = pokeInfo.results.map(pokemon => pokemon.name);
    console.log(data);
    const newData = await Promise.all(data.map(this.fetchFullInfo));
    console.log(newData);
  
    this.setState({pokemon: newData});
    // this.pokemon = newData;
    
    }
    catch (error) {
      console.error('Error fetching Pokemon: ', error);
    }
  }

  fetchFullInfo = async (Pokemon) => {
    try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`)
    const newInfo = await response.json();
    console.log(newInfo);
    const names = newInfo.name;
    
    const id = newInfo.id;
    const types = newInfo.types.map(types => types.type.name);
    const joinedTypes = (types.length > 1) ? types.join('•') : types[0];
   console.log('Hello');
    return {names, id, joinedTypes};
    } catch (error) {
      console.error('Error fetching Pokemon details', error);
      return null;
    }
  }



  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { pokemon, searchfield } = this.state;
   console.log('OurPokemon:',pokemon.names);
   
    const filteredPokemon = pokemon.filter(pokemon => {
      return (pokemon.names?.toLowerCase() || '').includes(searchfield.toLowerCase());
      // pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !pokemon.length ?
      <h1>Waiting..</h1> :
      (
        <div>
          <div className="tc">
            <h1 className='f1'>Pokedex</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            {/* <Scroll> */}
              <CardList pokemon={filteredPokemon}/>
            {/* </Scroll> */}
          </div>
        </div>
      )
  }

}

export default App;
