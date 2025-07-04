import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ItemCard({ item }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCompare = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('compareItems')) || [];

    if (existing.find(i => i.id === item.id)) {
      setMessage('Prodotto già selezionato per il confronto');
    } else if (existing.length >= 4) {
      setMessage('Hai raggiunto il massimo di 4 prodotti per il confronto');
    } else {
      const updated = [...existing, item];
      localStorage.setItem('compareItems', JSON.stringify(updated));
      setMessage('Prodotto aggiunto al confronto');
    }

    // Nasconde il messaggio dopo 2 secondi
    setTimeout(() => setMessage(''), 2000);
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
      </div>
    </Link>
  );
}

export default ItemCard;
