
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPokemonToUser.css';

function AddPokemonToUser() {
  const [pokemonOwners, setPokemonOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState('');
  const [pokemonData, setPokemonData] = useState({
    pokemonName: '',
    pokemonAbility: '',
    noOfPokemon: 1
  });
  const [pokemonList, setPokemonList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemonOwners();
    fetchPokemonList();
  }, []);

  const fetchPokemonOwners = async () => {
    try {
      const response = await axios.get('/api/pokemon');
      setPokemonOwners(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon owners:', error);
    }
  };

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      setPokemonList(response.data.results);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

  const handleOwnerChange = (e) => {
    setSelectedOwner(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPokemonData({ ...pokemonData, [name]: value });
  };

  const handlePokemonSelect = async (e) => {
    const selectedName = e.target.value;
    setPokemonData({ ...pokemonData, pokemonName: selectedName, pokemonAbility: '' });
    if (selectedName) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedName}`);
        const abilities = response.data.abilities.map(ability => ability.ability.name);
        if (abilities.length > 0) {
          setPokemonData(prev => ({ ...prev, pokemonAbility: abilities[0] }));
        }
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOwner) {
      alert('Please select a Pokemon owner');
      return;
    }
    try {
      await axios.post(`/api/pokemon/${selectedOwner}/add`, pokemonData);
      alert('Pokemon added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding Pokemon:', error);
      alert('Error adding Pokemon. Please try again.');
    }
  };

  return (
    <div className="add-pokemon-to-user">
      <h2>Add Pokemon to User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pokemonOwner">Pokemon Owner:</label>
          <select
            id="pokemonOwner"
            value={selectedOwner}
            onChange={handleOwnerChange}
            required
          >
            <option value="">Select an owner</option>
            {pokemonOwners.map(owner => (
              <option key={owner.pokemonOwnerName} value={owner.pokemonOwnerName}>
                {owner.pokemonOwnerName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pokemonName">Pokemon Name:</label>
          <select
            id="pokemonName"
            name="pokemonName"
            value={pokemonData.pokemonName}
            onChange={handlePokemonSelect}
            required
          >
            <option value="">Select a Pokemon</option>
            {pokemonList.map(pokemon => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pokemonAbility">Pokemon Ability:</label>
          <input
            type="text"
            id="pokemonAbility"
            name="pokemonAbility"
            value={pokemonData.pokemonAbility}
            onChange={handleInputChange}
            required
            readOnly
          />
        </div>
        <div>
          <label htmlFor="noOfPokemon">Number of Pokemon:</label>
          <input
            type="number"
            id="noOfPokemon"
            name="noOfPokemon"
            value={pokemonData.noOfPokemon}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        <button type="submit">Add Pokemon</button>
      </form>
    </div>
  );
}

export default AddPokemonToUser;