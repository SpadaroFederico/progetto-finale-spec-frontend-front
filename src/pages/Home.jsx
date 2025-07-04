import React, { useState, useMemo, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import ItemCard from '../components/ItemCard';
import NavBar from '../components/NavBar';

const categoryOrderFixed = ["card", "etb", "loose_pack", "display"];

export default function Home() {
  const {
    items,
    favorites,
    compareItems,
    search,
    setSearch,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = useGlobalContext();

  // Stato locale per debounce input
  const [searchInput, setSearchInput] = useState(search);

  // Debounce effetto
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput, setSearch]);

  // Filtro per ricerca (solo title)
  const filteredItems = useMemo(() => {
    if (!search) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  // Raggruppamento + ordinamento
  const groupedItems = useMemo(() => {
    const groups = {};

    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    if (sortField === 'title') {
      for (const cat in groups) {
        groups[cat].sort((a, b) => {
          return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        });
      }

      return categoryOrderFixed
        .filter(cat => groups[cat])
        .map(cat => ({ category: cat, items: groups[cat] }));

    } else if (sortField === 'category') {
      const catsSorted = Object.keys(groups).sort((a, b) => {
        return sortOrder === 'asc'
          ? a.localeCompare(b)
          : b.localeCompare(a);
      });

      return catsSorted.map(cat => ({
        category: cat,
        items: groups[cat]
      }));
    }

    return [];
  }, [filteredItems, sortField, sortOrder]);

  return (
    <div>
      <NavBar
        search={searchInput}
        setSearch={setSearchInput}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        favorites={favorites}
        compareItems={compareItems}
      />

      <h1>Lista prodotti</h1>

      {groupedItems.length === 0 && (
        <p>Nessun prodotto trovato.</p>
      )}

      {groupedItems.map(group => (
        group.items.length > 0 && (
          <div key={group.category}>
            <h2>{group.category}</h2>
            <div className="category-section">
              {group.items.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
