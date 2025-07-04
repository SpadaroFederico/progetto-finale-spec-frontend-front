import React, { useState, useMemo } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';
import ItemCard from '../components/ItemCard';
import NavBar from '../components/NavBar';

const categoryOrderFixed = ["card", "etb", "loose_pack", "display"];

export default function Home() {
  const { items } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('title'); // 'title' o 'category'
  const [sortOrder, setSortOrder] = useState('asc');   // 'asc' o 'desc'

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
        search={search}
        setSearch={setSearch}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <h1>Lista prodotti</h1>

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
