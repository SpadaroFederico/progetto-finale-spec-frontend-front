// Import delle pagine e dei componenti necessari
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NotFound from '../pages/NotFound.jsx';
import Detail from '../pages/Detail.jsx';
import Compare from '../pages/Compare.jsx';
import Favorites from '../pages/Favorites.jsx';
import Courses from '../pages/Courses.jsx';
import CourseDetail from '../pages/CourseDetail.jsx';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import NavBar from '../components/NavBar.jsx';
import Jumbotron from '../components/Jumbotron';

function AppRouter() {
  // Recupera stato globale dal context
  const {
    search,
    setSearch,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    favorites,
    compareItems,
  } = useGlobalContext();

  return (
    <>
      {/* Barra di navigazione globale */}
      <NavBar
        search={search}
        setSearch={setSearch}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        favorites={favorites}
        compareItems={compareItems}
      />

      <Jumbotron />

      {/* Definizione delle rotte dell'applicazione */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokemonItems/:id' element={<Detail />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseDetail />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='compare' element={<Compare />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRouter;

