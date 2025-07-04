// Import delle pagine 
import { Routes, Route, Router } from 'react-router-dom';
import Home from '../pages/Home.jsx'
import NotFound from '../pages/NotFound.jsx'
import Detail from '../pages/Detail.jsx'
import Compare from '../pages/Compare.jsx'
import Favorites from '../pages/Favorites.jsx'

function AppRouter(){
  return(
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/pokemonItems/:id' element={<Detail />}/>
                <Route path='favorites' element={<Favorites />}/>
                <Route path='compare' element={<Compare />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
)};

export default AppRouter;
    
