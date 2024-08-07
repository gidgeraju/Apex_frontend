import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonOwnerStats from './PokemonOwnerStats';

function HomePage() {
  const [owners, setOwners] = useState([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/pokemon-owners');
        setOwners(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon owners');
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
      <h1>Pokémon Trainer App</h1>
      <div>
        <h2>List of Pokémon Owners</h2>
        <select 
          onChange={(e) => setSelectedOwnerId(e.target.value)}
          value={selectedOwnerId || ''}
        >
          <option value="">Choose an owner</option>
          {owners.map((owner, index) => (
            <option key={index} value={owner.pokemonOwnerName}>{owner.pokemonOwnerName}</option>
          ))}
        </select>
      </div>
      {selectedOwnerId && <PokemonOwnerStats ownerId={selectedOwnerId} />}
      <div>
        <button>Pokémon Go</button>
        <button>Pokémon Flee</button>
        <button>Pokémon Cease</button>
      </div>
    </div>
  );
}

export default HomePage;