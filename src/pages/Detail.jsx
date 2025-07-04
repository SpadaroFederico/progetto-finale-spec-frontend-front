import React from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../Context/GlobalContext';
import { Navigate } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();
  const { items } = useGlobalContext();

  // Trovo il prodotto con quell'id
  const product = items.find(item => item.id.toString() === id);

  if (!product) {
    return <Navigate to="/not-found" replace />; // Se non lo trovo, vado alla pagina Not Found
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img 
        src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={product.title} 
      />

      <p><strong>Categoria:</strong> {product.category}</p>
      {product.price && <p><strong>Prezzo:</strong> €{product.price}</p>}
      {product.description && <p><strong>Descrizione:</strong> {product.description}</p>}
      {product.brand && <p><strong>Marca:</strong> {product.brand}</p>}
      {product.releaseYear && <p><strong>Anno rilascio:</strong> {product.releaseYear}</p>}
      {product.series && <p><strong>Serie:</strong> {product.series}</p>}

      {/* Puoi aggiungere altre proprietà che hai nel tuo oggetto */}
    </div>
  );
}
