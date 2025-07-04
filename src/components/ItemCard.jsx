import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import '../style/ItemCardStyle.css'

function ItemCard({ item }) {
  const [message, setMessage] = useState('');

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    addToCompare
  } = useGlobalContext();

  const isFavorite = favorites.some(fav => fav.id === item.id);

  const handleCompare = (e) => {
    e.preventDefault();
    const result = addToCompare(item);
    setMessage(result.message);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    isFavorite ? removeFromFavorites(item.id) : addToFavorites(item);
  };

  return (
    <Link to={`/pokemonItems/${item.id}`} className={`item-card ${item.category}`}>
      <div className="item-card-content">
        <img
          src={item.image}
          alt={item.title}
          className="item-card-image"
        />
        <h3>{item.title}</h3>
        <p>Prezzo: {item.price ? `€${item.price}` : 'N/A'}</p>
        <p>Categoria: {item.category}</p>
        <button onClick={handleCompare} style={{ marginTop: '0.5rem' }}>
          Confronta
        </button>
        {message && (
          <div className="compare-message">
            {message}
          </div>
        )}
        <button onClick={handleFavorite} style={{ marginTop: '0.5rem' }}>
          {isFavorite ? '💔 Rimuovi dai preferiti' : '❤️ Aggiungi ai preferiti'}
        </button>
      </div>
    </Link>
  );
}

export default ItemCard;
