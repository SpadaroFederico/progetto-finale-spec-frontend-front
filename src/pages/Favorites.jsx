import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import ItemCard from '../components/ItemCard';

export default function Favorites() {
  const { favorites } = useGlobalContext();

  if (favorites.length === 0) {
    return <p>La lista dei preferiti è vuota</p>;
  }

  return (
    <div>
      <h1>Preferiti ({favorites.length})</h1>
      <div className="favorites-list">
        {favorites.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
