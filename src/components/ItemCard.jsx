import React from 'react';
import '../style/ItemCardStyle.css'

function ItemCard({ item }) {
  const imageUrl = item.image || 'https://via.placeholder.com/200x150?text=No+Image';

  return (
    <div className="item-card">
      <img
        src={imageUrl}
        alt={item.title}
        className='item-card-image'
      />
      <h3 style={{ marginTop: '0.5rem' }}>{item.title}</h3>
      <p><strong>Categoria:</strong> {item.category}</p>
      {item.price && <p><strong>Prezzo:</strong> €{item.price}</p>}
      {item.releaseYear && <p><strong>Anno rilascio:</strong> {item.releaseYear}</p>}
      {item.series && <p><strong>Serie:</strong> {item.series}</p>}
    </div>
  );
}

export default ItemCard;
