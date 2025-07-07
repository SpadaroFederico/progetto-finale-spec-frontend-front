import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import '../style/CompareStyle.css';

/**
 * Pagina che mostra il confronto tra i prodotti selezionati.
 * Permette di visualizzare dettagli, rimuovere dal confronto e accedere al dettaglio prodotto.
 */
export default function Compare() {
  // Recupera i prodotti da confrontare e la funzione per rimuoverli dal context globale
  const { compareItems, removeFromCompare } = useGlobalContext();

  // Se non ci sono elementi da confrontare, mostra un messaggio
  if (compareItems.length === 0) {
    return <p className="compare-page">Nessun elemento selezionato per il confronto.</p>;
  }

  return (
    <div className="compare-page">
      <h1>Confronta Prodotti</h1>
      <div className="compare-grid">
        {/* Cicla su tutti gli item da confrontare e mostra una card per ciascuno */}
        {compareItems.map(item => (
          <div key={item.id} className="compare-card">
            {/* Titolo del prodotto */}
            <h3>{item.title}</h3>
            {/* Immagine del prodotto, placeholder se non disponibile */}
            <img
              src={item.image || 'https://via.placeholder.com/150x100?text=No+Image'}
              alt={item.title}
            />
            {/* Categoria */}
            <p><strong>Categoria:</strong> {item.category}</p>
            {/* Prezzo, se presente */}
            {item.price && <p><strong>Prezzo:</strong> €{item.price}</p>}
            {/* Marca, se presente */}
            {item.brand && <p><strong>Marca:</strong> {item.brand}</p>}
            {/* Serie, se presente */}
            {item.series && <p><strong>Serie:</strong> {item.series}</p>}

            {/* Pulsante per rimuovere dal confronto */}
            <button onClick={() => removeFromCompare(item.id)}>
              Rimuovi dal confronto
            </button>

            {/* Link per andare al dettaglio del prodotto */}
            <Link to={`/pokemonItems/${item.id}`}>
              🔍 Vai al dettaglio
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
