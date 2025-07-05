import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import ItemCard from '../components/ItemCard';
import '../style/FavoritesStyle.css';

export default function Favorites() {
  const { favorites } = useGlobalContext();
  // Recupera la funzione per confrontare i messaggi
    const { compareMessage } = useGlobalContext();

  if (favorites.length === 0) {
    return <p>La lista dei preferiti è vuota</p>;
  }

  return (
    <div>
      {compareMessage && (
        <div className="compare-message-banner">{compareMessage}</div>
      )}
      <h1>Preferiti ({favorites.length})</h1>
      <div className="favorites-list">
        {favorites.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
