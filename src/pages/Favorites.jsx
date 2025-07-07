import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import ItemCard from '../components/ItemCard';
import '../style/FavoritesStyle.css';

/**
 * Pagina che mostra la lista dei prodotti preferiti.
 * Visualizza un messaggio se la lista è vuota e permette di vedere i dettagli di ogni prodotto.
 */
export default function Favorites() {
  // Recupera la lista dei preferiti dal context globale
  const { favorites } = useGlobalContext();
  // Recupera eventuali messaggi di confronto dal context globale
  const { compareMessage } = useGlobalContext();

  // Se la lista dei preferiti è vuota, mostra un messaggio
  if (favorites.length === 0) {
    return <p>La lista dei preferiti è vuota</p>;
  }

  return (
    <div>
      {/* Banner per messaggi di confronto */}
      {compareMessage && (
        <div className="compare-message-banner">{compareMessage}</div>
      )}
      <h1>Preferiti ({favorites.length})</h1>
      {/* Lista dei prodotti preferiti */}
      <div className="favorites-list">
        {favorites.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
