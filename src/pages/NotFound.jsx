import React from 'react';
import '../style/NotFoundStyle.css';
import sadPikachu from '../assets/sad-pikachu.png';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Oops! Pagina non trovata</h1>
      <img
        src={sadPikachu}
        alt="Pikachu triste"
        className="sad-pikachu"
      />
      <p>Il contenuto che cerchi non esiste o è stato spostato.</p>
    </div>
  );
}
