import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseForm from '../components/CourseForm';
import { useGlobalContext } from '../context/GlobalContext';

/**
 * Pagina per la modifica di un corso esistente.
 * Recupera i dati del corso, gestisce il submit e aggiorna lo stato globale.
 */
function CourseEdit() {
  // Recupera l'id del corso dalla URL
  const { id } = useParams();
  // Hook per navigare tra le pagine
  const navigate = useNavigate();
  // Funzione per aggiornare il corso nello stato globale
  const { updateCourse } = useGlobalContext();

  // Stato locale per il corso da modificare
  const [course, setCourse] = useState(null);
  // Stato per gestire il caricamento durante il submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effetto per caricare i dati del corso da modificare
  useEffect(() => {
    fetch(`http://localhost:3001/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Corso non trovato');
        return res.json();
      })
      .then(data => setCourse(data.course))
      .catch(err => {
        console.error(err);
        navigate('/courses');
      });
  }, [id, navigate]);

  /**
   * Gestisce il submit del form di modifica.
   * Aggiorna il corso tramite API e aggiorna lo stato globale.
   */
  const handleSubmit = async (updatedData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:3001/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course: updatedData }),
      });

      if (!res.ok) throw new Error('Errore durante la modifica');

      const updated = await res.json();
      updateCourse(updated.course);
      navigate('/courses');
    } catch (err) {
      console.error('❌ Errore:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostra un messaggio di caricamento se il corso non è ancora disponibile
  if (!course) return <p>Caricamento corso...</p>;

  return (
    <div>
      <h2>Modifica Corso</h2>
      {/* Form di modifica con dati precompilati */}
      <CourseForm
        initialData={course}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default CourseEdit;
