import { useGlobalContext } from '../context/GlobalContext.jsx';
import CourseCard from '../components/CourseCard.jsx';
import '../style/CoursesStyle.css'; 
import { useNavigate } from 'react-router-dom';

/**
 * Pagina che mostra la lista di tutti i corsi disponibili.
 * Permette di navigare alla creazione di un nuovo corso.
 */
function Courses() {
  // Recupera la lista dei corsi dal context globale
  const { courses } = useGlobalContext();
  // Hook per navigare tra le pagine
  const navigate = useNavigate();

  return (
    <main className="list-container">
      <h2>Corsi disponibili</h2>

      {/* Pulsante per aggiungere un nuovo corso */}
      <button
        onClick={() => navigate('/courses/new')}
        className="new-course-button"
      >
        + Nuovo Corso
      </button>

      {/* Lista dei corsi o messaggio se vuota */}
      {courses.length ? (
        <div className="courses-list">
          {courses.map(course => (
            <CourseCard key={course.id} item={course} />
          ))}
        </div>
      ) : (
        <p>Nessun corso trovato.</p>
      )}
    </main>
  );
}

export default Courses;
