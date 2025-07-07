import { Link } from 'react-router-dom';
import '../style/CourseCardStyle.css';

function CourseCard({ item }) {
  return (
    <Link to={`/courses/${item.id}`} className="item-card course-card">
      <div className="item-card-content">
        <img
          src={item.image}
          alt={item.title}
          className="item-card-image"
          style={{ maxHeight: '150px', objectFit: 'cover' }}
        />
        <h3>{item.title}</h3>
        <p>Categoria: {item.category}</p>
        <p>Difficoltà: {item.difficulty}</p>
        <p>Durata: {item.duration} ore</p>
      </div>
    </Link>
  );
}

export default CourseCard;
