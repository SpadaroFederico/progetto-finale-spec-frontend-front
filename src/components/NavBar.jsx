import React from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Importa useNavigate

const NavBar = ({ search, setSearch, sortField, setSortField, sortOrder, setSortOrder }) => {
  const navigate = useNavigate();  // <-- Inizializza navigate

  const handleGoToCompare = () => {
    const compareItems = JSON.parse(localStorage.getItem('compareItems')) || [];
    if (compareItems.length === 0) {
      alert('Nessun prodotto selezionato per il confronto');
      return;
    }
    navigate('/compare');  // <-- Ora funziona
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <input
        type="text"
        placeholder="Cerca un prodotto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: '1rem' }}
      />

      <label>
        Ordina per:&nbsp;
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          style={{ marginRight: '1rem' }}
        >
          <option value="title">Titolo</option>
          <option value="category">Categoria</option>
        </select>
      </label>

      <label>
        Ordine:&nbsp;
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </label>

      <button onClick={handleGoToCompare}>Vai a confronto</button>
    </nav>
  );
};

export default NavBar;
