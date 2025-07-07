import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import '../style/CourseDetailStyle.css'; 

/**
 * Pagina di dettaglio di un singolo corso.
 * Mostra tutte le informazioni del corso selezionato.
 */
function CourseDetail() {
  // Recupera l'id del corso dalla URL
  const { id } = useParams();
  // Recupera la lista dei corsi dal context globale
  const { courses } = useGlobalContext();
  // Stato locale per il corso selezionato
  const [course, setCourse] = useState(null);

  // Effetto che aggiorna il corso selezionato quando cambia la lista corsi o l'id
  useEffect(() => {
    const found = courses.find(c => c.id === Number(id));
    setCourse(found);
  }, [courses, id]);

  // Mostra un messaggio di caricamento se il corso non è ancora disponibile
  if (!course) return <p>Caricamento corso...</p>;

  return (
    <article className="detail-container">
      <h2>{course.title}</h2>
      {/* Immagine del corso */}
      <img
        src={course.image}
        alt={course.title}
        style={{ maxWidth: '300px', marginBottom: '1rem' }}
      />
      {/* Dettagli del corso */}
      <p><strong>Categoria:</strong> {course.category}</p>
      <p><strong>Difficoltà:</strong> {course.difficulty}</p>
      <p><strong>Durata:</strong> {course.duration} ore</p>
      <p><strong>Descrizione:</strong> {course.description}</p>
    </article>
  );
}

export default CourseDetail;
