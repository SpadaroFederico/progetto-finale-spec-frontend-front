import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NotFound from '../pages/NotFound.jsx';
import Detail from '../pages/Detail.jsx';
import Compare from '../pages/Compare.jsx';
import Favorites from '../pages/Favorites.jsx';
import Courses from '../pages/Courses.jsx';
import CourseDetail from '../pages/CourseDetail.jsx';
import CourseCreate from '../pages/CourseCreate.jsx';
import CourseEdit from '../pages/CourseEdit.jsx';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import NavBar from '../components/NavBar.jsx';
import Jumbotron from '../components/Jumbotron';

function AppRouter() {
  const {
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    favorites,
    compareItems,
  } = useGlobalContext();

  // 🔧 Ricerca debounced qui
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

    // debounce con useCallback → così non si ricrea a ogni render
  const debouncedUpdate = useCallback(
    debounce((valore) => {
      setDebouncedSearch(valore);
    }, 500),
    [] // viene creata una volta sola
  );

  // Ogni volta che cambia l’input, chiamiamo sia setSearchInput che debounce
  const handleSearch = (val) => {
    setSearchInput(val);
    debouncedUpdate(val);
  };
  return (
    <>
      <NavBar
        search={searchInput}
        setSearch={handleSearch}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        favorites={favorites}
        compareItems={compareItems}
      />

      <Jumbotron />

      <Routes>
        {/* Passa search a Home */}
        <Route path='/' element={<Home search={debouncedSearch} />} />
        <Route path='/pokemonItems/:id' element={<Detail />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/new' element={<CourseCreate />} />
        <Route path='/courses/:id' element={<CourseDetail />} />
        <Route path='/courses/:id/edit' element={<CourseEdit />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRouter;
