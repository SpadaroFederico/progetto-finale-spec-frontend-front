import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import '../style/CompareStyle.css';

export default function Compare() {
  const { compareItems, removeFromCompare } = useGlobalContext();

  if (compareItems.length === 0) {
    return <p className="compare-page">Nessun elemento selezionato per il confronto.</p>;
  }

  return (
    <div className="compare-page">
      <h1>Confronta Prodotti</h1>
      <div className="compare-grid">
        {compareItems.map(item => (
          <div key={item.id} className="compare-card">
            <h3>{item.title}</h3>
            <img
              src={item.image || 'https://via.placeholder.com/150x100?text=No+Image'}
              alt={item.title}
            />
            <p><strong>Categoria:</strong> {item.category}</p>
            {item.price && <p><strong>Prezzo:</strong> €{item.price}</p>}
            {item.brand && <p><strong>Marca:</strong> {item.brand}</p>}
            {item.series && <p><strong>Serie:</strong> {item.series}</p>}

            <button onClick={() => removeFromCompare(item.id)}>
              Rimuovi dal confronto
            </button>

            <Link to={`/pokemonItems/${item.id}`}>
              🔍 Vai al dettaglio
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
