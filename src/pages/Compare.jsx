// src/pages/Compare.jsx
import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

export default function Compare() {
  const { compareItems, removeFromCompare } = useGlobalContext();

  if (compareItems.length === 0) {
    return <p style={{ padding: '1rem' }}>Nessun elemento selezionato per il confronto.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Confronta Prodotti</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {compareItems.map(item => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
            <h3>{item.title}</h3>
            <img
              src={item.image || 'https://via.placeholder.com/150x100?text=No+Image'}
              alt={item.title}
              style={{ width: '100%', height: 'auto' }}
            />
            <p><strong>Categoria:</strong> {item.category}</p>
            {item.price && <p><strong>Prezzo:</strong> €{item.price}</p>}
            {item.brand && <p><strong>Marca:</strong> {item.brand}</p>}
            {item.series && <p><strong>Serie:</strong> {item.series}</p>}

            <button onClick={() => removeFromCompare(item.id)} style={{ marginTop: '0.5rem' }}>
              Rimuovi dal confronto
            </button>

            <br />
            <Link to={`/pokemonItems/${item.id}`} style={{ fontSize: '0.9rem' }}>
              🔍 Vai al dettaglio
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
