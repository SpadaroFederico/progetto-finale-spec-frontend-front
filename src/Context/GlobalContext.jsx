import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareItems, setCompareItems] = useState([]);
  const [compareMessage, setCompareMessage] = useState(null); // ✅ nuovo

  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const API_URL = 'http://localhost:3001';

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

  // === FAVORITES ===
  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFav);
  }, []);

  const addToFavorites = (item) => {
    if (favorites.some(fav => fav.id === item.id)) return;
    const updated = [...favorites, item];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFromFavorites = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // === COMPARE ITEMS ===
  useEffect(() => {
    const storedCompare = JSON.parse(localStorage.getItem('compareItems')) || [];
    setCompareItems(storedCompare);
  }, []);

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

    setTimeout(() => setCompareMessage(null), 3000); // ⏱️
  };

  const removeFromCompare = (id) => {
    const updated = compareItems.filter(i => i.id !== id);
    setCompareItems(updated);
    localStorage.setItem('compareItems', JSON.stringify(updated));
    setCompareMessage('🗑️ Prodotto rimosso dal confronto.');
    setTimeout(() => setCompareMessage(null), 3000);
  };

  const isInCompare = (id) => {
    return compareItems.some(i => i.id === id);
  };

  useEffect(() => {
    fetchFullItems();
  }, []);

  return (
    <GlobalContext.Provider value={{
      items,
      favorites,
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
