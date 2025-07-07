import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import '../style/ItemCardStyle.css';

/**
 * Componente che mostra una card di un singolo prodotto/item.
 * Permette di aggiungere/rimuovere dai preferiti e di confrontare l'item.
 */
function ItemCard({ item }) {
  // Stato locale per mostrare messaggi temporanei (es. confronto)
  const [message, setMessage] = useState('');

  // Recupera funzioni e dati dal context globale
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    addToCompare
  } = useGlobalContext();

  // Verifica se l'item è già tra i preferiti
  const isFavorite = favorites.some(fav => fav.id === item.id);

  /**
   * Gestisce il click sul pulsante "Confronta".
   * Mostra un messaggio temporaneo con l'esito dell'azione.
   */
  const handleCompare = (e) => {
    e.preventDefault();
    const result = addToCompare(item);
    setMessage(result.message);
    setTimeout(() => setMessage(''), 2000);
  };

  /**
   * Gestisce il click sul pulsante "Preferiti".
   * Aggiunge o rimuove l'item dai preferiti.
   */
  const handleFavorite = (e) => {
    e.preventDefault();
    isFavorite ? removeFromFavorites(item.id) : addToFavorites(item);
  };

  return (
    // Card cliccabile che porta al dettaglio dell'item
    <Link to={`/pokemonItems/${item.id}`} className={`item-card ${item.category}`}>
      <div className="item-card-content">
        {/* Immagine del prodotto */}
        <img
          src={item.image}
          alt={item.title}
          className="item-card-image"
        />
        {/* Titolo e dettagli */}
        <h3>{item.title}</h3>
        <p>Prezzo: {item.price ? `€${item.price}` : 'N/A'}</p>
        <p>Categoria: {item.category}</p>
        {/* Pulsante per confrontare l'item */}
        <button onClick={handleCompare} style={{ marginTop: '0.5rem' }}>
          Confronta
        </button>
        {/* Messaggio di confronto temporaneo */}
        {message && (
          <div className="compare-message">
            {message}
          </div>
        )}
        {/* Pulsante per aggiungere/rimuovere dai preferiti */}
        <button onClick={handleFavorite} style={{ marginTop: '0.5rem' }}>
          {isFavorite ? '💔 Rimuovi dai preferiti' : '❤️ Aggiungi ai preferiti'}
        </button>
      </div>
    </Link>
  );
}

export default ItemCard;
