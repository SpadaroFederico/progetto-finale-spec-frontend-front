import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
  const [items, setItems] = useState([]);
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

// estrai solo il campo pokemonitem
    setItems(detailedItems.map(item => item.pokemonitem));
    } catch (error) {
      console.error('❌ Errore nel fetch degli items completi:', error);
    }
  };

  useEffect(() => {
    fetchFullItems();
  }, []);

  return (
    <GlobalContext.Provider value={{ items }}>
      {children}
    </GlobalContext.Provider>
  );
}
