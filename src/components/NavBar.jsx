import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/NavBarStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar } from '@fortawesome/free-solid-svg-icons';
import { useGlobalContext } from '../context/GlobalContext';
import logo from '../assets/icon.jpg';

/**
 * Barra di navigazione principale dell'applicazione.
 * Permette ricerca, ordinamento, accesso ai corsi, confronto e preferiti.
 */
const NavBar = ({
  search, setSearch,
  sortField, setSortField,
  sortOrder, setSortOrder,
  favorites, compareItems
}) => {
  const navigate = useNavigate();

  /**
   * Gestisce il click sul pulsante "Confronta".
   * Se non ci sono prodotti selezionati, mostra un alert.
   * Altrimenti naviga alla pagina di confronto.
   */
  const handleGoToCompare = () => {
    if (compareItems.length === 0) {
      alert('Nessun prodotto selezionato per il confronto');
      return;
    }
    navigate('/compare');
  };

  return (
    <nav className="navbar">
      {/* Sezione sinistra: logo e titolo */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
        <Link to="/" className="site-title">LaSbustiamoo?</Link>
      </div>

      {/* Sezione centrale: ricerca e ordinamento */}
      <div className="nav-center">
        <input
          type="text"
          placeholder="Cerca un prodotto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="title">Titolo</option>
          <option value="category">Categoria</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {/* Sezione destra: pulsanti corsi, confronto e preferiti */}
      <div className="nav-right">
        {/* Pulsante per la pagina corsi */}
        <Link to="/courses">
          <button className="courses-btn">Corsi</button>
        </Link>

        {/* Pulsante per la pagina di confronto */}
        <button onClick={handleGoToCompare}>Confronta</button>

        {/* Icona preferiti con badge numerico */}
        <Link to="/favorites" className="badge-icon">
          <FontAwesomeIcon icon={faStar} />
          {favorites.length > 0 && (
            <span className="badge">{favorites.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
