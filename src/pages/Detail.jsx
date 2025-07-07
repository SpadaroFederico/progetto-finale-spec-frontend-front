import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import '../style/DetailStyle.css'; 

/**
 * Pagina di dettaglio di un singolo prodotto.
 * Mostra tutte le informazioni del prodotto selezionato e permette di aggiungere/rimuovere dai preferiti e dal confronto.
 */
export default function Detail() {
  // Recupera l'id del prodotto dalla URL
  const { id } = useParams();
  // Recupera dati e funzioni dal context globale
  const {
    items,
    favorites,
    addToFavorites,
    removeFromFavorites,
    compareItems,
    addToCompare,
    removeFromCompare
  } = useGlobalContext();

  // Trova il prodotto corrispondente all'id
  const product = items.find(item => item.id.toString() === id);

  // Stato locale per mostrare messaggi temporanei (es. confronto)
  const [message, setMessage] = useState('');

  // Se il prodotto non esiste, reindirizza alla pagina not found
  if (!product) {
    return <Navigate to="/not-found" replace />;
  }

  // Verifica se il prodotto è tra i preferiti
  const isFavorite = favorites.some(fav => fav.id === product.id);
  // Verifica se il prodotto è già nel confronto
  const isInCompare = compareItems.some(ci => ci.id === product.id);
  // Verifica se è stato raggiunto il limite massimo di prodotti da confrontare
  const compareLimitReached = !isInCompare && compareItems.length >= 4;

  /**
   * Gestisce il click sul pulsante preferiti.
   * Aggiunge o rimuove il prodotto dai preferiti.
   */
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  /**
   * Gestisce il click sul pulsante confronto.
   * Aggiunge o rimuove il prodotto dal confronto, mostrando un messaggio se necessario.
   */
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
    <div className="detail-container" style={{ padding: '1rem' }}>
      <h1>{product.title}</h1>
      {/* Immagine del prodotto */}
      <img 
        src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={product.title} 
        style={{ maxWidth: '300px' }}
      />

      {/* Dettagli del prodotto */}
      <p><strong>Categoria:</strong> {product.category}</p>
      {product.price && <p><strong>Prezzo:</strong> €{product.price}</p>}
      {product.description && <p><strong>Descrizione:</strong> {product.description}</p>}
      {product.brand && <p><strong>Marca:</strong> {product.brand}</p>}
      {product.releaseYear && <p><strong>Anno rilascio:</strong> {product.releaseYear}</p>}
      {product.series && <p><strong>Serie:</strong> {product.series}</p>}

      {/* Pulsante per aggiungere/rimuovere dai preferiti */}
      <button onClick={toggleFavorite} style={{ marginRight: '1rem' }}>
        {isFavorite ? '💔 Rimuovi dai preferiti' : '❤️ Aggiungi ai preferiti'}
      </button>

      {/* Pulsante per aggiungere/rimuovere dal confronto */}
      <button onClick={toggleCompare} disabled={compareLimitReached}>
        {isInCompare ? 'Rimuovi dal confronto' : 'Aggiungi al confronto'}
      </button>

      {/* Messaggio temporaneo per azioni di confronto */}
      {message && (
        <p className="detail-message" style={{ color: compareLimitReached ? 'red' : 'green', marginTop: '1rem' }}>
          {message}
        </p>
      )}
    </div>
  );
}
