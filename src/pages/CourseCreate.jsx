import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import CourseForm from '../components/CourseForm';

/**
 * Pagina per la creazione di un nuovo corso.
 * Gestisce il submit del form, la chiamata API e l'aggiornamento dello stato globale.
 */
function CourseCreate() {
  // Stato per gestire il caricamento durante la creazione
  const [loading, setLoading] = useState(false);
  // Funzione per aggiungere il corso allo stato globale
  const { addCourse } = useGlobalContext();
  // Hook per navigare tra le pagine
  const navigate = useNavigate();

  /**
   * Gestisce la creazione del corso tramite chiamata API.
   * Aggiorna lo stato globale e reindirizza alla lista corsi.
   */
  const handleCreate = async (courseData) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });
      if (!res.ok) throw new Error('Errore nella creazione del corso');
      const newCourse = await res.json();
      // Aggiunge il nuovo corso allo stato globale (assumendo struttura { course: {...} })
      addCourse(newCourse.course);
      alert('✅ Corso creato con successo!');
      navigate('/courses');
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Crea Nuovo Corso</h2>
      {/* Form per la creazione del corso */}
      <CourseForm onSubmit={handleCreate} isSubmitting={loading} />
    </div>
  );
}

export default CourseCreate;
