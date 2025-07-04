import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Compare() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('compareItems')) || [];
    setItems(data);
  }, []);

  if (items.length === 0) {
    return <p>Nessun elemento selezionato per il confronto</p>;
  }

  // Resto del codice con tabella o card per confronto
}
