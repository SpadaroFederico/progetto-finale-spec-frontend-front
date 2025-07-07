import { useGlobalContext } from '../context/GlobalContext.jsx';
import CourseCard from '../components/CourseCard.jsx';
import '../style/CoursesStyle.css'; 

function Courses() {
  const { courses } = useGlobalContext();

  return (
    <main className="list-container">
      <h2>Corsi disponibili</h2>
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
