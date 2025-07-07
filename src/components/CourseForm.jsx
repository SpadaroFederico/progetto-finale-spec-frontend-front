import { useState, useEffect } from 'react';
import '../style/CourseFormStyle.css'; 

// Array delle difficoltà disponibili
const difficulties = ['beginner', 'intermediate', 'advanced'];

/**
 * Componente form per la creazione o modifica di un corso.
 * Gestisce validazione, stato locale e submit.
 */
function CourseForm({ onSubmit, initialData = {}, isSubmitting = false }) {
  // Stato locale per i dati del form
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    difficulty: 'beginner',
    image: '',
    duration: '',
    ...initialData,
  });

  // Stato locale per gli errori di validazione
  const [errors, setErrors] = useState({});

  // Aggiorna i dati del form se cambiano i dati iniziali (es. in modifica)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...initialData,
    }));
  }, [initialData]);

  /**
   * Valida i dati del form e aggiorna lo stato degli errori.
   * Restituisce true se il form è valido, false altrimenti.
   */
  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Titolo obbligatorio';
    if (!formData.category.trim()) errs.category = 'Categoria obbligatoria';
    if (!formData.description.trim()) errs.description = 'Descrizione obbligatoria';
    if (!formData.image.trim()) errs.image = 'URL immagine obbligatorio';
    if (!formData.duration || isNaN(formData.duration) || Number(formData.duration) <= 0)
      errs.duration = 'Durata deve essere un numero positivo';
    if (!difficulties.includes(formData.difficulty))
      errs.difficulty = 'Difficoltà non valida';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
   * Gestisce il cambiamento dei campi del form.
   * Aggiorna lo stato locale con il nuovo valore.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? Number(value) : value,
    }));
  };

  /**
   * Gestisce il submit del form.
   * Valida i dati e chiama la funzione onSubmit se tutto è corretto.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="course-form-wrapper">
      <form onSubmit={handleSubmit} noValidate>
        {/* Campo titolo */}
        <div>
          <label>Titolo:</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <small style={{ color: 'red' }}>{errors.title}</small>}
        </div>

        {/* Campo categoria */}
        <div>
          <label>Categoria:</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <small style={{ color: 'red' }}>{errors.category}</small>}
        </div>

        {/* Campo descrizione */}
        <div>
          <label>Descrizione:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <small style={{ color: 'red' }}>{errors.description}</small>}
        </div>

        {/* Campo difficoltà */}
        <div>
          <label>Difficoltà:</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.difficulty && <small style={{ color: 'red' }}>{errors.difficulty}</small>}
        </div>

        {/* Campo URL immagine */}
        <div>
          <label>URL Immagine:</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <small style={{ color: 'red' }}>{errors.image}</small>}
        </div>

        {/* Campo durata */}
        <div>
          <label>Durata (ore):</label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
          {errors.duration && <small style={{ color: 'red' }}>{errors.duration}</small>}
        </div>

        {/* Pulsante submit */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvataggio...' : 'Salva'}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
