// Import delle pagine 
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Home from '../pages/Home.jsx'
import NotFound from '../pages/NotFound.jsx'
import Detail from '../pages/Detail.jsx'
import Compare from '../pages/Compare.jsx'
import Favorites from '../pages/Favorites.jsx'

function App (){
  return(
    <BrowserRouter>
        <Router>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/pokemonItems/:id' element={<Detail />}/>
                <Route path='favorites' element={<Favorites />}/>
                <Route path='compare' element={<Compare />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </Router>
    </BrowserRouter>
)};

export default App;
    
