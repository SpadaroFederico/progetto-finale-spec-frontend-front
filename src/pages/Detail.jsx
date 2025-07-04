import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

export default function Detail() {
  const { id } = useParams();
  const {
    items,
    favorites,
    addToFavorites,
    removeFromFavorites,
    compareItems,
    addToCompare,
    removeFromCompare
  } = useGlobalContext();

  // Trovo il prodotto con quell'id
  const product = items.find(item => item.id.toString() === id);

  const [message, setMessage] = useState('');

  if (!product) {
    return <Navigate to="/not-found" replace />;
  }

  const isFavorite = favorites.some(fav => fav.id === product.id);
  const isInCompare = compareItems.some(ci => ci.id === product.id);
  const compareLimitReached = !isInCompare && compareItems.length >= 4;

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const toggleCompare = () => {
    if (isInCompare) {
      removeFromCompare(product.id);
      setMessage('');
    } else {
      if (compareLimitReached) {
        setMessage('Puoi confrontare al massimo 4 prodotti.');
        setTimeout(() => setMessage(''), 3000);
        return;
      }
      addToCompare(product);
      setMessage('Prodotto aggiunto al confronto');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{product.title}</h1>
      <img 
        src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={product.title} 
        style={{ maxWidth: '300px' }}
      />

      <p><strong>Categoria:</strong> {product.category}</p>
      {product.price && <p><strong>Prezzo:</strong> €{product.price}</p>}
      {product.description && <p><strong>Descrizione:</strong> {product.description}</p>}
      {product.brand && <p><strong>Marca:</strong> {product.brand}</p>}
      {product.releaseYear && <p><strong>Anno rilascio:</strong> {product.releaseYear}</p>}
      {product.series && <p><strong>Serie:</strong> {product.series}</p>}

      <button onClick={toggleFavorite} style={{ marginRight: '1rem' }}>
        {isFavorite ? '💔 Rimuovi dai preferiti' : '❤️ Aggiungi ai preferiti'}
      </button>

      <button onClick={toggleCompare} disabled={compareLimitReached}>
        {isInCompare ? 'Rimuovi dal confronto' : 'Aggiungi al confronto'}
      </button>

      {message && (
        <p style={{ color: compareLimitReached ? 'red' : 'green', marginTop: '1rem' }}>
          {message}
        </p>
      )}
    </div>
  );
}
