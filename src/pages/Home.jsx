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

  // Filtro in base alla ricerca (su title)
  const filteredItems = useMemo(() => {
    if (!search) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  // Raggruppo i prodotti per categoria, e ordino secondo sortField e sortOrder
  const groupedItems = useMemo(() => {
    // Creo mappa categoria => array prodotti filtrati
    const groups = {};

    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    // Se ordino per titolo, ordino solo i prodotti dentro ogni categoria, categorie restano fisse
    if (sortField === 'title') {
      for (const cat in groups) {
        groups[cat].sort((a, b) => {
          if (sortOrder === 'asc') return a.title.localeCompare(b.title);
          else return b.title.localeCompare(a.title);
        });
      }

      // Ritorno array con categorie in ordine fisso
      return categoryOrderFixed
        .filter(cat => groups[cat])  // prendo solo quelle presenti
        .map(cat => ({ category: cat, items: groups[cat] }));

    } else if (sortField === 'category') {
      // Ordino le categorie in base al sortOrder
      const catsSorted = Object.keys(groups).sort((a, b) => {
        if (sortOrder === 'asc') return a.localeCompare(b);
        else return b.localeCompare(a);
      });

      // Per ogni categoria inserisco gli items (puoi decidere se ordinarli o no)
      return catsSorted.map(cat => ({ category: cat, items: groups[cat] }));
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
              {group.items.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
