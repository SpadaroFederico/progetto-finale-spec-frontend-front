import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Compare() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('compareItems')) || [];
    if (data.length === 0) {
      navigate('/notfound');
    } else {
      setItems(data);
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('compareItems');
    navigate('/');
  };

  if (items.length === 0) return null;

  return (
    <div>
      <h1>Confronto prodotti ({items.length})</h1>
      <button onClick={handleReset}>Reset confronto</button>

      <div className="compare-container">
        {items.map(item => (
          <div key={item.id} className={`item-card ${item.category}`}>
            <div className="item-card-content">
              <img
                src={item.image}
                alt={item.title}
                className="item-card-image"
              />
              <h3>{item.title}</h3>
              <p>Prezzo: {item.price ? `€${item.price}` : 'N/A'}</p>
              <p>Categoria: {item.category}</p>
              {item.releaseYear && <p>Anno: {item.releaseYear}</p>}
              {item.series && <p>Serie: {item.series}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
