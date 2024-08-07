import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddPokemon from './components/AddPokemon';
import PokemonList from './components/PokemonList';
import AddPokemonToUser from './components/AddPokemonToUser';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/list-pokemon">List Pokemon</Link>
            </li>
            <li>
              <Link to="/add-pokemon">Add Pokemon User</Link>
            </li>
            <li>
              <Link to="/add-pokemon-to-user">Add Pokemon to User</Link>
            </li>
          </ul>
        </nav>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzb_mbxm8GyzBRzxLQQjWa90q7i-cR580Sw&s" height="50pxpx"/>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list-pokemon" element={<PokemonList />} />
          <Route path="/add-pokemon" element={<AddPokemon />} />
          <Route path="/add-pokemon-to-user" element={<AddPokemonToUser />} />
          <Route path="/edit-pokemon/:ownerName" element={<AddPokemon />} />x
        </Routes>
      </div>
    </Router>
  )
}

export default App