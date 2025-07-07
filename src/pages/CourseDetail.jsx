import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import '../style/CourseDetailStyle.css'; 

function CourseDetail() {
  const { id } = useParams();
  const { courses } = useGlobalContext();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const found = courses.find(c => c.id === Number(id));
    setCourse(found);
  }, [courses, id]);

  if (!course) return <p>Caricamento corso...</p>;

  return (
    <article className="detail-container">
      <h2>{course.title}</h2>
      <img
        src={course.image}
        alt={course.title}
        style={{ maxWidth: '300px', marginBottom: '1rem' }}
      />
      <p><strong>Categoria:</strong> {course.category}</p>
      <p><strong>Difficoltà:</strong> {course.difficulty}</p>
      <p><strong>Durata:</strong> {course.duration} ore</p>
      <p><strong>Descrizione:</strong> {course.description}</p>
    </article>
  );
}

export default CourseDetail;
