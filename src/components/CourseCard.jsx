import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import '../style/CourseCardStyle.css';

/**
 * Componente che mostra una card riassuntiva di un corso.
 * Permette di navigare al dettaglio, modificare o eliminare il corso.
 */
function CourseCard({ item }) {
  // Recupera la funzione per eliminare un corso dal context globale
  const { deleteCourse } = useGlobalContext();
  // Hook per navigare tra le pagine
  const navigate = useNavigate();

  /**
   * Gestisce la richiesta di eliminazione del corso.
   * Mostra una conferma prima di procedere.
   */
  const handleDelete = () => {
    if (window.confirm('Sei sicuro di voler eliminare questo corso?')) {
      deleteCourse(item.id);
    }
  };

  return (
    <div className="item-card course-card">
      {/* Link al dettaglio del corso */}
      <Link to={`/courses/${item.id}`} className="item-card-content">
        {/* Immagine del corso */}
        <img
          src={item.image}
          alt={item.title}
          className="item-card-image"
          style={{ maxHeight: '150px', objectFit: 'cover' }}
        />
        {/* Titolo e informazioni principali */}
        <h3>{item.title}</h3>
        <p>Categoria: {item.category}</p>
        <p>Difficoltà: {item.difficulty}</p>
        <p>Durata: {item.duration} ore</p>
      </Link>

      {/* Pulsanti di azione: modifica ed elimina */}
      <div
        className="course-card-buttons"
        style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}
      >
        {/* Pulsante per modificare il corso */}
        <button onClick={() => navigate(`/courses/${item.id}/edit`)}>
          ✏️ Modifica
        </button>
        {/* Pulsante per eliminare il corso */}
        <button
          onClick={handleDelete}
          style={{ backgroundColor: '#c94a4a', color: 'white' }}
        >
          🗑️ Elimina
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
