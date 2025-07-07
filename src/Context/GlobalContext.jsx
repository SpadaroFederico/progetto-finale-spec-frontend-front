import { createContext, useContext, useEffect, useState } from 'react';

// Crea il context globale
const GlobalContext = createContext();
// Custom hook per usare il context
export const useGlobalContext = () => useContext(GlobalContext);

/**
 * Provider globale che gestisce stato e logica condivisa dell'app.
 */
export function GlobalProvider({ children }) {
  // Stato per gli items/prodotti
  const [items, setItems] = useState([]);
  // Stato per i preferiti
  const [favorites, setFavorites] = useState([]);
  // Stato per i corsi
  const [courses, setCourses] = useState([]);
  // Stato per i prodotti da confrontare
  const [compareItems, setCompareItems] = useState([]);
  // Messaggio temporaneo per il confronto
  const [compareMessage, setCompareMessage] = useState(null);

  // Stato per ricerca e ordinamento
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // URL base dell'API
  const API_URL = 'http://localhost:3001';

  /**
   * Fetch completo degli items/prodotti dal backend.
   * Prima prende la lista base, poi per ogni item prende i dettagli.
   */
  const fetchFullItems = async () => {
    try {
      const res = await fetch(`${API_URL}/pokemonitems`);
      const basicItems = await res.json();

      const detailedItems = await Promise.all(
        basicItems.map(item =>
          fetch(`${API_URL}/pokemonitems/${item.id}`).then(res => res.json())
        )
      );

      setItems(detailedItems.map(item => item.pokemonitem));
    } catch (error) {
      console.error('❌ Errore nel fetch degli items completi:', error);
    }
  };

  /**
   * Fetch completo dei corsi dal backend.
   * Prima prende la lista base, poi per ogni corso prende i dettagli.
   */
  const fetchFullCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`);
      const basicCourses = await res.json();

      const detailedCourses = await Promise.all(
        basicCourses.map(course =>
          fetch(`${API_URL}/courses/${course.id}`).then(res => res.json())
        )
      );

      setCourses(detailedCourses.map(c => c.course));
    } catch (error) {
      console.error('❌ Errore nel fetch dei corsi completi:', error);
    }
  };

  /**
   * Elimina un corso dal backend e aggiorna lo stato locale.
   */
  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/courses/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Errore durante l\'eliminazione');
      setCourses(prev => prev.filter(course => course.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Aggiunge un nuovo corso allo stato locale.
   */
  const addCourse = (newCourse) => {
    setCourses(prev => [...prev, newCourse]);
  };

  /**
   * Aggiorna un corso esistente nello stato locale.
   */
  const updateCourse = (updatedCourse) => {
    setCourses(prev =>
      prev.map(c => (c.id === updatedCourse.id ? updatedCourse : c))
    );
  };

  // === FAVORITES ===

  // All'avvio, carica i preferiti da localStorage
  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFav);
  }, []);

  /**
   * Aggiunge un item ai preferiti e aggiorna localStorage.
   */
  const addToFavorites = (item) => {
    if (favorites.some(fav => fav.id === item.id)) return;
    const updated = [...favorites, item];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  /**
   * Rimuove un item dai preferiti e aggiorna localStorage.
   */
  const removeFromFavorites = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // === COMPARE ITEMS ===

  // All'avvio, carica i prodotti da confrontare da localStorage
  useEffect(() => {
    const storedCompare = JSON.parse(localStorage.getItem('compareItems')) || [];
    setCompareItems(storedCompare);
  }, []);

  /**
   * Aggiunge un item al confronto (max 4) e mostra messaggio.
   */
  const addToCompare = (item) => {
    if (compareItems.some(i => i.id === item.id)) {
      setCompareMessage('⚠️ Prodotto già presente nel confronto.');
    } else if (compareItems.length >= 4) {
      setCompareMessage('❌ Puoi confrontare al massimo 4 prodotti.');
    } else {
      const updated = [...compareItems, item];
      setCompareItems(updated);
      localStorage.setItem('compareItems', JSON.stringify(updated));
      setCompareMessage('✅ Prodotto aggiunto al confronto!');
    }
    // Messaggio temporaneo
    setTimeout(() => setCompareMessage(null), 3000);
  };

  /**
   * Rimuove un item dal confronto e mostra messaggio.
   */
  const removeFromCompare = (id) => {
    const updated = compareItems.filter(i => i.id !== id);
    setCompareItems(updated);
    localStorage.setItem('compareItems', JSON.stringify(updated));
    setCompareMessage('🗑️ Prodotto rimosso dal confronto.');
    setTimeout(() => setCompareMessage(null), 3000);
  };

  /**
   * Verifica se un item è già nel confronto.
   */
  const isInCompare = (id) => {
    return compareItems.some(i => i.id === id);
  };

  // All'avvio, carica items e corsi dal backend
  useEffect(() => {
    fetchFullItems();
    fetchFullCourses();
  }, []);

  // Espone tutte le funzioni e stati globali tramite il provider
  return (
    <GlobalContext.Provider value={{
      items,
      favorites,
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      addToFavorites,
      removeFromFavorites,
      compareItems,
      addToCompare,
      removeFromCompare,
      isInCompare,
      search,
      setSearch,
      sortField,
      setSortField,
      sortOrder,
      setSortOrder,
      compareMessage 
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
